import { RemoteAddMovieToWatchlist } from "../../../data/usecases";
import {
    AddMovieToWatchlistCase,
    AddMovieToWatchlistSpace,
} from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteAddMovieToWatchlist = (): AddMovieToWatchlistCase => {
    const url = `${process.env.REACT_APP_API_URL}/v1/watchlist`;

    const axiosHttpClientAdapter =
        makeAxiosHttpClientAdapter<AddMovieToWatchlistSpace.Model>();

    const remoteAddMovie = new RemoteAddMovieToWatchlist(
        axiosHttpClientAdapter,
        url
    );

    return remoteAddMovie;
};
