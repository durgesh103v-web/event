# Event Management System

MERN Stack technical assignment for **Biz Technologies IT Solutions Ltd / Blockcoaster**.

This project is a full-stack Event Management System where users can discover events, register for events, view their joined events, and admins can manage event creation, editing, and deletion. The application includes JWT authentication, role-based access control, event search/filtering, pagination, attendee listing, responsive UI, Swagger API documentation, Docker setup, and deployment support for Vercel and Render.

## Live Deployment

* Frontend: https://event-client-theta.vercel.app/
* Backend API: https://event-1hjn.onrender.com
* Swagger API Docs: https://event-1hjn.onrender.com/api/docs
* Health Check: https://event-1hjn.onrender.com/api/health

> If the backend URL is different in Render, replace the Render links above with the final deployed backend URL.

## Demo Credentials

### Admin

```bash
Email: admin@example.com
Password: password123
```

### User

```bash
Email: durgesh@example.com
Password: password123
```

Admin accounts are created only through the seed script or manually in the database. Public registration always creates a normal `user` account.

## Features

* User authentication using JWT
* Register and login functionality
* Current-user endpoint
* Role-based access control with `admin` and `user` roles
* Public users can view and search events
* Admin can create, edit, and delete events
* Event details page with full information
* Authenticated users can register for events
* Authenticated users can cancel their registration
* My Events / My Registrations page for joined events
* Display registered attendees for each event
* Duplicate registration prevention
* Full-capacity event registration check
* Event search by keyword
* Event filtering by category, location, and date
* Event pagination
* Responsive React UI
* Backend validation with `express-validator`
* Centralized error handling
* Helmet security headers
* CORS configuration
* Rate limiting
* Swagger API documentation
* Postman collection included
* Docker and Docker Compose setup
* Deployment-ready configuration for Vercel and Render

## Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* Lucide React
* CSS / Inline component styling

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* express-validator
* Helmet
* CORS
* express-rate-limit
* Swagger UI

### Tools

* Docker
* Docker Compose
* Postman
* Vercel
* Render
* MongoDB Atlas

## Project Structure

```text
.
|-- client
|   |-- src
|   |   |-- api
|   |   |   `-- client.js
|   |   |-- components
|   |   |   |-- AppNavbar.jsx
|   |   |   |-- EventCard.jsx
|   |   |   |-- FilterSelect.jsx
|   |   |   |-- Layout.jsx
|   |   |   |-- Pagination.jsx
|   |   |   |-- ProtectedRoute.jsx
|   |   |   `-- StatusMessage.jsx
|   |   |-- constants
|   |   |   `-- eventFilters.js
|   |   |-- context
|   |   |   `-- AuthContext.jsx
|   |   |-- hooks
|   |   |   `-- useMediaQuery.js
|   |   |-- pages
|   |   |   |-- AuthPage.jsx
|   |   |   |-- EventDetailsPage.jsx
|   |   |   |-- EventFormPage.jsx
|   |   |   |-- EventsPage.jsx
|   |   |   `-- MyRegistrationsPage.jsx
|   |   |-- styles
|   |   |   `-- StyleSheet.js
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- styles.css
|   |-- .env.example
|   |-- Dockerfile
|   |-- index.html
|   |-- package.json
|   `-- vite.config.js
|
|-- server
|   |-- src
|   |   |-- config
|   |   |   `-- db.js
|   |   |-- controllers
|   |   |   |-- authController.js
|   |   |   `-- eventController.js
|   |   |-- docs
|   |   |   |-- paths.js
|   |   |   `-- swagger.js
|   |   |-- middleware
|   |   |   |-- auth.js
|   |   |   |-- errorHandler.js
|   |   |   `-- validate.js
|   |   |-- models
|   |   |   |-- Event.js
|   |   |   `-- User.js
|   |   |-- routes
|   |   |   |-- authRoutes.js
|   |   |   |-- eventRoutes.js
|   |   |   `-- registrationRoutes.js
|   |   |-- utils
|   |   |   |-- eventQuery.js
|   |   |   `-- jwt.js
|   |   |-- app.js
|   |   |-- seed.js
|   |   `-- server.js
|   |-- .env.example
|   |-- Dockerfile
|   `-- package.json
|
|-- docker-compose.yml
|-- package.json
|-- package-lock.json
|-- postman_collection.json
|-- README.md
|-- render.yaml
`-- vercel.json
```

## Local Setup

### Prerequisites

Make sure the following are installed:

* Node.js 20+
* npm
* MongoDB locally or MongoDB Atlas
* Git

## Installation

Clone the repository:

```bash
git clone PASTE_GITHUB_REPOSITORY_LINK_HERE
cd event
```

Install dependencies from the root:

```bash
npm install
```

## Environment Variables

### Backend Environment

