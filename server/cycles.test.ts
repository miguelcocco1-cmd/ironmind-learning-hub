import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("cycles router", () => {
  it("should list all published cycles", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const cycles = await caller.cycles.list();

    expect(Array.isArray(cycles)).toBe(true);
    expect(cycles.length).toBeGreaterThan(0);
    expect(cycles[0]).toHaveProperty("title");
    expect(cycles[0]).toHaveProperty("order");
    expect(cycles[0]).toHaveProperty("isPublished");
  });

  it("should get cycle by ID", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Get first cycle
    const cycles = await caller.cycles.list();
    const firstCycleId = cycles[0]?.id;

    if (firstCycleId) {
      const cycle = await caller.cycles.getById({ id: firstCycleId });
      expect(cycle).toBeDefined();
      expect(cycle?.id).toBe(firstCycleId);
      expect(cycle).toHaveProperty("title");
    }
  });
});

describe("weeks router", () => {
  it("should list weeks by cycle ID", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Get first cycle
    const cycles = await caller.cycles.list();
    const firstCycleId = cycles[0]?.id;

    if (firstCycleId) {
      const weeks = await caller.weeks.listByCycle({ cycleId: firstCycleId });
      expect(Array.isArray(weeks)).toBe(true);
      expect(weeks.length).toBeGreaterThan(0);
      expect(weeks[0]).toHaveProperty("title");
      expect(weeks[0]).toHaveProperty("weekNumber");
      expect(weeks[0]).toHaveProperty("type");
      expect(["topic", "exercise"]).toContain(weeks[0]?.type);
    }
  });

  it("should list all weeks with contents", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const weeksWithContents = await caller.weeks.listAllWithContents();
    
    expect(Array.isArray(weeksWithContents)).toBe(true);
    expect(weeksWithContents.length).toBeGreaterThan(0);
    expect(weeksWithContents[0]).toHaveProperty("contents");
    expect(Array.isArray(weeksWithContents[0]?.contents)).toBe(true);
  });
});

describe("contents router", () => {
  it("should list contents by week ID", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Get first week
    const weeksWithContents = await caller.weeks.listAllWithContents();
    const firstWeekId = weeksWithContents[0]?.id;

    if (firstWeekId) {
      const contents = await caller.contents.listByWeek({ weekId: firstWeekId });
      expect(Array.isArray(contents)).toBe(true);
      expect(contents.length).toBeGreaterThan(0);
      expect(contents[0]).toHaveProperty("title");
      expect(contents[0]).toHaveProperty("type");
      expect(["video", "audio", "pdf"]).toContain(contents[0]?.type);
    }
  });
});
