import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { modules, weeks, contents, exercises } from "./drizzle/schema.ts";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

console.log("🌱 Seeding database...");

// Insert modules
const modulesData = [
  {
    title: "Módulo 1: Fundamentos do Treino Mental",
    description: "Introdução aos conceitos básicos de treino mental, hipnose desportiva e preparação psicológica para triathlon.",
    order: 1,
    thumbnailUrl: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=2074",
    isPublished: true
  },
  {
    title: "Módulo 2: Foco Mental na Natação",
    description: "Técnicas específicas para melhorar o foco e a concentração durante a natação.",
    order: 2,
    thumbnailUrl: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=2070",
    isPublished: true
  },
  {
    title: "Módulo 3: Resiliência no Ciclismo",
    description: "Desenvolver resiliência mental para enfrentar os desafios do ciclismo de longa distância.",
    order: 3,
    thumbnailUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2070",
    isPublished: true
  },
  {
    title: "Módulo 4: Corrida & Controlo Emocional",
    description: "Gestão emocional e técnicas de controlo mental durante a corrida.",
    order: 4,
    thumbnailUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070",
    isPublished: true
  }
];

for (const module of modulesData) {
  await db.insert(modules).values(module);
  console.log(`✅ Created module: ${module.title}`);
}

// Insert weeks for Module 1
const weeksData = [
  {
    moduleId: 1,
    title: "Introdução ao Treino Mental",
    description: "Compreender os fundamentos do treino mental e sua importância no desempenho atlético.",
    weekNumber: 1,
    isPublished: true
  },
  {
    moduleId: 1,
    title: "Técnicas de Respiração e Relaxamento",
    description: "Aprender técnicas práticas de respiração e relaxamento para controlo de ansiedade.",
    weekNumber: 2,
    isPublished: true
  }
];

for (const week of weeksData) {
  await db.insert(weeks).values(week);
  console.log(`✅ Created week: ${week.title}`);
}

// Insert contents for Week 1
const contentsData = [
  {
    weekId: 1,
    title: "Vídeo: O que é o Treino Mental?",
    description: "Uma introdução completa ao conceito de treino mental para atletas de endurance.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: 900,
    order: 1,
    thumbnailUrl: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=400",
    isPublished: true
  },
  {
    weekId: 1,
    title: "Áudio: Sessão de Hipnose - Foco e Concentração",
    description: "Sessão guiada de hipnose para desenvolver foco e concentração.",
    type: "audio",
    url: "https://example.com/audio/session1.mp3",
    duration: 1200,
    order: 2,
    isPublished: true
  },
  {
    weekId: 1,
    title: "PDF: Guia de Treino Mental",
    description: "Material de apoio com exercícios práticos e teoria.",
    type: "pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    order: 3,
    isPublished: true
  }
];

for (const content of contentsData) {
  await db.insert(contents).values(content);
  console.log(`✅ Created content: ${content.title}`);
}

// Insert exercises for Week 1
const exercisesData = [
  {
    weekId: 1,
    title: "Exercício 1: Diário de Treino Mental",
    description: "Reflita sobre a sua experiência com treino mental e identifique áreas de melhoria.",
    instructions: "Durante esta semana, mantenha um diário onde regista:\n\n1. Momentos de maior foco durante os treinos\n2. Situações onde sentiu ansiedade ou stress\n3. Técnicas que experimentou e os seus resultados\n\nSubmeta um resumo das suas observações (mínimo 200 palavras).",
    order: 1,
    isPublished: true
  }
];

for (const exercise of exercisesData) {
  await db.insert(exercises).values(exercise);
  console.log(`✅ Created exercise: ${exercise.title}`);
}

console.log("\n🎉 Database seeded successfully!");
await connection.end();
