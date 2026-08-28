# core-api

FastAPI business API — auth, catalog, cart, orders, analytics, admin.
Async top to bottom (asyncpg · async SQLAlchemy 2.0 / SQLModel · Alembic).

## Layout

```
app/
  main.py              FastAPI app, lifespan, middleware, router include
  core/                config · db · logging · errors · ids  (deps · security · rate_limit land in Phase 1)
  api/v1/router.py     include_router for every module
  models/              SQLModel tables (one file per aggregate)
  schemas/             Pydantic request/response DTOs
  repositories/        DB queries only
  modules/<feature>/   router.py + service.py
migrations/            Alembic (single head; 0001 = extensions + identity)
tests/                 pytest + httpx
```

## Local run (without Docker)

```bash
cd services/core-api
python -m venv .venv && .venv\Scripts\activate       # PowerShell
pip install -e ".[dev]"                              # or: pip install -e . --group dev

# needs a running PostgreSQL 17 with pgvector (docker compose up -d postgres)
cp .env.example .env
python -m alembic upgrade head
python -m uvicorn app.main:app --reload --port 8000
```

- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/api/v1/health

## Migrations

```bash
python -m alembic revision --autogenerate -m "add products"   # then hand-review
python -m alembic upgrade head
python -m alembic downgrade -1
```
