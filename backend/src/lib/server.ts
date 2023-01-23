import fp from 'fastify-plugin';
import fjwt from '@fastify/jwt';
import userRoutes from './modules/user/user.route.js';
import { userShemas } from './modules/user/user.shema.js';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { decorators } from './modules/config/server.decorators.js';

export const startServer = fp(async function (
  server: FastifyInstance,
  config: FastifyPluginOptions
) {
  // Decorators used in the routes preHandler
  for (const decorator of decorators) {
    server.register(fp(decorator));
  }
  // Allowed response schema in route handlers
  for (const schema of userShemas) {
    server.addSchema(schema);
  }
  server.register(userRoutes, { prefix: '/user' });

  server.register(fjwt, {
    secret: `${process.env.JWT_SECRET || 'mySecret'}`,
  });

  server.addHook('onRequest', async (request) => {
    server.log.info({ request }, 'incoming request');
  });

  server.addHook('onResponse', async (request, reply) => {
    server.log.info({ request, reply }, 'request completed');
  });

  server.addHook('onSend', async (request, reply) => {
    reply.header('Cache-Control', 'no-store');
  });

  server.setErrorHandler((err, request, reply) => {
    if (reply.statusCode >= 500) {
      request.log.error({ request, reply, err }, err && err.message);
    } else if (reply.statusCode >= 400) {
      request.log.info({ request, reply, err }, err && err.message);
    }

    if (reply.statusCode >= 500) {
      reply.send('An error has occurred');
    } else {
      reply.send(err);
    }
  });
});
