# Cyber Sleuth - Social Media Account Authenticity Analyzer

A full-stack application that analyzes social media profiles (Instagram, Facebook) to detect fake accounts, bots, and suspicious behavior patterns using ML and NLP analysis. and give analysis ang give final results

## 🎯 Features

- **Auto Mode**: Enter a username for instant analysis/ final
- 
- **Manual Mode**: Supply profile details and screenshots for detailed assessment
- **Trust Score**: 0-100 score indicating account authenticity
- **Risk Levels**: HIGH RISK, POTENTIALLY FAKE, or LIKELY REAL
- **Detailed Breakdown**: View analysis of engagement, followers, likes, posting patterns, bio consistency, and text analysis
- **Real-time Processing**: Get results in seconds space

## 🏗️ Architecture

### Frontend (React + TypeScript + Vite)
- Modern UI with cyberpunk aesthetic fly
- Real-time API integration
- Type-safe components
- Responsive design + responses maygam school the  the done
- maygam problm statement 

### Backend (Flask + Python)
- RESTful API with CORS support
- NLP text analysis
- ML-based trust scoring
- Feature engineering for pattern detection with allowing wheels criteria 

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- alex

### Setup & Run

1. **Clone and Install**
```bash
npm install
cd backend && pip install -r requirements.txt
```

2. **Start Backend** (Terminal 1)
```bash
cd backend
venv\Scripts\activate.ps1  # Windows
python app.py
# Backend runs on http://localhost:5000
```

3. **Start Frontend** (Terminal 2)
```bash
npm run dev
# Frontend runs on http://localhost:8082
```

4. **Open Browser**
Navigate to `http://localhost:8082`

## 📋 For Hackathon

**⚡ READY FOR DEPLOYMENT**

See [HACKATHON_SETUP.md](HACKATHON_SETUP.md) for:
- Complete integration guide
- API endpoint documentation
- Environment configuration
- Testing checklist
- Deployment instructions

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Analysis/
│   │   │   ├── AutoMode.tsx
│   │   │   ├── ManualMode.tsx
│   │   │   └── ...
│   │   └── ResultsDashboard.tsx
│   ├── pages/
│   │   └── Index.tsx
│   ├── services/
│   │   └── api.ts
│   └── ...
├── backend/
│   ├── api/
│   │   └── routes.py
│   ├── ml/
│   │   ├── feature_engineer.py
│   │   └── trust_score.py
│   ├── nlp/
│   │   └── analyzer.py
│   ├── utils/
│   │   └── api_handler.py
│   └── app.py
├── HACKATHON_SETUP.md
└── README.md
```

## 🔌 API Endpoints

### Health Check
```
GET /api/analysis/health
```

### Auto Analysis
```
POST /api/analysis/auto
Content-Type: application/json

{
  "platform": "instagram|facebook",
  "profile_url": "https://instagram.com/username"
}
```

### Manual Analysis
```
POST /api/analysis/manual
Content-Type: multipart/form-data

{
  "platform": "instagram|facebook",
  "username": "@username",
  "bio": "Account bio here",
  "follower_count": 1250,
  "following_count": 450,
  "post_count": 145,
  "screenshots": [file1, file2, file3, file4]
}
```

## 🔧 Environment Variables

Create `.env.local` in project root:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

Create `backend/.env`:
```
FLASK_ENV=development
FLASK_PORT=5000
CORS_ORIGINS=http://localhost:8082
```

## 📊 Analysis Factors

- **Engagement Ratio**: Posts vs engagement metrics
- **Follower/Following Balance**: Account growth patterns
- **Post Frequency**: Consistency of posting behavior
- **Account Age**: Time since creation vs follower count
- **Bio Consistency**: Username and bio coherence
- **NLP Analysis**: Spam keywords and suspicious patterns

## 🛠️ Build & Deploy

### Development
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

### Production
```bash
npm run build
# Deploy dist/ folder to your hosting
```

## 📝 Tech Stack

**Frontend**
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons
- Radix UI

**Backend**
- Flask
- Python 3.8+
- Flask-CORS
- RESTful API

## 🎓 Learning Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Flask Documentation](https://flask.palletsprojects.com)
- [Tailwind CSS](https://tailwindcss.com)

## 📄 License

[Your License Here]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions:
1. Check [HACKATHON_SETUP.md](HACKATHON_SETUP.md)
2. Review error messages in browser console
3. Check backend terminal output
4. make a rule 

---

**Status**: ✅ Production Ready | 🚀 Hackathon Ready
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- frontend
- likely hood

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!  yew yes you can....!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.
Aman...
Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
