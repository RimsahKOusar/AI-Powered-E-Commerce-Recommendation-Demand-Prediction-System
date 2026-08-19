# Project File Structure — `ecommerce-ai-platform`

Full monorepo layout actually scaffolded on disk (empty stub files, each with a one-line purpose comment where the file type supports it). Stack: **React + Vite** (frontend), **NestJS + Mongoose + MongoDB** (backend), **Python FastAPI** (ml-service).

> **Scope decision:** `categories`, `products`, `cart`, `wishlist`, `orders`, and `events` modules were intentionally left out of both `backend/` and `frontend/` — not an oversight. Add them back the same way (module/schema/controller/service/dto folders) if the catalog/checkout side gets built later.

ecommerce-ai-platform/
│
├── README.md
├── LICENSE
├── .gitignore
├── .editorconfig
├── .prettierrc
├── .prettierignore
├── .gitattributes
├── .env.example
├── docker-compose.yml
├── docker-compose.prod.yml
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── cd.yml
│   │   ├── backend-ci.yml
│   │   ├── frontend-ci.yml
│   │   └── ml-ci.yml
│   │
│   ├── pull_request_template.md
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── ml-experiment.md
│   │
│   └── dependabot.yml
│
├── docs/
│   ├── 01-proposal.md
│   ├── 02-srs.md
│   ├── 03-architecture.md
│   ├── 04-api-contract.md
│   ├── 05-database-design.md
│   ├── 06-ml-design.md
│   ├── 07-evaluation-results.md
│   ├── 08-deployment.md
│   ├── 09-testing.md
│   ├── 10-user-manual.md
│   │
│   ├── diagrams/
│   │   ├── system-architecture.png
│   │   ├── system-architecture.drawio
│   │   ├── database-erd.png
│   │   ├── database-erd.drawio
│   │   ├── use-case-diagram.png
│   │   ├── recommendation-flow.png
│   │   ├── forecasting-flow.png
│   │   ├── deployment-architecture.png
│   │   └── sequence-diagrams/
│   │       ├── login-sequence.png
│   │       ├── recommendation-sequence.png
│   │       ├── order-sequence.png
│   │       └── forecast-sequence.png
│   │
│   └── screenshots/
│       ├── customer/
│       └── admin/
│
├── frontend/
│   ├── .env.dev
│   ├── .env.local
│   ├── .env.production
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── eslint.config.js
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.svg
│   │   └── images/
│   │
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       │
│       ├── api/
│       │   ├── axios.ts
│       │   ├── auth.api.ts
│       │   ├── analytics.api.ts
│       │   ├── forecast.api.ts
│       │   └── assistant.api.ts
│       │
│       ├── components/
│       │   ├── common/
│       │   │   ├── Button.tsx
│       │   │   ├── Input.tsx
│       │   │   ├── Modal.tsx
│       │   │   ├── Spinner.tsx
│       │   │   ├── Skeleton.tsx
│       │   │   ├── EmptyState.tsx
│       │   │   └── ErrorState.tsx
│       │   │
│       │   ├── layout/
│       │   │   ├── Navbar.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── Sidebar.tsx
│       │   │   └── AdminLayout.tsx
│       │   │
│       ├── features/
│       │   ├── auth/
│       │   ├── products/
│       │   ├── categories/
│       │   ├── cart/
│       │   ├── wishlist/
│       │   ├── orders/
│       │   ├── recommendations/
│       │   ├── analytics/
│       │   ├── forecast/
│       │   ├── inventory/
│       │   └── assistant/
│       │
│       ├── pages/
│       │   ├── customer/
│       │   │   ├── Home.tsx
│       │   │   ├── Profile.tsx
│       │   │   └── Assistant.tsx
│       │   │
│       │   ├── auth/
│       │   │   ├── Login.tsx
│       │   │   ├── Register.tsx
│       │   │   └── ForgotPassword.tsx
│       │   │
│       │   └── admin/
│       │       ├── Dashboard.tsx
│       │       ├── Recommendations.tsx
│       │       └── Settings.tsx
│       │
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   ├── useForecast.ts
│       │   └── useAnalytics.ts
│       │
│       ├── store/
│       │   ├── auth.store.ts
│       │   ├── cart.store.ts
│       │   └── ui.store.ts
│       │
│       ├── routes/
│       │   ├── AppRoutes.tsx
│       │   ├── ProtectedRoute.tsx
│       │   └── AdminRoute.tsx
│       │
│       ├── types/
│       │   ├── auth.types.ts
│       │   ├── product.types.ts
│       │   ├── cart.types.ts
│       │   ├── order.types.ts
│       │   ├── recommendation.types.ts
│       │   ├── forecast.types.ts
│       │   └── analytics.types.ts
│       │
│       ├── utils/
│       │   ├── formatCurrency.ts
│       │   ├── formatDate.ts
│       │   ├── storage.ts
│       │   └── session.ts
│       │
│       └── lib/
│           ├── query-client.ts
│           └── constants.ts
│
├── backend/
│   ├── .env.dev
│   ├── .env.local
│   ├── .env.production
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── .gitignore
│   ├── README.md
│   ├── nest-cli.json
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.build.json
│   │
│   ├── scripts/
│   │   ├── seed-products.ts
│   │   ├── seed-categories.ts
│   │   ├── seed-users.ts
│   │   ├── seed-orders.ts
│   │   └── dev-memory.ts
│   │
│   ├── test/
│   │   ├── app.e2e-spec.ts
│   │   ├── auth.e2e-spec.ts
│   │   ├── products.e2e-spec.ts
│   │   ├── orders.e2e-spec.ts
│   │   └── jest-e2e.json
│   │
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── app.controller.ts
│       ├── app.service.ts
│       │
│       ├── modules/
│       │   ├── auth/
│       │   │   ├── auth.module.ts
│       │   │   ├── controller/
│       │   │   │   └── auth.controller.ts
│       │   │   ├── service/
│       │   │   │   └── auth.service.ts
│       │   │   └── dto/
│       │   │       ├── register.dto.ts
│       │   │       ├── login.dto.ts
│       │   │       └── refresh.dto.ts
│       │   │
│       │   ├── users/
│       │   │   ├── users.module.ts
│       │   │   ├── schema/
│       │   │   │   └── user.schema.ts
│       │   │   ├── controller/
│       │   │   │   └── users.controller.ts
│       │   │   ├── service/
│       │   │   │   └── users.service.ts
│       │   │   └── dto/
│       │   │       └── update-profile.dto.ts
│       │   │
│       │   ├── products/
│       │   │   ├── products.module.ts
│       │   │   ├── schema/
│       │   │   │   └── product.schema.ts
│       │   │   ├── controller/
│       │   │   │   └── products.controller.ts
│       │   │   ├── service/
│       │   │   │   └── products.service.ts
│       │   │   └── dto/
│       │   │       ├── create-product.dto.ts
│       │   │       └── update-product.dto.ts
│       │   │
│       │   ├── categories/
│       │   │   ├── categories.module.ts
│       │   │   ├── schema/
│       │   │   │   └── category.schema.ts
│       │   │   ├── controller/
│       │   │   │   └── categories.controller.ts
│       │   │   └── service/
│       │   │       └── categories.service.ts
│       │   │
│       │   ├── cart/
│       │   │   ├── cart.module.ts
│       │   │   ├── schema/
│       │   │   │   └── cart.schema.ts
│       │   │   ├── controller/
│       │   │   │   └── cart.controller.ts
│       │   │   └── service/
│       │   │       └── cart.service.ts
│       │   │
│       │   ├── wishlist/
│       │   │   ├── wishlist.module.ts
│       │   │   ├── schema/
│       │   │   │   └── wishlist.schema.ts
│       │   │   ├── controller/
│       │   │   │   └── wishlist.controller.ts
│       │   │   └── service/
│       │   │       └── wishlist.service.ts
│       │   │
│       │   ├── orders/
│       │   │   ├── orders.module.ts
│       │   │   ├── schema/
│       │   │   │   └── order.schema.ts
│       │   │   ├── controller/
│       │   │   │   └── orders.controller.ts
│       │   │   ├── service/
│       │   │   │   └── orders.service.ts
│       │   │   └── dto/
│       │   │       └── create-order.dto.ts
│       │   │
│       │   ├── events/
│       │   │   ├── events.module.ts
│       │   │   ├── schema/
│       │   │   │   └── user-event.schema.ts
│       │   │   ├── controller/
│       │   │   │   └── events.controller.ts
│       │   │   ├── service/
│       │   │   │   └── events.service.ts
│       │   │   └── dto/
│       │   │       └── create-event.dto.ts
│       │   │
│       │   ├── recommendations/
│       │   │   ├── recommendations.module.ts
│       │   │   ├── schema/
│       │   │   │   └── recommendation.schema.ts
│       │   │   ├── controller/
│       │   │   │   └── recommendations.controller.ts
│       │   │   └── service/
│       │   │       └── recommendations.service.ts
│       │   │
│       │   ├── forecast/
│       │   │   ├── forecast.module.ts
│       │   │   ├── schema/
│       │   │   │   ├── sales-daily.schema.ts
│       │   │   │   ├── forecast.schema.ts
│       │   │   │   └── stock-alert.schema.ts
│       │   │   ├── controller/
│       │   │   │   └── forecast.controller.ts
│       │   │   └── service/
│       │   │       └── forecast.service.ts
│       │   │
│       │   ├── analytics/
│       │   │   ├── analytics.module.ts
│       │   │   ├── controller/
│       │   │   │   └── analytics.controller.ts
│       │   │   └── service/
│       │   │       └── analytics.service.ts
│       │   │
│       │   ├── inventory/
│       │   │   ├── inventory.module.ts
│       │   │   ├── controller/
│       │   │   │   └── inventory.controller.ts
│       │   │   └── service/
│       │   │       └── inventory.service.ts
│       │   │
│       │   ├── notifications/
│       │   │   ├── notifications.module.ts
│       │   │   ├── controller/
│       │   │   │   └── notifications.controller.ts
│       │   │   └── service/
│       │   │       └── notifications.service.ts
│       │   │
│       │   ├── admin/
│       │   │   ├── admin.module.ts
│       │   │   ├── controller/
│       │   │   │   └── admin.controller.ts
│       │   │   └── service/
│       │   │       └── admin.service.ts
│       │   │
│       │   └── assistant/
│       │       ├── assistant.module.ts
│       │       ├── controller/
│       │       │   └── assistant.controller.ts
│       │       └── service/
│       │           └── assistant.service.ts
│       │
│       ├── common/
│       │   ├── guards/
│       │   │   ├── jwt-auth.guard.ts
│       │   │   ├── refresh-auth.guard.ts
│       │   │   └── roles.guard.ts
│       │   ├── strategies/
│       │   │   ├── jwt.strategy.ts
│       │   │   └── refresh-jwt.strategy.ts
│       │   ├── decorators/
│       │   │   ├── roles.decorator.ts
│       │   │   └── current-user.decorator.ts
│       │   ├── interceptors/
│       │   │   └── logging.interceptor.ts
│       │   ├── filters/
│       │   │   └── http-exception.filter.ts
│       │   ├── pipes/
│       │   │   └── validation.pipe.ts
│       │   ├── dto/
│       │   │   └── pagination-query.dto.ts
│       │   └── ml-client/
│       │       └── ml-client.service.ts
│       │
│       └── config/
│           ├── database.config.ts
│           ├── jwt.config.ts
│           ├── ml.config.ts
│           └── env.validation.ts
│
├── ml-service/
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── README.md
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   │
│   │   ├── routers/
│   │   │   ├── health.py
│   │   │   ├── recommend.py
│   │   │   ├── similar.py
│   │   │   ├── forecast.py
│   │   │   └── train.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── recommendation.py
│   │   │   ├── forecast.py
│   │   │   └── training.py
│   │   │
│   │   ├── services/
│   │   │   ├── recommender.py
│   │   │   ├── content_based.py
│   │   │   ├── collaborative.py
│   │   │   ├── hybrid.py
│   │   │   ├── forecaster.py
│   │   │   └── model_loader.py
│   │   │
│   │   ├── features/
│   │   │   ├── recommendation_features.py
│   │   │   ├── forecasting_features.py
│   │   │   └── feature_utils.py
│   │   │
│   │   ├── models/
│   │   │   ├── recommender/
│   │   │   │   └── .gitkeep
│   │   │   └── forecasting/
│   │   │       └── .gitkeep
│   │   │
│   │   └── core/
│   │       ├── config.py
│   │       ├── database.py
│   │       └── logging.py
│   │
│   ├── training/
│   │   ├── train_recommender.py
│   │   ├── train_content_model.py
│   │   ├── train_collaborative_model.py
│   │   ├── train_hybrid_model.py
│   │   ├── train_forecast.py
│   │   └── evaluate_models.py
│   │
│   ├── notebooks/
│   │   ├── 01_data_exploration.ipynb
│   │   ├── 02_recommendation_baseline.ipynb
│   │   ├── 03_content_based.ipynb
│   │   ├── 04_collaborative_filtering.ipynb
│   │   ├── 05_hybrid_recommendation.ipynb
│   │   ├── 06_forecasting_baseline.ipynb
│   │   └── 07_forecasting_lightgbm.ipynb
│   │
│   └── tests/
│       ├── test_recommender.py
│       ├── test_forecaster.py
│       └── test_features.py
│
├── data/
│   ├── README.md
│   │
│   ├── raw/
│   │   ├── retailrocket/
│   │   ├── online-retail-ii/
│   │   └── olist/
│   │
│   ├── processed/
│   │   ├── products/
│   │   ├── events/
│   │   ├── sales/
│   │   └── features/
│   │
│   └── seed/
│       ├── 01_load_products.py
│       ├── 02_load_users.py
│       ├── 03_load_events.py
│       ├── 04_build_sales_daily.py
│       └── 05_synthetic_generator.py
│
├── scripts/
│   ├── setup-dev.ps1
│   ├── setup-dev.sh
│   ├── start-all.ps1
│   ├── start-all.sh
│   ├── seed-all.ps1
│   ├── seed-all.sh
│   └── health-check.ps1
│
├── deployment/
│   ├── README.md
│   │
│   ├── docker/
│   │   ├── backend.Dockerfile
│   │   ├── frontend.Dockerfile
│   │   ├── ml.Dockerfile
│   │   └── nginx.conf
│   │
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── default.conf
│   │
│   ├── production/
│   │   ├── backend.env.example
│   │   ├── frontend.env.example
│   │   └── ml.env.example
│   │
│   └── monitoring/
│       ├── health-check.sh
│       └── backup.sh
│
├── tests/
│   ├── postman/
│   │   ├── ecommerce-api.postman_collection.json
│   │   └── environments/
│   │       ├── local.postman_environment.json
│   │       └── production.postman_environment.json
│   │
│   └── integration/
│       ├── auth-flow.test.ts
│       ├── recommendation-flow.test.ts
│       └── order-flow.test.ts
│
└── .vscode/
    ├── settings.json
    ├── extensions.json
    └── launch.json

