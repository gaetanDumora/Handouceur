import { FastifyReply, FastifyRequest } from 'fastify';
import { getAllJourney, upsertJourney } from './journey.service';
import { UpsertJourneyInput } from './journey.schema';

export async function getAllJourneyHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const allJourneys = await getAllJourney();
    return reply.code(201).send(allJourneys);
  } catch (error) {
    request.log.info(error);
    return reply.code(500).send(error);
  }
}

export async function upsertJourneyHandler(
  request: FastifyRequest<{ Body: UpsertJourneyInput }>,
  reply: FastifyReply
) {
  const { body } = request;
  try {
    const journey = await upsertJourney(body);
    return reply.code(201).send(journey);
  } catch (error) {
    request.log.info(error);
    return reply.code(500).send(error);
  }
}
