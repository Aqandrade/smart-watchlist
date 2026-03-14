import { Watchlist } from "../../../presentation/pages/watchlist/watchlist";
import {
    makeRemoteListWatchlist,
    makeRemoteAddMovieToWatchlist,
} from "../usecases";

export const makeWatchlistPage = () => {
    return (
        <Watchlist
            remoteListWatchlist={makeRemoteListWatchlist()}
            remoteAddMovieToWatchlist={makeRemoteAddMovieToWatchlist()}
        />
    );
};