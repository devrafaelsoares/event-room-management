import fastify from 'fastify';
import routes from '@infra/fastify/routes';

const app = fastify();

app.register(routes);

export default app;
