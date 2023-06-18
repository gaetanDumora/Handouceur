import { FastifyReply, FastifyRequest } from 'fastify';
import {
  deleteJourney,
  gerJourney,
  getAllJourney,
  upsertJourney,
} from './journey.service';
import { UpsertJourneyInput, DeleteJourneyInput } from './journey.schema';
import { deleteFiles } from '../../utils/s3';

export async function deleteFileHandler(
  request: FastifyRequest<{ Body: { filesToDelete: string[] } }>,
  reply: FastifyReply
) {
  const { filesToDelete } = request.body;
  try {
    const { deleteSuccess } = await deleteFiles(
      filesToDelete,
      'journey_images/'
    );
    request.log.info({ deleteSuccess }, 'S3 delete files');
    return reply.code(200).send({ deleteSuccess });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(error);
  }
}

export async function getAllJourneyHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const allJourneys = await getAllJourney();
    return reply.code(200).send(allJourneys);
  } catch (error) {
    request.log.info(error);
    return reply.code(500).send(error);
  }
}

export async function getJourneyByIdHandler(
  request: FastifyRequest<{ Querystring: { id: number } }>,
  reply: FastifyReply
) {
  const journeyId = Number(request.query.id);
  try {
    const journey = await gerJourney(journeyId);
    if (!journey) {
      reply.code(404).send({ message: `Journey ${journeyId} doesn't exist` });
    }
    return reply.code(200).send(journey);
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

export async function deleteJourneyHandler(
  request: FastifyRequest<{ Body: DeleteJourneyInput }>,
  reply: FastifyReply
) {
  const { body } = request;
  const { id: toDelete } = body;
  try {
    const { id } = await deleteJourney({ id: toDelete });
    request.log.info({ id }, 'Delete journey');
    return reply.code(200).send({ id });
  } catch (error) {
    request.log.info(error);
    return reply.code(500).send(error);
  }
}
