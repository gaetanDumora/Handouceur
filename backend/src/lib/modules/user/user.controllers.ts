import { FastifyReply, FastifyRequest } from "fastify"
import { CreateUserInput } from "./user.shema.js"
import { createUser } from './user.service.js'

export async function registerUserHandler(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
    const { body } = request

    try {
        const user = await createUser(body)
        return reply.code(201).send(user)
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}