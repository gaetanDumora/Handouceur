import fp from 'fastify-plugin';
import userRoutes from './modules/user/user.route.js';
import { userShemas } from './modules/user/user.shema.js';

export const startServer = fp(async function (server, config) {
  for (const schema of userShemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: '/user' });

  server.addHook('onRequest', async (req) => {
    server.log.info({ req }, 'incoming request');
  });

  server.addHook('onResponse', async (req, res) => {
    server.log.info({ req, res }, 'request completed');
  });

  server.addHook('onSend', async (req, res) => {
    res.header('Cache-Control', 'no-store');
  });

  server.setErrorHandler((err, req, res) => {
    if (res.statusCode >= 500) {
      req.log.error({ req, res, err }, err && err.message);
    } else if (res.statusCode >= 400) {
      req.log.info({ req, res, err }, err && err.message);
    }

    if (res.statusCode >= 500) {
      res.send('An error has occurred');
    } else {
      res.send(err);
    }
  });
});
