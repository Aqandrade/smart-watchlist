import { RemoteSearchMovies } from "../../../data/usecases";
import { SearchMoviesCase, SearchMoviesSpace } from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteSearchMovies = (): SearchMoviesCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/movies/search`;

    const axiosHttpClientAdapter =
        makeAxiosHttpClientAdapter<SearchMoviesSpace.Model[]>();

    const remoteSearchMovies = new RemoteSearchMovies(
        axiosHttpClientAdapter,
        url
    );

    return remoteSearchMovies;
};
