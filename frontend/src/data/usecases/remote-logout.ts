import { LogoutCase, LogoutSpace } from "../../domain/usecases";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class RemoteLogout implements LogoutCase {
    constructor(
        private readonly httpClient: IHttpClient<void>,
        private readonly url: string
    ) {}

    async logout(params: LogoutSpace.Params): Promise<void> {
        const response = await this.httpClient.request({
            method: "post",
            url: this.url,
            body: params,
        });

        if (response.statusCode >= 500) {
            throw new Error("Erro interno do servidor");
        }
    }
}
