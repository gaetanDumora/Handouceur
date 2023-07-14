import { FastifyInstance } from 'fastify/types/instance';
import { FastifyPluginOptions } from 'fastify/types/plugin';
import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';

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
        reply.status(401).send(error);
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
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const {
          user: { admin },
        } = request;
        if (!admin) {
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
