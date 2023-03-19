import { FastifyReply, FastifyRequest } from 'fastify';
import { gerJourney, getAllJourney, upsertJourney } from './journey.service';
import { UpsertJourneyInput } from './journey.schema';
import { sendToS3 } from '../../utils/s3';

export async function uploadHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    for await (const part of request.files()) {
      sendToS3(part);
    }
    return reply.code(201).send();
  } catch (error) {
    request.log.info(error);
    return reply.code(500).send(error);
  }
}

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

export async function getJourneyByIdHandler(
  request: FastifyRequest<{ Querystring: { id: number } }>,
  reply: FastifyReply
) {
  const { id } = request.query;
  try {
    const journey = await gerJourney(Number(id));
    if (!journey) {
      reply.code(404).send({ message: `Journey ${id} doesn't exist` });
    }
    return reply.code(201).send(journey);
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
