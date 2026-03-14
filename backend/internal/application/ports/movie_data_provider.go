package ports

import "context"

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
	SearchMovie(ctx context.Context, name string) (*MovieDetail, error)
	GetWatchProviders(ctx context.Context, movieID int64) ([]WatchProviderEntry, error)
}
