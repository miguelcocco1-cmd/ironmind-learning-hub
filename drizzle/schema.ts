import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, bigint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Módulos do programa (8 módulos progressivos)
 */
export const modules = mysqlTable("modules", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  order: int("order").notNull(), // Ordem de apresentação (1-8)
  thumbnailUrl: text("thumbnailUrl"), // Imagem de capa do módulo
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Module = typeof modules.$inferSelect;
export type InsertModule = typeof modules.$inferInsert;

/**
 * Semanas dentro de cada módulo
 */
export const weeks = mysqlTable("weeks", {
  id: int("id").autoincrement().primaryKey(),
  moduleId: int("moduleId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  weekNumber: int("weekNumber").notNull(), // Número da semana dentro do módulo
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Week = typeof weeks.$inferSelect;
export type InsertWeek = typeof weeks.$inferInsert;

/**
 * Conteúdos de cada semana (vídeos, áudios, PDFs)
 */
export const contents = mysqlTable("contents", {
  id: int("id").autoincrement().primaryKey(),
  weekId: int("weekId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: mysqlEnum("type", ["video", "audio", "pdf"]).notNull(),
  url: text("url").notNull(), // URL do YouTube/Vimeo ou link do arquivo
  duration: int("duration"), // Duração em segundos (para vídeos/áudios)
  order: int("order").notNull(), // Ordem de apresentação dentro da semana
  thumbnailUrl: text("thumbnailUrl"), // Thumbnail para vídeos
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Content = typeof contents.$inferSelect;
export type InsertContent = typeof contents.$inferInsert;

/**
 * Exercícios práticos de cada semana
 */
export const exercises = mysqlTable("exercises", {
  id: int("id").autoincrement().primaryKey(),
  weekId: int("weekId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  instructions: text("instructions"), // Instruções detalhadas
  order: int("order").notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = typeof exercises.$inferInsert;

/**
 * Progresso do utilizador nos conteúdos
 */
export const userContentProgress = mysqlTable("user_content_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contentId: int("contentId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  watchedDuration: int("watchedDuration").default(0), // Segundos assistidos (para vídeos/áudios)
  lastWatchedAt: timestamp("lastWatchedAt"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserContentProgress = typeof userContentProgress.$inferSelect;
export type InsertUserContentProgress = typeof userContentProgress.$inferInsert;

/**
 * Submissões de exercícios pelos utilizadores
 */
export const exerciseSubmissions = mysqlTable("exercise_submissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  exerciseId: int("exerciseId").notNull(),
  content: text("content").notNull(), // Resposta/submissão do utilizador
  completed: boolean("completed").default(true).notNull(),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ExerciseSubmission = typeof exerciseSubmissions.$inferSelect;
export type InsertExerciseSubmission = typeof exerciseSubmissions.$inferInsert;

/**
 * Progresso geral do utilizador nos módulos
 */
export const userModuleProgress = mysqlTable("user_module_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserModuleProgress = typeof userModuleProgress.$inferSelect;
export type InsertUserModuleProgress = typeof userModuleProgress.$inferInsert;
