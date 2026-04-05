import { RemoteUpdateWatchlistItemStatus } from "../../../data/usecases";
import {
    UpdateWatchlistItemStatusCase,
} from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteUpdateWatchlistItemStatus = (): UpdateWatchlistItemStatusCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/watchlist`;

    const axiosHttpClientAdapter = makeAxiosHttpClientAdapter<void>();

    return new RemoteUpdateWatchlistItemStatus(axiosHttpClientAdapter, url);
};