## Root

- `.editorconfig` — Consistent editor formatting rules across the team
- `.env.example` — Sample environment variables for the whole monorepo
- `.gitattributes` — Git line-ending and diff handling rules
- `.prettierignore` — Files/folders excluded from Prettier formatting
- `.prettierrc` — Prettier code formatting config
- `LICENSE` — Project license
- `README.md` — Root project overview and quick-start
- `docker-compose.prod.yml` — Production orchestration for all services
- `docker-compose.yml` — Local dev orchestration: frontend + backend + ml-service + mongo

## .github/

- `.github/ISSUE_TEMPLATE/bug_report.md` — Template for reporting a bug
- `.github/ISSUE_TEMPLATE/feature_request.md` — Template for proposing a feature
- `.github/ISSUE_TEMPLATE/ml-experiment.md` — Template for logging an ML experiment
- `.github/dependabot.yml` — Automated dependency update config
- `.github/pull_request_template.md` — Checklist template shown when opening a PR
- `.github/workflows/backend-ci.yml` — Backend-only build/test workflow
- `.github/workflows/cd.yml` — Deployment pipeline to staging/production
- `.github/workflows/ci.yml` — Root CI: lint + test across all services on PR
- `.github/workflows/frontend-ci.yml` — Frontend-only build/test workflow
- `.github/workflows/ml-ci.yml` — ML service build/test workflow

