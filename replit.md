# BloodMatch Application

## Overview

BloodMatch is a full-stack React application built with Express.js backend that connects blood donors with seekers. The application uses modern web technologies including React, TypeScript, shadcn/ui components, and Drizzle ORM with PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: React Router DOM for client-side navigation
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture

#### Node.js Backend (Primary)
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot reload with custom Vite integration

#### Java Backend (Secondary - Spring Boot)
- **Framework**: Spring Boot 3.2.0 with Java 21
- **Architecture**: RESTful API with layered architecture (Controller → Service → Repository → Entity)
- **Database**: Spring Data JPA with PostgreSQL
- **Security**: Spring Security with JWT authentication
- **Build Tool**: Maven with comprehensive dependency management
- **Features**: 
  - Complete CRUD operations for Users, Donations, and Matches
  - Automatic blood donor-seeker matching algorithm
  - CORS configuration for frontend integration
  - Input validation with Jakarta Bean Validation
  - Comprehensive repository queries with custom JPA methods

### Database Schema
- **PostgreSQL Database**: Production-ready database with Neon serverless connection
- **Users Table**: Comprehensive user profiles with blood type, location, medical information, and availability status
- **Donations Table**: Tracks donation history, status, and scheduling information
- **Matches Table**: Stores potential donor-seeker matches with compatibility scoring
- **Schema Location**: `shared/schema.ts` using Drizzle schema definitions with proper relations
- **Validation**: Zod schemas for type-safe data validation and API request validation

## Key Components

### Frontend Components
- **Pages**: Index (landing), Register, Login, Dashboard, Profile, Features, NotFound
- **UI Components**: Complete shadcn/ui component library with custom theming
- **Features**: 
  - EligibilityQuiz component for donor qualification
  - MapView component for location-based matching
  - Dark/light mode theming support
  - Responsive design with mobile-first approach

### Backend Components

#### Node.js Backend Components
- **Storage Interface**: Database storage layer with comprehensive CRUD operations
- **Routes**: Complete RESTful API endpoints for users, donations, matches, and authentication
- **Database**: Drizzle ORM with PostgreSQL dialect and relations
- **Middleware**: Request logging, JSON parsing, error handling

#### Java Backend Components
- **Entities**: JPA entities with proper relationships and lifecycle callbacks
  - User entity with UserDetails implementation for security
  - Donation entity with donor/seeker relationships
  - Match entity with compatibility scoring
- **Repositories**: Spring Data JPA repositories with custom query methods
- **Services**: Business logic layer with comprehensive CRUD and matching operations
- **Controllers**: REST API endpoints with proper HTTP status codes and error handling
- **Configuration**: CORS, security, and database connection management

### Shared Components
- **Schema**: Shared TypeScript types and Zod validation schemas
- **Database Models**: User model with insert/select type inference

## Data Flow

### User Registration/Authentication
1. User fills registration form (donor/seeker)
2. Form validation using Zod schemas
3. Data sent to backend API
4. User creation through storage interface
5. Session establishment for authenticated state

### Blood Matching Process
1. Eligible donors/seekers are matched based on:
   - Blood type compatibility
   - Geographic proximity
   - Urgency level
   - Availability status
2. Real-time notifications for matches
3. Map-based visualization of nearby matches

### Profile Management
1. Users can update personal information
2. Medical history and eligibility tracking
3. Donation history and statistics
4. Privacy and notification preferences

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **react-hook-form**: Form handling
- **zod**: Runtime type validation

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development
- **Dev Server**: Vite dev server with Express backend
- **Hot Reload**: File watching for both frontend and backend
- **Database**: Connected to Neon PostgreSQL instance
- **Environment**: NODE_ENV=development

### Production Build
- **Frontend**: Vite build to `dist/public`
- **Backend**: esbuild bundle to `dist/index.js`
- **Static Assets**: Served by Express in production
- **Database**: Production PostgreSQL via DATABASE_URL

### Database Management
- **Migrations**: Drizzle Kit for schema migrations
- **Schema Push**: Direct schema synchronization for development
- **Connection**: Serverless PostgreSQL connection pooling

### Configuration

#### Node.js Configuration
- **Environment Variables**: DATABASE_URL required for database connection
- **Build Scripts**: Separate dev/build/start commands
- **TypeScript**: Strict type checking with path aliases
- **Styling**: PostCSS with Tailwind CSS processing

#### Java Configuration
- **Environment Variables**: DATABASE_URL, JWT secret, CORS origins
- **Build**: Maven with Spring Boot plugin
- **Profiles**: Development and production configurations
- **Database**: Hibernate with automatic schema validation
- **Startup Script**: Dedicated startup script for Java backend (port 8080)

### Deployment Options

The application now supports dual backend deployment:

1. **Node.js Backend** (Port 5000): Primary backend with TypeScript and Drizzle ORM
2. **Java Backend** (Port 8080): Alternative backend with Spring Boot and JPA

Both backends connect to the same PostgreSQL database and provide identical API functionality, allowing for flexibility in deployment and technology preferences.

The application follows a modern full-stack architecture with type safety throughout, responsive design, and scalable database design suitable for a blood donation matching platform.