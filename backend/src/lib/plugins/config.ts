import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'

export default fp(async (server) => {
    const options = {
        confKey: 'config',
        schema: {
            type: 'object',
            required: ['PORT'],
            properties: {
                PORT: { type: 'string' }
            }
        },
        dotenv: true
    }

    fastifyEnv(server, options, () => { server.log.info({ ENV: server.config }, 'plugin env ready') })
})