## docs/

- `docs/01-proposal.md` — FYP project proposal document
- `docs/02-srs.md` — Software Requirements Specification
- `docs/03-architecture.md` — System architecture write-up
- `docs/04-api-contract.md` — REST API endpoint contract (request/response shapes)
- `docs/05-database-design.md` — MongoDB collection/schema design notes
- `docs/06-ml-design.md` — ML model design: recommendation + forecasting approach
- `docs/07-evaluation-results.md` — Offline evaluation metrics for the ML models
- `docs/08-deployment.md` — Deployment guide for all services
- `docs/09-testing.md` — Testing strategy across frontend/backend/ml-service
- `docs/10-user-manual.md` — End-user manual / walkthrough
- `docs/diagrams/database-erd.drawio` — Editable source for the ER diagram
- `docs/diagrams/database-erd.png` — Entity-relationship diagram (image)
- `docs/diagrams/deployment-architecture.png` — Deployment architecture diagram
- `docs/diagrams/forecasting-flow.png` — Forecasting pipeline flow diagram
- `docs/diagrams/recommendation-flow.png` — Recommendation pipeline flow diagram
- `docs/diagrams/sequence-diagrams/forecast-sequence.png` — Forecast generation sequence diagram
- `docs/diagrams/sequence-diagrams/login-sequence.png` — Login sequence diagram
- `docs/diagrams/sequence-diagrams/order-sequence.png` — Order placement sequence diagram
- `docs/diagrams/sequence-diagrams/recommendation-sequence.png` — Recommendation request sequence diagram
- `docs/diagrams/system-architecture.drawio` — Editable source for the architecture diagram
- `docs/diagrams/system-architecture.png` — System architecture diagram (image)
- `docs/diagrams/use-case-diagram.png` — Use case diagram (image)
- `docs/screenshots/admin/.gitkeep` — Admin dashboard screenshots go here
- `docs/screenshots/customer/.gitkeep` — Customer-facing UI screenshots go here

