import {
    UpdateSubscriptionStatusCase,
    UpdateSubscriptionStatusSpace,
} from "../../domain/usecases";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class RemoteUpdateSubscriptionStatus implements UpdateSubscriptionStatusCase {
    constructor(
        private readonly httpClient: IHttpClient<void>,
        private readonly url: string
    ) {}

    async update(params: UpdateSubscriptionStatusSpace.Params): Promise<void> {
        const response = await this.httpClient.request({
            method: "patch",
            url: `${this.url}/${params.entity_id}`,
            body: { active: params.active },
        });

        if (response.statusCode === HttpStatusCode.badRequest) {
            throw new Error("Dados inválidos");
        }

        if (response.statusCode === HttpStatusCode.notFound) {
            throw new Error("Assinatura não encontrada");
        }

        if (response.statusCode === HttpStatusCode.conflict) {
            throw new Error("Conflito ao atualizar assinatura");
        }

        if (response.statusCode >= 500) {
            throw new Error("Erro interno do servidor");
        }
    }
}
