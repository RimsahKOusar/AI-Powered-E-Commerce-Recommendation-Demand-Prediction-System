# AI-Powered-E-Commerce-Recommendation-Demand-Prediction-System

Final Year Project: an AI-powered e-commerce platform that personalizes the shopping experience and helps admins plan inventory using machine learning.

## Modules

| # | Module | Input | Output | For |
|---|--------|-------|--------|-----|
| M1 | Personalized Recommendation Engine | user behavior + product features | ranked product list | Customer |
| M2 | Demand Forecasting Engine | historical sales + calendar/price | next 30 days demand per product | Admin |
| M3 | Customer Behavior Analytics | event stream | segments, funnel, interest profile | Admin |
| M4 | Generative AI Shopping Assistant (optional) | natural language query | filtered + explained products | Customer |

## Tech Stack

- **Frontend:** React 18 + Vite + TypeScript, Tailwind CSS
- **Backend:** NestJS + TypeScript, Mongoose, MongoDB, JWT auth
- **ML Service:** Python 3.11 + FastAPI (recommendation + forecasting models)
- **Docs:** see [guide/ecommerce-ai-fyp-setup-guide.md](guide/ecommerce-ai-fyp-setup-guide.md) for the full setup, architecture, and build roadmap.