## frontend/

- `frontend/.env.dev` — Frontend dev environment variables
- `frontend/.env.local` — Local overrides (gitignored)
- `frontend/.env.production` — Frontend production environment variables
- `frontend/.gitignore` — Frontend-specific git ignore rules
- `frontend/eslint.config.js` — ESLint rules for the frontend
- `frontend/index.html` — Vite HTML entry point
- `frontend/package-lock.json` — Locked frontend dependency versions
- `frontend/package.json` — Frontend dependencies & scripts
- `frontend/postcss.config.js` — PostCSS config (Tailwind pipeline)
- `frontend/public/favicon.ico` — Browser tab icon
- `frontend/public/images/.gitkeep` — Static image assets
- `frontend/public/logo.svg` — App logo asset
- `frontend/src/App.tsx` — Root component: providers + router
- `frontend/src/api/analytics.api.ts` — Analytics endpoint calls
- `frontend/src/api/assistant.api.ts` — AI shopping assistant endpoint calls
- `frontend/src/api/auth.api.ts` — Login/register/refresh endpoint calls
- `frontend/src/api/axios.ts` — Configured axios instance (base URL, auth interceptor)
- `frontend/src/api/forecast.api.ts` — Forecast endpoint calls
- `frontend/src/api/recommendations.api.ts` — Recommendation endpoint calls
- `frontend/src/components/analytics/FunnelChart.tsx` — Conversion funnel chart
- `frontend/src/components/analytics/SalesChart.tsx` — Sales trend chart
- `frontend/src/components/analytics/SegmentChart.tsx` — User segment breakdown chart
- `frontend/src/components/analytics/StatCard.tsx` — Single KPI stat tile
- `frontend/src/components/common/Button.tsx` — Reusable button component
- `frontend/src/components/common/EmptyState.tsx` — Empty list/data placeholder
- `frontend/src/components/common/ErrorState.tsx` — Error display placeholder
- `frontend/src/components/common/Input.tsx` — Reusable form input component
- `frontend/src/components/common/Modal.tsx` — Reusable modal/dialog component
- `frontend/src/components/common/Skeleton.tsx` — Loading skeleton placeholder
- `frontend/src/components/common/Spinner.tsx` — Loading spinner
- `frontend/src/components/forecast/ForecastChart.tsx` — Demand forecast line chart
- `frontend/src/components/forecast/ForecastTable.tsx` — Tabular forecast data
- `frontend/src/components/forecast/RestockSuggestion.tsx` — Suggested restock quantity display
- `frontend/src/components/forecast/StockRiskBadge.tsx` — Stock-out risk indicator badge
- `frontend/src/components/layout/AdminLayout.tsx` — Admin dashboard layout wrapper
- `frontend/src/components/layout/Footer.tsx` — Site footer
- `frontend/src/components/layout/Navbar.tsx` — Top navigation bar
- `frontend/src/components/layout/Sidebar.tsx` — Sidebar navigation
- `frontend/src/components/recommendations/RecommendationCard.tsx` — Single recommendation card
- `frontend/src/components/recommendations/RecommendationReason.tsx` — Shows why a product was recommended
- `frontend/src/components/recommendations/RecommendationSection.tsx` — "Recommended for you" section
- `frontend/src/components/recommendations/SimilarProducts.tsx` — Similar/related products section
- `frontend/src/features/analytics/.gitkeep` — Analytics-scoped feature logic
- `frontend/src/features/assistant/.gitkeep` — AI assistant-scoped feature logic
- `frontend/src/features/auth/.gitkeep` — Auth-scoped feature logic (slices/hooks/components)
- `frontend/src/features/forecast/.gitkeep` — Forecast-scoped feature logic
- `frontend/src/features/inventory/.gitkeep` — Inventory-scoped feature logic
- `frontend/src/features/recommendations/.gitkeep` — Recommendations-scoped feature logic
- `frontend/src/hooks/useAnalytics.ts` — Analytics fetching hook
- `frontend/src/hooks/useAuth.ts` — Auth state/actions hook
- `frontend/src/hooks/useForecast.ts` — Forecast fetching hook
- `frontend/src/hooks/useRecommendations.ts` — Recommendation fetching hook
- `frontend/src/index.css` — Global styles + Tailwind imports
- `frontend/src/lib/constants.ts` — App-wide constants
- `frontend/src/lib/query-client.ts` — React Query client instance
- `frontend/src/main.tsx` — React app entry point, mounts <App/>
- `frontend/src/pages/admin/Analytics.tsx` — Admin analytics dashboard
- `frontend/src/pages/admin/Dashboard.tsx` — Admin overview dashboard
- `frontend/src/pages/admin/Forecast.tsx` — Admin demand forecast view
- `frontend/src/pages/admin/Inventory.tsx` — Admin inventory/stock view
- `frontend/src/pages/admin/Recommendations.tsx` — Admin recommendation performance view
- `frontend/src/pages/admin/Settings.tsx` — Admin settings page
- `frontend/src/pages/auth/ForgotPassword.tsx` — Password reset page
- `frontend/src/pages/auth/Login.tsx` — Login page
- `frontend/src/pages/auth/Register.tsx` — Registration page
- `frontend/src/pages/customer/Assistant.tsx` — AI shopping assistant chat page
- `frontend/src/pages/customer/Home.tsx` — Landing page: hero, trending, recommendations
- `frontend/src/pages/customer/Profile.tsx` — User profile/settings page
- `frontend/src/routes/AdminRoute.tsx` — Admin-role-guarded route wrapper
- `frontend/src/routes/AppRoutes.tsx` — Top-level route definitions
- `frontend/src/routes/ProtectedRoute.tsx` — Auth-guarded route wrapper
- `frontend/src/store/auth.store.ts` — Auth/user global state
- `frontend/src/store/ui.store.ts` — UI state: modals, theme, sidebar
- `frontend/src/types/analytics.types.ts` — Analytics-related TS types
- `frontend/src/types/auth.types.ts` — Auth-related TS types
- `frontend/src/types/forecast.types.ts` — Forecast-related TS types
- `frontend/src/types/recommendation.types.ts` — Recommendation-related TS types
- `frontend/src/utils/formatCurrency.ts` — Currency formatting helper
- `frontend/src/utils/formatDate.ts` — Date formatting helper
- `frontend/src/utils/session.ts` — Session/anon-id helper
- `frontend/src/utils/storage.ts` — localStorage wrapper
- `frontend/tailwind.config.js` — Tailwind theme/config
- `frontend/tsconfig.app.json` — TypeScript config for app source
- `frontend/tsconfig.json` — TypeScript base config
- `frontend/tsconfig.node.json` — TypeScript config for Vite/node tooling
- `frontend/vite.config.ts` — Vite build/dev-server config

