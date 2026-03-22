# URL Shortener

A modern URL shortening application with user authentication, analytics, and a clean interface.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **User Authentication**: Register, login, and manage your URLs
- **Dashboard**: Personal dashboard to manage all your shortened URLs
- **URL Management**: View, copy, and delete your created URLs
- **Click Analytics**: Track click counts on your shortened URLs
- **Modern UI**: Clean, responsive interface built with React
- **Secure**: JWT authentication with HTTP-only cookies
- **Real-time Updates**: Automatic refresh after URL creation/deletion

## 🏗️ Architecture

### Frontend (React)
- **React 19** with modern hooks
- **TanStack Router** for file-based routing
- **Redux Toolkit** for state management
- **TanStack Query** for server state
- **TailwindCSS** for styling
- **Axios** for API communication

### Backend (Node.js/Express)
- **Express.js** RESTful API
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **bcrypt** for password hashing
- **Layered architecture** (Controllers → Services → DAOs)

### Database
- **MongoDB** for flexible document storage
- **User and URL collections**
- **Indexed for fast lookups**

## 📁 Project Structure

```
URLShortner/
├── BACKEND/
│   ├── src/
│   │   ├── controller/     # Request handlers
│   │   │   ├── auth.controller.js    # Authentication endpoints
│   │   │   ├── short_url.controller.js # URL operations
│   │   │   └── user.controller.js     # User management & URL deletion
│   │   ├── services/       # Business logic
│   │   │   ├── auth.service.js       # Authentication logic
│   │   │   └── short_url.service.js  # URL business logic
│   │   ├── dao/           # Data access objects
│   │   │   ├── user.dao.js          # User CRUD operations
│   │   │   └── short_url.js         # URL CRUD operations
│   │   ├── models/        # Database schemas
│   │   │   ├── user.model.js        # User schema
│   │   │   └── short_url.model.js   # URL schema
│   │   ├── routes/        # API routes
│   │   │   ├── auth.routes.js       # Authentication routes
│   │   │   ├── short_url.route.js   # URL routes
│   │   │   └── user.routes.js       # User management routes
│   │   ├── middleware/    # Express middleware
│   │   │   ├── auth.middleware.js   # JWT verification
│   │   │   └── attachUser.js        # Optional user attachment
│   │   ├── utils/         # Utility functions
│   │   │   ├── errorHandler.js      # Error handling
│   │   │   ├── helper.js            # JWT, nanoid helpers
│   │   │   └── tryCatchWrapper.js   # Async error wrapper
│   │   └── config/        # Configuration
│   │       ├── mongo.config.js      # Database connection
│   │       └── config.js            # App configuration
│   ├── app.js             # Server entry point
│   └── package.json
├── FRONTEND/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── UrlForm.jsx         # URL shortening form
│   │   │   ├── LoginForm.jsx       # Authentication form
│   │   │   ├── RegisterForm.jsx    # Registration form
│   │   │   └── NavBar.jsx          # Navigation component
│   │   ├── pages/         # Page components
│   │   │   ├── HomePage.jsx        # Main URL shortening page
│   │   │   ├── AuthPage.jsx        # Authentication page
│   │   │   └── Dashboard.jsx       # User dashboard with URL management
│   │   ├── api/           # API client functions
│   │   │   ├── shortUrl.api.js     # URL API calls
│   │   │   └── user.api.js         # Auth & user management API calls
│   │   ├── store/         # Redux state management
│   │   │   ├── store.js            # Redux store configuration
│   │   │   └── slice/
│   │   │       └── authSlice.js     # Authentication state
│   │   ├── routing/       # Route configuration
│   │   │   ├── routeTree.js        # Route tree definition
│   │   │   ├── auth.route.js       # Authentication routes
│   │   │   └── dashboard.js        # Dashboard routes
│   │   └── utils/         # Utility functions
│   │       └── axiosInstance.js    # HTTP client setup
│   ├── main.jsx           # App entry point
│   └── package.json
├── README.md              # This file
├── understanding.md       # Detailed technical documentation
├── architecture.md        # System architecture documentation
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShridhiGupta/URLShortner.git
   cd URLShortner
   ```

2. **Backend Setup**
   ```bash
   cd BACKEND
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../FRONTEND
   npm install
   ```

