import fp from 'fastify-plugin';
import fjwt from '@fastify/jwt';
import userRoutes from './modules/user/user.route.js';
import { userShemas } from './modules/user/user.shema.js';
import { FastifyRequest } from 'fastify/types/request.js';
import { FastifyReply } from 'fastify/types/reply.js';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { User } from '@prisma/client';
import { isAdmin } from './modules/user/user.service.js';

export const startServer = fp(async function (
  server: FastifyInstance,
  config: FastifyPluginOptions
) {
  server.decorate(
    'verifyJwtToken',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        request.log.error({ error });
        reply.send(error);
      }
    }
  );
  server.decorate(
    'verifyAdmin',
    async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
      try {
        const user = request.body;
        if (!(await isAdmin(user.email))) {
          throw new Error('Only admin can access');
        }
      } catch (error) {
        request.log.error({ error });
        reply.send(error);
      }
    }
  );
  server.decorate(
    'verifyEmailPassword',
    async (request: FastifyRequest, reply: FastifyReply) => {}
  );
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
