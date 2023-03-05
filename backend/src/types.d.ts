import 'fastify';
import '@fastify/jwt';
import { User } from '@prisma/client';
declare module 'fastify' {
  export interface FastifyInstance {
    verifyJwtToken: any;
    verifyEmailPassword: any;
    verifyAdmin: any;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: number }; // payload type is used for signing and verifying
    user: User; // user type is return type of `request.user` object
  }
}
