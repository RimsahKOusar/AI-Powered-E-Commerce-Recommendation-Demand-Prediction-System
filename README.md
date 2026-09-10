# AI-Powered E-Commerce Recommendation & Demand Prediction System

Final Year Project: an AI-powered e-commerce platform that personalizes the shopping experience and helps admins plan inventory using machine learning.

> **Stack v2 (current):** the platform was re-architected from *React+Vite / NestJS / MongoDB* to **Next.js / FastAPI / PostgreSQL**. See [`docs/03-architecture.md`](docs/03-architecture.md) for the full design and decision log.

## Modules

| # | Module | Input | Output | For |
|---|--------|-------|--------|-----|
| M1 | Personalized Recommendation Engine | user behavior + product features | ranked product list | Customer |
| M2 | Demand Forecasting Engine | historical sales + calendar/price | next 30 days demand per product | Admin |
| M3 | Customer Behavior Analytics | event stream | segments, funnel, interest profile | Admin |
| M4 | Generative AI Shopping Assistant (optional) | natural language query | filtered + explained products | Customer |

## Tech Stack

| Layer | Choice |
|---|---|
| **Web + BFF** | Next.js 16 (App Router, React 19), TypeScript, Tailwind + shadcn/ui, TanStack Query, Recharts |
| **core-api** | Python 3.12 + FastAPI, async SQLAlchemy 2.0 / SQLModel, Pydantic v2, Alembic |
| **ml-service** | Python 3.12 + FastAPI, pandas / scikit-learn / implicit / LightGBM / Prophet, sentence-transformers |
| **worker** | Arq (Redis) — nightly rollups, model batches, search index sync |
| **Database** | PostgreSQL 17 + `pgvector` + `pg_trgm` + `unaccent` |
| **Search** | Meilisearch (primary) · PostgreSQL FTS (baseline/fallback) — see [`docs/11-search-design.md`](docs/11-search-design.md) |
| **Cache / queue** | Redis |
| **Object storage** | S3-compatible (MinIO locally) — product images, model artifacts |
| **Auth** | JWT access + refresh in httpOnly/Secure cookies; verified in Server Components via a Data Access Layer |

Full docs: [`docs/`](docs/) · Monorepo layout: [`guide/architure-solution/project-file-structure.md`](guide/architure-solution/project-file-structure.md) · Long-form build roadmap: [`guide/ecommerce-ai-fyp-setup-guide.md`](guide/ecommerce-ai-fyp-setup-guide.md).

## Production Architecture

```
                              INTERNET
                                 │ HTTPS
                                 ▼
                    ┌────────────────────────┐
                    │      Next.js 16        │  Server Components (SSR/stream) +
                    │  storefront + admin    │  Route Handlers (BFF, auth cookie) +
                    │  Vercel / Node container│  Server Actions
                    └───────────┬────────────┘
                                │ REST (OpenAPI)
                                ▼
                    ┌────────────────────────┐
                    │    core-api (FastAPI)  │  auth·catalog·search·cart·orders·
                    │    Render / Railway    │  events·analytics·admin·assistant
                    └───┬────────┬────────┬──┘
          async SQLAlchemy      │        │ HTTP (X-Internal-Key)
                    ▼           │        ▼
        ┌────────────────────┐  │   ┌────────────────────┐
        │   PostgreSQL 17    │  │   │  ml-service (FastAPI)│  /recommend /similar
        │   + pgvector       │◀─┼───│  inference + training│  /forecast /embed
        │   Neon / Supabase  │  │   └─────────┬──────────┘   models/*.joblib
        └─────────┬──────────┘  │             │ nightly batch (worker)
       outbox/CDC │             ▼             ▼
                  ▼      ┌────────────┐  writes recommendations,
        ┌──────────────┐ │   Redis    │  forecasts, embeddings
        │  Meilisearch  │ │ cache+queue│
        │   products    │ └────────────┘
        └──────────────┘
```

## Local quick start

```bash
cp .env.example .env
docker compose up -d postgres redis meilisearch minio     # infra
task migrate                                              # alembic upgrade head
task seed                                                 # datasets + synthetic + embeddings + search index
task dev                                                  # web :3000 · core-api :8000 · ml-service :8001 · worker
```

Health: `http://localhost:8000/api/v1/health` · `http://localhost:8001/health` · Meilisearch `http://localhost:7700`.

## Git Workflow

```
                 ┌── feature/A ──┐
                 │               ↓
main ──→ develop ├── feature/B ─→ develop ──→ release/v1.0 ──→ QA ──┬── PASS ──→ main ──→ Production
                 │               ↑                                  └── FAIL ──→ release fix
                 └── feature/C ──┘
```



https://claude.ai/code/artifact/5dd068f4-3851-4dd8-91f9-f95033f8b4ba?via=auto_preview