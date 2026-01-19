const fs = require('fs');
const path = require('path');

// Ler o ficheiro da base de dados
const dbPath = path.join(__dirname, 'data.db');

// Usar o módulo child_process para executar comandos sqlite3
const { execSync } = require('child_process');

const texts = {
  "PDF: Apresentação": `<div class="prose prose-lg max-w-none">
<h1 class="text-4xl font-bold mb-6 text-primary">Bem-vindo ao IRON MIND Training Lab</h1>
<p class="text-lg leading-relaxed mb-6">Parabéns por dares este passo crucial na tua jornada como triatleta! O <strong>IRON MIND Training Lab</strong> é um programa de treino mental desenvolvido especificamente para atletas de endurance como tu, que procuram ir além dos limites físicos e desbloquear o verdadeiro potencial da mente.</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Porquê Treino Mental?</h2>
<p class="leading-relaxed mb-4">Já percebeste que o triatlo não é apenas uma questão de quilómetros percorridos ou watts produzidos. Nos momentos mais difíceis da prova — quando as pernas pesam, a respiração acelera e a mente começa a questionar — é a tua força mental que faz a diferença entre desistir e continuar.</p>
<div class="bg-primary/10 border-l-4 border-primary p-6 my-6 rounded-r-lg">
<p class="text-lg font-semibold mb-2">"O corpo consegue muito mais do que a mente acredita ser possível."</p>
<p class="text-sm text-muted-foreground">— Provérbio do Endurance</p>
</div>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">O Que Te Espera?</h2>
<p class="leading-relaxed mb-4">Este programa foi desenhado ao longo de <strong>6 meses progressivos</strong>, com conteúdos semanais que te vão acompanhar na construção de uma mentalidade de ferro. Vais aprender:</p>
<ul class="list-disc list-inside space-y-2 mb-6 ml-4">
<li><strong>Técnicas de foco</strong> para manteres a concentração durante horas de treino e prova</li>
<li><strong>Gestão de pressão</strong> para transformares nervosismo em energia positiva</li>
<li><strong>Resiliência mental</strong> para ultrapassares os momentos mais difíceis</li>
<li><strong>Recuperação psicológica</strong> para evitares burnout e manteres a motivação</li>
<li><strong>Visualização e hipnose</strong> para reprogramares a tua mente para o sucesso</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Estás Pronto?</h2>
<p class="leading-relaxed mb-6">Este é o início de uma jornada transformadora. Vais descobrir que a tua mente é muito mais forte do que imaginavas. Vais aprender a controlar pensamentos negativos, a manter o foco sob pressão e a recuperar mais rapidamente de desafios.</p>
<p class="text-lg font-semibold text-primary mb-4">Bem-vindo à família IRON MIND. Vamos construir juntos uma mentalidade de campeão! 🏆</p>
</div>`,

  "PDF: Como Funciona": `<div class="prose prose-lg max-w-none">
<h1 class="text-4xl font-bold mb-6 text-primary">Como Funciona o Programa IRON MIND</h1>
<p class="text-lg leading-relaxed mb-6">O programa IRON MIND está estruturado de forma progressiva e científica, combinando teoria, prática e acompanhamento para garantir que desenvolves uma mentalidade de elite ao longo de 6 meses.</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📅 Estrutura do Programa</h2>
<p class="mb-4">Cada ciclo tem uma duração de 1 mês e foca-se numa área específica do treino mental. Vais passar por 6 ciclos progressivos ao longo de 6 meses.</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📚 Estrutura Semanal</h2>
<p class="mb-4">Cada ciclo está dividido em <strong>4 semanas</strong>, e cada semana contém vídeo teórico, áudio prático, PDF de apoio e quiz de consolidação.</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🧠 Sessões de Hipnose</h2>
<p class="leading-relaxed mb-4">No início de cada ciclo, tens acesso a uma <strong>sessão de hipnose exclusiva</strong> (20-30 minutos) focada no tema do mês.</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">⏰ Quanto Tempo Precisas?</h2>
<p class="leading-relaxed">Investimento semanal recomendado: 35-50 minutos por semana. É melhor fazeres 80% dos conteúdos de forma consistente do que tentares fazer tudo perfeitamente e desistires a meio.</p>
</div>`,

  "PDF: O Que Tens Acesso": `<div class="prose prose-lg max-w-none">
<h1 class="text-4xl font-bold mb-6 text-primary">O Que Tens Acesso no IRON MIND</h1>
<p class="text-lg leading-relaxed mb-6">Ao inscreveres-te no IRON MIND Training Lab, ganhas acesso a um ecossistema completo de ferramentas e recursos desenhados para transformar a tua mentalidade de atleta.</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📚 Biblioteca de Conteúdos</h2>
<p class="mb-4">Tens acesso a 24 vídeos teóricos, 24 áudios de treino, 6 sessões de hipnose, 24 PDFs de apoio e 24 quizzes interativos.</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Ferramentas da Plataforma</h2>
<p class="mb-4">Dashboard unificado, sistema de badges, acompanhamento de progresso e desbloqueio progressivo de conteúdos.</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">👥 Comunidade e Suporte</h2>
<p class="mb-4">Junta-te a uma comunidade de triatletas que estão na mesma jornada que tu através do grupo Telegram exclusivo.</p>
<p class="text-lg font-semibold text-primary">Tens acesso vitalício a todos estes recursos. O investimento que fazes hoje acompanha-te para sempre na tua carreira de atleta. 🚀</p>
</div>`,

  "PDF: Primeiros Passos": `<div class="prose prose-lg max-w-none">
<h1 class="text-4xl font-bold mb-6 text-primary">Primeiros Passos no IRON MIND</h1>
<p class="text-lg leading-relaxed mb-6">Bem-vindo à plataforma! Este guia vai ajudar-te a começar da melhor forma possível e a tirar o máximo proveito do programa IRON MIND Training Lab.</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">✅ Checklist de Início</h2>
<p class="mb-4">1️⃣ Explora a Plataforma<br>2️⃣ Conecta Strava ou Garmin (Opcional)<br>3️⃣ Junta-te ao Grupo Telegram<br>4️⃣ Começa o Ciclo 1 - Semana 1</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📅 Como Organizar a Tua Semana</h2>
<p class="mb-4">Para tirares o máximo proveito do programa, recomendamos que dediques 35-50 minutos por semana distribuídos entre vídeo, áudio, PDF e quiz.</p>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🚀 Pronto para Começar?</h2>
<p class="leading-relaxed mb-4">Deste o primeiro passo ao inscreveres-te. Agora é hora de dar o segundo: começar o Ciclo 1. Não esperes pelo "momento perfeito" — ele é agora.</p>
<p class="text-lg font-semibold text-primary">Vemo-nos no Ciclo 1, Semana 1! 🚀</p>
</div>`
};

// Guardar cada texto num ficheiro temporário e usar sqlite3 para atualizar
Object.entries(texts).forEach(([title, html], index) => {
  const tempFile = `/tmp/text_${index}.txt`;
  fs.writeFileSync(tempFile, html);
  
  try {
    const command = `sqlite3 "${dbPath}" "UPDATE contents SET url = readfile('${tempFile}'), type = 'text' WHERE title = '${title.replace(/'/g, "''")}';"`;
    execSync(command, { encoding: 'utf-8' });
    console.log(`✅ Atualizado: ${title}`);
  } catch (error) {
    console.error(`❌ Erro ao atualizar ${title}:`, error.message);
  }
  
  // Limpar ficheiro temporário
  fs.unlinkSync(tempFile);
});

console.log('\n✅ Todos os textos foram atualizados com sucesso!');
