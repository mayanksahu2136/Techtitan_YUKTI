# 🛡️ Social Shield Backend

Backend API for the Social Shield fake account detection platform.

## 📁 Project Structure

```
backend/
├── app.py                 # Flask application entry point
├── config.py              # Configuration management
├── requirements.txt       # Python dependencies
├── .env.example           # Environment variables template
├── routes/
│   ├── __init__.py
│   └── analysis.py        # Analysis endpoints
├── modules/
│   ├── nlp_analyzer.py    # NLP text analysis
│   ├── feature_engineer.py # Feature extraction
│   └── trust_score.py     # Trust score calculation
└── utils/
    └── api_handler.py     # Social media API handlers
```

## 🚀 Getting Started

### 1. Setup Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your API keys
```

### 4. Run Development Server
```bash
# Set Flask environment
export FLASK_ENV=development  # On Windows: set FLASK_ENV=development

# Run the app
python app.py
```

Server will start at `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /api/analysis/health
```

### Auto Detection Mode
```
POST /api/analysis/auto
Content-Type: application/json

{
  "platform": "instagram",
  "profile_url": "https://instagram.com/username"
}
```

### Manual Verification Mode
```
POST /api/analysis/manual
Content-Type: multipart/form-data

{
  "platform": "instagram",
  "bio": "Digital creator",
  "username": "johndoe",
  "follower_count": 1000,
  "following_count": 500,
  "post_count": 50,
  "screenshots": [file1, file2, ...]
}
```

## 🧠 Core Modules

### NLP Analyzer
- Detects spam keywords
- Analyzes username patterns
- Identifies suspicious text patterns
- Returns NLP risk score (0-1)

### Feature Engineer
- Calculates engagement ratio
- Computes follower/following balance
- Analyzes post frequency
- Evaluates account age vs popularity

### Trust Score
- Weighted scoring system
- Transparent breakdown
- Risk level classification:
  - ✅ Safe (71-100)
  - ⚠️ Suspicious (41-70)
  - ❌ High Risk (0-40)

## 🔧 Configuration

### Environment Variables
- `FLASK_ENV`: development/production
- `DATABASE_URL`: Database connection string
- `INSTAGRAM_API_KEY`: Instagram API key
- `FACEBOOK_API_KEY`: Facebook API key
- `CORS_ORIGINS`: Allowed frontend origins

## 📚 Example Response

```json
{
  "success": true,
  "trust_score": 78,
  "risk_level": "safe",
  "breakdown": {
    "engagement": {
      "score": 0.9,
      "weight": 0.20,
      "reason": "Follower engagement analysis"
    },
    "follower_following": {
      "score": 0.85,
      "weight": 0.15,
      "reason": "Follower to following balance"
    },
    ...
  }
}
```

## 🛠️ Development Notes

- Uses mock data for prototyping
- Replace API handlers with real Instagram/Facebook Graph API calls
- NLP module is custom-built (no GPT/Gemini dependencies)
- Scoring is fully transparent and explainable

## 📝 Next Steps

1. ✅ Backend skeleton setup
2. Integrate Instagram/Facebook Graph APIs
3. Improve NLP model
4. Add database persistence 
5. Implement user sessions/caching
