import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export const loadServerConfig = async () => {
    const __dirname = fileURLToPath(new URL('../../../../', import.meta.url))
    return {
        logger: true,
        https: {
            key: readFileSync(__dirname + 'certificats/localhost-key.pem'),
            cert: readFileSync(__dirname + 'certificats/localhost.pem')
        }
    }
}

export const envPlugin = fp((server: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    const options = {
        confKey: 'config',
        dotenv: true,
        schema: {
            type: 'object',
            required: ['API_PORT', 'API_HOST', 'NODE_ENV'],
            properties: {
                API_PORT: { type: 'number' },
                API_HOST: { type: 'string' },
                NODE_ENV: { type: 'string' }
            },
        },
    }
    fastifyEnv(server, options, () => { server.log.info({ ENV: server.config }, 'plugin env ready') })
    done()
})