import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

enum AutonomyStatus {
  GOOD = 'GOOD',
  RELATIVE = 'RELATIVE',
  IMPORTANT = 'IMPORTANT',
}

const journeyCore = {
  title: z.string(),
  subtitle: z.string(),
  location: z.string(),
  imageUrl: z.string(),
  description: z.string(),
};

const journeyOptional = {
  coordinates: z.tuple([z.number(), z.number()]).optional(),
  startDate: z.union([z.date(), z.string()]).optional(),
  endDate: z.union([z.date(), z.string()]).optional(),
  price: z.number().optional(),
  autonomy: z.nativeEnum(AutonomyStatus).optional(),
  optionalUrl: z.string().optional(),
  groupSize: z.tuple([z.number(), z.number()]).optional(),
  recreation: z.string().optional(),
  hosting: z.string().optional(),
  transport: z.string().optional(),
};

const getJourneyInput = z.object({
  id: z.number(),
});
const getJourneySchemaResponse = z.object({
  id: z.number(),
  ...journeyCore,
  ...journeyOptional,
  createdAt: z.union([z.date(), z.string()]),
});
const getAllJourneySchemaResponse = z.array(getJourneySchemaResponse);

// As data comming from the front, keys are in camelCase
const upsertJourneyInput = z.object({
  id: z.number().optional(),
  ...journeyCore,
  ...journeyOptional,
});

export type GetJourneyInput = z.infer<typeof getJourneyInput>;
export type GetJourneySchemaResponse = z.infer<typeof getJourneySchemaResponse>;
export type GetAllJourneySchemaResponse = z.infer<
  typeof getAllJourneySchemaResponse
>;
export type UpsertJourneyInput = z.infer<typeof upsertJourneyInput>;

export const { schemas: journeySchemas, $ref } = buildJsonSchemas(
  {
    getJourneyInput,
    getJourneySchemaResponse,
    getAllJourneySchemaResponse,
    upsertJourneyInput,
  },
  { $id: 'journeySchemas' } // id must be uniq to regester multiple schema with server.addSchema
);
