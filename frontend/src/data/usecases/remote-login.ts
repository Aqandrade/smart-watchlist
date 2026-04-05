import { LoginCase, LoginSpace } from "../../domain/usecases";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class RemoteLogin implements LoginCase {
    constructor(
        private readonly httpClient: IHttpClient<LoginSpace.Model>,
        private readonly url: string
    ) {}

    async login(params: LoginSpace.Params): Promise<LoginSpace.Model> {
        const response = await this.httpClient.request({
            method: "post",
            url: this.url,
            body: params,
        });

        if (response.statusCode === HttpStatusCode.unauthorized) {
            throw new Error("Usuário ou senha inválidos");
        }

        if (response.statusCode === HttpStatusCode.badRequest) {
            throw new Error("Dados inválidos");
        }

        if (response.statusCode >= 500) {
            throw new Error("Erro interno do servidor");
        }

        return response.body;
    }
}
