export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NOT_FOUND = 404,
    NO_CONTENT = 204,
    UNATHORIZED = 401,
    FORBIDEN = 403,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
    CONFLIT = 409,
}

export type HttpResponse<T = any> = {
    success: boolean;
    moment: Date;
    statusCode: HttpStatus;
    data: T;
};
