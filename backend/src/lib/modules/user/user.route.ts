import { FastifyInstance } from 'fastify'
import { registerUserHandler } from './user.controllers.js'
import { $ref } from './user.shema.js'

async function userRoutes(server: FastifyInstance) {
    server.post(
        '/user',
        {
            schema: {
                body: $ref('createUserSchema'),
                response: {
                    201: $ref('createUserResponseSchema')
                }
            }
        },
        registerUserHandler
    )
}

export default userRoutes