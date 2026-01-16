import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("modules router", () => {
  it("should list all published modules", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const modules = await caller.modules.list();

    expect(Array.isArray(modules)).toBe(true);
    expect(modules.length).toBeGreaterThan(0);
    expect(modules[0]).toHaveProperty("title");
    expect(modules[0]).toHaveProperty("order");
  });

  it("should get module by id", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const module = await caller.modules.getById({ id: 1 });

    expect(module).toBeDefined();
    expect(module?.id).toBe(1);
    expect(module?.title).toBeDefined();
  });
});

describe("weeks router", () => {
  it("should list weeks for a module", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const weeks = await caller.weeks.listByModule({ moduleId: 1 });

    expect(Array.isArray(weeks)).toBe(true);
    expect(weeks.length).toBeGreaterThan(0);
    expect(weeks[0]).toHaveProperty("title");
    expect(weeks[0]).toHaveProperty("weekNumber");
  });
});

describe("contents router", () => {
  it("should list contents for a week", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const contents = await caller.contents.listByWeek({ weekId: 1 });

    expect(Array.isArray(contents)).toBe(true);
    expect(contents.length).toBeGreaterThan(0);
    expect(contents[0]).toHaveProperty("title");
    expect(contents[0]).toHaveProperty("type");
    expect(["video", "audio", "pdf"]).toContain(contents[0].type);
  });
});

describe("progress router", () => {
  it("should mark content as complete", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.progress.markContentComplete({
      contentId: 1,
      watchedDuration: 900,
    });

    expect(result.success).toBe(true);
  });

  it("should get user progress", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const progress = await caller.progress.getMyProgress();

    expect(Array.isArray(progress)).toBe(true);
  });
});

describe("exercises router", () => {
  it("should list exercises for a week", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const exercises = await caller.exercises.listByWeek({ weekId: 1 });

    expect(Array.isArray(exercises)).toBe(true);
    expect(exercises.length).toBeGreaterThan(0);
    expect(exercises[0]).toHaveProperty("title");
    expect(exercises[0]).toHaveProperty("description");
  });

  it("should submit an exercise", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.exercises.submit({
      exerciseId: 1,
      content: "Esta é a minha resposta ao exercício de teste.",
    });

    expect(result).toBeDefined();
  });

  it("should get user submissions", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const submissions = await caller.exercises.mySubmissions();

    expect(Array.isArray(submissions)).toBe(true);
  });
});
