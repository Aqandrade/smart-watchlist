package requests

type AddMovieToWatchlistRequest struct {
	MovieName string `json:"movie_name" binding:"required"`
}
