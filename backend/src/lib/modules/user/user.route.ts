import { FastifyInstance } from 'fastify';
import { isRegistered, registerUserHandler } from './user.controllers.js';
import { $ref } from './user.shema.js';

async function userRoutes(server: FastifyInstance) {
  server.post(
    '/',
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
      '/isRegistered',
      {
        schema: {
          body: $ref('isUserSchema'),
          response: {
            201: $ref('createUserResponseSchema'),
          },
        },
      },
      isRegistered
    );
}

export default userRoutes;
