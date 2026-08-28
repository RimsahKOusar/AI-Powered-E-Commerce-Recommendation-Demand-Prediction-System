from datetime import UTC, datetime
from enum import StrEnum

from sqlalchemy import DateTime
from sqlalchemy.dialects.postgresql import CITEXT
from sqlmodel import Field, SQLModel

from app.core.ids import new_id
from app.models.base import TimestampMixin, utcnow


class UserRole(StrEnum):
    customer = "customer"
    admin = "admin"


class User(TimestampMixin, table=True):
    __tablename__ = "users"

    id: str = Field(default_factory=lambda: new_id("usr_"), primary_key=True)
    email: str = Field(sa_type=CITEXT, index=True, unique=True, nullable=False)
    password_hash: str = Field(nullable=False)
    full_name: str = Field(nullable=False)
    role: UserRole = Field(default=UserRole.customer, nullable=False)
    is_active: bool = Field(default=True, nullable=False)


class RefreshToken(SQLModel, table=True):
    __tablename__ = "refresh_tokens"

    id: str = Field(default_factory=lambda: new_id("rt_"), primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True, nullable=False)
    token_hash: str = Field(nullable=False)  # sha256 of the refresh JWT id
    expires_at: datetime = Field(sa_type=DateTime(timezone=True), nullable=False)
    revoked_at: datetime | None = Field(default=None, sa_type=DateTime(timezone=True))
    user_agent: str | None = Field(default=None)
    created_at: datetime = Field(
        default_factory=utcnow, sa_type=DateTime(timezone=True), nullable=False
    )

    @property
    def is_valid(self) -> bool:
        return self.revoked_at is None and self.expires_at > datetime.now(UTC)


class Address(TimestampMixin, table=True):
    __tablename__ = "addresses"

    id: str = Field(default_factory=lambda: new_id("adr_"), primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True, nullable=False)
    line1: str = Field(nullable=False)
    line2: str | None = Field(default=None)
    city: str = Field(nullable=False)
    region: str | None = Field(default=None)
    postal_code: str | None = Field(default=None)
    country: str = Field(default="PK", nullable=False)
    is_default: bool = Field(default=False, nullable=False)
