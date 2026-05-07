import {
    AddMovieToWatchlistCase,
    AddSubscriptionCase,
    DeleteWatchlistItemCase,
    ListSubscriptionsCase,
    ListWatchlistCase,
    SearchMoviesCase,
    UpdateSubscriptionStatusCase,
    UpdateWatchlistItemStatusCase,
} from "../../../domain/usecases";

export interface IWatchlist {
    remoteListWatchlist: ListWatchlistCase;
    remoteAddMovieToWatchlist: AddMovieToWatchlistCase;
    remoteSearchMovies: SearchMoviesCase;
    remoteUpdateWatchlistItemStatus: UpdateWatchlistItemStatusCase;
    remoteDeleteWatchlistItem: DeleteWatchlistItemCase;
    remoteListSubscriptions: ListSubscriptionsCase;
    remoteAddSubscription: AddSubscriptionCase;
    remoteUpdateSubscriptionStatus: UpdateSubscriptionStatusCase;
}
