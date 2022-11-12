import { join } from 'path'
import autoLoad from '@fastify/autoload'
import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
import fp from 'fastify-plugin'
import { fileURLToPath } from 'node:url'
// import swagger from 'fastify-swagger'

const __dirname = fileURLToPath(new URL('../', import.meta.url))

export default fp(async function plugin(server, config) {
    server
        .register(formbody)
        .register(autoLoad, {
            dir: join(__dirname, 'lib/routes'),
            options: config
        })
        .register(autoLoad, {
            dir: join(__dirname, 'lib/plugins'),
            options: config
        })

    server.addHook('onRequest', async (req) => {
        server.log.info({ req }, 'incoming request')
    })

    server.addHook('onResponse', async (req, res) => {
        server.log.info({ req, res }, 'request completed')
    })

    server.addHook('onSend', async (req, res) => {
        res.header('Cache-Control', 'no-store')
        // res.header('Pragma', 'no-cache')
        // res.header(
        //     'Strict-Transport-Security',
        //     `max-age=${config.security.hstsMaxAge}; includeSubDomains`
        // )
    })

    server.setErrorHandler((err, req, res) => {
        if (res.statusCode >= 500) {
            req.log.error({ req, res, err }, err && err.message)
        } else if (res.statusCode >= 400) {
            req.log.info({ req, res, err }, err && err.message)
        }

        if (res.statusCode >= 500) {
            res.send('An error has occurred')
        } else {
            res.send(err)
        }
    })
})