import { WatchlistStatus } from "../watchlist-card/watchlist-card.types";

export interface IMovieDetail {
    movieName: string;
    movieDescription: string;
    movieDirector: string;
    movieReleaseDate: number;
    movieDuration: number;
    externalSourceRating: number;
    status: WatchlistStatus;
    providers: string[];
    createdAt: string;
}
