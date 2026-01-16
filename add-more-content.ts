import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { modules, weeks, contents, exercises } from "./drizzle/schema";
import dotenv from "dotenv";

dotenv.config();

async function addContent() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  console.log("🌱 Adding more content...");

  // Add more weeks to Module 1
  const moreWeeks = [
    {
      moduleId: 1,
      title: "Visualização e Preparação Mental",
      description: "Técnicas de visualização para melhorar o desempenho em competição.",
      weekNumber: 3,
      isPublished: true
    },
    {
      moduleId: 1,
      title: "Gestão de Ansiedade Pré-Competição",
      description: "Estratégias para controlar a ansiedade antes das provas.",
      weekNumber: 4,
      isPublished: true
    }
  ];

  for (const week of moreWeeks) {
    await db.insert(weeks).values(week);
    console.log(`✅ Created week: ${week.title}`);
  }

  // Add weeks to Module 2
  const module2Weeks = [
    {
      moduleId: 2,
      title: "Técnicas de Foco na Água",
      description: "Desenvolver concentração durante a natação.",
      weekNumber: 1,
      isPublished: true
    },
    {
      moduleId: 2,
      title: "Respiração e Ritmo",
      description: "Sincronizar respiração com o ritmo de nado.",
      weekNumber: 2,
      isPublished: true
    }
  ];

  for (const week of module2Weeks) {
    await db.insert(weeks).values(week);
    console.log(`✅ Created week: ${week.title}`);
  }

  // Add contents for Week 2
  const week2Contents = [
    {
      weekId: 2,
      title: "Vídeo: Técnicas de Respiração Diafragmática",
      description: "Aprenda a respirar corretamente para reduzir a ansiedade.",
      type: "video" as const,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: 720,
      order: 1,
      thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400",
      isPublished: true
    },
    {
      weekId: 2,
      title: "Áudio: Sessão de Relaxamento Profundo",
      description: "Sessão guiada para relaxamento completo do corpo e mente.",
      type: "audio" as const,
      url: "https://example.com/audio/relaxation.mp3",
      duration: 1500,
      order: 2,
      isPublished: true
    },
    {
      weekId: 2,
      title: "PDF: Exercícios de Respiração",
      description: "Guia prático com exercícios de respiração para o dia-a-dia.",
      type: "pdf" as const,
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      order: 3,
      isPublished: true
    }
  ];

  for (const content of week2Contents) {
    await db.insert(contents).values(content);
    console.log(`✅ Created content: ${content.title}`);
  }

  // Add contents for Week 3
  const week3Contents = [
    {
      weekId: 3,
      title: "Vídeo: Visualização para Performance",
      description: "Como usar a visualização para melhorar o desempenho atlético.",
      type: "video" as const,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: 840,
      order: 1,
      thumbnailUrl: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=400",
      isPublished: true
    },
    {
      weekId: 3,
      title: "Áudio: Visualização Guiada - Prova Perfeita",
      description: "Sessão de visualização da sua prova ideal.",
      type: "audio" as const,
      url: "https://example.com/audio/visualization.mp3",
      duration: 1800,
      order: 2,
      isPublished: true
    }
  ];

  for (const content of week3Contents) {
    await db.insert(contents).values(content);
    console.log(`✅ Created content: ${content.title}`);
  }

  // Add exercises for Week 2
  await db.insert(exercises).values({
    weekId: 2,
    title: "Exercício 2: Prática de Respiração Diária",
    description: "Pratique as técnicas de respiração aprendidas durante uma semana.",
    instructions: "Durante os próximos 7 dias:\n\n1. Pratique 10 minutos de respiração diafragmática pela manhã\n2. Use a técnica de respiração 4-7-8 antes de dormir\n3. Registe como se sentiu antes e depois de cada sessão\n\nSubmeta um resumo da sua experiência.",
    order: 1,
    isPublished: true
  });
  console.log("✅ Created exercise for Week 2");

  console.log("\n🎉 Additional content added successfully!");
  await connection.end();
}

addContent().catch(console.error);
