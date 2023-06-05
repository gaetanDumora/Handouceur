import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginInput } from './user.shema.js';
import { createUser, findUserByEmail, getUsers } from './user.service.js';
import { verifyPassword } from '../../utils/hash.js';
import { uploadFiles } from '../../utils/s3.js';

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
export async function uploadFileHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.isMultipart()) {
    return reply
      .code(400)
      .send({ error: 'request must be type of multipart/form-data' });
  }
  try {
    const files = request.files();
    const { uploadSuccess } = await uploadFiles(files, 'user_images/');
    request.log.info({ uploadSuccess }, 'S3 upload files');
    return reply.code(200).send({ uploadSuccess });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(error);
  }
}

export async function isUserHandler(
  request: FastifyRequest<{ Querystring: { email: string } }>,
  reply: FastifyReply
) {
  const { email } = request.query;
  try {
    const maybeUser = await findUserByEmail(email);
    if (!maybeUser) {
      return reply.code(200).send({ exist: false });
    }
    return reply.code(200).send({ exist: true });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(error);
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      const correctPassword = verifyPassword({
        candidatePassword: password,
        salt: user.salt,
        hash: user.password,
      });
      if (correctPassword) {
        const { salt, password, ...rest } = user;
        return { accessToken: request.server.jwt.sign(rest), ...rest };
      }
      reply.code(401).send({ message: 'Invalid email adress or password' });
    }
    reply.code(401).send({ message: 'Invalid email adress or password' });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(error);
  }
}

export async function getUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await getUsers();
    return reply.code(201).send(users);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(error);
  }
}
