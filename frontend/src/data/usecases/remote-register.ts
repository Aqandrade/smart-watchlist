import { RegisterCase, RegisterSpace } from "../../domain/usecases";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class RemoteRegister implements RegisterCase {
    constructor(
        private readonly httpClient: IHttpClient<RegisterSpace.Model>,
        private readonly url: string
    ) {}

    async register(params: RegisterSpace.Params): Promise<RegisterSpace.Model> {
        const response = await this.httpClient.request({
            method: "post",
            url: this.url,
            body: params,
        });

        if (response.statusCode === HttpStatusCode.conflict) {
            throw new Error("Usuário ou e-mail já cadastrado");
        }

        if (response.statusCode === HttpStatusCode.badRequest) {
            throw new Error("Dados inválidos. Verifique os campos e tente novamente");
        }

        if (response.statusCode >= 500) {
            throw new Error("Erro interno do servidor");
        }

        return response.body;
    }
}
