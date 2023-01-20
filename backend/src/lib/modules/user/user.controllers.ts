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

export async function isUserHandler(
  request: FastifyRequest<{ Querystring: { email: string } }>,
  reply: FastifyReply
) {
  const { email } = request.query;
  try {
    let statusCode = 200;
    const maybeUser = await findUserByEmail({ email });
    if (!maybeUser) {
      statusCode = 204;
    }
    return reply.code(statusCode).send(maybeUser);
  } catch (error) {
    request.log.info(error);
    return reply.code(500).send(error);
  }
}
