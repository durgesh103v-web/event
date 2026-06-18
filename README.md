# Event Management System

MERN Stack technical assignment for Biz Technologies IT Solutions Ltd / Blockcoaster.

## Features

- JWT authentication with register, login, and current-user endpoint
- Role-based access control with `admin` and `user` roles
- Create, edit, delete, view, search, and paginate events
- Event details page with attendee list
- My Registrations page for users to view events they joined
- Authenticated users can register for events and cancel registration
- Duplicate registration and full-capacity checks
- Responsive React UI
- REST API with validation, centralized error handling, Helmet, CORS, and rate limiting
- Swagger API documentation and Postman collection
- Docker setup with MongoDB, Express API, and React/Nginx frontend

## Tech Stack

- Frontend: React.js, Vite, React Router, Axios, Lucide React
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB
- Authentication: JWT and bcrypt
- Documentation: Swagger UI, Postman collection
- Deployment-ready tooling: Docker and Docker Compose

## Project Structure

```text
.
|-- client
|   |-- src
|   |   |-- api          # Axios client and API error handling
|   |   |-- components   # Reusable UI components
|   |   |-- constants    # Shared static option data
|   |   |-- context      # Authentication state
|   |   |-- hooks        # Shared React hooks
|   |   |-- pages        # Route-level screens
|   |   `-- styles       # Global and style helpers
|   |-- Dockerfile
|   `-- vite.config.js
|-- server
|   |-- src
|   |   |-- config       # Database configuration
|   |   |-- controllers  # HTTP request handlers
|   |   |-- docs         # OpenAPI schemas and paths
|   |   |-- middleware   # Auth, validation, and errors
|   |   |-- models       # Mongoose models
|   |   |-- routes       # Express route definitions
|   |   `-- utils        # Query and token helpers
|   `-- Dockerfile
|-- docker-compose.yml
|-- package.json
|-- render.yaml            # Render API Blueprint
|-- vercel.json            # Vercel client build and SPA routing
`-- postman_collection.json
```

## Local Setup

### Prerequisites

- Node.js 20+
- MongoDB running locally or a MongoDB Atlas URI
- npm

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create `server/.env` from `server/.env.example`:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/event_management
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Create `client/.env` from `client/.env.example`:

```bash
VITE_API_URL=http://localhost:5000/api
```

### Seed Demo Data

```bash
npm run seed
```

Admin users are created only through the seed script or manually in the database. Public registration always creates a normal `user` account.

Note: Running the seed command resets demo users and events.

Demo accounts:

- Admin: `admin@example.com` / `password123`
- User: `durgesh@example.com` / `password123`

### Run Development Servers

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Swagger docs: `http://localhost:5000/api/docs`

## Docker Setup

```bash
docker compose up --build
```

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:5000`
- MongoDB: `localhost:27017`

To seed data in Docker:

```bash
docker compose exec server npm run seed
```

## API Endpoints

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/health` | Public | Health check |
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Authenticated | Current user |
| GET | `/api/events` | Public | List events with `page`, `limit`, `search`, `category`, `location`, and `date` filters |
| GET | `/api/events/:id` | Public | Event details and attendees |
| GET | `/api/events/:id/attendees` | Public | Registered attendees for event |
| POST | `/api/events` | Admin | Create event |
| PUT | `/api/events/:id` | Admin | Update event |
| DELETE | `/api/events/:id` | Admin | Delete event |
| POST | `/api/events/:id/register` | Authenticated | Register for event |
| DELETE | `/api/events/:id/register` | Authenticated | Cancel registration |
| GET | `/api/registrations/my-events` | Authenticated | Current user's registered events |

Import `postman_collection.json` into Postman for ready-made API requests.

## Security and Validation

- Passwords are hashed with bcrypt before storage.
- JWT protects private routes.
- Public registration cannot create admin accounts.
- Event create/update/delete is limited to admins.
- Server-side validation uses `express-validator`.
- Helmet adds common HTTP security headers.
- Rate limiting helps reduce abuse.
- MongoDB ObjectId validation is applied on parameterized routes.

## Vercel + Render Deployment

The repository includes `vercel.json` for the React client and `render.yaml` for the Express API.

### 1. Prepare MongoDB Atlas

1. Create an Atlas cluster and database user.
2. Allow connections from Render in Atlas Network Access.
3. Copy the Atlas connection string for `MONGO_URI`.

### 2. Deploy the API to Render

1. In Render, create a Blueprint from this repository. Render detects `render.yaml`.
2. Enter `MONGO_URI` when prompted.
3. Initially set `CLIENT_URL` to the expected Vercel URL, for example `https://your-app.vercel.app`.
4. Deploy and verify:
   - Health: `https://your-api.onrender.com/api/health`
   - Swagger: `https://your-api.onrender.com/api/docs`

Render generates `JWT_SECRET` automatically. Do not commit production secrets.

### 3. Deploy the Client to Vercel

1. Import this repository into Vercel and keep the project root at the repository root.
2. Add the environment variable:

```bash
VITE_API_URL=https://your-api.onrender.com/api
```

3. Deploy. `vercel.json` builds only the `client` workspace and preserves React Router URLs.

### 4. Finalize CORS

Set Render's `CLIENT_URL` to the final Vercel production URL and redeploy the API. Multiple exact origins can be comma-separated, for example:

```bash
CLIENT_URL=https://your-app.vercel.app,https://www.example.com
```

### Deployment Checks

- Open the Vercel application and load an event details URL directly.
- Register or sign in and confirm protected API calls work.
- Confirm Render `/api/health` returns `{ "status": "ok" }`.
- Confirm Swagger's **Try it out** requests use the Render origin.

## CI/CD Suggestion

A simple GitHub Actions workflow can:

1. Install dependencies.
2. Run frontend build.
3. Build Docker images.
4. Push images to a registry.
5. Deploy to the selected AWS service.

## Assignment Coverage

- Core features: complete
- REST API integration: complete
- Proper folder structure: complete
- Error handling and validations: complete
- Bonus RBAC: complete
- Bonus Docker setup: complete
- Bonus API documentation: Swagger and Postman included
- AWS deployment and CI/CD: documented deployment path
