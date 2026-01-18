import { drizzle } from 'drizzle-orm/mysql2';
import { weeks } from './drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

async function fixCycle1Items() {
  console.log('Adding topics and exercises to Cycle 1...');
  
  const cycleId = 1;
  const items = [];
  
  // 12 tópicos teóricos (weekNumber 1-12)
  for (let i = 1; i <= 12; i++) {
    const weekGroup = i <= 5 ? 1 : i <= 10 ? 2 : i <= 14 ? 3 : 4;
    items.push({
      cycleId,
      title: `Tópico ${i}: Fundação Mental`,
      description: `Conteúdo teórico do tópico ${i} sobre fundação mental e auto-hipnose.`,
      weekNumber: i,
      weekGroup,
      type: 'topic',
      isPublished: true,
    });
  }
  
  // 6 exercícios práticos (weekNumber 13-18)
  for (let i = 13; i <= 18; i++) {
    const weekGroup = i <= 14 ? 3 : 4;
    items.push({
      cycleId,
      title: `Exercício ${i - 12}: Prática de Auto-Hipnose`,
      description: `Exercício prático ${i - 12} para aplicar as técnicas aprendidas.`,
      weekNumber: i,
      weekGroup,
      type: 'exercise',
      isPublished: true,
    });
  }
  
  // Inserir todos os itens
  for (const item of items) {
    await db.insert(weeks).values(item);
    console.log(`✓ Added: ${item.title}`);
  }
  
  console.log(`\n✅ Successfully added ${items.length} items to Cycle 1!`);
  process.exit(0);
}

fixCycle1Items().catch((error) => {
  console.error('Error fixing Cycle 1:', error);
  process.exit(1);
});
