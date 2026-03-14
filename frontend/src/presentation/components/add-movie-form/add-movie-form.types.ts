export interface IAddMovieForm {
    onSubmit: (movieName: string) => Promise<void>;
    onCancel: () => void;
}
