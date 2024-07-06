import { FastifyInstance, RegisterOptions } from 'fastify';

import homeRoutes from './home';

export default async function routes(fastify: FastifyInstance, options: RegisterOptions) {
    fastify.register(homeRoutes, options);
}
