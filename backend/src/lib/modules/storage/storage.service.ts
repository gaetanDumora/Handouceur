import { Upload } from '@aws-sdk/lib-storage';
import { MultipartFile, MultipartValue } from '@fastify/multipart';
import { HTTP_SUCCESS_CODES, S3_BUCKET_URL, awsS3Client } from '../../utils/s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';

const createUploadCommand = async (part: MultipartFile) => {
  const command = new Upload({
    client: awsS3Client,
    params: {
      Bucket: S3_BUCKET_URL,
      Key: part.fieldname,
      Body: part.file,
      ContentType: part.type,
      ContentEncoding: part.encoding,
    },
  });
  const response = await command.done();
  return response;
};

export const uploadFiles = async (
  parts: AsyncIterableIterator<MultipartFile | MultipartValue>
) => {
  const uploadedFiles = [];
  for await (const part of parts) {
    if (part.type === 'file') {
      const { $metadata } = await createUploadCommand(part);
      const statusCode = $metadata.httpStatusCode;
      if (statusCode && HTTP_SUCCESS_CODES.includes(statusCode)) {
        uploadedFiles.push(part.fieldname);
      }
    }
  }
  return { uploadedFiles };
};

export const getFile = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET_URL,
    Key: key,
  });
  const { Body } = await awsS3Client.send(command);
  if (!Body) {
    throw new Error(`File ${key} not found `);
  }
  return Body;
};
