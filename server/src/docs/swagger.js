import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Management System API',
      version: '1.0.0',
      description: 'REST API for authentication, event CRUD, event registration, and attendee listing.'
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local API'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        AuthPayload: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@example.com' },
            password: { type: 'string', example: 'password123' }
          }
        },
        EventInput: {
          type: 'object',
          required: ['title', 'description', 'category', 'location', 'startsAt', 'capacity'],
          properties: {
            title: { type: 'string', example: 'MERN Hiring Meetup' },
            description: { type: 'string', example: 'A technical hiring and networking event.' },
            category: { type: 'string', example: 'Technology' },
            location: { type: 'string', example: 'Mumbai' },
            startsAt: { type: 'string', format: 'date-time' },
            capacity: { type: 'integer', example: 120 },
            imageUrl: { type: 'string', example: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
});
