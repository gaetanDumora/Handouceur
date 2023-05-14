import { FastifyReply, FastifyRequest } from 'fastify';
import {
  deleteJourney,
  gerJourney,
  getAllJourney,
  upsertJourney,
} from './journey.service';
import { UpsertJourneyInput, DeleteJourneyInput } from './journey.schema';
import { getObjectFromS3, deleteFiles, uploadFiles } from '../../utils/s3';

export async function downloadFileHandler(
  request: FastifyRequest<{ Params: { key: string } }>,
  reply: FastifyReply
) {
  try {
    const { key } = request.params;
    const image = await getObjectFromS3(key);
    return reply.code(200).send(image);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(error);
  }
}

export async function deleteFileHandler(
  request: FastifyRequest<{ Body: { filesToDelete: string[] } }>,
  reply: FastifyReply
) {
  const { filesToDelete } = request.body;
  try {
    const { deleteSuccess } = await deleteFiles(filesToDelete);
    request.log.info({ deleteSuccess }, 'S3 delete files');
    return reply.code(200).send({ deleteSuccess });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(error);
  }
}

export async function uploadFileHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.isMultipart()) {
    return reply
      .code(400)
      .send({ error: 'request must be type of multipart/form-data' });
  }
  try {
    const files = request.files();
    const { uploadSuccess } = await uploadFiles(files);
    request.log.info({ uploadSuccess }, 'S3 upload files');
    return reply.code(200).send({ uploadSuccess });
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
