-- Renomear tabelas
RENAME TABLE modules TO cycles;
RENAME TABLE user_module_progress TO user_cycle_progress;

-- Adicionar coluna color à tabela cycles
ALTER TABLE cycles ADD COLUMN color VARCHAR(50) AFTER `order`;

-- Adicionar coluna type à tabela weeks
ALTER TABLE weeks ADD COLUMN type ENUM('topic', 'exercise') NOT NULL DEFAULT 'topic' AFTER weekNumber;

-- Renomear coluna moduleId para cycleId na tabela weeks
ALTER TABLE weeks CHANGE COLUMN moduleId cycleId INT NOT NULL;

-- Renomear coluna moduleId para cycleId na tabela user_cycle_progress
ALTER TABLE user_cycle_progress CHANGE COLUMN moduleId cycleId INT NOT NULL;
