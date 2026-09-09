# agepe-pesquisa

Plataforma de criação, coleta presencial e apuração automatizada de pesquisas eleitorais.

> **AVISO**: Esta plataforma é uma ferramenta de pesquisa/opinião eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.

## Stack Tecnológica

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: NestJS + TypeScript
- **Banco de Dados**: PostgreSQL 16
- **ORM**: Prisma
- **Cache/Filas**: Redis + BullMQ (preparado)
- **Autenticação**: JWT + Refresh Token + Argon2id

## Modo de Coleta Principal

**PESQUISA PRESENCIAL** — O papel é o instrumento de coleta. O sistema é o instrumento de apuração.

```
CRIAR PESQUISA → GERAR FORMULÁRIOS PDF → IMPRIMIR → ENTREVISTA PRESENCIAL
→ RECOLHER → ESCANEAR QR → DIGITALIZAR → APURAÇÃO → DASHBOARD → EXPORTAÇÃO
```

## Início Rápido

```bash
# Com Docker
docker-compose up -d

# Backend (desenvolvimento)
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev

# Frontend (desenvolvimento)
cd frontend
npm install
npm run dev
```

## Variáveis de Ambiente

Copie `.env.example` para `.env` e configure as variáveis necessárias.

## Documentação API

Acesse `/api/docs` após iniciar o backend para a documentação Swagger.
