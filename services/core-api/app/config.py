from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", "../../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # ── app ──
    env: str = Field(default="development")
    debug: bool = Field(default=True)
    api_v1_prefix: str = "/api/v1"

    # ── database ──
    database_url: str = Field(
        default="postgresql+asyncpg://app:app@localhost:5432/ecommerce",
    )
    db_echo: bool = False
    db_pool_size: int = 10
    db_max_overflow: int = 5

    # ── redis ──
    redis_url: str = Field(default="redis://localhost:6379/0")

    # ── auth ──
    jwt_secret: str = Field(default="devJwtSecret_change_me")
    jwt_algorithm: str = "HS256"
    jwt_access_ttl_min: int = 15
    jwt_refresh_ttl_days: int = 7

    # ── rate limits (per minute) ──
    rate_limit_auth_per_min: int = 10
    rate_limit_assistant_per_min: int = 20

    # ── cors ──
    cors_origins: str = Field(default="http://localhost:3000")

    # ── downstream services (wired in later phases) ──
    ml_service_url: str = Field(default="http://localhost:8001")
    internal_api_key: str = Field(default="devInternalKey")
    meili_url: str = Field(default="http://localhost:7700")
    meili_master_key: str = Field(default="devMasterKey_change_me")

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