Create a file:

```bash
server/.env
```

Use the following values:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/event_management
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### Frontend Environment

Create a file:

```bash
client/.env
```

Use:

```bash
VITE_API_URL=http://localhost:5000/api
```

For production, use:

```bash
VITE_API_URL=https://event-1hjn.onrender.com/api
```

## Seed Demo Data

Run:

```bash
npm run seed
```

The seed script creates:

* Admin user
* Normal user
* 40 demo events
* First 10 events related to Blockchain/Web3
* Multiple categories, locations, dates, capacities, and event images
* Some pre-registered events for the demo user

Note: Running the seed command resets demo users and events.

Demo accounts:

```bash
Admin:
Email: admin@example.com
Password: password123

User:
Email: durgesh@example.com
Password: password123
```

## Run Development Servers

From the root folder, run:

```bash
npm run dev
```

Local URLs:

```bash
Frontend: http://localhost:5173
Backend: http://localhost:5000
Swagger Docs: http://localhost:5000/api/docs
Health Check: http://localhost:5000/api/health
```

## Build Frontend

```bash
cd client
npm run build
```

## Run Backend Only

```bash
cd server
npm run dev
```

For production mode:

```bash
cd server
npm start
```

## API Endpoints

| Method | Endpoint                       | Access        | Description                                                               |
| ------ | ------------------------------ | ------------- | ------------------------------------------------------------------------- |
| GET    | `/api/health`                  | Public        | Health check                                                              |
| POST   | `/api/auth/register`           | Public        | Register a new user                                                       |
| POST   | `/api/auth/login`              | Public        | Login user                                                                |
| GET    | `/api/auth/me`                 | Authenticated | Get current logged-in user                                                |
| GET    | `/api/events`                  | Public        | List events with pagination, search, category, location, and date filters |
| GET    | `/api/events/:id`              | Public        | Get event details                                                         |
| GET    | `/api/events/:id/attendees`    | Public        | Get registered attendees for an event                                     |
| POST   | `/api/events`                  | Admin         | Create a new event                                                        |
| PUT    | `/api/events/:id`              | Admin         | Update an event                                                           |
| DELETE | `/api/events/:id`              | Admin         | Delete an event                                                           |
| POST   | `/api/events/:id/register`     | Authenticated | Register for an event                                                     |
| DELETE | `/api/events/:id/register`     | Authenticated | Cancel event registration                                                 |
| GET    | `/api/registrations/my-events` | Authenticated | Get current user's registered events                                      |

## Event List Query Parameters

The event list API supports:

```bash
GET /api/events?page=1&limit=8&search=Blockchain&category=Blockchain&location=Online&date=month
```

Supported query parameters:

| Parameter  | Example                            | Description                                         |
| ---------- | ---------------------------------- | --------------------------------------------------- |
| `page`     | `1`                                | Current page number                                 |
| `limit`    | `8`                                | Number of events per page                           |
| `search`   | `Blockchain`                       | Search by title, description, category, or location |
| `category` | `Blockchain`                       | Filter by exact category                            |
| `location` | `Online`                           | Filter by location                                  |
| `date`     | `today`, `week`, `month`, `online` | Filter by date range or online events               |

## Swagger API Documentation

Swagger is available at:

```bash
Local:
http://localhost:5000/api/docs

Production:
https://event-1hjn.onrender.com/api/docs
```

Swagger includes documentation for:

* Auth APIs
* Event APIs
* Registration APIs
* Protected routes
* Request body schemas
* JWT bearer authentication

## Postman Collection

A Postman collection is included:

```bash
postman_collection.json
```

Import it into Postman and set the base URL:

```bash
Local:
http://localhost:5000/api

Production:
https://event-1hjn.onrender.com/api
```

For protected requests, login first and use the returned JWT token as:

```bash
Authorization: Bearer YOUR_TOKEN_HERE
```

## Authentication Flow

1. User registers or logs in.
2. Backend validates credentials.
3. Backend returns JWT token and safe user data.
4. Frontend stores token in localStorage.
5. Axios interceptor attaches token to protected API requests.
6. Protected backend routes verify JWT before allowing access.

## Role-Based Access Control

The app supports two roles:

```bash
admin
user
```

### Admin Can

* Create events
* Edit events
* Delete events
* View events
* View attendees
* Register for events if needed

### User Can

* Register
* Login
* View events
* Search and filter events
* View event details
* Register for an event
* Cancel registration
* View My Events page

Public registration always creates a normal `user` account. Admin accounts are created only through seed data or manually in the database.

## Validation and Error Handling

Backend validation includes:

* Required name, email, and password for auth
* Valid email format
* Minimum password length
* Required event title, description, category, location, start date, and capacity
* Valid MongoDB ObjectId validation
* Capacity checks
* Duplicate registration prevention
* Full event capacity prevention

