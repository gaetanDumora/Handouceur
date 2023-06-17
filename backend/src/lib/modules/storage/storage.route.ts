import { FastifyInstance } from 'fastify';
import {
  uploadFileHandler,
  downloadFileHandler,
} from './storage.controllers.js';
import { $ref } from './storage.shema.js';

async function storageRoutes(server: FastifyInstance) {
  server.get('/:folder/:key', {}, downloadFileHandler);
  server.post(
    '/upload',
    {
      schema: {
        response: {
          200: $ref('uploadImageResponse'),
        },
      },
    },
    uploadFileHandler
  );
}

export default storageRoutes;
