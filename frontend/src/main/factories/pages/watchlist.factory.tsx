import { Watchlist } from "../../../presentation/pages/watchlist/watchlist";
import {
    makeRemoteAddMovieToWatchlist,
    makeRemoteAddSubscription,
    makeRemoteDeleteWatchlistItem,
    makeRemoteListSubscriptions,
    makeRemoteListWatchlist,
    makeRemoteSearchMovies,
    makeRemoteUpdateSubscriptionStatus,
    makeRemoteUpdateWatchlistItemStatus,
} from "../usecases";

export const makeWatchlistPage = () => {
    return (
        <Watchlist
            remoteListWatchlist={makeRemoteListWatchlist()}
            remoteAddMovieToWatchlist={makeRemoteAddMovieToWatchlist()}
            remoteSearchMovies={makeRemoteSearchMovies()}
            remoteUpdateWatchlistItemStatus={makeRemoteUpdateWatchlistItemStatus()}
            remoteDeleteWatchlistItem={makeRemoteDeleteWatchlistItem()}
            remoteListSubscriptions={makeRemoteListSubscriptions()}
            remoteAddSubscription={makeRemoteAddSubscription()}
            remoteUpdateSubscriptionStatus={makeRemoteUpdateSubscriptionStatus()}
        />
    );
};
