from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.db import engine
from app.core.errors import register_exception_handlers
from app.core.logging import RequestContextMiddleware, configure_logging, log


@asynccontextmanager
async def lifespan(_: FastAPI):
    configure_logging()
    log.info("core-api starting", env=settings.env)
    yield
    await engine.dispose()
    log.info("core-api stopped")


app = FastAPI(
    title="core-api",
    version="0.1.0",
    description="Business API for the AI-powered e-commerce platform.",
    lifespan=lifespan,
    docs_url="/docs",
    openapi_url="/openapi.json",
)

app.add_middleware(RequestContextMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)
app.include_router(api_router, prefix=settings.api_v1_prefix)


@app.get("/", include_in_schema=False)
async def root() -> dict[str, str]:
    return {"service": "core-api", "docs": "/docs", "health": f"{settings.api_v1_prefix}/health"}
