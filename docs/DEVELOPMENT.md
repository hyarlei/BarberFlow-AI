# Guia de Desenvolvimento - BarberFlow AI

## 🚀 Início Rápido

### Pré-requisitos
- Docker Desktop
- Node.js 18+ (opcional, para desenvolvimento local)
- Python 3.9+ (opcional, para desenvolvimento local)
- Git

### Configuração do Ambiente

#### Windows (PowerShell)
```powershell
# Execute o script de configuração
.\setup.ps1
```

#### Linux/macOS
```bash
# Torne o script executável
chmod +x setup.sh

# Execute o script de configuração
./setup.sh
```

#### Configuração Manual

1. **Clone o repositório**
```bash
git clone <repository-url>
cd BarberFlow-AI
```

2. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env conforme necessário
```

3. **Inicie os serviços**
```bash
docker-compose up -d
```

## 🏗️ Arquitetura

### Visão Geral
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Frontend     │    │     Backend     │    │   AI Service    │
│   (Next.js)     │◄──►│    (NestJS)     │◄──►│   (Python)      │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                        │
                              ▼                        ▼
                    ┌─────────────────┐    ┌─────────────────┐
                    │   PostgreSQL    │    │     Chatbot     │
                    │   Port: 5432    │    │   (Node.js)     │
                    └─────────────────┘    │   Port: 3002    │
                              │            └─────────────────┘
                              ▼
                    ┌─────────────────┐
                    │      Redis      │
                    │   Port: 6379    │
                    └─────────────────┘
```

### Tecnologias

#### Frontend (Next.js)
- **Framework**: Next.js 14 com App Router
- **Estilização**: Tailwind CSS
- **UI Components**: Headless UI + Custom Components
- **State Management**: React Query + Context API
- **Autenticação**: NextAuth.js
- **Animações**: Framer Motion

#### Backend (NestJS)
- **Framework**: NestJS com TypeScript
- **Banco de Dados**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Autenticação**: JWT + Passport.js
- **Documentação**: Swagger/OpenAPI
- **Validação**: class-validator + class-transformer

#### AI Service (Python)
- **Framework**: Flask
- **ML/AI**: TensorFlow, scikit-learn
- **Computer Vision**: OpenCV, MediaPipe
- **NLP**: Transformers, PyTorch
- **Data Processing**: Pandas, NumPy

#### DevOps
- **Containerização**: Docker + Docker Compose
- **Banco de Dados**: PostgreSQL 15
- **Cache**: Redis 7
- **Logs**: Winston (Backend) + Python logging

## 📂 Estrutura do Projeto

```
BarberFlow-AI/
├── frontend/                 # Aplicação Next.js
│   ├── src/
│   │   ├── app/             # App Router do Next.js
│   │   ├── components/      # Componentes React
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilitários e configurações
│   │   └── types/           # Definições de tipos TypeScript
│   ├── public/              # Arquivos estáticos
│   └── package.json
│
├── backend/                  # API NestJS
│   ├── src/
│   │   ├── modules/         # Módulos da aplicação
│   │   ├── common/          # Utilitários compartilhados
│   │   ├── config/          # Configurações
│   │   └── main.ts
│   ├── prisma/              # Schema e migrations
│   ├── test/                # Testes E2E
│   └── package.json
│
├── ai-service/              # Serviços de IA (Python)
│   ├── services/            # Módulos de IA
│   ├── models/              # Modelos ML
│   ├── utils/               # Utilitários
│   ├── app.py               # Aplicação Flask
│   └── requirements.txt
│
├── chatbot/                 # Bot de automação
│   ├── src/                 # Código do chatbot
│   └── package.json
│
├── docs/                    # Documentação
├── docker-compose.yml       # Orquestração dos serviços
├── .env.example            # Variáveis de ambiente
└── README.md
```

## 🔧 Comandos de Desenvolvimento

### Docker Compose
```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend

# Reconstruir um serviço
docker-compose build backend

# Executar comando em um container
docker-compose exec backend bash
```

### Backend (NestJS)
```bash
# Entrar no container
docker-compose exec backend bash

# Instalar dependências
npm install

# Executar migrations
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate

# Abrir Prisma Studio
npx prisma studio

# Executar testes
npm run test

# Executar testes E2E
npm run test:e2e

# Executar com coverage
npm run test:cov
```

### Frontend (Next.js)
```bash
# Entrar no container
docker-compose exec frontend bash

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar testes
npm run test
```

### AI Service (Python)
```bash
# Entrar no container
docker-compose exec ai-service bash

# Instalar dependências
pip install -r requirements.txt

# Executar em modo desenvolvimento
python app.py

# Executar testes
pytest
```

## 🗄️ Banco de Dados

### Schema Principal

#### Usuários e Perfis
- `users` - Dados de autenticação
- `profiles` - Informações pessoais
- `barber_profiles` - Dados específicos dos barbeiros

