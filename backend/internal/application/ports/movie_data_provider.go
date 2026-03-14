package ports

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type MovieDetail struct {
	ID          int64
	Title       string
	Overview    string
	ReleaseDate string
	VoteAverage float64
	Director    string
	Runtime     int
}

type WatchProviderEntry struct {
	ProviderName string
}

type MovieDataProvider interface {
	SearchMovies(ctx context.Context, name string) ([]entities.MovieSearchResult, error)
	GetMovieDetails(ctx context.Context, movieID int64) (*MovieDetail, error)
	GetWatchProviders(ctx context.Context, movieID int64) ([]WatchProviderEntry, error)
}
