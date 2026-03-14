import {
    ListWatchlistCase,
    AddMovieToWatchlistCase,
} from "../../../domain/usecases";

export interface IWatchlist {
    remoteListWatchlist: ListWatchlistCase;
    remoteAddMovieToWatchlist: AddMovieToWatchlistCase;
}
