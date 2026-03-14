import { AddMovieToWatchlistDTO } from "../dtos";
import { AddMovieToWatchlistResponseModel } from "../models";

export namespace AddMovieToWatchlistSpace {
    export interface Params extends AddMovieToWatchlistDTO {}
    export interface Model extends AddMovieToWatchlistResponseModel {}
}

export interface AddMovieToWatchlistCase {
    add: (
        params: AddMovieToWatchlistSpace.Params
    ) => Promise<AddMovieToWatchlistSpace.Model>;
}
