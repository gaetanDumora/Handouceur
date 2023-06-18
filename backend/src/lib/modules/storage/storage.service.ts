import { Upload } from '@aws-sdk/lib-storage';
import { MultipartFile, MultipartValue } from '@fastify/multipart';
import { HTTP_SUCCESS_CODES, S3_BUCKET_URL, awsS3Client } from '../../utils/s3';
import { DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

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
const createDeleteCommand = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET_URL,
    Key: key,
  });
  const response = await awsS3Client.send(command);
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

export const deleteFiles = async (fileKeys: string[]) => {
  const results: number[] = [];
  for (const file of fileKeys) {
    const { $metadata } = await createDeleteCommand(file);
    results.push($metadata.httpStatusCode!);
  }
  return {
    deleteSuccess: results.every((val) => HTTP_SUCCESS_CODES.includes(val)),
  };
};
