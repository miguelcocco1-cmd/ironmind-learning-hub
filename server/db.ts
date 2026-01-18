import { eq, and, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  cycles,
  weeks,
  contents,
  exercises,
  userContentProgress,
  exerciseSubmissions,
  userCycleProgress,
  badges,
  userBadges,
  InsertCycle,
  InsertWeek,
  InsertContent,
  InsertExercise,
  InsertUserContentProgress,
  InsertExerciseSubmission,
  InsertUserCycleProgress,
  InsertBadge,
  InsertUserBadge
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============= USER FUNCTIONS =============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============= CYCLE FUNCTIONS =============

export async function getAllCycles() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cycles).where(eq(cycles.isPublished, true)).orderBy(asc(cycles.order));
}

export async function getCycleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(cycles).where(eq(cycles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCycle(cycle: InsertCycle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(cycles).values(cycle);
  return result;
}

// ============= WEEK FUNCTIONS =============

export async function getWeeksByCycleId(cycleId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(weeks).where(and(eq(weeks.cycleId, cycleId), eq(weeks.isPublished, true))).orderBy(asc(weeks.weekNumber));
}

export async function getWeekById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(weeks).where(eq(weeks.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createWeek(week: InsertWeek) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(weeks).values(week);
  return result;
}

// ============= CONTENT FUNCTIONS =============

export async function getContentsByWeekId(weekId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contents).where(and(eq(contents.weekId, weekId), eq(contents.isPublished, true))).orderBy(asc(contents.order));
}

export async function getContentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(contents).where(eq(contents.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createContent(content: InsertContent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(contents).values(content);
  return result;
}

// ============= EXERCISE FUNCTIONS =============

export async function getExercisesByWeekId(weekId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(exercises).where(and(eq(exercises.weekId, weekId), eq(exercises.isPublished, true))).orderBy(asc(exercises.order));
}

export async function getExerciseById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(exercises).where(eq(exercises.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createExercise(exercise: InsertExercise) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(exercises).values(exercise);
  return result;
}

// ============= USER PROGRESS FUNCTIONS =============

export async function getUserContentProgress(userId: number, contentId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userContentProgress)
    .where(and(eq(userContentProgress.userId, userId), eq(userContentProgress.contentId, contentId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertUserContentProgress(progress: InsertUserContentProgress) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getUserContentProgress(progress.userId!, progress.contentId!);
  
  if (existing) {
    await db.update(userContentProgress)
      .set(progress)
      .where(eq(userContentProgress.id, existing.id));
  } else {
    await db.insert(userContentProgress).values(progress);
  }
}

export async function getUserCycleProgress(userId: number, cycleId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userCycleProgress)
    .where(and(eq(userCycleProgress.userId, userId), eq(userCycleProgress.cycleId, cycleId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(userContentProgress).where(eq(userContentProgress.userId, userId));
}

// ============= EXERCISE SUBMISSION FUNCTIONS =============

export async function getExerciseSubmissionsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(exerciseSubmissions)
    .where(eq(exerciseSubmissions.userId, userId))
    .orderBy(desc(exerciseSubmissions.submittedAt));
}

export async function getUserExerciseSubmission(userId: number, exerciseId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(exerciseSubmissions)
    .where(and(eq(exerciseSubmissions.userId, userId), eq(exerciseSubmissions.exerciseId, exerciseId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createExerciseSubmission(submission: InsertExerciseSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(exerciseSubmissions).values(submission);
  return result;
}

// ============= BADGE FUNCTIONS =============

export async function getAllBadges() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(badges).orderBy(asc(badges.order));
}

export async function getUserBadges(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  // Join userBadges with badges to get full badge info
  const result = await db
    .select({
      id: userBadges.id,
      userId: userBadges.userId,
      badgeId: userBadges.badgeId,
      earnedAt: userBadges.earnedAt,
      badge: badges
    })
    .from(userBadges)
    .leftJoin(badges, eq(userBadges.badgeId, badges.id))
    .where(eq(userBadges.userId, userId))
    .orderBy(desc(userBadges.earnedAt));
  
  return result;
}

export async function awardBadge(userId: number, badgeId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if user already has this badge
  const existing = await db
    .select()
    .from(userBadges)
    .where(and(eq(userBadges.userId, userId), eq(userBadges.badgeId, badgeId)))
    .limit(1);
  
  if (existing.length > 0) {
    return existing[0]; // Already has badge
  }
  
  const result = await db.insert(userBadges).values({
    userId,
    badgeId,
  });
  
  return result;
}
