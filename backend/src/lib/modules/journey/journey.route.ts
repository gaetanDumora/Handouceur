import { FastifyInstance } from 'fastify';
import { $ref } from './journey.schema';
import {
  getAllJourneyHandler,
  upsertJourneyHandler,
} from './journey.controllers';

async function journeyRoutes(server: FastifyInstance) {
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
}

export default journeyRoutes;