## backend/

- `backend/.env.dev` — Backend dev environment variables
- `backend/.env.local` — Local overrides (gitignored)
- `backend/.env.production` — Backend production environment variables
- `backend/.eslintrc.js` — ESLint rules for the backend
- `backend/.gitignore` — Backend-specific git ignore rules
- `backend/.prettierrc` — Prettier formatting config
- `backend/README.md` — Backend service overview and setup instructions
- `backend/nest-cli.json` — Nest CLI project config
- `backend/package-lock.json` — Locked backend dependency versions
- `backend/package.json` — Backend dependencies & scripts
- `backend/scripts/dev-memory.ts` — Dev utility: memory usage inspection
- `backend/scripts/seed-users.ts` — Seeds demo users into MongoDB
- `backend/src/app.controller.ts` — Root controller (health check)
- `backend/src/app.module.ts` — Root Nest module, wires all feature modules
- `backend/src/app.service.ts` — Root service
- `backend/src/common/decorators/current-user.decorator.ts` — Extracts the authenticated user from the request
- `backend/src/common/decorators/roles.decorator.ts` — @Roles() metadata decorator
- `backend/src/common/dto/pagination-query.dto.ts` — Shared pagination query params
- `backend/src/common/filters/http-exception.filter.ts` — Uniform error response shape
- `backend/src/common/guards/jwt-auth.guard.ts` — Protects routes requiring a valid access token
- `backend/src/common/guards/refresh-auth.guard.ts` — Validates refresh token on /auth/refresh
- `backend/src/common/guards/roles.guard.ts` — Enforces @Roles() role-based access
- `backend/src/common/interceptors/logging.interceptor.ts` — Request/response logging
- `backend/src/common/ml-client/ml-client.service.ts` — HttpService wrapper: timeout + fallback for ML calls
- `backend/src/common/pipes/validation.pipe.ts` — Global class-validator pipe
- `backend/src/common/strategies/jwt.strategy.ts` — Passport JWT access-token strategy
- `backend/src/common/strategies/refresh-jwt.strategy.ts` — Passport JWT refresh-token strategy
- `backend/src/config/database.config.ts` — MongooseModule.forRoot config
- `backend/src/config/env.validation.ts` — Validates required env vars on boot
- `backend/src/config/jwt.config.ts` — JWT secret/expiry config
- `backend/src/config/ml.config.ts` — ML service base URL + timeout config
- `backend/src/main.ts` — App bootstrap
- `backend/src/modules/admin/admin.module.ts` — Admin feature module
- `backend/src/modules/admin/controller/admin.controller.ts` — Cross-module admin endpoints
- `backend/src/modules/admin/service/admin.service.ts` — Admin business logic
- `backend/src/modules/analytics/analytics.module.ts` — Analytics feature module
- `backend/src/modules/analytics/controller/analytics.controller.ts` — Analytics endpoints
- `backend/src/modules/analytics/service/analytics.service.ts` — Aggregation pipelines: funnel, top products, segments
- `backend/src/modules/assistant/assistant.module.ts` — AI shopping assistant feature module
- `backend/src/modules/assistant/controller/assistant.controller.ts` — Assistant chat endpoints
- `backend/src/modules/assistant/service/assistant.service.ts` — Assistant business logic (LLM orchestration)
- `backend/src/modules/auth/auth.module.ts` — Auth feature module
- `backend/src/modules/auth/controller/auth.controller.ts` — Register/login/refresh endpoints
- `backend/src/modules/auth/dto/login.dto.ts` — Login request payload validation
- `backend/src/modules/auth/dto/refresh.dto.ts` — Refresh token request validation
- `backend/src/modules/auth/dto/register.dto.ts` — Register request payload validation
- `backend/src/modules/auth/service/auth.service.ts` — Auth business logic + JWT issuing
- `backend/src/modules/forecast/controller/forecast.controller.ts` — Forecast endpoints
- `backend/src/modules/forecast/forecast.module.ts` — Forecast feature module
- `backend/src/modules/forecast/schema/forecast.schema.ts` — Stored forecast predictions schema
- `backend/src/modules/forecast/schema/sales-daily.schema.ts` — Daily sales aggregate (forecasting training data)
- `backend/src/modules/forecast/schema/stock-alert.schema.ts` — Low-stock risk alert schema
- `backend/src/modules/forecast/service/forecast.service.ts` — ML forecast call + risk flag logic
- `backend/src/modules/inventory/controller/inventory.controller.ts` — Stock level endpoints
- `backend/src/modules/inventory/inventory.module.ts` — Inventory feature module
- `backend/src/modules/inventory/service/inventory.service.ts` — Inventory business logic
- `backend/src/modules/notifications/controller/notifications.controller.ts` — Notification endpoints
- `backend/src/modules/notifications/notifications.module.ts` — Notifications feature module
- `backend/src/modules/notifications/service/notifications.service.ts` — Low-stock alert + status notification logic
- `backend/src/modules/recommendations/controller/recommendations.controller.ts` — Recommendation endpoints
- `backend/src/modules/recommendations/recommendations.module.ts` — Recommendations feature module
- `backend/src/modules/recommendations/schema/recommendation.schema.ts` — Precomputed recommendation cache schema
- `backend/src/modules/recommendations/service/recommendations.service.ts` — ML call → cache → fallback to popular
- `backend/src/modules/users/controller/users.controller.ts` — User profile endpoints
- `backend/src/modules/users/dto/update-profile.dto.ts` — Profile update payload validation
- `backend/src/modules/users/schema/user.schema.ts` — User Mongoose schema
- `backend/src/modules/users/service/users.service.ts` — User business logic
- `backend/src/modules/users/users.module.ts` — Users feature module
- `backend/test/app.e2e-spec.ts` — Root e2e smoke test
- `backend/test/auth.e2e-spec.ts` — Auth flow e2e test
- `backend/test/jest-e2e.json` — Jest e2e test config
- `backend/tsconfig.build.json` — TypeScript build-only config
- `backend/tsconfig.json` — TypeScript base config

