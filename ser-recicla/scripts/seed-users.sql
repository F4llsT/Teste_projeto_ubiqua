-- Inserir usuários de teste com senhas criptografadas
-- Senha para todos os usuários: "senha123"
-- A senha está criptografada com bcrypt
INSERT INTO "User" ("id", "name", "email", "password", "phone", "curso", "semestre", "turma", "turno", "unidade", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'João Silva', 'joao.silva@aluno.unama.br', '$2a$10$Xt9Qs.CgWC.WQcc7HTuFUOQRqpxlGZpPOhIrKjHxq6BRsLSYZR8Ym', '91987654321', 'Sistemas de Informação', '3', 'SI2023', 'noturno', 'alcindo_cacela', NOW(), NOW()),
  (gen_random_uuid(), 'Maria Santos', 'maria.santos@aluno.unama.br', '$2a$10$Xt9Qs.CgWC.WQcc7HTuFUOQRqpxlGZpPOhIrKjHxq6BRsLSYZR8Ym', '91987654322', 'Engenharia Civil', '5', 'ENG2022', 'matutino', 'ananindeua', NOW(), NOW()),
  (gen_random_uuid(), 'Pedro Oliveira', 'pedro.oliveira@aluno.unama.br', '$2a$10$Xt9Qs.CgWC.WQcc7HTuFUOQRqpxlGZpPOhIrKjHxq6BRsLSYZR8Ym', '91987654323', 'Direito', '2', 'DIR2024', 'noturno', 'parque_shopping', NOW(), NOW()),
  (gen_random_uuid(), 'Ana Souza', 'ana.souza@aluno.unama.br', '$2a$10$Xt9Qs.CgWC.WQcc7HTuFUOQRqpxlGZpPOhIrKjHxq6BRsLSYZR8Ym', '91987654324', 'Medicina', '7', 'MED2021', 'integral', 'maraba', NOW(), NOW()),
  (gen_random_uuid(), 'Lucas Ferreira', 'lucas.ferreira@aluno.unama.br', '$2a$10$Xt9Qs.CgWC.WQcc7HTuFUOQRqpxlGZpPOhIrKjHxq6BRsLSYZR8Ym', '91987654325', 'Administração', '4', 'ADM2023', 'vespertino', 'santarem', NOW(), NOW());
