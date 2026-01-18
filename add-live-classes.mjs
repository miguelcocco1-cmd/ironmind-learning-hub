import { drizzle } from 'drizzle-orm/mysql2';
import { weeks } from './drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

async function addLiveClasses() {
  console.log('Adding live classes to all weeks...');
  
  // 6 ciclos × 4 semanas = 24 aulas ao vivo
  const liveClasses = [];
  let liveNumber = 1;
  
  for (let cycleId = 1; cycleId <= 6; cycleId++) {
    for (let weekGroup = 1; weekGroup <= 4; weekGroup++) {
      liveClasses.push({
        cycleId,
        title: `Aula ${liveNumber} IRON MIND Training Lab`,
        description: `Sessão ao vivo do Ciclo ${cycleId}, Semana ${weekGroup}. Acompanhe em direto para tirar dúvidas e aprofundar os conceitos.`,
        weekNumber: 0, // Número especial para aulas ao vivo (sempre primeiro)
        weekGroup,
        type: 'live',
        isPublished: true,
      });
      liveNumber++;
    }
  }
  
  // Inserir todas as aulas ao vivo
  for (const liveClass of liveClasses) {
    await db.insert(weeks).values(liveClass);
    console.log(`✓ Added: ${liveClass.title}`);
  }
  
  console.log(`\n✅ Successfully added ${liveClasses.length} live classes!`);
  process.exit(0);
}

addLiveClasses().catch((error) => {
  console.error('Error adding live classes:', error);
  process.exit(1);
});
