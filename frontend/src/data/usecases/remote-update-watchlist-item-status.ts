import {
    UpdateWatchlistItemStatusCase,
    UpdateWatchlistItemStatusSpace,
} from "../../domain/usecases";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class RemoteUpdateWatchlistItemStatus implements UpdateWatchlistItemStatusCase {
    constructor(
        private readonly httpClient: IHttpClient<void>,
        private readonly url: string
    ) {}

    async update(params: UpdateWatchlistItemStatusSpace.Params): Promise<void> {
        const response = await this.httpClient.request({
            method: "patch",
            url: `${this.url}/${params.entity_id}`,
            body: { status: params.status },
        });

        if (response.statusCode === HttpStatusCode.badRequest) {
            throw new Error("Status inválido");
        }

        if (response.statusCode === HttpStatusCode.notFound) {
            throw new Error("Filme não encontrado na watchlist");
        }

        if (response.statusCode >= 500) {
            throw new Error("Erro interno do servidor");
        }
    }
}
