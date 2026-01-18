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
 * Ciclos do programa (6 ciclos progressivos de 1 mês cada)
 */
export const cycles = mysqlTable("cycles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  order: int("order").notNull(), // Ordem de apresentação (1-6)
  color: varchar("color", { length: 50 }), // Cor do ciclo (blue, green, orange, red, white, cyan)
  thumbnailUrl: text("thumbnailUrl"), // Imagem de capa do ciclo
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Cycle = typeof cycles.$inferSelect;
export type InsertCycle = typeof cycles.$inferInsert;

/**
 * Semanas/Itens dentro de cada ciclo (18 itens por ciclo: 12 tópicos + 6 exercícios)
 */
export const weeks = mysqlTable("weeks", {
  id: int("id").autoincrement().primaryKey(),
  cycleId: int("cycleId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  weekNumber: int("weekNumber").notNull(), // Número do item dentro do ciclo (1-18)
  weekGroup: int("weekGroup").notNull(), // Agrupamento semanal (1-4): cada ciclo tem 4 semanas
  weekName: varchar("weekName", { length: 100 }), // Nome personalizado da semana (para Ciclo 0: "Apresentação", "Como Funciona", etc.)
  type: mysqlEnum("type", ["live", "topic", "exercise"]).notNull(), // Aula ao vivo, tópico teórico ou exercício prático
  area: mysqlEnum("area", ["mental_foundation", "focus_lock", "pressure_release", "mental_strength", "mental_recovery"]), // Área temática do exercício
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Week = typeof weeks.$inferSelect;
export type InsertWeek = typeof weeks.$inferInsert;

/**
 * Conteúdos de cada semana/item (vídeos, áudios, PDFs)
 */
export const contents = mysqlTable("contents", {
  id: int("id").autoincrement().primaryKey(),
  weekId: int("weekId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: mysqlEnum("type", ["video", "audio", "pdf", "quiz"]).notNull(),
  url: text("url").notNull(), // URL do YouTube/Vimeo ou link do arquivo
  duration: int("duration"), // Duração em segundos (para vídeos/áudios)
  order: int("order").notNull(), // Ordem de apresentação dentro da semana
  thumbnailUrl: text("thumbnailUrl"), // Thumbnail para vídeos
  isPublished: boolean("isPublished").default(false).notNull(),
  isAccessible: boolean("isAccessible").default(true).notNull(), // Controlo manual de acesso aos conteúdos
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
 * Progresso geral do utilizador nos ciclos
 */
export const userCycleProgress = mysqlTable("user_cycle_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  cycleId: int("cycleId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserCycleProgress = typeof userCycleProgress.$inferSelect;
export type InsertUserCycleProgress = typeof userCycleProgress.$inferInsert;

/**
 * Badges/Conquistas disponíveis na plataforma
 */
export const badges = mysqlTable("badges", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 100 }).notNull(), // Nome do ícone (ex: "trophy", "fire", "star")
  color: varchar("color", { length: 50 }).notNull(), // Cor do badge (ex: "gold", "silver", "bronze")
  type: mysqlEnum("type", ["streak", "completion", "milestone", "special"]).notNull(),
  requirement: text("requirement"), // Descrição do requisito para ganhar o badge
  order: int("order").notNull(), // Ordem de exibição
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = typeof badges.$inferInsert;

/**
 * Badges conquistados pelos utilizadores
 */
export const userBadges = mysqlTable("user_badges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badgeId: int("badgeId").notNull(),
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;
