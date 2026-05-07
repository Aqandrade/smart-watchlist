import { AddSubscriptionCase, AddSubscriptionSpace } from "../../domain/usecases";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class RemoteAddSubscription implements AddSubscriptionCase {
    constructor(
        private readonly httpClient: IHttpClient<AddSubscriptionSpace.Model>,
        private readonly url: string
    ) {}

    async add(
        params: AddSubscriptionSpace.Params
    ): Promise<AddSubscriptionSpace.Model> {
        const response = await this.httpClient.request({
            method: "post",
            url: this.url,
            body: params,
        });

        if (response.statusCode === HttpStatusCode.badRequest) {
            throw new Error("O provedor é obrigatório e deve ser válido");
        }

        if (response.statusCode === HttpStatusCode.conflict) {
            throw new Error("Você já possui uma assinatura com esse provedor");
        }

        if ((response.statusCode as number) === 422) {
            throw new Error("Provedor não encontrado");
        }

        if (response.statusCode >= 500) {
            throw new Error("Erro interno do servidor");
        }

        return response.body;
    }
}
