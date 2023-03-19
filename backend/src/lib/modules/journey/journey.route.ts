import { FastifyInstance } from 'fastify';
import { $ref } from './journey.schema';
import {
  getAllJourneyHandler,
  getJourneyByIdHandler,
  uploadHandler,
  upsertJourneyHandler,
} from './journey.controllers';

async function journeyRoutes(server: FastifyInstance) {
  server.post(
    '/upload',
    {
      preHandler: [server.verifyJwtToken, server.verifyAdmin],
      schema: {
        response: { 201: { status: true } },
      },
    },
    uploadHandler
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
          201: $ref('getAllJourneySchemaResponse'),
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
          201: $ref('getJourneySchemaResponse'),
        },
      },
    },
    getJourneyByIdHandler
  );
}

export default journeyRoutes;
