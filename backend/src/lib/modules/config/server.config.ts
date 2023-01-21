import fp from 'fastify-plugin';
import { readFileSync } from 'node:fs';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { fastifyCors } from '@fastify/cors';

export const loadServerConfig = async () => {
  return {
    logger: true,
    https: {
      key: readFileSync('/usr/src/app/certificats/localhost-key.pem'),
      cert: readFileSync('/usr/src/app/certificats/localhost.pem'),
    },
    jwtSecret: process.env.JWT_SECRET ?? 'mySecret',
    environment: process.env.ENVIRONMENT ?? 'development',
    cors: fp(
      (
        server: FastifyInstance,
        opts: FastifyPluginOptions,
        done: () => void
      ) => {
        const options = { origin: '*', methods: ['GET', 'POST'] };
        fastifyCors(server, options, () => {
          server.log.info('plugin CORS ready');
        });
        done();
      }
    ),
  };
};
