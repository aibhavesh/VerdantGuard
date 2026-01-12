# 🌿 VerdantGuard

**AI-Powered Leaf Disease Detection System**

> "Diagnose. Protect. Prosper." — Smart Leaf Health Detection at Your Fingertips.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19.0-blue)](https://reactjs.org/)

VerdantGuard is an AI-powered plant disease detection application that empowers farmers with timely, accurate, and accessible plant health diagnostics. Using deep learning and computer vision, it analyzes leaf images to detect diseases early, helping farmers take preventive action.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Common Issues](#-common-issues)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🤖 **AI-Powered Disease Detection** - Uses TensorFlow/Keras model for accurate leaf disease classification
- 🔐 **Secure Authentication** - JWT-based user authentication with bcrypt password hashing
- 📤 **Image Upload & Analysis** - Upload leaf images for instant disease diagnosis
- 📊 **User Dashboard** - Track uploaded images and analysis history
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🌍 **RESTful API** - Well-documented API for easy integration
- ⚡ **Real-time Results** - Get instant predictions with confidence scores
- 🛡️ **Security Features** - Rate limiting, CORS, Helmet.js, input validation

---

## 🛠 Tech Stack

### Frontend
- **React 19.0** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Formik + Yup** - Form handling and validation
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Bootstrap 5** - CSS framework

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting

### ML Service
- **Python 3.8+** - Programming language
- **Flask** - Lightweight web framework
- **TensorFlow/Keras** - Deep learning framework
- **Pillow** - Image processing
- **NumPy** - Numerical computing

---

## 🏗 Architecture

```
┌─────────────┐          ┌──────────────┐          ┌─────────────┐
│   React     │          │   Express    │          │   Flask     │
│   Frontend  │◄────────►│   Backend    │◄────────►│   ML API    │
│  (Port 5173)│   HTTP   │  (Port 3000) │   HTTP   │ (Port 5000) │
└─────────────┘          └──────────────┘          └─────────────┘
                                │
                                ▼
                         ┌─────────────┐
                         │   MongoDB   │
                         │   Database  │
                         └─────────────┘
```

### Data Flow

1. **User Interaction**: User uploads leaf image via React frontend
2. **API Request**: Frontend sends image + metadata to Express backend
3. **Storage**: Backend saves image to disk using Multer
4. **ML Prediction**: Backend forwards image to Flask ML API
5. **Disease Detection**: Flask processes image through Keras model
6. **Response**: Prediction results flow back through Express to frontend
7. **Database**: Upload metadata and results stored in MongoDB

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/verdantguard.git
cd verdantguard
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# Required: MONGO_URI, JWT_SECRET
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
```

### 4. ML Service Setup

```bash
cd ../model

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 5. Database Setup

Ensure MongoDB is running:

```bash
# Start MongoDB (if not running as service)
mongod
```

---

## 🔐 Environment Variables

### Backend (.env)

Create `backend/.env` file:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://127.0.0.1:27017/verdantguard

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# External Services
FLASK_API_URL=http://localhost:5000/predict

# CORS
FRONTEND_URL=http://localhost:5173
```

**Production MongoDB Example:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/verdantguard?retryWrites=true&w=majority
```

### Frontend (.env)

Create `frontend/.env` file:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api/v1

# Python ML API URL (optional - goes through backend)
VITE_IMAGE_API_URL=http://localhost:5000/
```

---

## ▶️ Running the Application

### Option 1: Run Each Service Separately

#### 1. Start MongoDB
```bash
mongod
```

#### 2. Start Backend Server
```bash
cd backend
npm run dev
# Server runs on http://localhost:3000
```

#### 3. Start ML Service
```bash
cd model
python api4.py
# Flask API runs on http://localhost:5000
```

#### 4. Start Frontend
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### Option 2: Production Build

#### Build Frontend
```bash
cd frontend
npm run build
# Creates optimized production build in dist/
```

#### Run Backend (Production)
```bash
cd backend
NODE_ENV=production npm start
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /api/v1/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "SecurePass123",
  "contact": "1234567890",
  "address": "123 Farm Lane"
}

Response: 201 Created
{
  "success": true,
  "result": { ... }
}
```

#### Sign In
```http
POST /api/v1/signinauth
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "name": "John Doe"
}
```

### Image Upload & Prediction

#### Upload Leaf Image
```http
POST /api/v1/upload
Content-Type: multipart/form-data
Authorization: Bearer {token}

Form Data:
- image: (file)
- leafType: "Potato"

Response: 200 OK
{
  "message": "Image processed successfully",
  "file": { ... },
  "prediction": {
    "predicted_class": "Early Blight",
    "confidence": "94.23%"
  }
}
```

#### Get All Images
```http
GET /api/v1/images

Response: 200 OK
[
  {
    "_id": "...",
    "leafType": "Potato",
    "imagePath": "uploads/...",
    "result": {
      "predicted_class": "Healthy",
      "confidence": "98.5%"
    },
    "createdAt": "2026-01-12T..."
  }
]
```

### Contact Form

#### Submit Contact Message
```http
POST /api/v1/contactus
Content-Type: application/json

{
  "name": "Jane Farmer",
  "email": "jane@example.com",
  "message": "I need help with the app"
}

Response: 201 Created
{
  "success": true,
  "result": { ... }
}
```

### Health Check

```http
GET /health

Response: 200 OK
{
  "status": "OK",
  "timestamp": "2026-01-12T..."
}
```

### Python ML API Endpoints

#### Predict Disease
```http
POST http://localhost:5000/predict
Content-Type: multipart/form-data

