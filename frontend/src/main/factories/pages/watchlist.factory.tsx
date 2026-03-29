import { Watchlist } from "../../../presentation/pages/watchlist/watchlist";
import {
    makeRemoteListWatchlist,
    makeRemoteAddMovieToWatchlist,
    makeRemoteSearchMovies,
    makeRemoteUpdateWatchlistItemStatus,
    makeRemoteDeleteWatchlistItem,
} from "../usecases";

export const makeWatchlistPage = () => {
    return (
        <Watchlist
            remoteListWatchlist={makeRemoteListWatchlist()}
            remoteAddMovieToWatchlist={makeRemoteAddMovieToWatchlist()}
            remoteSearchMovies={makeRemoteSearchMovies()}
            remoteUpdateWatchlistItemStatus={makeRemoteUpdateWatchlistItemStatus()}
            remoteDeleteWatchlistItem={makeRemoteDeleteWatchlistItem()}
        />
    );
};
