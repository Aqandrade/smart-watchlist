import {
    AddMovieToWatchlistCase,
    AddMovieToWatchlistSpace,
} from "../../domain/usecases";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class RemoteAddMovieToWatchlist implements AddMovieToWatchlistCase {
    constructor(
        private readonly httpClient: IHttpClient<AddMovieToWatchlistSpace.Model>,
        private readonly url: string
    ) {}

    async add(
        params: AddMovieToWatchlistSpace.Params
    ): Promise<AddMovieToWatchlistSpace.Model> {
        const response = await this.httpClient.request({
            method: "post",
            url: this.url,
            body: params,
        });

        if (response.statusCode === HttpStatusCode.badRequest) {
            throw new Error("O nome do filme é obrigatório");
        }

        if (response.statusCode === HttpStatusCode.conflict) {
            throw new Error("Este filme já está na sua watchlist");
        }

        if (response.statusCode === HttpStatusCode.failedDependency) {
            throw new Error("Filme não encontrado no provedor externo");
        }

        if (response.statusCode >= 500) {
            throw new Error("Erro interno do servidor");
        }

        return response.body;
    }
}
