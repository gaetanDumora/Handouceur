import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginInput } from './user.shema.js';
import { createUser, findUserByEmail } from './user.service.js';

export async function registerUserHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {
  const { body } = request;

  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (error) {
    request.log.info(error);
    return reply.code(500).send(error);
  }
}

export async function isRegistered(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  const {
    body: { email },
  } = request;
  try {
    const maybeUser = await findUserByEmail({ email });
    return reply.code(201).send(maybeUser);
  } catch (error) {
    request.log.info(error);
    return reply.code(500).send(error);
  }
}
