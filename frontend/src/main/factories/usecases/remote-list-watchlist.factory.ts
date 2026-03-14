import { RemoteListWatchlist } from "../../../data/usecases";
import {
    ListWatchlistCase,
    ListWatchlistSpace,
} from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteListWatchlist = (): ListWatchlistCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/watchlist`;

    const axiosHttpClientAdapter =
        makeAxiosHttpClientAdapter<ListWatchlistSpace.Model>();

    const remoteListWatchlist = new RemoteListWatchlist(
        axiosHttpClientAdapter,
        url
    );

    return remoteListWatchlist;
};
