package application

import (
	"database/sql"

	"github.com/Aqandrade/smart-watchlist/internal/adapters/clients"
	"github.com/Aqandrade/smart-watchlist/internal/adapters/database/repositories"
	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/handlers"
	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
)

type Config struct {
	DB          *sql.DB
	TMDBBaseURL string
	TMDBAPIKey  string
}

type Container struct {
	WatchlistHandler *handlers.WatchlistHandler
}

func NewContainer(cfg Config) *Container {
	movieRepo := repositories.NewMovieRepository(cfg.DB)
	watchlistRepo := repositories.NewWatchlistRepository(cfg.DB)
	providerRepo := repositories.NewProviderRepository(cfg.DB)
	movieWatchProviderRepo := repositories.NewMovieWatchProviderRepository(cfg.DB)
	tmdbClient := clients.NewTMDBClient(cfg.TMDBBaseURL, cfg.TMDBAPIKey)

	addMovieUseCase := usecases.NewAddMovieToWatchlistUseCase(
		movieRepo, watchlistRepo, providerRepo, movieWatchProviderRepo, tmdbClient,
	)

	return &Container{
		WatchlistHandler: handlers.NewWatchlistHandler(addMovieUseCase),
	}
}
