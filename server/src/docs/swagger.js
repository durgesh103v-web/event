import path from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJsdoc from 'swagger-jsdoc';

const docsDirectory = path.dirname(fileURLToPath(import.meta.url));
const pathDefinitions = path.join(docsDirectory, 'paths.js').replaceAll('\\', '/');

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
        url: '/api',
        description: 'Current API server'
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
        RegisterPayload: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Jane Smith' },
            email: { type: 'string', format: 'email', example: 'jane@example.com' },
            password: { type: 'string', format: 'password', example: 'password123' }
          }
        },
        AuthPayload: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@example.com' },
            password: { type: 'string', format: 'password', example: 'password123' }
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
  apis: [pathDefinitions]
});
