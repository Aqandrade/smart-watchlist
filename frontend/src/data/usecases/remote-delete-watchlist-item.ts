import {
    DeleteWatchlistItemCase,
    DeleteWatchlistItemSpace,
} from "../../domain/usecases";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class RemoteDeleteWatchlistItem implements DeleteWatchlistItemCase {
    constructor(
        private readonly httpClient: IHttpClient<void>,
        private readonly url: string
    ) {}

    async delete(params: DeleteWatchlistItemSpace.Params): Promise<void> {
        const response = await this.httpClient.request({
            method: "delete",
            url: `${this.url}/${params.entity_id}`,
        });

        if (response.statusCode === HttpStatusCode.notFound) {
            throw new Error("Filme não encontrado na watchlist");
        }

        if (response.statusCode >= 500) {
            throw new Error("Erro interno do servidor");
        }
    }
}
