import { z } from "zod";
import { router, protectedProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { userIntegrations, activities } from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";

// Strava OAuth configuration
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || "YOUR_CLIENT_ID";
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || "YOUR_CLIENT_SECRET";
const STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI || "https://yourdomain.com/api/integrations/strava/callback";

export const integrationsRouter = router({
  // Get Strava authorization URL
  strava: router({
    getAuthUrl: protectedProcedure.query(({ ctx }) => {
      const params = new URLSearchParams({
        client_id: STRAVA_CLIENT_ID,
        redirect_uri: STRAVA_REDIRECT_URI,
        response_type: "code",
        scope: "activity:read_all,read",
        approval_prompt: "auto",
        state: ctx.user.id.toString(), // Pass user ID for security
      });

      return {
        url: `https://www.strava.com/oauth/authorize?${params.toString()}`,
      };
    }),

    // Handle OAuth callback and exchange code for tokens
    handleCallback: protectedProcedure
      .input(
        z.object({
          code: z.string(),
          scope: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          // Exchange authorization code for tokens
          const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              client_id: STRAVA_CLIENT_ID,
              client_secret: STRAVA_CLIENT_SECRET,
              code: input.code,
              grant_type: "authorization_code",
            }),
          });

          if (!response.ok) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Failed to exchange Strava authorization code",
            });
          }

          const data = await response.json();

          // Store tokens in database
          const db = await getDb();
          if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
          
          await db
            .insert(userIntegrations)
            .values({
              userId: ctx.user.id,
              provider: "strava",
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              expiresAt: BigInt(data.expires_at * 1000), // Convert to milliseconds
              isActive: true,
              metadata: JSON.stringify({
                athlete_id: data.athlete?.id,
                username: data.athlete?.username,
                firstname: data.athlete?.firstname,
                lastname: data.athlete?.lastname,
                scope: input.scope,
              }),
            })
            .onDuplicateKeyUpdate({
              set: {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                expiresAt: BigInt(data.expires_at * 1000),
                isActive: true,
                metadata: JSON.stringify({
                  athlete_id: data.athlete?.id,
                  username: data.athlete?.username,
                  firstname: data.athlete?.firstname,
                  lastname: data.athlete?.lastname,
                  scope: input.scope,
                }),
                updatedAt: new Date(),
              },
            });

          return { success: true, athlete: data.athlete };
        } catch (error) {
          console.error("Strava OAuth error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to connect Strava account",
          });
        }
      }),

    // Get connection status
    getStatus: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return { connected: false };
      
      const [integration] = await db
        .select()
        .from(userIntegrations)
        .where(
          and(
            eq(userIntegrations.userId, ctx.user.id),
            eq(userIntegrations.provider, "strava"),
            eq(userIntegrations.isActive, true)
          )
        )
        .limit(1);

      if (!integration) {
        return { connected: false };
      }

      const metadata = integration.metadata ? JSON.parse(integration.metadata as string) : {};

      return {
        connected: true,
        athlete: {
          id: metadata.athlete_id,
          username: metadata.username,
          name: `${metadata.firstname || ""} ${metadata.lastname || ""}`.trim(),
        },
      };
    }),

    // Sync activities from Strava
    syncActivities: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      
      // Get integration
      const [integration] = await db
        .select()
        .from(userIntegrations)
        .where(
          and(
            eq(userIntegrations.userId, ctx.user.id),
            eq(userIntegrations.provider, "strava"),
            eq(userIntegrations.isActive, true)
          )
        )
        .limit(1);

      if (!integration) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Strava account not connected",
        });
      }

      // Check if token is expired and refresh if needed
      let accessToken = integration.accessToken;
      const now = Date.now();
      const expiresAt = Number(integration.expiresAt);

      if (expiresAt < now) {
        // Refresh token
        const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            refresh_token: integration.refreshToken,
            grant_type: "refresh_token",
          }),
        });

        if (!response.ok) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Failed to refresh Strava token",
          });
        }

        const data = await response.json();
        accessToken = data.access_token;

        // Update tokens in database
        await db
          .update(userIntegrations)
          .set({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: BigInt(data.expires_at * 1000),
            updatedAt: new Date(),
          })
          .where(eq(userIntegrations.id, integration.id));
      }

      // Fetch activities from Strava (last 30 days)
      const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
      const response = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?after=${thirtyDaysAgo}&per_page=50`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to fetch Strava activities",
        });
      }

      const stravaActivities = await response.json();

      // Store activities in database
      let syncedCount = 0;
      for (const activity of stravaActivities as any[]) {
        try {
          await db
            .insert(activities)
            .values({
              userId: ctx.user.id,
              provider: "strava",
              externalId: activity.id.toString(),
              name: activity.name,
              type: activity.type,
              distance: activity.distance,
              duration: activity.moving_time,
              startDate: new Date(activity.start_date),
              avgHeartRate: activity.average_heartrate || null,
              maxHeartRate: activity.max_heartrate || null,
              calories: activity.calories || null,
              metadata: JSON.stringify({
                elapsed_time: activity.elapsed_time,
                total_elevation_gain: activity.total_elevation_gain,
                average_speed: activity.average_speed,
                max_speed: activity.max_speed,
                average_watts: activity.average_watts,
                kilojoules: activity.kilojoules,
              }),
            })
            .onDuplicateKeyUpdate({
              set: {
                name: activity.name,
                type: activity.type,
                distance: activity.distance,
                duration: activity.moving_time,
                avgHeartRate: activity.average_heartrate || null,
                maxHeartRate: activity.max_heartrate || null,
                calories: activity.calories || null,
                updatedAt: new Date(),
              },
            });

          syncedCount++;
        } catch (error) {
          console.error(`Failed to sync activity ${activity.id}:`, error);
        }
      }

      return {
        success: true,
        syncedCount,
        totalActivities: stravaActivities.length,
      };
    }),

    // Disconnect Strava
    disconnect: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      
      await db
        .update(userIntegrations)
        .set({
          isActive: false,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(userIntegrations.userId, ctx.user.id),
            eq(userIntegrations.provider, "strava")
          )
        );

      return { success: true };
    }),

    // Get recent activities
    getActivities: protectedProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(50).default(10),
        })
      )
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return [];
        
        const userActivities = await db
          .select()
          .from(activities)
          .where(
            and(
              eq(activities.userId, ctx.user.id),
              eq(activities.provider, "strava")
            )
          )
          .orderBy(desc(activities.startDate))
          .limit(input.limit);

        return userActivities.map((activity) => ({
          ...activity,
          metadata: activity.metadata ? JSON.parse(activity.metadata as string) : {},
        }));
      }),
  }),
});
