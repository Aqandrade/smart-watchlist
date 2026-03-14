import { SearchMoviesCase, SearchMoviesSpace } from "../../domain/usecases";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class RemoteSearchMovies implements SearchMoviesCase {
    constructor(
        private readonly httpClient: IHttpClient<SearchMoviesSpace.Model[]>,
        private readonly url: string
    ) {}

    async search(
        params: SearchMoviesSpace.Params
    ): Promise<SearchMoviesSpace.Model[]> {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append("query", params.query);

        const requestUrl = `${this.url}?${urlSearchParams.toString()}`;

        const response = await this.httpClient.request({
            method: "get",
            url: requestUrl,
        });

        if (response.statusCode === HttpStatusCode.badRequest) {
            throw new Error("O termo de busca é obrigatório");
        }

        if (response.statusCode === HttpStatusCode.failedDependency) {
            throw new Error("Erro ao buscar filmes no provedor externo");
        }

        if (response.statusCode >= 500) {
            throw new Error("Erro interno do servidor");
        }

        return response.body;
    }
}