4. **Environment Variables**
   
   Create a `.env` file in the `BACKEND` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/url-shortner
   APP_URL=http://localhost:3000/
   JWT_SECRET=your-super-secret-key
   ```

### Running the Application

1. **Start MongoDB** (if using local instance)

2. **Start Backend Server**
   ```bash
   cd BACKEND
   npm run dev
   ```
   Backend will run on `http://localhost:3000`

3. **Start Frontend Development Server**
   ```bash
   cd FRONTEND
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Open your browser** and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### URL Management
- `POST /api/create` - Create short URL
- `POST /api/user/urls` - Get user's URLs (authenticated)
- `DELETE /api/user/url/:id` - Delete user's URL (authenticated)

### Redirection
- `GET /:id` - Redirect to original URL

## 🎯 Features in Detail

### **Anonymous Users**
- Create short URLs without registration
- Basic URL shortening functionality
- Immediate URL generation and copying

### **Authenticated Users**
- Full dashboard experience
- Personal URL management
- Delete unwanted URLs
- View click analytics
- Persistent URL history

### **User Interface**
- **Homepage**: Clean URL shortening interface
- **Authentication Page**: Login/Register forms
- **Dashboard**: Personal URL management center
- **Navigation**: Context-aware navbar with auth state

## 🔐 Authentication

The application uses JWT tokens stored in HTTP-only cookies for secure authentication:

1. **Registration**: User credentials validated, password hashed with bcrypt
2. **Login**: JWT created with user ID, set in HTTP-only cookie
3. **API Access**: Token automatically sent with requests, verified by middleware
4. **Session Management**: Tokens expire after 1 hour
5. **Security**: HTTP-only cookies prevent XSS attacks

## 🛠️ Development

### Backend Development
```bash
cd BACKEND
npm run dev  # Start with nodemon for auto-restart
```

### Frontend Development
```bash
cd FRONTEND
npm run dev  # Start Vite dev server
npm run build  # Build for production
```

### Code Style
- ESLint configured for both frontend and backend
- Prettier for consistent formatting
- Follows clean architecture principles

## 🚀 Deployment

### Option 1: Single Service Deployment
Deploy both frontend and backend as a single service:

1. Build frontend: `cd FRONTEND && npm run build`
2. Deploy backend with static file serving
3. Update CORS to allow same origin

### Option 2: Separate Services
Deploy frontend and backend separately:

1. **Backend Deployment** (Render, Heroku, etc.)
   - Set environment variables
   - Update CORS to include frontend domain

2. **Frontend Deployment** (Vercel, Netlify, etc.)
   - Update `axiosInstance.js` with backend URL
   - Build and deploy static files

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortner
JWT_SECRET=your-production-secret
APP_URL=https://your-backend-domain.com/
```

## 🧪 Testing

### API Testing
```bash
# Create short URL (anonymous)
curl -X POST http://localhost:3000/api/create \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}'

# Test redirection
curl -L http://localhost:3000/abc123
```

### Frontend Testing
- Open browser developer tools
- Check Network tab for API calls
- Verify cookies are being sent
- Test authentication flow

## 📊 Performance & Scalability

### Current Implementation
- Single Node.js server
- MongoDB with indexed queries
- In-memory JWT verification
- Basic error handling

### Production Improvements
- Redis caching for frequently accessed URLs
- Load balancing for horizontal scaling
- MongoDB read replicas
- CDN for static assets
- Rate limiting and monitoring

## 🔒 Security Considerations

- **Password Security**: bcrypt with salt (10 rounds)
- **JWT Security**: HTTP-only cookies, 1-hour expiry
- **CORS**: Configured for specific origins
- **Input Validation**: URL format and email validation
- **Error Handling**: No sensitive data exposure
- **User Permissions**: Users can only delete their own URLs

## 📱 User Experience

### **Homepage (All Users)**
- Clean, minimalist interface
- URL input field with validation
- Instant URL generation
- Copy functionality
- Authentication prompts in navbar

### **Dashboard (Authenticated Users)**
- Personal welcome message
- Split-screen layout (create + manage)
- Real-time URL list updates
- One-click copy and delete actions
- Click analytics display

### **Authentication Flow**
- Seamless login/register switching
- Form validation and error feedback
- Automatic dashboard redirection
- Secure logout with cookie clearing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Check the `understanding.md` file for detailed technical documentation
- Review `architecture.md` for system design details

---

**Built with ❤️ using React, Node.js, and MongoDB**