#### Agendamentos
- `appointments` - Agendamentos
- `appointment_users` - Relação many-to-many
- `services` - Serviços disponíveis
- `barber_services` - Serviços por barbeiro

#### Pagamentos
- `payments` - Transações
- `reviews` - Avaliações

#### Sistema
- `notifications` - Notificações
- `loyalty_points` - Sistema de fidelidade
- `campaigns` - Campanhas de marketing
- `products` - Gestão de estoque

#### IA/Analytics
- `user_behavior` - Comportamento dos usuários
- `prediction_models` - Modelos de ML

### Migrations
```bash
# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Aplicar migrations
npx prisma migrate deploy

# Reset do banco (CUIDADO!)
npx prisma migrate reset
```

## 🧪 Testes

### Estratégia de Testes

1. **Testes E2E (End-to-End)**
   - Fluxos principais da aplicação
   - Testes de integração entre serviços
   - Cenários de usuário real

2. **Testes de Unidade**
   - Lógica de negócio
   - Serviços individuais
   - Utilitários

3. **Testes de Integração**
   - Integração com banco de dados
   - APIs externas
   - Serviços de terceiros

### Executar Testes

```bash
# Backend - Testes E2E
cd backend
npm run test:e2e

# Backend - Testes unitários
npm run test

# Frontend - Testes
cd frontend
npm run test

# AI Service - Testes
cd ai-service
pytest
```

### Coverage
```bash
# Backend
npm run test:cov

# Frontend
npm run test:coverage
```

## 🔐 Autenticação e Autorização

### JWT Strategy
- Tokens JWT para autenticação
- Refresh tokens para renovação
- Middleware de autorização por roles

### Roles de Usuário
- `CLIENT` - Clientes da barbearia
- `BARBER` - Barbeiros
- `ADMIN` - Administradores

### Proteção de Rotas
```typescript
// Exemplo de rota protegida
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
@Get('profile')
async getProfile(@Request() req) {
  return req.user;
}
```

## 🤖 Serviços de IA

### Face Analysis
- Análise de formato de rosto
- Recomendações de estilos
- Endpoint: `POST /api/face-analysis`

### Predictive Analytics
- Análise de risco de evasão
- Otimização de preços
- Previsão de demanda

### Recommendation Engine
- Recomendações personalizadas
- Baseado em histórico
- Machine learning colaborativo

## 📊 Métricas e Monitoramento

### Health Checks
- Backend: `GET /api/v1/health`
- AI Service: `GET /health`
- Frontend: Status da build

### Logs
- Estruturados em JSON
- Diferentes níveis (debug, info, warn, error)
- Agregação centralizada

### Métricas de Negócio
- Taxa de conversão
- Satisfação do cliente
- Utilização de recursos
- Performance da IA

## 🚀 Deploy

### Ambientes

#### Desenvolvimento (Local)
```bash
docker-compose up -d
```

#### Staging/Produção

**Frontend (Vercel)**
```bash
# Build automático via Git
# Configurar variáveis de ambiente no painel da Vercel
```

**Backend (Render.com)**
```bash
# Conectar repositório
# Configurar variáveis de ambiente
# Deploy automático via Git
```

**Banco de Dados**
- PostgreSQL na nuvem (Render, AWS RDS, etc.)
- Migrations automáticas via CI/CD

### Variáveis de Ambiente

#### Produção
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:port/db

# JWT
JWT_SECRET=super-secret-production-key

# APIs
STRIPE_SECRET_KEY=sk_live_...
SENDGRID_API_KEY=SG...
```

## 🔧 Troubleshooting

### Problemas Comuns

1. **Container não inicia**
```bash
# Verificar logs
docker-compose logs service-name

# Reconstruir
docker-compose build service-name
```

2. **Banco de dados não conecta**
```bash
# Verificar se o PostgreSQL está rodando
docker-compose ps

# Resetar volumes
docker-compose down -v
docker-compose up -d
```

3. **Dependências não instalam**
```bash
# Limpar cache
docker-compose down
docker system prune -f
docker-compose build --no-cache
```

### Reset Completo
```bash
# CUIDADO: Remove todos os dados
./setup.ps1  # Opção 7
# ou
./setup.sh  # Opção 7
```

## 📚 Recursos Adicionais

### Documentação da API
- Swagger UI: http://localhost:3001/api/docs
- Endpoints documentados automaticamente
- Exemplos de requisições

### Ferramentas de Desenvolvimento
- Prisma Studio: `npx prisma studio`
- Redis CLI: `docker-compose exec redis redis-cli`
- Logs em tempo real: `docker-compose logs -f`

### Contribuição
1. Fork do repositório
2. Criar branch para feature
3. Commits seguindo conventional commits
4. Testes passando
5. Pull request com descrição detalhada
