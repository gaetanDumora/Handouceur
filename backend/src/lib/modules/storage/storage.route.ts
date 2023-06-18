import { FastifyInstance } from 'fastify';
import {
  uploadFileHandler,
  downloadFileHandler,
  deleteFileHandler,
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
  server.post(
    '/delete',
    {
      preHandler: [server.verifyJwtToken],
      schema: {
        body: $ref('imageInput'),
        response: {
          200: $ref('deleteImageResponse'),
        },
      },
    },
    deleteFileHandler
  );
}

export default storageRoutes;
