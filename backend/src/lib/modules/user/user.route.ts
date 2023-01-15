import { FastifyInstance } from 'fastify';
import { isUser, registerUserHandler } from './user.controllers.js';
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
      isUser
    );
}

export default userRoutes;
