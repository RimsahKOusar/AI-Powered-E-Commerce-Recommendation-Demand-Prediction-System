import httpx
import pytest
from asgi_lifespan import LifespanManager
from httpx import ASGITransport

from app.main import app


@pytest.fixture
async def client():
    async with LifespanManager(app):
        transport = ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://test") as c:
            yield c
