# Quick Start Guide

This guide will get you up and running with VerdantGuard in under 10 minutes.

## Prerequisites Check

Run these commands to verify you have the required software:

```bash
node --version  # Should be v18 or higher
python --version  # Should be v3.8 or higher
mongod --version  # Should be v4.4 or higher
```

## Installation Steps

### 1. Clone & Navigate
```bash
git clone https://github.com/yourusername/verdantguard.git
cd verdantguard
```

### 2. Backend Setup (2 minutes)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set at least JWT_SECRET and MONGO_URI
```

**Minimum .env configuration:**
```env
JWT_SECRET=your-secret-key-min-32-chars
MONGO_URI=mongodb://127.0.0.1:27017/verdantguard
```

### 3. Frontend Setup (1 minute)
```bash
cd ../frontend
npm install
cp .env.example .env
# Default values work for local development
```

### 4. ML Service Setup (2 minutes)
```bash
cd ../model
python -m venv venv

# Activate venv:
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 5. Start MongoDB (if not running)
```bash
# In a new terminal
mongod
```

### 6. Start All Services

Open 3 separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# ✅ Server running on http://localhost:3000
```

**Terminal 2 - ML API:**
```bash
cd model
# Activate venv first (see step 4)
python api4.py
# 🚀 Flask ML API on http://localhost:5000
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
# ⚡ Vite dev server on http://localhost:5173
```

### 7. Test the Application

1. Open browser to `http://localhost:5173`
2. Click "Sign Up" and create an account
3. Sign in with your credentials
4. Navigate to "Upload" page
5. Select leaf type (Potato) and upload an image
6. View prediction results!

## Verification Checklist

- [ ] MongoDB is running and connected
- [ ] Backend API responds at `http://localhost:3000/health`
- [ ] Flask API responds at `http://localhost:5000/health`
- [ ] Frontend loads at `http://localhost:5173`
- [ ] User can sign up successfully
- [ ] User can sign in and get JWT token
- [ ] Image upload and prediction works

## Common Issues

### MongoDB Not Running
```bash
# Error: LIVE DB NOT CONNECTED
# Solution: Start MongoDB
mongod
```

### Port Already in Use
```bash
# Error: EADDRINUSE :::3000
# Solution: Kill process or use different port
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -ti:3000 | xargs kill -9
```

### Python Module Not Found
```bash
# Error: ModuleNotFoundError
# Solution: Ensure venv is activated and dependencies installed
pip install -r requirements.txt
```

### JWT Secret Error
```bash
# Error: JWT_SECRET not set
# Solution: Add to backend/.env
JWT_SECRET=any-random-string-at-least-32-characters-long
```

## Next Steps

- Read the [Full Documentation](README.md)
- Check [API Documentation](README.md#-api-documentation)
- Review [Architecture](README.md#-architecture)
- See [Contributing Guidelines](CONTRIBUTING.md)

## Need Help?

- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section in README.md

**Happy coding! 🌿**
