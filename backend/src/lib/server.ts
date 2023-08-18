import fp from 'fastify-plugin';
import fjwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import userRoutes from './modules/user/user.route.js';
import journeyRoutes from './modules/journey/journey.route.js';
import storageRoutes from './modules/storage/storage.route.js';
import { userShemas } from './modules/user/user.shema.js';
import { journeySchemas } from './modules/journey/journey.schema.js';
import { storageShemas } from './modules/storage/storage.shema.js';
import { FastifyInstance } from 'fastify';
import { decorators } from './modules/config/server.decorators.js';
import fastifyCors from '@fastify/cors';

export const startServer = fp(async function (server: FastifyInstance) {
  // Decorators used in the routes preHandler
  for (const decorator of decorators) {
    server.register(fp(decorator));
  }
  // Allowed response schema in route handlers
  for (const schema of [...userShemas, ...journeySchemas, ...storageShemas]) {
    server.addSchema(schema);
  }

  // Register plugins, Order matter
  server.register(fastifyCors, { origin: '*', methods: ['GET', 'POST'] });
  server.register(multipart, { limits: { fileSize: 1024 * 1024 * 10 } }); // 10 MB
  server.register(userRoutes, { prefix: '/user' });
  server.register(journeyRoutes, { prefix: '/journey' });
  server.register(storageRoutes, { prefix: '/storage' });
  server.register(fjwt, { secret: `${process.env.JWT_SECRET}` });

  // Hooks
  server.addHook('onRequest', async (request) => {
    server.log.info({ request }, 'incoming request');
  });
  server.addHook('onResponse', async (request, reply) => {
    server.log.info({ reply }, 'request completed');
  });
  server.setErrorHandler((err, request, reply) => {
    if (reply.statusCode >= 500) {
      request.log.error({ request, reply, err }, err && err.message);
    } else if (reply.statusCode >= 400) {
      request.log.info({ request, reply, err }, err && err.message);
    }

    if (reply.statusCode >= 500) {
      reply.send(err);
    } else {
      reply.send(err);
    }
  });
});
