import { RemoteDeleteWatchlistItem } from "../../../data/usecases";
import {
    DeleteWatchlistItemCase,
} from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteDeleteWatchlistItem = (): DeleteWatchlistItemCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/watchlist`;

    const axiosHttpClientAdapter = makeAxiosHttpClientAdapter<void>();

    return new RemoteDeleteWatchlistItem(axiosHttpClientAdapter, url);
};
