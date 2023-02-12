import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  name: z.string().max(20).optional(),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
  admin: z.boolean(),
});

const isUserSchema = z.object({
  email: z.string({ required_error: 'Email is required for authentication' }),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string(),
});

const loginSchemaResponse = z.object({
  id: z.number(),
  ...userCore,
  admin: z.boolean(),
  accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type isUserInput = z.infer<typeof isUserSchema>;

export const { schemas: userShemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginSchemaResponse,
  isUserSchema,
});
