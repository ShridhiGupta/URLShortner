# System Architecture

## Overview

The URL Shortener application follows a clean, layered architecture with clear separation of concerns between frontend and backend components.

## High-Level Architecture

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐    MongoDB     ┌─────────────────┐
│                 │ ◄──────────────► │                 │ ◄─────────────► │                 │
│   Frontend      │                 │    Backend      │                 │    Database     │
│   (React SPA)   │                 │   (Express API) │                 │   (MongoDB)     │
│                 │                 │                 │                 │                 │
└─────────────────┘                 └─────────────────┘                 └─────────────────┘
```

## Frontend Architecture

### Technology Stack
- **React 19**: Modern React with latest features
- **TanStack Router**: File-based routing with type safety
- **Redux Toolkit**: State management for authentication
- **TanStack Query**: Server state management and caching
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client with interceptors

### Component Architecture
```
src/
├── components/          # Reusable UI components
│   ├── UrlForm.jsx     # URL shortening form
│   ├── LoginForm.jsx   # Authentication form
│   └── NavBar.jsx      # Navigation component
├── pages/              # Page-level components
│   ├── HomePage.jsx    # Main URL shortening page
│   ├── AuthPage.jsx    # Authentication page
│   └── Dashboard.jsx   # User dashboard
├── api/                # API client functions
│   ├── shortUrl.api.js # URL API calls
│   └── user.api.js     # Auth API calls
├── store/              # Redux state management
│   ├── store.js        # Redux store configuration
│   └── slice/
│       └── authSlice.js # Authentication state
├── routing/            # Route configuration
│   └── routeTree.js   # Route tree definition
└── utils/
    └── axiosInstance.js # HTTP client setup
```

### Data Flow
```
User Interaction → Component → API Call → Redux Action → State Update → UI Re-render
```

## Backend Architecture

### Technology Stack
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: Document database
- **Mongoose**: Object Data Modeling (ODM)
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing

### Layered Architecture

```
┌─────────────────┐
│   Controllers    │ ◄── HTTP Request/Response
├─────────────────┤
│    Services     │ ◄── Business Logic
├─────────────────┤
│      DAOs       │ ◄── Data Access
├─────────────────┤
│     Models      │ ◄── Schema Definition
├─────────────────┤
│   Database      │ ◄── Data Persistence
└─────────────────┘
```

### Backend Structure
```
src/
├── controller/         # Request handlers
│   ├── auth.controller.js    # Authentication endpoints
│   ├── short_url.controller.js # URL operations
│   └── user.controller.js     # User operations
├── services/          # Business logic
│   ├── auth.service.js       # Authentication logic
│   └── short_url.service.js  # URL business logic
├── dao/              # Data Access Objects
│   ├── user.dao.js          # User CRUD operations
│   └── short_url.js         # URL CRUD operations
├── models/           # Database schemas
│   ├── user.model.js        # User schema
│   └── short_url.model.js   # URL schema
├── routes/           # API routes
│   ├── auth.routes.js       # Authentication routes
│   ├── short_url.route.js   # URL routes
│   └── user.routes.js       # User routes
├── middleware/       # Request processing
│   ├── auth.middleware.js   # JWT verification
│   └── attachUser.js        # Optional user attachment
├── utils/           # Utility functions
│   ├── errorHandler.js      # Error handling
│   ├── helper.js            # JWT, nanoid helpers
│   └── tryCatchWrapper.js   # Async error wrapper
└── config/          # Configuration
    ├── mongo.config.js      # Database connection
    └── config.js            # App configuration
```

## Database Design

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String (default: gravatar),
  createdAt: Date,
  updatedAt: Date
}
```

