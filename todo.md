# IRON MIND Learning Hub - TODO

## Base de Dados e Backend
- [x] Criar schema de base de dados (módulos, semanas, conteúdos, exercícios, progresso)
- [x] Implementar routers tRPC para gestão de conteúdos
- [x] Implementar routers tRPC para gestão de progresso
- [x] Implementar routers tRPC para exercícios

## Interface e Design
- [x] Configurar tema visual estilo Netflix (cores escuras, tipografia moderna)
- [x] Criar componente Hero Banner para destaque de conteúdos
- [x] Criar componente ContentCard para vídeos/módulos
- [x] Criar layout de navegação principal
- [x] Criar página Home com hero e cards de módulos
- [x] Criar página de Dashboard do utilizador

## Reprodutores e Visualizadores
- [x] Implementar reprodutor de vídeo (YouTube/Vimeo)
- [x] Implementar reprodutor de áudio
- [x] Implementar visualizador de PDF com download

## Sistema de Progresso
- [x] Implementar marcação de conteúdos como vistos
- [x] Criar dashboard de progresso com estatísticas
- [x] Implementar histórico de atividades do utilizador

## Exercícios
- [x] Criar interface de submissão de exercícios
- [x] Implementar sistema de acompanhamento de exercícios completados

## Autenticação
- [ ] Configurar recuperação de password
- [ ] Criar página de perfil do utilizador

## Testes
- [x] Criar testes unitários para backend
- [x] Validar funcionalidades principais

## Reorganização da Interface
- [x] Reorganizar página Home para mostrar semanas diretamente
- [x] Mostrar conteúdos de cada semana na mesma página
- [x] Remover navegação por módulos intermediária

## Acesso Temporário sem Autenticação
- [x] Desativar verificação de autenticação na página Home
- [x] Permitir acesso a todos os conteúdos sem login
- [x] Remover redirecionamento para login

## Reestruturação para 6 Ciclos
- [x] Ajustar schema da base de dados (renomear modules para cycles)
- [x] Criar interface de cards para os 6 ciclos na Home
- [x] Criar página de detalhes de cada ciclo mostrando as semanas
- [x] Ajustar página de semanas para mostrar conteúdos
- [x] Popular base de dados com os 6 ciclos completos

## Otimização Mobile
- [x] Aumentar tamanho de texto e botões para melhor legibilidade no telemóvel
- [x] Ajustar espaçamento e padding para telas pequenas
- [x] Melhorar navegação mobile (menu hamburger se necessário)
- [x] Otimizar hero banner para dispositivos móveis
- [x] Ajustar grid de cards de ciclos para mobile (1 coluna)
- [x] Testar e validar responsividade em diferentes tamanhos de tela

## Reorganização: 4 Semanas por Ciclo
- [x] Ajustar schema para adicionar campo de agrupamento semanal
- [x] Modificar CycleDetail para mostrar 4 semanas em vez de todos os itens
- [x] Criar página WeekDetail para mostrar conteúdos de uma semana específica
- [x] Atualizar routers para suportar navegação Ciclo → Semana → Conteúdos
- [x] Popular base de dados distribuindo os 18 itens pelas 4 semanas de cada ciclo

## Aulas ao Vivo
- [x] Procurar imagem adequada para aulas ao vivo
- [x] Adicionar tipo "live" ao schema de weeks
- [x] Criar 24 itens de "Aula ao Vivo" (4 semanas × 6 ciclos)
- [x] Posicionar aulas como primeiro item de cada semana
- [x] Destacar visualmente as aulas ao vivo na interface

## Correção de Ordenação
- [x] Gerar imagem cinematográfica personalizada para aulas ao vivo
- [x] Verificar query de listagem de itens por semana
- [x] Garantir que aulas ao vivo (weekNumber = 0) aparecem primeiro
- [x] Adicionar tópicos e exercícios ao Ciclo 1
- [ ] Adicionar tópicos e exercícios aos Ciclos 2-6

## Imagens Cinematográficas
- [x] Gerar 4 imagens blur para cards das semanas (uma cor por semana)
- [x] Gerar imagens blur para thumbnails dos tópicos
- [x] Implementar imagens nos componentes de semana
- [x] Implementar imagens nos cards de conteúdo

