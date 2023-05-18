import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  firstName: z
    .string({ required_error: 'First name is required' })
    .max(60, { message: 'First name is 60 characters maximum' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .max(60, { message: 'Last name is 60 characters maximum' }),
  address: z.string().optional(),
  avatar: z.string().optional(),
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

export const { schemas: userShemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginSchemaResponse,
    isUserSchema,
  },
  { $id: 'userShemas' } // id must be uniq to regester multiple schema with server.addSchema
);
