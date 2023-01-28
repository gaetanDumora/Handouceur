import fp from 'fastify-plugin';
import { readFileSync } from 'node:fs';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { fastifyCors } from '@fastify/cors';

// const transport = pino.transport({
//   target: 'pino-pretty',
//   options: { colorize: true },
// });

// const logger = pino({ level: env.LOG_LEVEL }, transport);
export const loadServerConfig = {
  logger: true,
  https: {
    key: readFileSync('/usr/src/app/certificats/localhost-key.pem'),
    cert: readFileSync('/usr/src/app/certificats/localhost.pem'),
  },
  cors: fp(
    (server: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
      const options = { origin: '*', methods: ['GET', 'POST'] };
      fastifyCors(server, options, () => {});
      done();
    }
  ),
};
