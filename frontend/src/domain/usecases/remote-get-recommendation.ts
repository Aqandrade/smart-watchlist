import { RecommendationModel } from "../models";

export namespace GetRecommendationSpace {
    export interface Params {
        max_duration?: number;
    }
    export interface Model extends RecommendationModel {}
}

export interface GetRecommendationCase {
    get: (
        params?: GetRecommendationSpace.Params
    ) => Promise<GetRecommendationSpace.Model>;
}
