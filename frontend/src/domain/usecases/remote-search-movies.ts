import { SearchMoviesDTO } from "../dtos";
import { MovieSearchResultModel } from "../models";

export namespace SearchMoviesSpace {
    export interface Params extends SearchMoviesDTO {}
    export interface Model extends MovieSearchResultModel {}
}

export interface SearchMoviesCase {
    search: (
        params: SearchMoviesSpace.Params
    ) => Promise<SearchMoviesSpace.Model[]>;
}
