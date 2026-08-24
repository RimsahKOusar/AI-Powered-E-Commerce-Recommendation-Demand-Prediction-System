# Project File Structure — `ecommerce-ai-platform`

Full monorepo layout actually scaffolded on disk (empty stub files, each with a one-line purpose comment where the file type supports it, shown inline below). Stack: **React + Vite** (frontend), **NestJS + Mongoose + MongoDB** (backend), **Python FastAPI** (ml-service).

> **Scope decision:** `categories`, `products`, `cart`, `wishlist`, `orders`, and `events` modules were intentionally left out of both `backend/` and `frontend/` — not an oversight. Add them back the same way (module/schema/controller/service/dto folders) if the catalog/checkout side gets built later.

```
ecommerce-ai-platform/
├── README.md  # Root project overview and quick-start
├── LICENSE  # Project license
├── .gitignore  # Root git ignore rules
├── .editorconfig  # Consistent editor formatting rules across the team
├── .prettierrc  # Prettier code formatting config
├── .prettierignore  # Files/folders excluded from Prettier formatting
├── .gitattributes  # Git line-ending and diff handling rules
├── .env.example  # Sample environment variables for the whole monorepo
├── docker-compose.yml  # Local dev orchestration: frontend + backend + ml-service + mongo
├── docker-compose.prod.yml  # Production orchestration for all services
├── .github/
│   ├── workflows/
│   │   ├── ci.yml  # Root CI: lint + test across all services on PR
│   │   ├── cd.yml  # Deployment pipeline to staging/production
│   │   ├── backend-ci.yml  # Backend-only build/test workflow
│   │   ├── frontend-ci.yml  # Frontend-only build/test workflow
│   │   └── ml-ci.yml  # ML service build/test workflow
│   ├── pull_request_template.md  # Checklist template shown when opening a PR
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md  # Template for reporting a bug
│   │   ├── feature_request.md  # Template for proposing a feature
│   │   └── ml-experiment.md  # Template for logging an ML experiment
│   └── dependabot.yml  # Automated dependency update config
├── docs/
│   ├── 01-proposal.md  # FYP project proposal document
│   ├── 02-srs.md  # Software Requirements Specification
│   ├── 03-architecture.md  # System architecture write-up
│   ├── 04-api-contract.md  # REST API endpoint contract (request/response shapes)
│   ├── 05-database-design.md  # MongoDB collection/schema design notes
│   ├── 06-ml-design.md  # ML model design: recommendation + forecasting approach
│   ├── 07-evaluation-results.md  # Offline evaluation metrics for the ML models
│   ├── 08-deployment.md  # Deployment guide for all services
│   ├── 09-testing.md  # Testing strategy across frontend/backend/ml-service
│   ├── 10-user-manual.md  # End-user manual / walkthrough
│   ├── diagrams/
│   │   ├── system-architecture.png  # System architecture diagram (image)
│   │   ├── system-architecture.drawio  # Editable source for the architecture diagram
│   │   ├── database-erd.png  # Entity-relationship diagram (image)
│   │   ├── database-erd.drawio  # Editable source for the ER diagram
│   │   ├── use-case-diagram.png  # Use case diagram (image)
│   │   ├── recommendation-flow.png  # Recommendation pipeline flow diagram
│   │   ├── forecasting-flow.png  # Forecasting pipeline flow diagram
│   │   ├── deployment-architecture.png  # Deployment architecture diagram
│   │   └── sequence-diagrams/
│   │       ├── login-sequence.png  # Login sequence diagram
│   │       ├── recommendation-sequence.png  # Recommendation request sequence diagram
│   │       ├── order-sequence.png  # Order placement sequence diagram
│   │       └── forecast-sequence.png  # Forecast generation sequence diagram
│   └── screenshots/
│       ├── customer/
│       │   └── .gitkeep  # Customer-facing UI screenshots go here
│       └── admin/
│           └── .gitkeep  # Admin dashboard screenshots go here
├── frontend/
│   ├── .env.dev  # Frontend dev environment variables
│   ├── .env.local  # Local overrides (gitignored)
│   ├── .env.production  # Frontend production environment variables
│   ├── .gitignore  # Frontend-specific git ignore rules
│   ├── index.html  # Vite HTML entry point
│   ├── package.json  # Frontend dependencies & scripts
│   ├── package-lock.json  # Locked frontend dependency versions
│   ├── tsconfig.json  # TypeScript base config
│   ├── tsconfig.app.json  # TypeScript config for app source
│   ├── tsconfig.node.json  # TypeScript config for Vite/node tooling
│   ├── vite.config.ts  # Vite build/dev-server config
│   ├── eslint.config.js  # ESLint rules for the frontend
│   ├── postcss.config.js  # PostCSS config (Tailwind pipeline)
│   ├── tailwind.config.js  # Tailwind theme/config
│   ├── public/
│   │   ├── favicon.ico  # Browser tab icon
│   │   ├── logo.svg  # App logo asset
│   │   └── images/
│   │       └── .gitkeep  # Static image assets
│   └── src/
│       ├── main.tsx  # React app entry point, mounts <App/>
│       ├── App.tsx  # Root component: providers + router
│       ├── index.css  # Global styles + Tailwind imports
│       ├── api/
│       │   ├── axios.ts  # Configured axios instance (base URL, auth interceptor)
│       │   ├── auth.api.ts  # Login/register/refresh endpoint calls
│       │   ├── analytics.api.ts  # Analytics endpoint calls
│       │   ├── forecast.api.ts  # Forecast endpoint calls
│       │   ├── assistant.api.ts  # AI shopping assistant endpoint calls
│       │   └── recommendations.api.ts  # Recommendation endpoint calls
│       ├── components/
│       │   ├── common/
│       │   │   ├── Button.tsx  # Reusable button component
│       │   │   ├── Input.tsx  # Reusable form input component
│       │   │   ├── Modal.tsx  # Reusable modal/dialog component
│       │   │   ├── Spinner.tsx  # Loading spinner
│       │   │   ├── Skeleton.tsx  # Loading skeleton placeholder
│       │   │   ├── EmptyState.tsx  # Empty list/data placeholder
│       │   │   └── ErrorState.tsx  # Error display placeholder
│       │   ├── layout/
│       │   │   ├── Navbar.tsx  # Top navigation bar
│       │   │   ├── Footer.tsx  # Site footer
│       │   │   ├── Sidebar.tsx  # Sidebar navigation
│       │   │   └── AdminLayout.tsx  # Admin dashboard layout wrapper
│       │   ├── analytics/
│       │   │   ├── StatCard.tsx  # Single KPI stat tile
│       │   │   ├── SalesChart.tsx  # Sales trend chart
│       │   │   ├── FunnelChart.tsx  # Conversion funnel chart
│       │   │   └── SegmentChart.tsx  # User segment breakdown chart
│       │   ├── forecast/
│       │   │   ├── ForecastChart.tsx  # Demand forecast line chart
│       │   │   ├── ForecastTable.tsx  # Tabular forecast data
│       │   │   ├── RestockSuggestion.tsx  # Suggested restock quantity display
│       │   │   └── StockRiskBadge.tsx  # Stock-out risk indicator badge
│       │   └── recommendations/
│       │       ├── RecommendationCard.tsx  # Single recommendation card
│       │       ├── RecommendationSection.tsx  # "Recommended for you" section
│       │       ├── RecommendationReason.tsx  # Shows why a product was recommended
│       │       └── SimilarProducts.tsx  # Similar/related products section
│       ├── features/
│       │   ├── auth/
│       │   │   └── .gitkeep  # Auth-scoped feature logic (slices/hooks/components)
│       │   ├── recommendations/
│       │   │   └── .gitkeep  # Recommendations-scoped feature logic
│       │   ├── analytics/
│       │   │   └── .gitkeep  # Analytics-scoped feature logic
│       │   ├── forecast/
│       │   │   └── .gitkeep  # Forecast-scoped feature logic
│       │   ├── inventory/
│       │   │   └── .gitkeep  # Inventory-scoped feature logic
│       │   └── assistant/
│       │       └── .gitkeep  # AI assistant-scoped feature logic
│       ├── pages/
│       │   ├── customer/
│       │   │   ├── Home.tsx  # Landing page: hero, trending, recommendations
│       │   │   ├── Profile.tsx  # User profile/settings page
│       │   │   └── Assistant.tsx  # AI shopping assistant chat page
│       │   ├── auth/
│       │   │   ├── Login.tsx  # Login page
│       │   │   ├── Register.tsx  # Registration page
│       │   │   └── ForgotPassword.tsx  # Password reset page
│       │   └── admin/
│       │       ├── Dashboard.tsx  # Admin overview dashboard
│       │       ├── Recommendations.tsx  # Admin recommendation performance view
│       │       ├── Analytics.tsx  # Admin analytics dashboard
│       │       ├── Forecast.tsx  # Admin demand forecast view
│       │       ├── Inventory.tsx  # Admin inventory/stock view
│       │       └── Settings.tsx  # Admin settings page
│       ├── hooks/
│       │   ├── useAuth.ts  # Auth state/actions hook
│       │   ├── useForecast.ts  # Forecast fetching hook
│       │   ├── useAnalytics.ts  # Analytics fetching hook
│       │   └── useRecommendations.ts  # Recommendation fetching hook
│       ├── store/
│       │   ├── auth.store.ts  # Auth/user global state
│       │   └── ui.store.ts  # UI state: modals, theme, sidebar
│       ├── routes/
│       │   ├── AppRoutes.tsx  # Top-level route definitions
│       │   ├── ProtectedRoute.tsx  # Auth-guarded route wrapper
│       │   └── AdminRoute.tsx  # Admin-role-guarded route wrapper
│       ├── types/
│       │   ├── auth.types.ts  # Auth-related TS types
│       │   ├── recommendation.types.ts  # Recommendation-related TS types
│       │   ├── forecast.types.ts  # Forecast-related TS types
│       │   └── analytics.types.ts  # Analytics-related TS types
│       ├── utils/
│       │   ├── formatCurrency.ts  # Currency formatting helper
│       │   ├── formatDate.ts  # Date formatting helper
│       │   ├── storage.ts  # localStorage wrapper
│       │   └── session.ts  # Session/anon-id helper
│       └── lib/
│           ├── query-client.ts  # React Query client instance
│           └── constants.ts  # App-wide constants
├── backend/
│   ├── .env.dev  # Backend dev environment variables
│   ├── .env.local  # Local overrides (gitignored)
│   ├── .env.production  # Backend production environment variables
│   ├── .eslintrc.js  # ESLint rules for the backend
│   ├── .prettierrc  # Prettier formatting config
│   ├── .gitignore  # Backend-specific git ignore rules
│   ├── README.md  # Backend service overview and setup instructions
│   ├── nest-cli.json  # Nest CLI project config
│   ├── package.json  # Backend dependencies & scripts
│   ├── package-lock.json  # Locked backend dependency versions
│   ├── tsconfig.json  # TypeScript base config
│   ├── tsconfig.build.json  # TypeScript build-only config
│   ├── scripts/
│   │   ├── dev-memory.ts  # Dev utility: memory usage inspection
│   │   └── seed-users.ts  # Seeds demo users into MongoDB
│   ├── test/
│   │   ├── app.e2e-spec.ts  # Root e2e smoke test
│   │   ├── auth.e2e-spec.ts  # Auth flow e2e test
│   │   └── jest-e2e.json  # Jest e2e test config
│   └── src/
│       ├── main.ts  # App bootstrap
│       ├── app.module.ts  # Root Nest module, wires all feature modules
│       ├── app.controller.ts  # Root controller (health check)
│       ├── app.service.ts  # Root service
│       ├── modules/
│       │   ├── auth/
│       │   │   ├── auth.module.ts  # Auth feature module
│       │   │   ├── controller/
│       │   │   │   └── auth.controller.ts  # Register/login/refresh endpoints
│       │   │   ├── service/
│       │   │   │   └── auth.service.ts  # Auth business logic + JWT issuing
│       │   │   └── dto/
│       │   │       ├── register.dto.ts  # Register request payload validation
│       │   │       ├── login.dto.ts  # Login request payload validation
│       │   │       └── refresh.dto.ts  # Refresh token request validation
│       │   ├── users/
│       │   │   ├── users.module.ts  # Users feature module
│       │   │   ├── schema/
│       │   │   │   └── user.schema.ts  # User Mongoose schema
│       │   │   ├── controller/
│       │   │   │   └── users.controller.ts  # User profile endpoints
│       │   │   ├── service/
│       │   │   │   └── users.service.ts  # User business logic
│       │   │   └── dto/
│       │   │       └── update-profile.dto.ts  # Profile update payload validation
│       │   ├── recommendations/
│       │   │   ├── recommendations.module.ts  # Recommendations feature module
│       │   │   ├── schema/
│       │   │   │   └── recommendation.schema.ts  # Precomputed recommendation cache schema
│       │   │   ├── controller/
│       │   │   │   └── recommendations.controller.ts  # Recommendation endpoints
│       │   │   └── service/
│       │   │       └── recommendations.service.ts  # ML call -> cache -> fallback to popular
│       │   ├── forecast/
│       │   │   ├── forecast.module.ts  # Forecast feature module
│       │   │   ├── schema/
│       │   │   │   ├── sales-daily.schema.ts  # Daily sales aggregate (forecasting training data)
│       │   │   │   ├── forecast.schema.ts  # Stored forecast predictions schema
│       │   │   │   └── stock-alert.schema.ts  # Low-stock risk alert schema
│       │   │   ├── controller/
│       │   │   │   └── forecast.controller.ts  # Forecast endpoints
│       │   │   └── service/
│       │   │       └── forecast.service.ts  # ML forecast call + risk flag logic
│       │   ├── analytics/
│       │   │   ├── analytics.module.ts  # Analytics feature module
│       │   │   ├── controller/
│       │   │   │   └── analytics.controller.ts  # Analytics endpoints
│       │   │   └── service/
│       │   │       └── analytics.service.ts  # Aggregation pipelines: funnel, top products, segments
│       │   ├── inventory/
│       │   │   ├── inventory.module.ts  # Inventory feature module
│       │   │   ├── controller/
│       │   │   │   └── inventory.controller.ts  # Stock level endpoints
│       │   │   └── service/
│       │   │       └── inventory.service.ts  # Inventory business logic
│       │   ├── notifications/
│       │   │   ├── notifications.module.ts  # Notifications feature module
│       │   │   ├── controller/
│       │   │   │   └── notifications.controller.ts  # Notification endpoints
│       │   │   └── service/
│       │   │       └── notifications.service.ts  # Low-stock alert + status notification logic
│       │   ├── admin/
│       │   │   ├── admin.module.ts  # Admin feature module
│       │   │   ├── controller/
│       │   │   │   └── admin.controller.ts  # Cross-module admin endpoints
│       │   │   └── service/
│       │   │       └── admin.service.ts  # Admin business logic
│       │   └── assistant/
│       │       ├── assistant.module.ts  # AI shopping assistant feature module
│       │       ├── controller/
│       │       │   └── assistant.controller.ts  # Assistant chat endpoints
│       │       └── service/
│       │           └── assistant.service.ts  # Assistant business logic (LLM orchestration)
│       ├── common/
│       │   ├── guards/
│       │   │   ├── jwt-auth.guard.ts  # Protects routes requiring a valid access token
│       │   │   ├── refresh-auth.guard.ts  # Validates refresh token on /auth/refresh
│       │   │   └── roles.guard.ts  # Enforces @Roles() role-based access
│       │   ├── strategies/
│       │   │   ├── jwt.strategy.ts  # Passport JWT access-token strategy
│       │   │   └── refresh-jwt.strategy.ts  # Passport JWT refresh-token strategy
│       │   ├── decorators/
│       │   │   ├── roles.decorator.ts  # @Roles() metadata decorator
│       │   │   └── current-user.decorator.ts  # Extracts the authenticated user from the request
│       │   ├── interceptors/
│       │   │   └── logging.interceptor.ts  # Request/response logging
│       │   ├── filters/
│       │   │   └── http-exception.filter.ts  # Uniform error response shape
│       │   ├── pipes/
│       │   │   └── validation.pipe.ts  # Global class-validator pipe
│       │   ├── dto/
│       │   │   └── pagination-query.dto.ts  # Shared pagination query params
│       │   └── ml-client/
│       │       └── ml-client.service.ts  # HttpService wrapper: timeout + fallback for ML calls
│       └── config/
│           ├── database.config.ts  # MongooseModule.forRoot config
│           ├── jwt.config.ts  # JWT secret/expiry config
│           ├── ml.config.ts  # ML service base URL + timeout config
│           └── env.validation.ts  # Validates required env vars on boot
├── ml-service/
│   ├── .env  # ML service environment variables
│   ├── .gitignore  # ML service git ignore rules
│   ├── Dockerfile  # ML service container build
│   ├── README.md  # ML service overview and setup instructions
│   ├── requirements.txt  # Python runtime dependencies
│   ├── requirements-dev.txt  # Python dev/test dependencies
│   ├── app/
│   │   ├── __init__.py  # Marks app as a Python package
│   │   ├── main.py  # FastAPI app entry point
│   │   ├── routers/
│   │   │   ├── health.py  # GET /health endpoint
│   │   │   ├── recommend.py  # POST /ml/recommend endpoint
│   │   │   ├── similar.py  # GET /ml/similar/{productId} endpoint
│   │   │   ├── forecast.py  # POST /ml/forecast endpoint
│   │   │   └── train.py  # Internal model retrain trigger endpoint
│   │   ├── schemas/
│   │   │   ├── recommendation.py  # Pydantic request/response models for recommendations
│   │   │   ├── forecast.py  # Pydantic request/response models for forecasting
│   │   │   └── training.py  # Pydantic request/response models for training
│   │   ├── services/
│   │   │   ├── recommender.py  # Top-level recommendation orchestration
│   │   │   ├── content_based.py  # Content-based similarity recommender
│   │   │   ├── collaborative.py  # Collaborative filtering recommender
│   │   │   ├── hybrid.py  # Hybrid recommendation strategy
│   │   │   ├── forecaster.py  # Demand forecasting logic
│   │   │   └── model_loader.py  # Loads trained model artifacts from disk
│   │   ├── features/
│   │   │   ├── recommendation_features.py  # Feature engineering for recommendations
│   │   │   ├── forecasting_features.py  # Feature engineering for forecasting
│   │   │   └── feature_utils.py  # Shared feature-engineering helpers
│   │   ├── models/
│   │   │   ├── recommender/
│   │   │   │   └── .gitkeep  # Trained recommender model artifacts
│   │   │   └── forecasting/
│   │   │       └── .gitkeep  # Trained forecasting model artifacts
│   │   └── core/
│   │       ├── config.py  # App settings (env-based)
│   │       ├── database.py  # MongoDB connection for the ML service
│   │       └── logging.py  # Logging setup
│   ├── training/
│   │   ├── train_recommender.py  # Trains the recommendation model end-to-end
│   │   ├── train_content_model.py  # Trains the content-based model
│   │   ├── train_collaborative_model.py  # Trains the collaborative filtering model
│   │   ├── train_hybrid_model.py  # Trains the hybrid recommendation model
│   │   ├── train_forecast.py  # Trains the demand forecasting model
│   │   └── evaluate_models.py  # Offline evaluation: MAE/RMSE/MAPE, precision@k
│   ├── notebooks/
│   │   ├── 01_data_exploration.ipynb  # Exploratory data analysis
│   │   ├── 02_recommendation_baseline.ipynb  # Popularity-based baseline recommender
│   │   ├── 03_content_based.ipynb  # Content-based recommender experiments
│   │   ├── 04_collaborative_filtering.ipynb  # Collaborative filtering experiments
│   │   ├── 05_hybrid_recommendation.ipynb  # Hybrid recommendation experiments
│   │   ├── 06_forecasting_baseline.ipynb  # Moving-average forecasting baseline
│   │   └── 07_forecasting_lightgbm.ipynb  # LightGBM forecasting experiments
│   └── tests/
│       ├── test_recommender.py  # Unit tests for recommender services
│       ├── test_forecaster.py  # Unit tests for forecaster service
│       └── test_features.py  # Unit tests for feature engineering
├── data/
│   ├── README.md  # Dataset sources, licensing, and folder layout
│   ├── raw/
│   │   ├── retailrocket/
│   │   │   └── .gitkeep  # Raw RetailRocket dataset
│   │   ├── online-retail-ii/
│   │   │   └── .gitkeep  # Raw Online Retail II dataset
│   │   └── olist/
│   │       └── .gitkeep  # Raw Olist dataset
│   ├── processed/
│   │   ├── products/
│   │   │   └── .gitkeep  # Cleaned product records
│   │   ├── events/
│   │   │   └── .gitkeep  # Cleaned user event records
│   │   ├── sales/
│   │   │   └── .gitkeep  # Cleaned daily sales aggregates
│   │   └── features/
│   │       └── .gitkeep  # Engineered feature tables
│   └── seed/
│       ├── 01_load_products.py  # Loads product catalog into MongoDB
│       ├── 02_load_users.py  # Loads demo users into MongoDB
│       ├── 03_load_events.py  # Loads user behavior events into MongoDB
│       ├── 04_build_sales_daily.py  # Builds the sales_daily collection from raw sales
│       └── 05_synthetic_generator.py  # Generates synthetic data for gaps in real datasets
├── scripts/
│   ├── setup-dev.ps1  # One-time dev environment setup (Windows)
│   ├── setup-dev.sh  # One-time dev environment setup (Unix)
│   ├── start-all.ps1  # Starts frontend + backend + ml-service together (Windows)
│   ├── start-all.sh  # Starts frontend + backend + ml-service together (Unix)
│   ├── seed-all.ps1  # Runs all seed scripts in order (Windows)
│   ├── seed-all.sh  # Runs all seed scripts in order (Unix)
│   └── health-check.ps1  # Pings all service health endpoints
├── deployment/
│   ├── README.md  # Deployment overview
│   ├── docker/
│   │   ├── backend.Dockerfile  # Backend container build
│   │   ├── frontend.Dockerfile  # Frontend container build
│   │   ├── ml.Dockerfile  # ML service container build
│   │   └── nginx.conf  # Reverse proxy config for the docker build
│   ├── nginx/
│   │   ├── nginx.conf  # Base nginx config
│   │   └── default.conf  # Default server block / routing rules
│   ├── production/
│   │   ├── backend.env.example  # Backend production env template
│   │   ├── frontend.env.example  # Frontend production env template
│   │   └── ml.env.example  # ML service production env template
│   └── monitoring/
│       ├── health-check.sh  # Production health-check script
│       └── backup.sh  # MongoDB backup script
├── tests/
│   ├── postman/
│   │   ├── ecommerce-api.postman_collection.json  # Postman collection for manual API testing
│   │   └── environments/
│   │       ├── local.postman_environment.json  # Postman env vars for local testing
│   │       └── production.postman_environment.json  # Postman env vars for production testing
│   └── integration/
│       ├── auth-flow.test.ts  # Integration test: register -> login -> refresh
│       └── recommendation-flow.test.ts  # Integration test: event tracking -> recommendation output
└── .vscode/
    ├── settings.json  # Shared editor settings for the repo
    ├── extensions.json  # Recommended VS Code extensions
    └── launch.json  # Debug launch configs for backend/ml-service
```
