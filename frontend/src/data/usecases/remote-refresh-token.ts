import { RefreshTokenCase, RefreshTokenSpace } from "../../domain/usecases";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class RemoteRefreshToken implements RefreshTokenCase {
    constructor(
        private readonly httpClient: IHttpClient<RefreshTokenSpace.Model>,
        private readonly url: string
    ) {}

    async refresh(
        params: RefreshTokenSpace.Params
    ): Promise<RefreshTokenSpace.Model> {
        const response = await this.httpClient.request({
            method: "post",
            url: this.url,
            body: params,
        });

        if (response.statusCode === HttpStatusCode.unauthorized) {
            throw new Error("Sessão expirada. Faça login novamente");
        }

        if (response.statusCode >= 500) {
            throw new Error("Erro interno do servidor");
        }

        return response.body;
    }
}
