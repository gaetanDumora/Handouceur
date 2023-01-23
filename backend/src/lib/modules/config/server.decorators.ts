import { User } from '@prisma/client';
import { FastifyInstance } from 'fastify/types/instance';
import { FastifyPluginOptions } from 'fastify/types/plugin';
import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';
import { isAdmin } from '../user/user.service';

async function verifyJwtToken(
  server: FastifyInstance,
  opts: FastifyPluginOptions
) {
  return server.decorate(
    verifyJwtToken.name,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        request.log.error({ error });
        reply.send(error);
      }
    }
  );
}
async function verifyAdmin(
  server: FastifyInstance,
  opts: FastifyPluginOptions
) {
  return server.decorate(
    verifyAdmin.name,
    async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
      try {
        const user = request.body;
        if (!(await isAdmin(user.email))) {
          throw new Error('Only admin can access');
        }
      } catch (error) {
        request.log.error({ error });
        reply.send(error);
      }
    }
  );
}
async function verifyEmailPassword(
  server: FastifyInstance,
  opts: FastifyPluginOptions
) {
  return server.decorate(
    verifyEmailPassword.name,
    async (request: FastifyRequest, reply: FastifyReply) => {
      return null;
    }
  );
}

export const decorators = [verifyJwtToken, verifyAdmin, verifyEmailPassword];