## ml-service/

- `ml-service/.env` — ML service environment variables
- `ml-service/.gitignore` — ML service git ignore rules
- `ml-service/Dockerfile` — ML service container build
- `ml-service/README.md` — ML service overview and setup instructions
- `ml-service/app/__init__.py` — Marks app as a Python package
- `ml-service/app/core/config.py` — App settings (env-based)
- `ml-service/app/core/database.py` — MongoDB connection for the ML service
- `ml-service/app/core/logging.py` — Logging setup
- `ml-service/app/features/feature_utils.py` — Shared feature-engineering helpers
- `ml-service/app/features/forecasting_features.py` — Feature engineering for forecasting
- `ml-service/app/features/recommendation_features.py` — Feature engineering for recommendations
- `ml-service/app/main.py` — FastAPI app entry point
- `ml-service/app/models/forecasting/.gitkeep` — Trained forecasting model artifacts
- `ml-service/app/models/recommender/.gitkeep` — Trained recommender model artifacts
- `ml-service/app/routers/forecast.py` — POST /ml/forecast endpoint
- `ml-service/app/routers/health.py` — GET /health endpoint
- `ml-service/app/routers/recommend.py` — POST /ml/recommend endpoint
- `ml-service/app/routers/similar.py` — GET /ml/similar/{productId} endpoint
- `ml-service/app/routers/train.py` — Internal model retrain trigger endpoint
- `ml-service/app/schemas/forecast.py` — Pydantic request/response models for forecasting
- `ml-service/app/schemas/recommendation.py` — Pydantic request/response models for recommendations
- `ml-service/app/schemas/training.py` — Pydantic request/response models for training
- `ml-service/app/services/collaborative.py` — Collaborative filtering recommender
- `ml-service/app/services/content_based.py` — Content-based similarity recommender
- `ml-service/app/services/forecaster.py` — Demand forecasting logic
- `ml-service/app/services/hybrid.py` — Hybrid recommendation strategy
- `ml-service/app/services/model_loader.py` — Loads trained model artifacts from disk
- `ml-service/app/services/recommender.py` — Top-level recommendation orchestration
- `ml-service/notebooks/01_data_exploration.ipynb` — Exploratory data analysis
- `ml-service/notebooks/02_recommendation_baseline.ipynb` — Popularity-based baseline recommender
- `ml-service/notebooks/03_content_based.ipynb` — Content-based recommender experiments
- `ml-service/notebooks/04_collaborative_filtering.ipynb` — Collaborative filtering experiments
- `ml-service/notebooks/05_hybrid_recommendation.ipynb` — Hybrid recommendation experiments
- `ml-service/notebooks/06_forecasting_baseline.ipynb` — Moving-average forecasting baseline
- `ml-service/notebooks/07_forecasting_lightgbm.ipynb` — LightGBM forecasting experiments
- `ml-service/requirements-dev.txt` — Python dev/test dependencies
- `ml-service/requirements.txt` — Python runtime dependencies
- `ml-service/tests/test_features.py` — Unit tests for feature engineering
- `ml-service/tests/test_forecaster.py` — Unit tests for forecaster service
- `ml-service/tests/test_recommender.py` — Unit tests for recommender services
- `ml-service/training/evaluate_models.py` — Offline evaluation: MAE/RMSE/MAPE, precision@k
- `ml-service/training/train_collaborative_model.py` — Trains the collaborative filtering model
- `ml-service/training/train_content_model.py` — Trains the content-based model
- `ml-service/training/train_forecast.py` — Trains the demand forecasting model
- `ml-service/training/train_hybrid_model.py` — Trains the hybrid recommendation model
- `ml-service/training/train_recommender.py` — Trains the recommendation model end-to-end

