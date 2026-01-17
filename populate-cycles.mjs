import { drizzle } from "drizzle-orm/mysql2";
import { cycles, weeks, contents } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

// Limpar dados existentes
console.log("Limpando dados existentes...");
await db.delete(contents);
await db.delete(weeks);
await db.delete(cycles);

// Dados dos 6 ciclos
const cyclesData = [
  {
    title: "CICLO 1 - BASE: Fundação Mental",
    description: "Construir fundação mental sólida e aprender ferramentas básicas de auto-hipnose",
    order: 1,
    color: "blue",
    isPublished: true,
  },
  {
    title: "CICLO 2 - PERFORMANCE: Foco Intenso",
    description: "Desenvolver foco intenso e concentração sob esforço físico",
    order: 2,
    color: "green",
    isPublished: true,
  },
  {
    title: "CICLO 3 - CONTROLO EMOCIONAL: Gestão de Ansiedade",
    description: "Dominar gestão de ansiedade, pressão e regulação emocional",
    order: 3,
    color: "orange",
    isPublished: true,
  },
  {
    title: "CICLO 4 - HYPNOSIS TRAINING: Força Mental Máxima",
    description: "Desenvolver resiliência profunda através de hipnose avançada",
    order: 4,
    color: "red",
    isPublished: true,
  },
  {
    title: "CICLO 5 - PRE-EVENT: Preparação para Prova",
    description: "Visualização estratégica e preparação mental específica para a prova",
    order: 5,
    color: "white",
    isPublished: true,
  },
  {
    title: "CICLO 6 - RACE WEEK + RECOVERY: Execução e Recuperação",
    description: "Execução mental no dia da prova e recuperação pós-prova",
    order: 6,
    color: "cyan",
    isPublished: true,
  },
];

console.log("Inserindo ciclos...");
for (const cycleData of cyclesData) {
  const [result] = await db.insert(cycles).values(cycleData);
  const cycleId = result.insertId;
  console.log(`✓ Ciclo ${cycleData.order} criado (ID: ${cycleId})`);

  // Criar 18 itens por ciclo (12 tópicos + 6 exercícios)
  const topics = [
    "Identidade Mental IronMind",
    "Introdução à Auto-Hipnose",
    "Técnicas de Respiração",
    "Relaxamento Progressivo",
    "Conexão Mente-Corpo",
    "Âncoras Mentais Básicas",
    "Mantras e Afirmações",
    "Psicologia Positiva",
    "Estado de Transe Leve",
    "Redução de Ruído Mental",
    "Rotina Reset Pré-Treino",
    "Diário de Treino Mental",
  ];

  const exercises = [
    { title: "Âncora de Calma Profunda", area: "Hipnose e Auto-Hipnose" },
    { title: "5 Sentidos no Presente", area: "Foco e Concentração" },
    { title: "Respiração 4-7-8", area: "Gestão Emocional" },
    { title: "Auto-Hipnose Básica", area: "Resiliência Mental" },
    { title: "Body Scan", area: "Recuperação Mental" },
    { title: "Treino Perfeito", area: "Visualização e Preparação" },
  ];

  // Inserir tópicos
  for (let i = 0; i < topics.length; i++) {
    const [weekResult] = await db.insert(weeks).values({
      cycleId,
      title: topics[i],
      description: `Tópico teórico sobre ${topics[i].toLowerCase()}`,
      weekNumber: i + 1,
      type: "topic",
      isPublished: true,
    });
    
    const weekId = weekResult.insertId;

    // Adicionar conteúdos (vídeo, áudio, PDF)
    await db.insert(contents).values([
      {
        weekId,
        title: `Vídeo: ${topics[i]}`,
        description: `Aula em vídeo sobre ${topics[i].toLowerCase()}`,
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 900,
        order: 1,
        isPublished: true,
      },
      {
        weekId,
        title: `Áudio: ${topics[i]}`,
        description: `Sessão de áudio sobre ${topics[i].toLowerCase()}`,
        type: "audio",
        url: "https://example.com/audio.mp3",
        duration: 600,
        order: 2,
        isPublished: true,
      },
      {
        weekId,
        title: `PDF: Guia de ${topics[i]}`,
        description: `Material de apoio em PDF`,
        type: "pdf",
        url: "https://example.com/guide.pdf",
        order: 3,
        isPublished: true,
      },
    ]);
  }

  // Inserir exercícios
  for (let i = 0; i < exercises.length; i++) {
    const [weekResult] = await db.insert(weeks).values({
      cycleId,
      title: exercises[i].title,
      description: `Exercício prático da área: ${exercises[i].area}`,
      weekNumber: topics.length + i + 1,
      type: "exercise",
      isPublished: true,
    });

    const weekId = weekResult.insertId;

    // Adicionar conteúdos do exercício
    await db.insert(contents).values([
      {
        weekId,
        title: `Vídeo: Como fazer ${exercises[i].title}`,
        description: `Demonstração em vídeo do exercício`,
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 600,
        order: 1,
        isPublished: true,
      },
      {
        weekId,
        title: `Áudio Guiado: ${exercises[i].title}`,
        description: `Sessão de áudio guiada para praticar`,
        type: "audio",
        url: "https://example.com/exercise-audio.mp3",
        duration: 1200,
        order: 2,
        isPublished: true,
      },
      {
        weekId,
        title: `PDF: Instruções ${exercises[i].title}`,
        description: `Instruções detalhadas do exercício`,
        type: "pdf",
        url: "https://example.com/exercise-guide.pdf",
        order: 3,
        isPublished: true,
      },
    ]);
  }

  console.log(`  ✓ 18 itens criados para Ciclo ${cycleData.order}`);
}

console.log("\n✅ Base de dados populada com sucesso!");
console.log("Total: 6 ciclos, 108 itens (72 tópicos + 36 exercícios)");
