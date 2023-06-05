import { FastifyInstance } from 'fastify';
import {
  isUserHandler,
  registerUserHandler,
  loginHandler,
  getUsersHandler,
  uploadFileHandler,
} from './user.controllers.js';
import { $ref } from './user.shema.js';

async function userRoutes(server: FastifyInstance) {
  server.post(
    '/registerUser',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    registerUserHandler
  ),
    server.post(
      '/image/upload',
      {
        schema: {
          response: {
            200: $ref('uploadImageResponse'),
          },
        },
      },
      uploadFileHandler
    );
  server.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          201: $ref('loginSchemaResponse'),
        },
      },
    },
    loginHandler
  ),
    server.get(
      '/isUser',
      {
        schema: {
          querystring: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
              },
            },
          },
        },
      },
      isUserHandler
    );
  server.get(
    '/',
    {
      preHandler: [server.verifyJwtToken],
    },
    getUsersHandler
  );
}

export default userRoutes;