#### Short URLs Collection
```javascript
{
  _id: ObjectId,
  full_url: String (required),
  short_url: String (required, unique, indexed),
  clicks: Number (default: 0),
  user: ObjectId (ref: 'User', optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Relationships
- **One-to-Many**: One user can have many short URLs
- **Optional**: URLs can exist without user (anonymous creation)
- **Referential Integrity**: User references maintained

### Indexes
- `short_url`: Unique index for fast lookups
- `user`: Index for user URL queries

## API Architecture

### RESTful Endpoints

#### Authentication
```
POST /api/auth/register  # Create new user
POST /api/auth/login     # User authentication
POST /api/auth/logout    # User logout
GET  /api/auth/me        # Get current user
```

#### URL Management
```
POST /api/create         # Create short URL
POST /api/user/urls      # Get user URLs (authenticated)
```

#### Redirection
```
GET /:id                # Redirect to original URL
```

### Request Flow
```
Client Request → CORS → Body Parser → Cookie Parser → 
attachUser → Routes → Auth Middleware → Controller → 
Service → DAO → Database → Response
```

## Security Architecture

### Authentication Flow
```
1. User Login/Registration
2. Password hashing with bcrypt
3. JWT token generation
4. HTTP-only cookie setting
5. Subsequent requests include token
6. Middleware verifies token
7. User attached to request
```

### Security Measures
- **Password Security**: bcrypt with salt (10 rounds)
- **Token Security**: HTTP-only cookies, 1-hour expiry
- **CORS**: Configured for specific origins
- **Input Validation**: URL and email validation
- **Error Handling**: No sensitive data exposure

## Communication Patterns

### Frontend ↔ Backend
- **Protocol**: HTTP/REST API
- **Data Format**: JSON
- **Authentication**: JWT via HTTP-only cookies
- **Error Handling**: Centralized error responses

### Backend ↔ Database
- **Protocol**: MongoDB driver
- **Query Language**: MongoDB queries via Mongoose
- **Connection**: Connection pooling
- **Transactions**: Document-level operations

## Design Patterns

### Architectural Patterns
1. **Layered Architecture**: Clear separation of concerns
2. **Repository Pattern**: DAOs abstract data access
3. **Middleware Pattern**: Express middleware chain
4. **Observer Pattern**: Redux state management

### Design Principles
1. **Single Responsibility**: Each component has one purpose
2. **Open/Closed**: Easy to extend without modification
3. **Dependency Inversion**: High-level modules don't depend on low-level
4. **DRY**: Shared utilities and common patterns

## Performance Considerations

### Current Optimizations
- **Database Indexing**: Fast URL lookups
- **Connection Pooling**: Efficient database connections
- **Async/Await**: Non-blocking operations
- **Error Handling**: Graceful error recovery

### Scalability Improvements
- **Caching**: Redis for frequently accessed URLs
- **Load Balancing**: Multiple app instances
- **CDN**: Static asset delivery
- **Database Sharding**: Distribute data across servers

## Deployment Architecture

### Development
```
Frontend (localhost:5173) ←→ Backend (localhost:3000) ←→ MongoDB (localhost:27017)
```

### Production Options

#### Option 1: Single Service
```
Users → Single Service (Frontend + Backend) → Database
```

#### Option 2: Separate Services
```
Users → Frontend Service → Backend Service → Database
```

### Environment Configuration
- **Development**: Local services with hot reload
- **Production**: Optimized builds with environment variables
- **Security**: HTTPS, secure cookies, CORS restrictions

## Monitoring & Observability

### Logging
- **Application Logs**: Request/response logging
- **Error Logs**: Centralized error tracking
- **Access Logs**: API access patterns

### Metrics
- **Performance**: Response times, throughput
- **Business**: URL creation, click counts
- **System**: Memory, CPU, database connections

### Health Checks
- **API Endpoints**: Service availability
- **Database**: Connection status
- **Dependencies**: External service health

## Future Architecture Evolution

### Microservices
- **Authentication Service**: Dedicated auth handling
- **URL Service**: URL management and analytics
- **Redirect Service**: High-performance redirection
- **Analytics Service**: Click tracking and reporting

### Event-Driven Architecture
- **Message Queue**: Async processing
- **Event Sourcing**: Audit trail
- **CQRS**: Read/write separation

### Cloud-Native Features
- **Container Orchestration**: Kubernetes
- **Service Mesh**: Inter-service communication
- **Auto-scaling**: Dynamic resource allocation
- **Serverless**: Function-based components
