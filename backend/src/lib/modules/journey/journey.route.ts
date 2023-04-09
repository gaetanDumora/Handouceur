import { FastifyInstance } from 'fastify';
import { $ref } from './journey.schema';
import {
  getAllJourneyHandler,
  getJourneyByIdHandler,
  uploadFileHandler,
  deleteFileHandler,
  upsertJourneyHandler,
  downloadFileHandler,
} from './journey.controllers';

async function journeyRoutes(server: FastifyInstance) {
  server.get('/image/:key', {}, downloadFileHandler);
  server.post(
    '/image/upload',
    {
      preHandler: [server.verifyJwtToken, server.verifyAdmin],
      schema: {
        response: {
          200: $ref('uploadImageResponse'),
        },
      },
    },
    uploadFileHandler
  );
  server.post(
    '/image/delete',
    {
      preHandler: [server.verifyJwtToken, server.verifyAdmin],
      schema: {
        body: $ref('deleteImageInput'),
        response: {
          200: $ref('deleteImageResponse'),
        },
      },
    },
    deleteFileHandler
  );
  server.post(
    '/upsert',
    {
      preHandler: [server.verifyJwtToken, server.verifyAdmin],
      schema: {
        body: $ref('upsertJourneyInput'),
        response: {
          201: $ref('getJourneySchemaResponse'),
        },
      },
    },
    upsertJourneyHandler
  );
  server.get(
    '/getAll',
    {
      schema: {
        response: {
          200: $ref('getAllJourneySchemaResponse'),
        },
      },
    },
    getAllJourneyHandler
  );
  server.get(
    '/getById',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
            },
          },
        },
        response: {
          200: $ref('getJourneySchemaResponse'),
        },
      },
    },
    getJourneyByIdHandler
  );
}

export default journeyRoutes;
