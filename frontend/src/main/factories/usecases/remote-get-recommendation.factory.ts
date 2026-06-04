import { RemoteGetRecommendation } from "../../../data/usecases";
import { GetRecommendationCase, GetRecommendationSpace } from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteGetRecommendation = (): GetRecommendationCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/watchlist/recommendation`;

    const axiosHttpClientAdapter =
        makeAxiosHttpClientAdapter<GetRecommendationSpace.Model>();

    return new RemoteGetRecommendation(axiosHttpClientAdapter, url);
};
