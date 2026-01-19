import Database from "better-sqlite3";

const db = new Database("./data.db");

const INTRO_TEXTS = {
  "PDF: Apresentação": `
    <div class="prose prose-lg max-w-none">
      <h1 class="text-4xl font-bold mb-6 text-primary">Bem-vindo ao IRON MIND Training Lab</h1>
      
      <p class="text-lg leading-relaxed mb-6">
        Parabéns por dares este passo crucial na tua jornada como triatleta! O <strong>IRON MIND Training Lab</strong> 
        é um programa de treino mental desenvolvido especificamente para atletas de endurance como tu, que procuram 
        ir além dos limites físicos e desbloquear o verdadeiro potencial da mente.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Porquê Treino Mental?</h2>
      
      <p class="leading-relaxed mb-4">
        Já percebeste que o triatlo não é apenas uma questão de quilómetros percorridos ou watts produzidos. 
        Nos momentos mais difíceis da prova — quando as pernas pesam, a respiração acelera e a mente começa 
        a questionar — é a tua força mental que faz a diferença entre desistir e continuar.
      </p>

      <div class="bg-primary/10 border-l-4 border-primary p-6 my-6 rounded-r-lg">
        <p class="text-lg font-semibold mb-2">
          "O corpo consegue muito mais do que a mente acredita ser possível."
        </p>
        <p class="text-sm text-muted-foreground">— Provérbio do Endurance</p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">O Que Te Espera?</h2>
      
      <p class="leading-relaxed mb-4">
        Este programa foi desenhado ao longo de <strong>6 meses progressivos</strong>, com conteúdos semanais 
        que te vão acompanhar na construção de uma mentalidade de ferro. Vais aprender:
      </p>

      <ul class="list-disc list-inside space-y-2 mb-6 ml-4">
        <li><strong>Técnicas de foco</strong> para manteres a concentração durante horas de treino e prova</li>
        <li><strong>Gestão de pressão</strong> para transformares nervosismo em energia positiva</li>
        <li><strong>Resiliência mental</strong> para ultrapassares os momentos mais difíceis</li>
        <li><strong>Recuperação psicológica</strong> para evitares burnout e manteres a motivação</li>
        <li><strong>Visualização e hipnose</strong> para reprogramares a tua mente para o sucesso</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Como Funciona a Plataforma?</h2>
      
      <p class="leading-relaxed mb-4">
        A plataforma IRON MIND é o teu centro de comando mental. Aqui vais encontrar:
      </p>

      <div class="grid md:grid-cols-2 gap-4 my-6">
        <div class="bg-card border rounded-lg p-4">
          <h3 class="font-semibold mb-2 text-primary">📹 Vídeos Semanais</h3>
          <p class="text-sm text-muted-foreground">
            Aulas práticas e teóricas sobre técnicas mentais específicas
          </p>
        </div>
        <div class="bg-card border rounded-lg p-4">
          <h3 class="font-semibold mb-2 text-primary">🎧 Áudios de Treino</h3>
          <p class="text-sm text-muted-foreground">
            Sessões guiadas para praticares durante os treinos físicos
          </p>
        </div>
        <div class="bg-card border rounded-lg p-4">
          <h3 class="font-semibold mb-2 text-primary">📄 Material de Apoio</h3>
          <p class="text-sm text-muted-foreground">
            PDFs com exercícios, reflexões e ferramentas práticas
          </p>
        </div>
        <div class="bg-card border rounded-lg p-4">
          <h3 class="font-semibold mb-2 text-primary">✅ Quizzes</h3>
          <p class="text-sm text-muted-foreground">
            Testa os teus conhecimentos e consolida a aprendizagem
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Compromisso e Consistência</h2>
      
      <p class="leading-relaxed mb-4">
        Tal como no treino físico, os resultados no treino mental vêm da <strong>consistência</strong>. 
        Não precisas de horas por dia — apenas 15-20 minutos de dedicação semanal são suficientes para 
        começares a ver mudanças significativas na tua performance e bem-estar.
      </p>

      <div class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 my-6">
        <h3 class="font-bold text-lg mb-2 text-green-800 dark:text-green-200">💪 O Teu Desafio</h3>
        <p class="text-green-700 dark:text-green-300">
          Compromete-te a completar pelo menos <strong>80% dos conteúdos semanais</strong> durante os próximos 
          6 meses. Verás transformações não só nas provas, mas também na tua vida quotidiana.
        </p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Estás Pronto?</h2>
      
      <p class="leading-relaxed mb-6">
        Este é o início de uma jornada transformadora. Vais descobrir que a tua mente é muito mais forte 
        do que imaginavas. Vais aprender a controlar pensamentos negativos, a manter o foco sob pressão 
        e a recuperar mais rapidamente de desafios.
      </p>

      <p class="text-lg font-semibold text-primary mb-4">
        Bem-vindo à família IRON MIND. Vamos construir juntos uma mentalidade de campeão! 🏆
      </p>
    </div>
  `,

  "PDF: Como Funciona": `
    <div class="prose prose-lg max-w-none">
      <h1 class="text-4xl font-bold mb-6 text-primary">Como Funciona o Programa IRON MIND</h1>
      
      <p class="text-lg leading-relaxed mb-6">
        O programa IRON MIND está estruturado de forma progressiva e científica, combinando teoria, 
        prática e acompanhamento para garantir que desenvolves uma mentalidade de elite ao longo de 6 meses.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📅 Estrutura do Programa</h2>
      
      <div class="bg-card border rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-4 text-primary">6 Ciclos Progressivos (6 Meses)</h3>
        <p class="mb-4">Cada ciclo tem uma duração de 1 mês e foca-se numa área específica do treino mental:</p>
        
        <div class="space-y-4">
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-semibold">Ciclo 1: Fundação Mental</h4>
            <p class="text-sm text-muted-foreground">Bases da psicologia desportiva e autoconsciência</p>
          </div>
          <div class="border-l-4 border-purple-500 pl-4">
            <h4 class="font-semibold">Ciclo 2: Foco e Concentração</h4>
            <p class="text-sm text-muted-foreground">Técnicas para manter atenção durante horas</p>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold">Ciclo 3: Gestão de Pressão</h4>
            <p class="text-sm text-muted-foreground">Controlo de ansiedade e nervosismo pré-prova</p>
          </div>
          <div class="border-l-4 border-orange-500 pl-4">
            <h4 class="font-semibold">Ciclo 4: Força Mental</h4>
            <p class="text-sm text-muted-foreground">Resiliência e superação de limites</p>
          </div>
          <div class="border-l-4 border-red-500 pl-4">
            <h4 class="font-semibold">Ciclo 5: Recuperação Psicológica</h4>
            <p class="text-sm text-muted-foreground">Gestão de burnout e manutenção de motivação</p>
          </div>
          <div class="border-l-4 border-yellow-500 pl-4">
            <h4 class="font-semibold">Ciclo 6: Integração e Performance</h4>
            <p class="text-sm text-muted-foreground">Consolidação e aplicação em competição</p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📚 Estrutura Semanal</h2>
      
      <p class="mb-4">Cada ciclo está dividido em <strong>4 semanas</strong>, e cada semana contém:</p>

      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <div class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2 flex items-center gap-2">
            <span class="text-2xl">📹</span>
            <span>Vídeo Teórico (10-15 min)</span>
          </h3>
          <p class="text-sm text-muted-foreground">
            Explicação dos conceitos e técnicas da semana
          </p>
        </div>

        <div class="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2 flex items-center gap-2">
            <span class="text-2xl">🎧</span>
            <span>Áudio Prático (15-20 min)</span>
          </h3>
          <p class="text-sm text-muted-foreground">
            Sessão guiada para praticares durante treinos
          </p>
        </div>

        <div class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2 flex items-center gap-2">
            <span class="text-2xl">📄</span>
            <span>PDF de Apoio</span>
          </h3>
          <p class="text-sm text-muted-foreground">
            Material escrito com exercícios e reflexões
          </p>
        </div>

        <div class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2 flex items-center gap-2">
            <span class="text-2xl">✅</span>
            <span>Quiz de Consolidação</span>
          </h3>
          <p class="text-sm text-muted-foreground">
            Testa os teus conhecimentos e fixa a aprendizagem
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🧠 Sessões de Hipnose</h2>
      
      <p class="leading-relaxed mb-4">
        No início de cada ciclo, tens acesso a uma <strong>sessão de hipnose exclusiva</strong> 
        (20-30 minutos) focada no tema do mês. Estas sessões ajudam a:
      </p>

      <ul class="list-disc list-inside space-y-2 mb-6 ml-4">
        <li>Reprogramar crenças limitantes</li>
        <li>Instalar novos padrões mentais positivos</li>
        <li>Acelerar a integração das técnicas aprendidas</li>
        <li>Melhorar a recuperação e o sono</li>
      </ul>

      <div class="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-6 my-6">
        <p class="font-semibold mb-2">💡 Dica de Utilização</p>
        <p class="text-sm">
          Ouve as sessões de hipnose antes de dormir ou em momentos de descanso. 
          Nunca durante a condução ou atividades que exijam atenção total.
        </p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Sistema de Progresso</h2>
      
      <p class="leading-relaxed mb-4">
        A plataforma acompanha automaticamente o teu progresso e atribui <strong>badges</strong> 
        por conquistas específicas:
      </p>

      <div class="grid md:grid-cols-2 gap-3 mb-6">
        <div class="flex items-center gap-3 bg-card border rounded-lg p-3">
          <span class="text-2xl">🏅</span>
          <div>
            <p class="font-semibold text-sm">Primeira Semana</p>
            <p class="text-xs text-muted-foreground">Completa a primeira semana</p>
          </div>
        </div>
        <div class="flex items-center gap-3 bg-card border rounded-lg p-3">
          <span class="text-2xl">🔥</span>
          <div>
            <p class="font-semibold text-sm">Streak 7 Dias</p>
            <p class="text-xs text-muted-foreground">7 dias consecutivos</p>
          </div>
        </div>
        <div class="flex items-center gap-3 bg-card border rounded-lg p-3">
          <span class="text-2xl">🎓</span>
          <div>
            <p class="font-semibold text-sm">Ciclo Completo</p>
            <p class="text-xs text-muted-foreground">Termina um ciclo inteiro</p>
          </div>
        </div>
        <div class="flex items-center gap-3 bg-card border rounded-lg p-3">
          <span class="text-2xl">🏆</span>
          <div>
            <p class="font-semibold text-sm">Mestre Mental</p>
            <p class="text-xs text-muted-foreground">Completa todos os 6 ciclos</p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">⏰ Quanto Tempo Precisas?</h2>
      
      <div class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
        <p class="font-semibold mb-3">Investimento Semanal Recomendado:</p>
        <ul class="space-y-2 text-sm">
          <li>📹 <strong>10-15 min</strong> — Vídeo teórico</li>
          <li>🎧 <strong>15-20 min</strong> — Áudio durante treino</li>
          <li>📄 <strong>5-10 min</strong> — Leitura do PDF</li>
          <li>✅ <strong>5 min</strong> — Quiz</li>
        </ul>
        <p class="mt-4 font-bold text-primary">Total: 35-50 minutos por semana</p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🚀 Como Começar?</h2>
      
      <ol class="list-decimal list-inside space-y-3 mb-6 ml-4">
        <li class="leading-relaxed">
          <strong>Explora a Introdução</strong> — Familiariza-te com a plataforma e os recursos disponíveis
        </li>
        <li class="leading-relaxed">
          <strong>Conecta o Strava/Garmin</strong> — Sincroniza os teus treinos físicos (opcional mas recomendado)
        </li>
        <li class="leading-relaxed">
          <strong>Junta-te ao Grupo Telegram</strong> — Partilha experiências com outros atletas
        </li>
        <li class="leading-relaxed">
          <strong>Começa o Ciclo 1</strong> — Inicia a tua jornada de treino mental
        </li>
      </ol>

      <div class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-8">
        <p class="font-bold text-lg mb-2 text-green-800 dark:text-green-200">
          ✨ Lembra-te: Consistência > Perfeição
        </p>
        <p class="text-green-700 dark:text-green-300">
          É melhor fazeres 80% dos conteúdos de forma consistente do que tentares fazer tudo 
          perfeitamente e desistires a meio. Progresso gradual é progresso real.
        </p>
      </div>
    </div>
  `,

  "PDF: O Que Tens Acesso": `
    <div class="prose prose-lg max-w-none">
      <h1 class="text-4xl font-bold mb-6 text-primary">O Que Tens Acesso no IRON MIND</h1>
      
      <p class="text-lg leading-relaxed mb-6">
        Ao inscreveres-te no IRON MIND Training Lab, ganhas acesso a um ecossistema completo 
        de ferramentas e recursos desenhados para transformar a tua mentalidade de atleta.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📚 Biblioteca de Conteúdos</h2>
      
      <div class="space-y-4 mb-8">
        <div class="bg-card border rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
            <span class="text-3xl">📹</span>
            <span>24 Vídeos Teóricos</span>
          </h3>
          <p class="text-muted-foreground mb-3">
            Aulas em vídeo que explicam os conceitos fundamentais do treino mental, 
            técnicas específicas e estratégias de aplicação prática.
          </p>
          <ul class="list-disc list-inside text-sm space-y-1 ml-4">
            <li>Duração: 10-15 minutos cada</li>
            <li>Formato: HD, otimizado para mobile</li>
            <li>Disponível offline após download</li>
            <li>Legendas em português</li>
          </ul>
        </div>

        <div class="bg-card border rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
            <span class="text-3xl">🎧</span>
            <span>24 Áudios de Treino</span>
          </h3>
          <p class="text-muted-foreground mb-3">
            Sessões guiadas para ouvires durante os teus treinos físicos, aplicando 
            as técnicas mentais em tempo real.
          </p>
          <ul class="list-disc list-inside text-sm space-y-1 ml-4">
            <li>Duração: 15-20 minutos cada</li>
            <li>Formato: MP3 alta qualidade</li>
            <li>Compatível com qualquer dispositivo</li>
            <li>Perfeito para corrida, ciclismo e natação</li>
          </ul>
        </div>

        <div class="bg-card border rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
            <span class="text-3xl">🧠</span>
            <span>6 Sessões de Hipnose</span>
          </h3>
          <p class="text-muted-foreground mb-3">
            Sessões exclusivas de hipnose desportiva para reprogramação mental profunda, 
            uma por cada ciclo do programa.
          </p>
          <ul class="list-disc list-inside text-sm space-y-1 ml-4">
            <li>Duração: 20-30 minutos cada</li>
            <li>Gravações profissionais com música ambiente</li>
            <li>Focadas em objetivos específicos</li>
            <li>Ideais para antes de dormir</li>
          </ul>
        </div>

        <div class="bg-card border rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
            <span class="text-3xl">📄</span>
            <span>24 PDFs de Apoio</span>
          </h3>
          <p class="text-muted-foreground mb-3">
            Material escrito com exercícios práticos, reflexões guiadas e ferramentas 
            para aplicares no teu dia a dia.
          </p>
          <ul class="list-disc list-inside text-sm space-y-1 ml-4">
            <li>Formato: PDF otimizado para impressão</li>
            <li>Inclui exercícios práticos</li>
            <li>Diários de treino mental</li>
            <li>Checklists e ferramentas</li>
          </ul>
        </div>

        <div class="bg-card border rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
            <span class="text-3xl">✅</span>
            <span>24 Quizzes Interativos</span>
          </h3>
          <p class="text-muted-foreground mb-3">
            Testes de conhecimento para consolidares a aprendizagem e garantires 
            que estás a absorver os conceitos corretamente.
          </p>
          <ul class="list-disc list-inside text-sm space-y-1 ml-4">
            <li>5 perguntas por quiz</li>
            <li>Feedback imediato</li>
            <li>Podes repetir quantas vezes quiseres</li>
            <li>Acompanha o teu progresso</li>
          </ul>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Ferramentas da Plataforma</h2>
      
      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2">📊 Dashboard Unificado</h3>
          <p class="text-sm text-muted-foreground">
            Visualiza o teu progresso mental e físico num só lugar. Integração com Strava/Garmin 
            para correlacionares treino físico com mental.
          </p>
        </div>

        <div class="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2">🏅 Sistema de Badges</h3>
          <p class="text-sm text-muted-foreground">
            Conquista badges por completares desafios e manteres consistência. 
            Gamificação que te mantém motivado.
          </p>
        </div>

        <div class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2">📈 Acompanhamento de Progresso</h3>
          <p class="text-sm text-muted-foreground">
            A plataforma regista automaticamente o que já completaste, 
            mostrando a tua evolução ao longo dos 6 meses.
          </p>
        </div>

        <div class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2">🔒 Desbloqueio Progressivo</h3>
          <p class="text-sm text-muted-foreground">
            Os conteúdos são desbloqueados progressivamente para garantires 
            que segues o ritmo ideal de aprendizagem.
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">👥 Comunidade e Suporte</h2>
      
      <div class="bg-card border rounded-lg p-6 mb-6">
        <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
          <span class="text-2xl">💬</span>
          <span>Grupo Telegram Exclusivo</span>
        </h3>
        <p class="text-muted-foreground mb-3">
          Junta-te a uma comunidade de triatletas que estão na mesma jornada que tu. 
          Partilha experiências, desafios e conquistas.
        </p>
        <ul class="list-disc list-inside text-sm space-y-2 ml-4">
          <li>Suporte entre atletas</li>
          <li>Partilha de experiências e dicas</li>
          <li>Desafios semanais da comunidade</li>
          <li>Motivação extra nos dias difíceis</li>
          <li>Networking com outros triatletas</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📱 Acesso Multi-Dispositivo</h2>
      
      <p class="leading-relaxed mb-4">
        Acede à plataforma de qualquer lugar e em qualquer dispositivo:
      </p>

      <div class="grid md:grid-cols-3 gap-4 mb-8">
        <div class="text-center p-4 bg-card border rounded-lg">
          <div class="text-4xl mb-2">💻</div>
          <h3 class="font-semibold mb-1">Desktop</h3>
          <p class="text-xs text-muted-foreground">Experiência completa no computador</p>
        </div>
        <div class="text-center p-4 bg-card border rounded-lg">
          <div class="text-4xl mb-2">📱</div>
          <h3 class="font-semibold mb-1">Mobile</h3>
          <p class="text-xs text-muted-foreground">Otimizado para smartphone</p>
        </div>
        <div class="text-center p-4 bg-card border rounded-lg">
          <div class="text-4xl mb-2">📲</div>
          <h3 class="font-semibold mb-1">Tablet</h3>
          <p class="text-xs text-muted-foreground">Perfeito para leitura de PDFs</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🔄 Atualizações Contínuas</h2>
      
      <div class="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
        <p class="font-semibold mb-2">💡 Conteúdo Vivo</p>
        <p class="text-sm mb-3">
          A plataforma está em constante evolução. Novos conteúdos, funcionalidades 
          e melhorias são adicionados regularmente com base no feedback da comunidade.
        </p>
        <ul class="list-disc list-inside text-sm space-y-1 ml-4">
          <li>Novos exercícios práticos</li>
          <li>Sessões bónus exclusivas</li>
          <li>Webinars ao vivo com especialistas</li>
          <li>Casos de estudo de atletas reais</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">💎 Valor Total do Programa</h2>
      
      <div class="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-bold mb-4">O Que Recebes:</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>24 Vídeos Teóricos (6 horas)</span>
            <span class="font-semibold">€240</span>
          </div>
          <div class="flex justify-between">
            <span>24 Áudios de Treino (8 horas)</span>
            <span class="font-semibold">€240</span>
          </div>
          <div class="flex justify-between">
            <span>6 Sessões de Hipnose (3 horas)</span>
            <span class="font-semibold">€180</span>
          </div>
          <div class="flex justify-between">
            <span>24 PDFs + Exercícios</span>
            <span class="font-semibold">€120</span>
          </div>
          <div class="flex justify-between">
            <span>Plataforma + Dashboard</span>
            <span class="font-semibold">€150</span>
          </div>
          <div class="flex justify-between">
            <span>Comunidade Telegram</span>
            <span class="font-semibold">€60</span>
          </div>
          <div class="border-t border-primary/20 pt-2 mt-2 flex justify-between text-lg font-bold">
            <span>Valor Total</span>
            <span class="text-primary">€990</span>
          </div>
        </div>
      </div>

      <div class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-8">
        <p class="font-bold text-lg mb-2 text-green-800 dark:text-green-200">
          🚀 Tudo Isto ao Teu Dispor
        </p>
        <p class="text-green-700 dark:text-green-300">
          Tens acesso vitalício a todos estes recursos. Podes rever, repetir e revisitar 
          qualquer conteúdo sempre que precisares. O investimento que fazes hoje acompanha-te 
          para sempre na tua carreira de atleta.
        </p>
      </div>
    </div>
  `,

  "PDF: Primeiros Passos": `
    <div class="prose prose-lg max-w-none">
      <h1 class="text-4xl font-bold mb-6 text-primary">Primeiros Passos no IRON MIND</h1>
      
      <p class="text-lg leading-relaxed mb-6">
        Bem-vindo à plataforma! Este guia vai ajudar-te a começar da melhor forma possível 
        e a tirar o máximo proveito do programa IRON MIND Training Lab.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">✅ Checklist de Início</h2>
      
      <div class="bg-card border rounded-lg p-6 mb-8">
        <h3 class="font-semibold mb-4">Completa estes passos para começares:</h3>
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-3 bg-background rounded-lg">
            <div class="text-2xl">1️⃣</div>
            <div>
              <h4 class="font-semibold">Explora a Plataforma</h4>
              <p class="text-sm text-muted-foreground">
                Navega pelos diferentes ciclos e familiariza-te com a estrutura. 
                Vê o que te espera nos próximos 6 meses.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 p-3 bg-background rounded-lg">
            <div class="text-2xl">2️⃣</div>
            <div>
              <h4 class="font-semibold">Conecta Strava ou Garmin (Opcional)</h4>
              <p class="text-sm text-muted-foreground">
                Sincroniza os teus treinos físicos para veres o dashboard unificado 
                com progresso físico + mental.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 p-3 bg-background rounded-lg">
            <div class="text-2xl">3️⃣</div>
            <div>
              <h4 class="font-semibold">Junta-te ao Grupo Telegram</h4>
              <p class="text-sm text-muted-foreground">
                Entra na comunidade de triatletas IRON MIND. Partilha experiências 
                e mantém-te motivado com o grupo.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 p-3 bg-background rounded-lg">
            <div class="text-2xl">4️⃣</div>
            <div>
              <h4 class="font-semibold">Começa o Ciclo 1 - Semana 1</h4>
              <p class="text-sm text-muted-foreground">
                Inicia a tua jornada com o primeiro vídeo teórico. 
                Não adies — o melhor momento é agora!
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📅 Como Organizar a Tua Semana</h2>
      
      <p class="leading-relaxed mb-4">
        Para tirares o máximo proveito do programa, recomendamos que sigas esta rotina semanal:
      </p>

      <div class="space-y-4 mb-8">
        <div class="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2 flex items-center gap-2">
            <span>🌅 Segunda-feira (Manhã ou Noite)</span>
          </h3>
          <p class="text-sm text-muted-foreground mb-2">
            <strong>Vê o vídeo teórico da semana</strong> (10-15 min)
          </p>
          <p class="text-xs text-muted-foreground">
            Começa a semana a aprender os conceitos. Podes ver enquanto tomas o pequeno-almoço 
            ou antes de dormir.
          </p>
        </div>

        <div class="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2 flex items-center gap-2">
            <span>🏃 Terça a Quinta (Durante Treino)</span>
          </h3>
          <p class="text-sm text-muted-foreground mb-2">
            <strong>Ouve o áudio prático</strong> (15-20 min)
          </p>
          <p class="text-xs text-muted-foreground">
            Durante um treino leve de corrida ou ciclismo, ouve o áudio guiado. 
            Aplica as técnicas em tempo real.
          </p>
        </div>

        <div class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2 flex items-center gap-2">
            <span>📖 Sexta-feira (Tempo Livre)</span>
          </h3>
          <p class="text-sm text-muted-foreground mb-2">
            <strong>Lê o PDF e faz os exercícios</strong> (10-15 min)
          </p>
          <p class="text-xs text-muted-foreground">
            Dedica um momento tranquilo para ler o material de apoio e completar 
            os exercícios práticos.
          </p>
        </div>

        <div class="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <h3 class="font-semibold mb-2 flex items-center gap-2">
            <span>✅ Domingo (Revisão)</span>
          </h3>
          <p class="text-sm text-muted-foreground mb-2">
            <strong>Faz o quiz da semana</strong> (5 min)
          </p>
          <p class="text-xs text-muted-foreground">
            Testa os teus conhecimentos e consolida a aprendizagem. 
            Prepara-te mentalmente para a próxima semana.
          </p>
        </div>
      </div>

      <div class="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
        <p class="font-semibold mb-2">💡 Flexibilidade é Chave</p>
        <p class="text-sm">
          Esta é apenas uma sugestão! Adapta a rotina ao teu horário e estilo de vida. 
          O importante é manteres a <strong>consistência</strong>, não a perfeição.
        </p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎧 Dicas para Ouvir os Áudios</h2>
      
      <div class="space-y-3 mb-8">
        <div class="flex items-start gap-3">
          <span class="text-xl">🎯</span>
          <div>
            <h4 class="font-semibold text-sm">Escolhe treinos leves</h4>
            <p class="text-xs text-muted-foreground">
              Ouve os áudios durante treinos de recuperação ou endurance base. 
              Não durante intervalos ou treinos intensos.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">🔊</span>
          <div>
            <h4 class="font-semibold text-sm">Usa auscultadores adequados</h4>
            <p class="text-xs text-muted-foreground">
              Auscultadores desportivos à prova de suor. Bone conduction são ideais 
              para manteres consciência do ambiente.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">🔁</span>
          <div>
            <h4 class="font-semibold text-sm">Repete se necessário</h4>
            <p class="text-xs text-muted-foreground">
              Não há problema em ouvir o mesmo áudio várias vezes. 
              A repetição ajuda a fixar as técnicas.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">📱</span>
          <div>
            <h4 class="font-semibold text-sm">Descarrega para offline</h4>
            <p class="text-xs text-muted-foreground">
              Faz download dos áudios para não dependeres de internet durante os treinos.
            </p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🧠 Sessões de Hipnose: Como Usar</h2>
      
      <div class="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
        <h3 class="font-semibold mb-3">Melhores Momentos para Ouvir:</h3>
        <ul class="space-y-2 text-sm">
          <li class="flex items-start gap-2">
            <span>🌙</span>
            <span><strong>Antes de dormir</strong> — Ajuda a adormecer e integra as sugestões durante o sono</span>
          </li>
          <li class="flex items-start gap-2">
            <span>🛋️</span>
            <span><strong>Durante descanso ativo</strong> — Num sofá ou cadeira confortável, em momento de pausa</span>
          </li>
          <li class="flex items-start gap-2">
            <span>🧘</span>
            <span><strong>Após meditação</strong> — Se já praticas meditação, a hipnose é um complemento perfeito</span>
          </li>
        </ul>

        <div class="mt-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded">
          <p class="text-xs font-semibold text-red-800 dark:text-red-200">
            ⚠️ NUNCA oiças sessões de hipnose enquanto conduzes ou operas máquinas!
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">📊 Acompanha o Teu Progresso</h2>
      
      <p class="leading-relaxed mb-4">
        A plataforma regista automaticamente o teu progresso. Para veres onde estás:
      </p>

      <div class="bg-card border rounded-lg p-6 mb-6">
        <ol class="space-y-3 text-sm">
          <li class="flex items-start gap-3">
            <span class="font-bold text-primary">1.</span>
            <span>Clica em <strong>"Meu Progresso"</strong> no menu superior</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="font-bold text-primary">2.</span>
            <span>Vê os <strong>badges</strong> que já conquistaste</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="font-bold text-primary">3.</span>
            <span>Consulta o <strong>dashboard unificado</strong> (se conectaste Strava/Garmin)</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="font-bold text-primary">4.</span>
            <span>Acompanha a tua <strong>percentagem de conclusão</strong> de cada ciclo</span>
          </li>
        </ol>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">💬 Comunidade Telegram</h2>
      
      <p class="leading-relaxed mb-4">
        O grupo Telegram é onde a magia acontece! Aqui vais encontrar:
      </p>

      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="bg-card border rounded-lg p-4">
          <h4 class="font-semibold mb-2 text-sm">🤝 Apoio Mútuo</h4>
          <p class="text-xs text-muted-foreground">
            Partilha desafios e recebe encorajamento de outros atletas
          </p>
        </div>
        <div class="bg-card border rounded-lg p-4">
          <h4 class="font-semibold mb-2 text-sm">💡 Dicas Práticas</h4>
          <p class="text-xs text-muted-foreground">
            Aprende com as experiências de quem já aplicou as técnicas
          </p>
        </div>
        <div class="bg-card border rounded-lg p-4">
          <h4 class="font-semibold mb-2 text-sm">🏆 Celebrações</h4>
          <p class="text-xs text-muted-foreground">
            Comemora as tuas conquistas e badges com a comunidade
          </p>
        </div>
        <div class="bg-card border rounded-lg p-4">
          <h4 class="font-semibold mb-2 text-sm">📢 Atualizações</h4>
          <p class="text-xs text-muted-foreground">
            Fica a par de novos conteúdos e funcionalidades
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">❓ Perguntas Frequentes</h2>
      
      <div class="space-y-4 mb-8">
        <div class="bg-card border rounded-lg p-4">
          <h4 class="font-semibold mb-2">Posso fazer mais de uma semana por vez?</h4>
          <p class="text-sm text-muted-foreground">
            Podes, mas não recomendamos. O cérebro precisa de tempo para integrar as técnicas. 
            Respeita o ritmo semanal para melhores resultados.
          </p>
        </div>

        <div class="bg-card border rounded-lg p-4">
          <h4 class="font-semibold mb-2">E se falhar uma semana?</h4>
          <p class="text-sm text-muted-foreground">
            Não há problema! Retoma de onde paraste. O importante é não desistires. 
            Consistência imperfeita é melhor que perfeição inexistente.
          </p>
        </div>

        <div class="bg-card border rounded-lg p-4">
          <h4 class="font-semibold mb-2">Preciso de equipamento especial?</h4>
          <p class="text-sm text-muted-foreground">
            Não. Apenas um smartphone ou computador para aceder à plataforma e 
            auscultadores para ouvir os áudios durante os treinos.
          </p>
        </div>

        <div class="bg-card border rounded-lg p-4">
          <h4 class="font-semibold mb-2">Quanto tempo tenho acesso?</h4>
          <p class="text-sm text-muted-foreground">
            Acesso vitalício! Podes rever os conteúdos sempre que quiseres, 
            mesmo depois de completares os 6 ciclos.
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🚀 Pronto para Começar?</h2>
      
      <div class="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-bold mb-3">Os Teus Próximos Passos:</h3>
        <ol class="space-y-2 text-sm">
          <li>✅ Termina de ler esta introdução</li>
          <li>🔗 Conecta Strava/Garmin (opcional)</li>
          <li>💬 Junta-te ao Telegram</li>
          <li>🎬 Vê o primeiro vídeo do Ciclo 1</li>
          <li>🏃 Começa a aplicar as técnicas</li>
        </ol>
      </div>

      <div class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-8">
        <p class="font-bold text-lg mb-2 text-green-800 dark:text-green-200">
          💪 A Tua Jornada Começa Agora
        </p>
        <p class="text-green-700 dark:text-green-300 mb-3">
          Deste o primeiro passo ao inscreveres-te. Agora é hora de dar o segundo: 
          começar o Ciclo 1. Não esperes pelo "momento perfeito" — ele é agora.
        </p>
        <p class="text-green-700 dark:text-green-300 font-semibold">
          Vemo-nos no Ciclo 1, Semana 1! 🚀
        </p>
      </div>
    </div>
  `
};

// Atualizar os 4 conteúdos
for (const [title, html] of Object.entries(INTRO_TEXTS)) {
  const stmt = db.prepare(`
    UPDATE contents 
    SET url = ?, type = 'text'
    WHERE title = ?
  `);
  
  const result = stmt.run(html, title);
  console.log(`✅ Atualizado: ${title} (${result.changes} alterações)`);
}

console.log("\n✅ Todos os 4 textos da Introdução foram atualizados com sucesso!");

db.close();
