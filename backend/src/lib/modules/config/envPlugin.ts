import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'

export default fp(async (server) => {
    const options = {
        confKey: 'config',
        schema: {
            type: 'object',
            required: ['API_PORT', 'API_HOST', 'NODE_ENV'],
            properties: {
                API_PORT: { type: 'number' },
                API_HOST: { type: 'string' },
                NODE_ENV: { type: 'string' }
            },
        },
        dotenv: true
    }
    fastifyEnv(server, options, () => { server.log.info({ ENV: server.config }, 'plugin env ready') })
})