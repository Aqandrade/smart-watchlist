import { SearchMoviesCase } from "../../../domain/usecases";

export interface IAddMovieForm {
    onSubmit: (movieName: string) => Promise<void>;
    onCancel: () => void;
    remoteSearchMovies: SearchMoviesCase;
}
