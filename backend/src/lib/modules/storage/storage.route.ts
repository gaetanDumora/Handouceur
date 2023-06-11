import { FastifyInstance } from 'fastify';
import { uploadFileHandler } from './storage.controllers.js';
import { $ref } from './storage.shema.js';

async function storageRoutes(server: FastifyInstance) {
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
