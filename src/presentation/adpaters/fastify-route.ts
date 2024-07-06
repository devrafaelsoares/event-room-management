import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller } from '@presentation/protocols/controller';

export function fastifyAdapterRoute(controller: Controller<FastifyRequest, FastifyReply>) {
    return async function (req: FastifyRequest, reply: FastifyReply) {
        const response = await controller.handle(req, reply);
        reply.status(response.statusCode).send(response);
    };
}
