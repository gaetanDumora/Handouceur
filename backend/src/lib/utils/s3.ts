import { S3Client } from '@aws-sdk/client-s3';

export const HTTP_SUCCESS_CODES = [200, 201, 204];
export const S3_BUCKET_URL = process.env.AWS_S3_BUCKET_URL;

export enum StorageFolders {
  journey = 'journey_images/',
  user = 'user_images/',
}

export type StorageFolderPaths = `${StorageFolders}`;

const getS3instance = () => {
  const accessKeyId = process.env.AWS_S3_KEY;
  const secretAccessKey = process.env.AWS_S3_SECRET;
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('S3 secret_key or access_key are incorrect');
  }
  return new S3Client({
    region: process.env.AWS_S3_LOCATION,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};
export const awsS3Client = getS3instance();
