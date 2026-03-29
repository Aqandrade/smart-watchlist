export type WatchlistStatus = "PENDING" | "WATCHED" | "DROPPED";

export interface IWatchlistCard {
    movieName: string;
    movieDescription: string;
    movieDirector: string;
    movieReleaseDate: number;
    movieDuration: number;
    externalSourceRating: number;
    status: WatchlistStatus;
    providers: string[];
    createdAt: string;
    onClick?: () => void;
    onStatusChange?: () => void;
    onDelete?: () => void;
}
