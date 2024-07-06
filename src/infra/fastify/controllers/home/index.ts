import { serverInfo } from '@presentation/data';
import { ServerInfo } from '@presentation/data/types';
import { Controller } from '@presentation/protocols/controller';
import { HttpResponse, HttpStatus } from '@presentation/protocols/http';
import { FastifyRequest } from 'fastify';

export default class HomeControllerFastify implements Controller<FastifyRequest> {
    async handle(_request: FastifyRequest): Promise<HttpResponse<ServerInfo>> {
        return {
            success: true,
            moment: new Date(),
            data: serverInfo,
            statusCode: HttpStatus.OK,
        };
    }
}
