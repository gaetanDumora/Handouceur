import { Upload } from '@aws-sdk/lib-storage';
import { MultipartFile } from '@fastify/multipart';
import { HTTP_SUCCESS_CODES, S3_BUCKET_URL, awsS3Client } from '../../utils/s3';

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
  files: AsyncIterableIterator<MultipartFile>
) => {
  const S3ResponseCode = [];
  for await (const file of files) {
    const { $metadata } = await createUploadCommand(file);
    S3ResponseCode.push($metadata.httpStatusCode);
  }
  return {
    isUploadCompleted: S3ResponseCode.every((httpCode) =>
      HTTP_SUCCESS_CODES.includes(httpCode as number)
    ),
  };
};
