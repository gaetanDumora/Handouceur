import fastify from 'fastify'

declare module 'fastify-autoload' { }
declare module 'fastify-cors' { }
declare module 'fastify-formbody' { }
declare module "fastify" {
    interface FastifyInstance {
        config: {
            PORT: number,
            isProduction: boolean,
            cors: {
                origin: string
                credentials: string
            }
        }
    }
}
