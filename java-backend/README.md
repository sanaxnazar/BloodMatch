# BloodMatch Java Backend

This is the Spring Boot Java backend for the BloodMatch application, providing RESTful API endpoints for blood donation matching.

## Architecture Overview

### Technology Stack
- **Spring Boot 3.2.0** - Framework for building Java applications
- **Java 21** - Latest LTS version of Java
- **Spring Data JPA** - ORM framework for database operations
- **PostgreSQL** - Production database
- **Maven** - Build and dependency management

### Project Structure

```
java-backend/
├── src/main/java/com/bloodmatch/
│   ├── BloodMatchApplication.java          # Main application entry point
│   ├── config/
│   │   └── WebConfig.java                  # CORS and web configuration
│   ├── controller/                         # REST API endpoints
│   │   ├── AuthController.java             # Authentication endpoints
│   │   ├── DonationController.java         # Donation management
│   │   ├── MatchController.java            # Match management
│   │   └── UserController.java             # User management
│   ├── entity/                             # JPA entities
│   │   ├── Donation.java                   # Donation entity
│   │   ├── Match.java                      # Match entity
│   │   └── User.java                       # User entity
│   ├── repository/                         # Data access layer
│   │   ├── DonationRepository.java         # Donation queries
│   │   ├── MatchRepository.java            # Match queries
│   │   └── UserRepository.java             # User queries
│   └── service/                            # Business logic layer
│       ├── DonationService.java            # Donation business logic
│       ├── MatchService.java               # Match business logic
│       └── UserService.java                # User business logic
├── src/main/resources/
│   └── application.properties              # Application configuration
├── pom.xml                                 # Maven dependencies
└── start.sh                                # Startup script
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/email/{email}` - Get user by email
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `GET /api/users/donors/{bloodGroup}` - Get available donors by blood group
- `GET /api/users/seekers/{bloodGroup}` - Get available seekers by blood group

### Donations
- `GET /api/donations` - Get all donations
- `GET /api/donations/{id}` - Get donation by ID
- `POST /api/donations` - Create new donation
- `PUT /api/donations/{id}` - Update donation
- `DELETE /api/donations/{id}` - Delete donation
- `GET /api/donations/donor/{donorId}` - Get donations by donor
- `GET /api/donations/seeker/{seekerId}` - Get donations by seeker
- `GET /api/donations/blood-group/{bloodGroup}` - Get donations by blood group
- `GET /api/donations/critical` - Get critical pending donations

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/{id}` - Get match by ID
- `POST /api/matches` - Create new match
- `PUT /api/matches/{id}` - Update match
- `DELETE /api/matches/{id}` - Delete match
- `GET /api/matches/donor/{donorId}` - Get matches by donor
- `GET /api/matches/seeker/{seekerId}` - Get matches by seeker
- `GET /api/matches/find/{bloodGroup}/{location}` - Find potential matches
- `POST /api/matches/auto-match/{bloodGroup}` - Create automatic matches

## Features

### Database Integration
- Full JPA entity mapping with relationships
- Custom repository queries for complex searches
- Automatic schema validation
- Connection pooling with PostgreSQL

### Business Logic
- Comprehensive user management with blood type validation
- Donation tracking with status management
- Automatic matching algorithm based on blood type compatibility and location
- Compatibility scoring system (0-100 scale)

### Security & Validation
- Input validation using Jakarta Bean Validation
- CORS configuration for frontend integration
- Error handling with proper HTTP status codes
- SQL injection prevention through JPA

### Matching Algorithm
The automatic matching system:
1. Finds available donors and seekers by blood group
2. Calculates compatibility scores based on:
   - Blood type compatibility (50 points)
   - Location proximity (30 points)
   - Donor availability (20 points)
3. Creates matches only for compatibility scores ≥ 50%
4. Calculates estimated distances between users

## Configuration

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT token secret (optional)
- `CORS_ORIGINS` - Allowed CORS origins

### Application Properties
- Server runs on port 8080
- Context path: `/api`
- Database auto-validation enabled
- Debug logging for development

## Running the Application

### Prerequisites
- Java 21 or higher
- Maven 3.6+
- PostgreSQL database

### Commands
```bash
# Build the application
mvn clean compile

# Run the application
mvn spring-boot:run

# Or use the startup script
./start.sh
```

The application will start on `http://localhost:8080/api`

## Database Schema

The application uses the same PostgreSQL schema as the Node.js backend:

### Users Table
- Personal information (name, email, phone)
- Blood type and medical information
- Location and availability status
- Emergency contact details

### Donations Table
- Donor and seeker relationships
- Blood type and amount
- Status tracking (pending, completed, cancelled)
- Urgency levels (critical, normal)
- Scheduling information

### Matches Table
- Donor-seeker pairs
- Compatibility scoring
- Distance calculations
- Status tracking

## Integration

This Java backend provides identical API functionality to the Node.js backend, allowing for:
- Seamless frontend integration
- Technology stack flexibility
- Performance comparison
- Deployment options

Both backends connect to the same PostgreSQL database and maintain data consistency.