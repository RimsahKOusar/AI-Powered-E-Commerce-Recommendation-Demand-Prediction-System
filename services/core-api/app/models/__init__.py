"""SQLModel table classes. Import every model here so Alembic autogenerate sees them."""

from app.models.user import Address, RefreshToken, User, UserRole

__all__ = ["Address", "RefreshToken", "User", "UserRole"]
