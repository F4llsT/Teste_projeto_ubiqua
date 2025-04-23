# Sistema de Aquisição de Dados do Projeto Ser Recicla

Este projeto é um sistema de aquisição de dados para o Projeto Ser Recicla da Unama, desenvolvido para a Semana Ubíqua e como uma iniciativa para a COP 30 em Belém.

## Sobre o Projeto

O projeto Ser Recicla visa fomentar a participação das turmas da Unama na entrega de materiais recicláveis — como alumínio, vidro, pano e PET — por meio de um sistema digital que incentive e registre essas ações de forma transparente, funcional e escalável.

## Funcionalidades

- Cadastro e autenticação de usuários
- Registro de entregas de resíduos recicláveis
- Dashboard com visualização de dados e estatísticas
- Página educativa sobre reciclagem
- API RESTful para integração com outros sistemas

## Tecnologias Utilizadas

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- TailwindCSS
- shadcn/ui
- Chart.js
- JWT para autenticação
- bcrypt para criptografia de senhas

## Requisitos

- Node.js 18+
- PostgreSQL ou Neon (banco de dados PostgreSQL na nuvem)

## Configuração

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/seu-usuario/ser-recicla.git
cd ser-recicla
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
\`\`\`
DATABASE_URL="postgresql://usuario:senha@host:porta/banco"
JWT_SECRET="sua-chave-secreta"
\`\`\`

4. Execute as migrações do banco de dados:
\`\`\`bash
npx prisma migrate dev
\`\`\`

5. Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`

## Estrutura do Projeto

- `/app` - Rotas e páginas da aplicação (Next.js App Router)
- `/components` - Componentes React reutilizáveis
- `/lib` - Utilitários e configurações
- `/prisma` - Schema e migrações do Prisma
- `/public` - Arquivos estáticos

## API

O sistema possui uma API RESTful para integração com outros sistemas. A documentação completa está disponível em `/api-docs` quando o servidor está em execução.

Principais endpoints:
- `GET /api/entregas` - Lista todas as entregas
- `POST /api/entregas` - Registra uma nova entrega
- `GET /api/estatisticas` - Retorna estatísticas agregadas

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Para mais informações, entre em contato com a equipe de desenvolvimento do Projeto Ser Recicla.