## Correção: Aulas ao Vivo Não Aparecem
- [x] Verificar por que aula ao vivo não aparece na Semana 1
- [x] Confirmar que aulas ao vivo existem na base de dados
- [x] Corrigir filtro ou query que impede visualização
- [x] Garantir que aula ao vivo aparece como primeiro card em todas as semanas

## Investigação Profunda: Aula ao Vivo Não Aparece
- [x] Aceder à página Semana 1 através do browser automatizado
- [x] Verificar console do browser para erros
- [x] Verificar resposta da API tRPC
- [x] Identificar causa raiz do problema (cache do browser do utilizador)
- [x] Confirmar que plataforma funciona corretamente

## URGENTE: Aula ao Vivo Não Aparece no Frontend Real
- [x] Verificar por que frontend mostra "0 aula ao vivo" quando deveria mostrar "1 aula ao vivo"
- [x] Verificar se problema está no filtro isPublished
- [x] Verificar se aula ao vivo tem isPublished=true (ESTAVA FALSE!)
- [x] Corrigir publicando todas as 24 aulas ao vivo

## Ciclo de Introdução
- [x] Criar Ciclo 0 (Introdução) na base de dados
- [x] Adicionar secções: Boas-vindas, Como Funciona, Preparação Mental
- [x] Criar card especial com cor única (amarelo/dourado)
- [x] Posicionar antes dos 6 ciclos principais
- [x] Ajustar interface para mostrar secções em vez de semanas

## Personalização do Ciclo de Introdução
- [x] Remover itens existentes da Introdução
- [x] Criar 4 secções personalizadas com títulos específicos
- [ ] Corrigir visualização dos títulos nos cards (ainda mostra "Semana X")
- [x] Adicionar conteúdos às 4 secções

## Remoção de Durações
- [x] Remover todas as durações (15 min, 10 min, etc.) dos cards de vídeo e áudio

## Sistema de Bloqueio de Semanas
- [x] Adicionar campo isAccessible à tabela weeks
- [x] Configurar Semana 1 de todos os ciclos como acessível
- [x] Configurar Semanas 2, 3, 4 como bloqueadas
- [x] Implementar overlay "🔒 Brevemente Disponível" nos cards bloqueados
- [x] Desativar clique nos cards bloqueados

## Movimentação do Bloqueio para Nível de Itens
- [x] Remover campo isAccessible da tabela weeks
- [x] Adicionar campo isAccessible à tabela contents (não items)
- [x] Remover overlay de bloqueio dos cards de semanas (CycleDetail.tsx)
- [x] Adicionar overlay de bloqueio aos cards de itens (WeekDetail.tsx, ItemDetail.tsx e ContentCard.tsx)
- [x] Configurar conteúdos da Semana 1 como acessíveis
- [x] Configurar conteúdos das Semanas 2-4 como bloqueados

## Desbloqueio da Semana 1 de Todos os Ciclos
- [ ] Verificar estado atual de bloqueio dos conteúdos
- [ ] Desbloquear Semana 1 dos Ciclos 2, 3, 4, 5, 6
- [ ] Testar acesso à Semana 1 de diferentes ciclos

## Criação dos Ciclos 2-6
- [x] Criar 18 itens (weeks) para cada ciclo (Ciclos 2, 3, 4, 5, 6)
- [x] Criar conteúdos (vídeos, áudios, PDFs) para cada item
- [x] Configurar Semana 1 como acessível e Semanas 2-4 como bloqueadas

## Bloqueio Total dos Ciclos 2-6
- [x] Bloquear todos os conteúdos de todas as semanas dos Ciclos 2-6
- [x] Manter apenas Semana 1 do Ciclo 1 acessível
- [x] Ajustar lógica do frontend para considerar cycleId no bloqueio

## Ajuste do Ciclo 0 (Introdução)
- [x] Criar estrutura especial onde cada secção mostra conteúdos diretamente
- [x] Ajustar CycleDetail.tsx para navegar diretamente para conteúdos no Ciclo 0
- [x] Remover navegação intermediária de itens no Ciclo 0

## Sistema de Quiz
- [x] Adicionar tipo "quiz" ao enum de conteúdos
- [x] Criar quizzes para todos os itens dos Ciclos 1-6 (90 quizzes)
- [x] Atualizar ItemDetail.tsx para mostrar card de Quiz
- [x] Criar página de Quiz com perguntas e avaliação (5 perguntas, resultado com percentagem)
