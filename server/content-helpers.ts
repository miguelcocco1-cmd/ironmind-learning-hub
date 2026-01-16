import * as db from "./db";

export async function getAllWeeksWithContents(userId?: number) {
  // Get all modules
  const modules = await db.getAllModules();
  
  // Get all weeks for all modules
  const allWeeks = [];
  for (const module of modules) {
    const weeks = await db.getWeeksByModuleId(module.id);
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
    // First sort by moduleId, then by weekNumber
    if (a.moduleId !== b.moduleId) {
      return a.moduleId - b.moduleId;
    }
    return a.weekNumber - b.weekNumber;
  });
}
