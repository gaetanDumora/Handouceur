import fastify from 'fastify';
declare module 'fastify' {
  export interface FastifyInstance {
    verifyJwtToken: any;
    verifyEmailPassword: any;
    verifyAdmin: any;
  }
}