## data/

- `data/README.md` — Dataset sources, licensing, and folder layout
- `data/processed/events/.gitkeep` — Cleaned user event records
- `data/processed/features/.gitkeep` — Engineered feature tables
- `data/processed/products/.gitkeep` — Cleaned product records
- `data/processed/sales/.gitkeep` — Cleaned daily sales aggregates
- `data/raw/olist/.gitkeep` — Raw Olist dataset
- `data/raw/online-retail-ii/.gitkeep` — Raw Online Retail II dataset
- `data/raw/retailrocket/.gitkeep` — Raw RetailRocket dataset
- `data/seed/01_load_products.py` — Loads product catalog into MongoDB
- `data/seed/02_load_users.py` — Loads demo users into MongoDB
- `data/seed/03_load_events.py` — Loads user behavior events into MongoDB
- `data/seed/04_build_sales_daily.py` — Builds the sales_daily collection from raw sales
- `data/seed/05_synthetic_generator.py` — Generates synthetic data for gaps in real datasets

## scripts/ (root dev scripts)

- `scripts/health-check.ps1` — Pings all service health endpoints
- `scripts/seed-all.ps1` — Runs all seed scripts in order (Windows)
- `scripts/seed-all.sh` — Runs all seed scripts in order (Unix)
- `scripts/setup-dev.ps1` — One-time dev environment setup (Windows)
- `scripts/setup-dev.sh` — One-time dev environment setup (Unix)
- `scripts/start-all.ps1` — Starts frontend + backend + ml-service together (Windows)
- `scripts/start-all.sh` — Starts frontend + backend + ml-service together (Unix)

