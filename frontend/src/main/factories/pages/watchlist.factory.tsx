import { Watchlist } from "../../../presentation/pages/watchlist/watchlist";
import { makeRemoteListWatchlist } from "../usecases";

export const makeWatchlistPage = () => {
    return <Watchlist remoteListWatchlist={makeRemoteListWatchlist()} />;
};