Form Data:
- image: (file)
- leafType: "Potato"

Response: 200 OK
{
  "predicted_class": "Late Blight",
  "confidence": "96.8%"
}
```

#### Health Check
```http
GET http://localhost:5000/health

Response: 200 OK
{
  "status": "OK",
  "model_loaded": true
}
```

---

## 📁 Project Structure

```
VerdantGuard/
│
├── backend/                    # Express.js Backend
│   ├── app.js                 # Server entry point
│   ├── package.json           # Node dependencies
│   ├── .env.example          # Environment template
│   ├── config/
│   │   └── conn.js           # MongoDB connection
│   ├── controllers/          # Request handlers
│   │   ├── SignUpController.js
│   │   ├── Signinauthcontroller.js
│   │   ├── contactuscontroller.js
│   │   └── UploadController.js
│   ├── middlewares/          # Middleware functions
│   │   ├── authMiddleware.js # JWT verification
│   │   └── multer.js         # File upload config
│   ├── models/               # Mongoose schemas
│   │   ├── SignupSchema.js
│   │   ├── ConatactUsSchema.js
│   │   └── UploadSchema.js
│   ├── routes/               # API routes
│   │   ├── Allroutes.js
│   │   ├── SignupRoutes.js
│   │   ├── SigninRoutes.js
│   │   ├── Singninauth.js
│   │   ├── ContactusRoutes.js
│   │   └── UploadRoutes.js
│   └── uploads/              # Uploaded images storage
│
├── frontend/                  # React Frontend
│   ├── index.html            # HTML entry point
│   ├── package.json          # Node dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── .env.example         # Environment template
│   ├── src/
│   │   ├── main.jsx         # React entry point
│   │   ├── App.jsx          # Root component
│   │   ├── App.css          # Global styles
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── HelpUs.jsx
│   │   │   └── Data.jsx
│   │   ├── routes/
│   │   │   └── AllRoutes.jsx
│   │   ├── schema/          # Yup validation schemas
│   │   │   ├── SignUpSchema.jsx
│   │   │   ├── SignInSchema.jsx
│   │   │   └── ContactSchema.jsx
│   │   └── constant/
│   │       └── API_URL.jsx  # API endpoints config
│   └── public/
│       └── assets/
│           ├── bootstrap/   # Bootstrap CSS/JS
│           └── images/      # Static images
│
├── model/                    # Python ML Service
│   ├── api4.py              # Flask API server
│   ├── requirements.txt     # Python dependencies
│   ├── Potato_Disease_Classification_Model.keras
│   └── uploads/             # ML service uploads
│
└── .gitignore               # Git ignore rules
```

---

## 🐛 Common Issues & Fixes

### Issue: MongoDB Connection Failed

**Error:** `LIVE DB NOT CONNECTED`

**Fix:**
```bash
# Ensure MongoDB is running
mongod

# Check your MONGO_URI in backend/.env
MONGO_URI=mongodb://127.0.0.1:27017/verdantguard
```

### Issue: Python Module Not Found

**Error:** `ModuleNotFoundError: No module named 'flask'`

**Fix:**
```bash
cd model
pip install -r requirements.txt

# Or individually:
pip install flask flask-cors tensorflow pillow numpy werkzeug
```

### Issue: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Fix:**
```bash
# On Windows (kill process on port 3000):
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue: JWT Secret Not Set

**Error:** `JWT_SECRET not set in environment`

**Fix:**
```bash
# Add to backend/.env
JWT_SECRET=your-super-secret-key-min-32-characters-long
```

### Issue: CORS Error in Browser

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Fix:**
1. Check `FRONTEND_URL` in backend/.env matches your frontend URL
2. Ensure backend CORS is configured properly (already done in app.js)

### Issue: Image Upload Fails

**Error:** `No file uploaded` or `Multer error`

**Fix:**
1. Ensure `uploads/` folder exists in backend directory
2. Check file size (max 16MB)
3. Verify file type is jpg, jpeg, or png

### Issue: ML Model Not Found

**Error:** `OSError: Unable to open file (unable to open file: name = '...')`

**Fix:**
```bash
# Ensure model file exists at:
model/Potato_Disease_Classification_Model.keras

# Model must be in same directory as api4.py
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clean, readable code
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Keep commits atomic and descriptive

### Areas for Contribution

- 🐛 **Bug Fixes** - Report and fix bugs
- ✨ **New Features** - Add support for more plant types
- 📝 **Documentation** - Improve docs and tutorials
- 🎨 **UI/UX** - Enhance user interface
- 🔒 **Security** - Identify and fix vulnerabilities
- 🌍 **Localization** - Add multilingual support
- ⚡ **Performance** - Optimize code and queries

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Team Name** - *Initial work*

---

## 🙏 Acknowledgments

- TensorFlow team for the amazing ML framework
- MongoDB for the robust database
- React and Vite teams for excellent frontend tools
- Bootstrap for the UI components
- All contributors and testers

---

## 📞 Support

For support, email support@verdantguard.in or open an issue on GitHub.

---

## 🔮 Future Enhancements

- [ ] Support for more plant types (Tomato, Rice, Wheat)
- [ ] Mobile app (React Native)
- [ ] Multilingual support (Hindi, Tamil, Telugu, etc.)
- [ ] Voice-based output for farmers
- [ ] Offline mode for low-connectivity areas
- [ ] Disease treatment recommendations
- [ ] Integration with weather APIs
- [ ] Community forum for farmers
- [ ] Admin dashboard for analytics
- [ ] Email notifications for results

---

**Made with ❤️ for farmers everywhere**
