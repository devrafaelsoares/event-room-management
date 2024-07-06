import { FastifyInstance } from 'fastify';
import { fastifyAdapterRoute } from '@presentation/adpaters/fastify-route';
import HomeControllerFastify from '@infra/fastify/controllers/home';

const homeControllerFastify = new HomeControllerFastify();

export default async function routesFastify(fastify: FastifyInstance) {
    fastify.get('/', fastifyAdapterRoute(homeControllerFastify));
}
