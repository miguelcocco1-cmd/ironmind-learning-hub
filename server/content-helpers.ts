import * as db from "./db";

export async function getAllWeeksWithContents(userId?: number) {
  // Get all cycles
  const cycles = await db.getAllCycles();
  
  // Get all weeks for all cycles
  const allWeeks = [];
  for (const cycle of cycles) {
    const weeks = await db.getWeeksByCycleId(cycle.id);
    allWeeks.push(...weeks);
  }
  
  // Get contents for each week
  const weeksWithContents = await Promise.all(
    allWeeks.map(async (week) => {
      const contents = await db.getContentsByWeekId(week.id);
      
      // If userId is provided, get progress for each content
      let contentsWithProgress = contents;
      if (userId) {
        contentsWithProgress = await Promise.all(
          contents.map(async (content) => {
            const progress = await db.getUserContentProgress(userId, content.id);
            return {
              ...content,
              completed: progress?.completed || false,
            };
          })
        );
      }
      
      return {
        ...week,
        contents: contentsWithProgress,
      };
    })
  );
  
  // Sort by week number
  return weeksWithContents.sort((a, b) => {
    // First sort by cycleId, then by weekNumber
    if (a.cycleId !== b.cycleId) {
      return a.cycleId - b.cycleId;
    }
    return a.weekNumber - b.weekNumber;
  });
}
