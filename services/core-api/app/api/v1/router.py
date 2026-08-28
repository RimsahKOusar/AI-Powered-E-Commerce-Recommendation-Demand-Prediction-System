from fastapi import APIRouter

from app.modules.health.router import router as health_router

api_router = APIRouter()
api_router.include_router(health_router)

# Later phases register their routers here:
#   auth, users, categories, products, search, cart, wishlist,
#   orders, events, analytics, admin
