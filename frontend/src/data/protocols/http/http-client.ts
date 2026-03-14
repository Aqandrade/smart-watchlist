export type HttpMethod = "post" | "get" | "put" | "delete";

export enum HttpStatusCode {
    ok = 200,
    noContent = 204,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    serverError = 500,
}

export interface IRequestParams {
    body?: any;
    url: string;
    headers?: any;
    method: HttpMethod;
}

export interface IRequestResponse<R> {
    statusCode: HttpStatusCode;
    body: R;
}

export interface IHttpClient<R> {
    request(params: IRequestParams): Promise<IRequestResponse<R>>;
}
