import { ListSubscriptionsCase, ListSubscriptionsSpace } from "../../domain/usecases";
import { IHttpClient } from "../protocols/http";

export class RemoteListSubscriptions implements ListSubscriptionsCase {
    constructor(
        private readonly httpClient: IHttpClient<ListSubscriptionsSpace.Model>,
        private readonly url: string
    ) {}

    async list(
        params?: ListSubscriptionsSpace.Params
    ): Promise<ListSubscriptionsSpace.Model> {
        let requestUrl = this.url;

        if (params?.active !== undefined) {
            const urlSearchParams = new URLSearchParams();
            urlSearchParams.append("active", String(params.active));
            requestUrl = `${this.url}?${urlSearchParams.toString()}`;
        }

        const response = await this.httpClient.request({
            method: "get",
            url: requestUrl,
        });

        return response.body;
    }
}
