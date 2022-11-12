import { FastifyInstance, FastifyServerOptions } from 'fastify'
import fp from 'fastify-plugin'

export default fp(async (server: FastifyInstance, opts: FastifyServerOptions, done: Function) => {
    server.route({
        url: "/ping",
        logLevel: "warn",
        method: ["GET", "HEAD"],
        handler: async (request, reply) => {
            return reply.send({ date: new Date(), works: true })
        }
    })
    done()
})