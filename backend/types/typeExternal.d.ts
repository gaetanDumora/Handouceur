import fastify from 'fastify';
declare module 'fastify-cors' {}
declare module 'fastify' {
  interface FastifyInstance {
    config: {
      NODE_ENV: string;
      API_HOST: string;
      API_PORT: number;
      isProduction: boolean;
    };
  }
}

export {};
