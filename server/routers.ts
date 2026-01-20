import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { getAllWeeksWithContents } from "./content-helpers";
import { integrationsRouter } from "./integrations";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============= CYCLES =============
  cycles: router({
    list: publicProcedure.query(async () => {
      return await db.getAllCycles();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getCycleById(input.id);
      }),
    
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        order: z.number(),
        thumbnailUrl: z.string().optional(),
        isPublished: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        return await db.createCycle(input);
      }),
  }),

  // ============= WEEKS =============
  weeks: router({
    listAllWithContents: publicProcedure.query(async ({ ctx }) => {
      const userId = ctx.user?.id;
      return await getAllWeeksWithContents(userId);
    }),
    
listByCycle: publicProcedure
      .input(z.object({ cycleId: z.number() }))
      .query(async ({ input }) => {
        return await db.getWeeksByCycleId(input.cycleId);
      }),
    
    listAllLiveClasses: publicProcedure
      .query(async () => {
        return await db.getAllLiveClasses();
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getWeekById(input.id);
      }),
    
    create: protectedProcedure
      .input(z.object({
        cycleId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        weekNumber: z.number(),
        weekGroup: z.number().min(1).max(4), // Semana dentro do ciclo (1-4)
        type: z.enum(["live", "topic", "exercise"]),
        isPublished: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        return await db.createWeek(input);
      }),
  }),

  // ============= CONTENTS =============
  contents: router({
    listByWeek: publicProcedure
      .input(z.object({ weekId: z.number() }))
      .query(async ({ input }) => {
        return await db.getContentsByWeekId(input.weekId);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getContentById(input.id);
      }),
    
    create: protectedProcedure
      .input(z.object({
        weekId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        type: z.enum(["video", "audio", "pdf"]),
        url: z.string(),
        duration: z.number().optional(),
        order: z.number(),
        thumbnailUrl: z.string().optional(),
        isPublished: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        return await db.createContent(input);
      }),
  }),

  // ============= EXERCISES =============
  exercises: router({
    listByWeek: publicProcedure
      .input(z.object({ weekId: z.number() }))
      .query(async ({ input }) => {
        return await db.getExercisesByWeekId(input.weekId);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getExerciseById(input.id);
      }),
    
    create: protectedProcedure
      .input(z.object({
        weekId: z.number(),
        title: z.string(),
        description: z.string(),
        instructions: z.string().optional(),
        order: z.number(),
        isPublished: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        return await db.createExercise(input);
      }),
    
    submit: protectedProcedure
      .input(z.object({
        exerciseId: z.number(),
        content: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.createExerciseSubmission({
          userId: ctx.user.id,
          exerciseId: input.exerciseId,
          content: input.content,
          completed: true,
        });
      }),
    
    mySubmissions: protectedProcedure.query(async ({ ctx }) => {
      return await db.getExerciseSubmissionsByUserId(ctx.user.id);
    }),
  }),

  // ============= PROGRESS =============
  progress: router({
    markContentComplete: protectedProcedure
      .input(z.object({
        contentId: z.number(),
        watchedDuration: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.upsertUserContentProgress({
          userId: ctx.user.id,
          contentId: input.contentId,
          completed: true,
          watchedDuration: input.watchedDuration || 0,
          completedAt: new Date(),
          lastWatchedAt: new Date(),
        });
        return { success: true };
      }),
    
    updateWatchProgress: protectedProcedure
      .input(z.object({
        contentId: z.number(),
        watchedDuration: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.upsertUserContentProgress({
          userId: ctx.user.id,
          contentId: input.contentId,
          watchedDuration: input.watchedDuration,
          lastWatchedAt: new Date(),
        });
        return { success: true };
      }),
    
    getMyProgress: protectedProcedure.query(async ({ ctx }) => {
      return await db.getAllUserProgress(ctx.user.id);
    }),
    
    getContentProgress: protectedProcedure
      .input(z.object({ contentId: z.number() }))
      .query(async ({ input, ctx }) => {
        return await db.getUserContentProgress(ctx.user.id, input.contentId);
      }),
  }),

  // ============= INTEGRATIONS =============
  integrations: integrationsRouter,

  // ============= BADGES =============
  badges: router({
    list: publicProcedure.query(async () => {
      return await db.getAllBadges();
    }),
    
    getUserBadges: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return await db.getUserBadges(input.userId);
      }),
    
    awardBadge: protectedProcedure
      .input(z.object({
        userId: z.number(),
        badgeId: z.number(),
      }))
      .mutation(async ({ input }) => {
        return await db.awardBadge(input.userId, input.badgeId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
