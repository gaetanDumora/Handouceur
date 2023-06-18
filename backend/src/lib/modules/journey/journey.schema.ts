import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

enum AutonomyStatus {
  GOOD = 'GOOD',
  RELATIVE = 'RELATIVE',
  IMPORTANT = 'IMPORTANT',
}

const getJourneyInput = z.object({
  id: z.number(),
});

const getJourneySchemaResponse = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  location: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
  startDate: z.union([z.date(), z.string()]),
  endDate: z.union([z.date(), z.string()]),
  price: z.number(),
  autonomy: z.nativeEnum(AutonomyStatus),
  groupSize: z.number().optional(),
  companions: z.number().optional(),
  recreation: z.string(),
  hosting: z.string(),
  transport: z.string(),
  createdAt: z.union([z.date(), z.string()]),
});
const getAllJourneySchemaResponse = z.array(getJourneySchemaResponse);

const upsertJourneyInput = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  location: z.string().optional(),
  images: z.array(z.string()).optional(),
  description: z.string().optional(),
  coordinates: z.tuple([z.number(), z.number()]).optional(),
  startDate: z.union([z.date(), z.string()]).optional(),
  endDate: z.union([z.date(), z.string()]).optional(),
  price: z.number().optional(),
  autonomy: z.nativeEnum(AutonomyStatus).optional(),
  groupSize: z.number().optional(),
  companions: z.number().optional(),
  recreation: z.string().optional(),
  hosting: z.string().optional(),
  transport: z.string().optional(),
});

const deleteJourneyInput = z.object({
  id: z.number(),
});
const deleteJourneyResponse = z.object({
  id: z.number(),
});

const deleteImageInput = z.object({
  filesToDelete: z.array(z.string()),
});
const deleteImageResponse = z.object({
  deleteSuccess: z.boolean(),
});

export type GetJourneyInput = z.infer<typeof getJourneyInput>;
export type GetJourneySchemaResponse = z.infer<typeof getJourneySchemaResponse>;
export type GetAllJourneySchemaResponse = z.infer<
  typeof getAllJourneySchemaResponse
>;
export type UpsertJourneyInput = z.infer<typeof upsertJourneyInput>;
export type DeleteJourneyInput = z.infer<typeof deleteJourneyInput>;

export const { schemas: journeySchemas, $ref } = buildJsonSchemas(
  {
    getJourneyInput,
    getJourneySchemaResponse,
    getAllJourneySchemaResponse,
    upsertJourneyInput,
    deleteImageInput,
    deleteImageResponse,
    deleteJourneyInput,
    deleteJourneyResponse,
  },
  { $id: 'journeySchemas' } // id must be uniq to regester multiple schema with server.addSchema
);
