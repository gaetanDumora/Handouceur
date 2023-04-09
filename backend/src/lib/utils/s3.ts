import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { MultipartFile } from '@fastify/multipart';

const HTTP_SUCCESS_CODES = [200, 201, 204];
const S3_BUCKET_URL = process.env.AWS_S3_BUCKET_URL;

const client = new S3Client({
  region: process.env.AWS_S3_LOCATION,
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

export const getObjectFromS3 = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET_URL,
    Key: key,
  });
  const { Body } = await client.send(command);
  if (!Body) {
    throw new Error(`File ${key} not found `);
  }
  const response = await Body.transformToString();
  return response;
};

const deleteObjectFromS3 = async (key: string) => {
  const command = new DeleteObjectCommand({ Bucket: S3_BUCKET_URL, Key: key });
  const response = await client.send(command);
  return response;
};

const S3Storage = async (part: MultipartFile) => {
  const parallelUploads3 = new Upload({
    client: client,
    params: {
      Bucket: process.env.BUCKET_NAME,
      Key: part.filename,
      Body: part.file,
    },
  });
  const response = await parallelUploads3.done();
  return response;
};

export const uploadFiles = async (
  files: AsyncIterableIterator<MultipartFile>
) => {
  const results: number[] = [];
  for await (const file of files) {
    const { $metadata } = await S3Storage(file);
    results.push($metadata.httpStatusCode!);
  }
  return {
    uploadSuccess: results.every((val) => HTTP_SUCCESS_CODES.includes(val)),
  };
};

export const deleteFiles = async (fileKeys: string[]) => {
  const results: number[] = [];
  for (const file of fileKeys) {
    const { $metadata } = await deleteObjectFromS3(file);
    results.push($metadata.httpStatusCode!);
  }
  return {
    deleteSuccess: results.every((val) => HTTP_SUCCESS_CODES.includes(val)),
  };
};
