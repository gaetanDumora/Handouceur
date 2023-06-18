import { FastifyInstance } from 'fastify';
import { $ref } from './journey.schema';
import {
  getAllJourneyHandler,
  getJourneyByIdHandler,
  deleteFileHandler,
  upsertJourneyHandler,
  deleteJourneyHandler,
} from './journey.controllers';

async function journeyRoutes(server: FastifyInstance) {
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
  server.post(
    '/delete',
    {
      preHandler: [server.verifyJwtToken, server.verifyAdmin],
      schema: {
        body: $ref('deleteJourneyInput'),
        response: {
          202: $ref('deleteJourneyResponse'),
        },
      },
    },
    deleteJourneyHandler
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
