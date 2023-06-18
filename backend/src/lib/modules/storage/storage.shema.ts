import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const uploadImageResponse = z.object({
  uploadedFiles: z.array(z.string()),
});

const imageInput = z.object({
  files: z.array(z.string()),
});

const deleteImageResponse = z.object({
  deleteSuccess: z.boolean(),
});

export const { schemas: storageShemas, $ref } = buildJsonSchemas(
  {
    uploadImageResponse,
    imageInput,
    deleteImageResponse,
  },
  { $id: 'storageShemas' } // id must be uniq to regester multiple schema with server.addSchema
);
