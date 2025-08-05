# BarberFlow AI

Sistema completo de automação para barbearia moderna com Inteligência Artificial.

## 🏗️ Arquitetura

- **Frontend**: Next.js + React + Tailwind CSS
- **Backend**: NestJS + Node.js
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker + Docker Compose
- **Autenticação**: JWT
- **IA/ML**: TensorFlow.js + Python (Flask/FastAPI)
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest + Supertest (E2E)

## 🚀 Estrutura do Projeto

```
BarberFlow-AI/
├── frontend/                 # Next.js App
├── backend/                  # NestJS API
├── ai-service/              # Serviços de IA (Python)
├── chatbot/                 # Bot de automação
├── docs/                    # Documentação
├── docker-compose.yml       # Orquestração dos serviços
└── README.md
```

## 🔧 Configuração do Ambiente

### Pré-requisitos
- Docker
- Docker Compose
- Node.js 18+
- Python 3.9+

### Instalação

1. Clone o repositório
2. Execute o ambiente de desenvolvimento:
```bash
docker-compose up -d
```

## 📋 Módulos e Funcionalidades

### Frontend - Painéis de Usuário
- **Cliente**: Agendamento, perfil, histórico, pagamentos
- **Barbeiro**: Agenda, portfólio, histórico de clientes
- **Admin**: Dashboard, gestão, relatórios, PDV

### Backend - API RESTful
- Autenticação e autorização
- Gestão de usuários e perfis
- Sistema de agendamentos
- Processamento de pagamentos
- Notificações automatizadas

### Agente de IA - "O Cérebro"
- Análise preditiva de demanda
- Marketing automatizado inteligente
- Recomendações personalizadas
- Análise de risco de evasão

### Chatbot - "O Atendente 24h"
- Integração WhatsApp e Web
- Agendamento automatizado
- FAQs e suporte
- Transbordo para atendimento humano

## 🎯 Desafios Avançados

1. **Assistente de Estilo com IA**: Análise facial para sugestões
2. **Precificação Dinâmica**: Algoritmos de ajuste de preços
3. **Gestão de Estoque Preditiva**: IA para recompra automática
4. **Gamificação**: Sistema de pontos e fidelidade

## 🧪 Testes

- Testes E2E automatizados
- Coverage de fluxos principais
- Integração contínua

## 🚀 Deploy

- **Frontend**: Vercel/Netlify
- **Backend**: Render.com/Heroku
- **Banco**: PostgreSQL na nuvem
