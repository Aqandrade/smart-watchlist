import { GetRecommendationCase, GetRecommendationSpace } from "../../domain/usecases";
import { IHttpClient } from "../protocols/http";

export class RemoteGetRecommendation implements GetRecommendationCase {
    constructor(
        private readonly httpClient: IHttpClient<GetRecommendationSpace.Model>,
        private readonly url: string
    ) {}

    async get(
        params?: GetRecommendationSpace.Params
    ): Promise<GetRecommendationSpace.Model> {
        let requestUrl = this.url;

        if (params?.max_duration !== undefined) {
            const urlSearchParams = new URLSearchParams();
            urlSearchParams.append("max_duration", String(params.max_duration));
            requestUrl = `${this.url}?${urlSearchParams.toString()}`;
        }

        const response = await this.httpClient.request({
            method: "get",
            url: requestUrl,
        });

        if (response.statusCode < 200 || response.statusCode >= 300) {
            const body = response.body as any;
            throw new Error(body?.error ?? "recommendation failed");
        }

        return response.body;
    }
}
