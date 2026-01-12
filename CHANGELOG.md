# Changelog

All notable changes to VerdantGuard are documented in this file.

## [1.0.0] - 2026-01-12

### 🎉 Initial Release - Complete Refactor & Security Audit

### ✨ Added
- Comprehensive README.md with full documentation
- CONTRIBUTING.md guidelines for contributors
- MIT LICENSE file
- Environment variable examples (.env.example) for frontend and backend
- Health check endpoints (/health) for monitoring
- Rate limiting middleware for API protection
- Helmet.js security headers
- Toast notifications using react-toastify
- Global error handling middleware
- CORS configuration with origin restrictions
- Form validation using Yup schemas
- Professional API documentation

### 🔒 Security Improvements
- **Removed hardcoded credentials** from source code
- **Upgraded password hashing** from SHA1 to bcrypt
- **Added JWT secret validation** with proper error handling
- **Implemented rate limiting** (100 requests per 15 minutes)
- **Added input validation** for all forms
- **Configured secure CORS** policies
- **Added Helmet.js** for HTTP security headers
- **File upload size limits** (16MB max)
- **Sanitized MongoDB queries** to prevent injection

### 🐛 Bug Fixes

#### Backend
- **Fixed duplicate name field** in SignupSchema
- **Removed deprecated Mongoose options** (useNewUrlParser, useUnifiedTopology)
- **Fixed missing bcrypt dependency** in package.json
- **Fixed missing form-data dependency** in package.json
- **Removed obsolete sha1 package** from dependencies
- **Fixed UploadController** - removed non-existent uploadFile function reference
- **Fixed SigninController** - now uses bcrypt instead of sha1
- **Fixed UploadSchema** - now imports mongoose from config to ensure DB connection
- **Fixed database connection** - removed hardcoded credentials
- **Fixed route organization** - cleaned up Allroutes.js structure
- **Improved error handling** in all controllers with try-catch blocks
- **Added status codes** for proper HTTP responses

#### Frontend
- **Removed unused import** (AllRoutes from main.jsx)
- **Fixed SignIn error handling** - removed errType logic that backend doesn't support
- **Replaced alert() calls** with toast notifications
- **Fixed API URL usage** - now uses environment variables consistently
- **Fixed Upload component** - now uses backend endpoint instead of direct Flask API
- **Fixed ContactUs** - now actually submits to backend API
- **Fixed Data.jsx** - uses API_URL constant instead of hardcoded localhost
- **Added Data route** to AllRoutes.jsx
- **Fixed async/await** handling in form submissions
- **Improved navigation** using useNavigate instead of window.location

#### Python/ML Service
- **Fixed requirements.txt** - removed 'os' (built-in module)
- **Added missing flask-cors** dependency
- **Added missing werkzeug** dependency
- **Fixed hardcoded Windows path** - now uses os.path.join for cross-platform compatibility
- **Removed dead code** (example_function)
- **Added host='0.0.0.0'** to make Flask accessible externally
- **Added file size limits** (16MB)
- **Enhanced error handling** in prediction endpoint
- **Improved health check endpoint** with model status

### 🗑️ Removed
- **Deleted addtwoumbers.jsx** - unused dead code file
- **Deleted addTwoNumbers.js** - unused utility file
- **Deleted predict-base64.js** - empty unused route file
- **Removed hardcoded credentials** from conn.js
- **Removed console.log statements** from production code
- **Removed deprecated imports** and unused variables

### 📝 Changed
- **Upgraded password hashing** from SHA1 to bcrypt with salt rounds
- **Changed default database name** from 'bhavesh' to 'verdantguard'
- **Reorganized API routes** for better RESTful structure
- **Enhanced app.js** with security middleware stack
- **Improved error messages** for better debugging
- **Updated gitignore** with comprehensive exclusions
- **Standardized response format** across all endpoints
- **Enhanced Flask API** with better logging and endpoints

### 📦 Dependencies Updated

#### Backend
- Added: `bcrypt@^5.1.1`
- Added: `form-data@^4.0.0`
- Added: `helmet@^7.1.0`
- Added: `express-rate-limit@^7.1.5`
- Added: `express-validator@^7.0.1`
- Removed: `sha1@^1.1.1`

#### Python
- Added: `flask-cors`
- Added: `werkzeug`
- Removed: `os` (invalid entry)

### 🏗️ Architecture Improvements
- Separated concerns between backend and ML service
- Implemented proper middleware chain in Express
- Added environment-based configuration
- Created modular route structure
- Improved database connection management
- Added proper error propagation

### 📚 Documentation
- Created comprehensive README.md with:
  - Project overview and features
  - Complete installation instructions
  - Environment variable documentation
  - API endpoint documentation
  - Troubleshooting guide
  - Contributing guidelines
- Added inline code comments
- Created CONTRIBUTING.md
- Added MIT LICENSE

### 🧪 Testing Improvements
- Added validation for all user inputs
- Improved error messages for debugging
- Added health check endpoints for monitoring
- Enhanced logging throughout application

### ⚡ Performance
- Optimized database queries
- Added connection pooling support
- Implemented proper async/await patterns
- Reduced unnecessary re-renders in React

---

## Future Versions

### Planned for v1.1.0
- [ ] Multi-language support (Hindi, Tamil, Telugu)
- [ ] Support for Tomato, Rice, Wheat disease detection
- [ ] Admin dashboard for monitoring
- [ ] Email notifications for disease detection
- [ ] Treatment recommendations for detected diseases

### Planned for v2.0.0
- [ ] Mobile app (React Native)
- [ ] Offline mode support
- [ ] Voice-based interface
- [ ] Weather API integration
- [ ] Community forum feature
- [ ] Advanced analytics dashboard

---

**Note**: This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.
