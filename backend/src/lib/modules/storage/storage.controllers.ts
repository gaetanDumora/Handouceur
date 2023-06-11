import { FastifyReply, FastifyRequest } from 'fastify';
import { uploadFiles } from './storage.service.js';

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
    const { isUploadCompleted } = await uploadFiles(files);
    request.log.info({ isUploadCompleted });
    return reply.code(200).send({ isUploadCompleted });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(error);
  }
}