Centralized error handling returns consistent JSON responses.

## Security Practices

* Passwords are hashed with bcrypt
* JWT authentication protects private APIs
* Admin APIs are protected with role-based middleware
* Helmet adds common HTTP security headers
* CORS restricts frontend origin using `CLIENT_URL`
* Rate limiting reduces abuse
* Public registration cannot create admin accounts
* MongoDB ObjectId validation is applied
* Server-side validation is applied with `express-validator`

## Docker Setup

Run the full app with Docker:

```bash
docker compose up --build
```

Docker URLs:

```bash
Frontend: http://localhost:8080
Backend: http://localhost:5000
MongoDB: mongodb://localhost:27017
Swagger Docs: http://localhost:5000/api/docs
```

Seed data inside Docker:

```bash
docker compose exec server npm run seed
```

Stop Docker containers:

```bash
docker compose down
```

## Deployment

The project is deployed using:

* Vercel for React frontend
* Render for Express backend
* MongoDB Atlas for database

## Render Backend Deployment

Backend URL:

```bash
https://event-1hjn.onrender.com
```

API base URL:

```bash
https://event-1hjn.onrender.com/api
```

Swagger:

```bash
https://event-1hjn.onrender.com/api/docs
```

Health check:

```bash
https://event-1hjn.onrender.com/api/health
```

### Render Environment Variables

Set the following environment variables in Render:

```bash
PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_URI
JWT_SECRET=YOUR_LONG_RANDOM_SECRET
JWT_EXPIRES_IN=7d
CLIENT_URL=https://event-client-theta.vercel.app
NODE_ENV=production
```

If multiple frontend origins are needed, use comma-separated values:

```bash
CLIENT_URL=https://event-client-theta.vercel.app,http://localhost:5173
```

## Vercel Frontend Deployment

Frontend URL:

```bash
https://event-client-theta.vercel.app/
```

### Vercel Settings

Since the frontend is inside the `client` folder, use these Vercel settings:

```bash
Framework Preset: Vite
Root Directory: client
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

### Vercel Environment Variable

Set this in Vercel:

```bash
VITE_API_URL=https://event-1hjn.onrender.com/api
```

## Production Checks

After deployment, verify:

```bash
Frontend:
https://event-client-theta.vercel.app/

Backend Health:
https://event-1hjn.onrender.com/api/health

Swagger:
https://event-1hjn.onrender.com/api/docs
```

Manual checks:

* Open frontend URL
* Register a new user
* Login as admin
* Create event
* Edit event
* Delete event
* Login as normal user
* Register for event
* Try duplicate registration
* Cancel registration
* Open My Events page
* Open event details page directly
* Test search
* Test category filter
* Test location filter
* Test date filter
* Test pagination
* Confirm protected APIs work
* Confirm Swagger loads correctly

## Evaluation Coverage

| Requirement                  | Status    |
| ---------------------------- | --------- |
| User Authentication          | Complete  |
| JWT Authentication           | Complete  |
| Create Events                | Complete  |
| Edit Events                  | Complete  |
| Delete Events                | Complete  |
| View All Events              | Complete  |
| Search Events                | Complete  |
| Pagination                   | Complete  |
| Event Details Page           | Complete  |
| Register for Event           | Complete  |
| Display Registered Attendees | Complete  |
| Responsive UI                | Complete  |
| REST API Integration         | Complete  |
| Proper Folder Structure      | Complete  |
| Error Handling               | Complete  |
| Validations                  | Complete  |
| RBAC Admin/User              | Complete  |
| Docker Setup                 | Complete  |
| API Documentation            | Complete  |
| Deployment                   | Complete  |
| CI/CD                        | Suggested |

## Bonus Points Covered

* Role-Based Access Control
* Docker setup
* Swagger API documentation
* Postman collection
* Vercel frontend deployment
* Render backend deployment
* Security headers
* Rate limiting
* Production environment configuration

## CI/CD Suggestion

A simple GitHub Actions pipeline can be added later to:

1. Install dependencies
2. Run frontend build
3. Run backend checks
4. Build Docker images
5. Push images to a registry
6. Deploy to Render, AWS, or another hosting provider

## Future Improvements

* Email notification after event registration
* Separate Registration collection for large-scale attendee management
* Admin analytics dashboard
* Event image upload support
* AWS deployment using EC2, S3, and CloudFront
* GitHub Actions CI/CD pipeline
* Refresh token authentication
* Unit and integration testing

## Author

Durgesh Vishwakarma

MERN Stack Developer

## Submission Note

This project was built as part of the MERN Stack Developer technical assignment for Biz Technologies IT Solutions Ltd / Blockcoaster. It covers the requested core features, includes bonus role-based access control and Docker setup, and is deployed using Vercel and Render.
