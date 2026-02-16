# Cyber-Sleuth: Clean Architecture

## Project Structure

### Frontend (src/)
```
src/
├── components/
│   ├── Analysis/              # Analysis feature components
│   │   ├── AutoMode.tsx
│   │   ├── ManualMode.tsx
│   │   ├── PlatformSelect.tsx
│   │   ├── ModeSelect.tsx
│   │   └── AnalysisAnimation.tsx
│   ├── ui/                    # Reusable UI primitives
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── toast.tsx
│   │   ├── tooltip.tsx
│   │   └── ...
│   ├── HeroSection.tsx        # Landing component
│   ├── ResultsDashboard.tsx   # Results display
│   └── StepNav.tsx            # Navigation
├── pages/
│   ├── Index.tsx              # Main app
│   └── NotFound.tsx           # 404 page
├── hooks/                     # Custom React hooks
│   └── use-mobile.tsx
├── lib/                       # Utilities
│   └── utils.ts
├── services/                  # API services
│   └── api.ts
├── types/                     # TypeScript types
│   └── analysis.ts
├── App.tsx                    # Root component
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

### Backend (backend/)
```
backend/
├── app.py                     # Flask application
├── config.py                  # Configuration management
├── requirements.txt           # Python dependencies
├── nlp/                       # Natural Language Processing
│   ├── __init__.py
│   ├── analyzer.py            # Text analysis engine
│   ├── patterns.py            # NLP patterns & keywords
│   └── __pycache__/
├── ml/                        # Machine Learning
│   ├── __init__.py
│   ├── feature_engineer.py    # Feature extraction
│   ├── trust_score.py         # Trust scoring logic
│   └── __pycache__/
├── api/                       # API Routes
│   ├── __init__.py
│   ├── routes.py              # Endpoint definitions
│   └── __pycache__/
├── utils/                     # Utilities
│   ├── __init__.py
│   └── api_handler.py         # Social media API handler
├── venv/                      # Virtual environment
└── __pycache__/
```

## Architecture Principles

### Frontend
- **Modular Components**: Each feature has its own component folder
- **UI Separation**: Reusable UI primitives in `ui/` folder
- **Clean Imports**: Services handle API communication
- **Type Safety**: TypeScript types in `types/` folder

### Backend
- **Feature-Based**: Organized by responsibility (NLP, ML, API)
- **Separation of Concerns**:
  - `nlp/`: Text analysis logic
  - `ml/`: Machine learning & scoring
  - `api/`: HTTP endpoints
  - `utils/`: Helper functions
- **Clean Imports**: Modules export via `__init__.py`

## Key Files by Responsibility

### NLP Analysis
- `backend/nlp/analyzer.py`: Main NLP engine
- Detects spam keywords and suspicious patterns
- Returns risk scores (0-1 scale)

### ML Scoring
- `backend/ml/feature_engineer.py`: Extracts engagement metrics
- `backend/ml/trust_score.py`: Calculates weighted trust scores
- Provides detailed breakdowns

### API Layer
- `backend/api/routes.py`: Two main endpoints
  - `/api/analysis/auto`: Profile analysis via API
  - `/api/analysis/manual`: Manual verification
  - `/api/analysis/health`: Health check

## File Size Optimizations
- Minified Python code (83% reduction)
- Removed unused dependencies
- Removed unused UI components
- Optimized Vite build configuration

## Setup & Running

### Frontend
```sh
npm install
npm run dev
```

### Backend
```sh
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Unix
pip install -r requirements.txt
python app.py
```

## Technology Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Flask, Python, CORS
- **Analysis**: Custom NLP engine, Feature engineering, Trust scoring
