import startServer from './lib/server.js'
import fastify from 'fastify'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

const main = async () => {
    process.on('unhandledRejection', (err) => {
        console.error(err)
        process.exit(1)
    })

    const __dirname = fileURLToPath(new URL('../', import.meta.url))
    const server = fastify({
        logger: true,
        https: {
            key: readFileSync(__dirname + 'certificats/localhost-key.pem'),
            cert: readFileSync(__dirname + 'certificats/localhost.pem')
        }
    })

    await server.register(startServer)

    const address = await server.listen({ port: +server.config.API_PORT, host: server.config.API_HOST })
    server.log.info(`Server running at: ${address}`)

    for (const signal of ['SIGINT', 'SIGTERM']) {
        // Use once() so that double signals exits the app
        process.once(signal, () => {
            server.log.info({ signal }, 'closing application')
            server
                .close()
                .then(() => {
                    server.log.info({ signal }, 'application closed')
                    process.exit(0)
                })
                .catch((err) => {
                    server.log.error({ err }, 'Error closing the application')
                    process.exit(1)
                })
        })
    }
}

main()