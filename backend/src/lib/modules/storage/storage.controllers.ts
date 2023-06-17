import { FastifyReply, FastifyRequest } from 'fastify';
import { getFile, uploadFiles } from './storage.service.js';
import { StorageFolderPaths } from '../../utils/s3.js';

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
    const parts = request.parts();
    const { uploadedFiles } = await uploadFiles(parts);
    if (uploadedFiles.length) {
    }
    request.log.info({ uploadedFiles });
    return reply.code(200).send({ uploadedFiles });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(error);
  }
}

export async function downloadFileHandler(
  request: FastifyRequest<{
    Params: { folder: StorageFolderPaths; key: string };
  }>,
  reply: FastifyReply
) {
  try {
    debugger;
    const { folder, key } = request.params;
    const path = `${folder}/${key}`;
    const image = await getFile(path);
    return reply.code(200).send(image);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(error);
  }
}
