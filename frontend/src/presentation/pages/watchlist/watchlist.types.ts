import {
    ListWatchlistCase,
    AddMovieToWatchlistCase,
    SearchMoviesCase,
} from "../../../domain/usecases";

export interface IWatchlist {
    remoteListWatchlist: ListWatchlistCase;
    remoteAddMovieToWatchlist: AddMovieToWatchlistCase;
    remoteSearchMovies: SearchMoviesCase;
}
