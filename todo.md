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
