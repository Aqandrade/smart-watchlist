import { ListWatchlistCase, ListWatchlistSpace } from "../../domain/usecases";
import { IHttpClient } from "../protocols/http";

export class RemoteListWatchlist implements ListWatchlistCase {
    constructor(
        private readonly httpClient: IHttpClient<ListWatchlistSpace.Model>,
        private readonly url: string
    ) {}

    async list(
        params?: ListWatchlistSpace.Params
    ): Promise<ListWatchlistSpace.Model> {
        let requestUrl = this.url;

        if (params) {
            const urlSearchParams = new URLSearchParams();

            if (params.page)
                urlSearchParams.append("page", String(params.page));
            if (params.page_size)
                urlSearchParams.append("page_size", String(params.page_size));

            const queryString = urlSearchParams.toString();
            if (queryString) requestUrl = `${this.url}?${queryString}`;
        }

        const response = await this.httpClient.request({
            method: "get",
            url: requestUrl,
        });

        return response.body;
    }
}
