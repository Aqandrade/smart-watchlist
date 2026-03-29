import {
    ListWatchlistCase,
    AddMovieToWatchlistCase,
    SearchMoviesCase,
    UpdateWatchlistItemStatusCase,
    DeleteWatchlistItemCase,
} from "../../../domain/usecases";

export interface IWatchlist {
    remoteListWatchlist: ListWatchlistCase;
    remoteAddMovieToWatchlist: AddMovieToWatchlistCase;
    remoteSearchMovies: SearchMoviesCase;
    remoteUpdateWatchlistItemStatus: UpdateWatchlistItemStatusCase;
    remoteDeleteWatchlistItem: DeleteWatchlistItemCase;
}
