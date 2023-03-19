import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { MultipartFile } from '@fastify/multipart';

const s3 = new S3Client({
  region: 'eu-west-3',
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY || 'AKIA3VFN2KEE7S6VWY4G',
    secretAccessKey:
      process.env.AWS_S3_SECRET || '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',
  },
});

export const sendToS3 = async (part: MultipartFile) => {
  const parallelUploads3 = new Upload({
    client: s3,
    params: {
      Bucket: process.env.BUCKET_NAME || 'handouceur-s3-bucket',
      Key: `${part.fieldname}_${part.filename}`,
      Body: part.file,
    },

    tags: [{ Key: part.fieldname, Value: part.filename }], // optional tags
    queueSize: 4, // optional concurrency configuration
    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
    leavePartsOnError: false, // optional manually handle dropped parts
  });
  await parallelUploads3.done();
};