## deployment/

- `deployment/README.md` — Deployment overview
- `deployment/docker/backend.Dockerfile` — Backend container build
- `deployment/docker/frontend.Dockerfile` — Frontend container build
- `deployment/docker/ml.Dockerfile` — ML service container build
- `deployment/docker/nginx.conf` — Reverse proxy config for the docker build
- `deployment/monitoring/backup.sh` — MongoDB backup script
- `deployment/monitoring/health-check.sh` — Production health-check script
- `deployment/nginx/default.conf` — Default server block / routing rules
- `deployment/nginx/nginx.conf` — Base nginx config
- `deployment/production/backend.env.example` — Backend production env template
- `deployment/production/frontend.env.example` — Frontend production env template
- `deployment/production/ml.env.example` — ML service production env template

## tests/ (root)

- `tests/integration/auth-flow.test.ts` — Integration test: register → login → refresh
- `tests/integration/recommendation-flow.test.ts` — Integration test: event tracking → recommendation output
- `tests/postman/ecommerce-api.postman_collection.json` — Postman collection for manual API testing
- `tests/postman/environments/local.postman_environment.json` — Postman env vars for local testing
- `tests/postman/environments/production.postman_environment.json` — Postman env vars for production testing

## .vscode/

- `.vscode/extensions.json` — Recommended VS Code extensions
- `.vscode/launch.json` — Debug launch configs for backend/ml-service
- `.vscode/settings.json` — Shared editor settings for the repo
