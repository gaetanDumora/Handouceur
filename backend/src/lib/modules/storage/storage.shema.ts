import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const uploadImageResponse = z.object({
  isUploadCompleted: z.boolean(),
});

export const { schemas: storageShemas, $ref } = buildJsonSchemas(
  {
    uploadImageResponse,
  },
  { $id: 'storageShemas' } // id must be uniq to regester multiple schema with server.addSchema
);
