package application

import (
	"database/sql"

	"github.com/Aqandrade/smart-watchlist/internal/adapters/clients"
	"github.com/Aqandrade/smart-watchlist/internal/adapters/database/repositories"
	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/handlers"
	gojwt "github.com/Aqandrade/smart-watchlist/internal/adapters/jwt"
	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
	"github.com/Aqandrade/smart-watchlist/internal/domain/services"
)

type Config struct {
	DB          *sql.DB
	TMDBBaseURL string
	TMDBAPIKey  string
	JWTSecret   string
}

type Container struct {
	WatchlistHandler *handlers.WatchlistHandler
	MovieHandler     *handlers.MovieHandler
	AuthHandler      *handlers.AuthHandler
	TokenProvider    ports.TokenProvider
}

func NewContainer(cfg Config) *Container {
	movieRepo := repositories.NewMovieRepository(cfg.DB)
	watchlistRepo := repositories.NewWatchlistRepository(cfg.DB)
	providerRepo := repositories.NewProviderRepository(cfg.DB)
	movieWatchProviderRepo := repositories.NewMovieWatchProviderRepository(cfg.DB)
	userRepo := repositories.NewUserRepository(cfg.DB)
	tokenRepo := repositories.NewTokenRepository(cfg.DB)

	tmdbClient := clients.NewTMDBClient(cfg.TMDBBaseURL, cfg.TMDBAPIKey)
	movieSelector := services.NewMovieSelector()
	tokenProvider := gojwt.NewTokenProvider(cfg.JWTSecret)

	addMovieUseCase := usecases.NewAddMovieToWatchlistUseCase(
		movieRepo, watchlistRepo, providerRepo, movieWatchProviderRepo, tmdbClient, movieSelector,
	)
	listWatchlistUseCase := usecases.NewListWatchlistUseCase(watchlistRepo)
	updateItemStatusUseCase := usecases.NewUpdateWatchlistItemStatusUseCase(watchlistRepo)
	deleteItemUseCase := usecases.NewDeleteWatchlistItemUseCase(watchlistRepo)
	searchMoviesUseCase := usecases.NewSearchMoviesUseCase(tmdbClient)

	registerUseCase := usecases.NewRegisterUserUseCase(userRepo)
	loginUseCase := usecases.NewLoginUserUseCase(userRepo, tokenRepo, tokenProvider)
	refreshTokenUseCase := usecases.NewRefreshTokenUseCase(tokenRepo, tokenProvider)
	logoutUseCase := usecases.NewLogoutUserUseCase(tokenRepo, tokenProvider)

	return &Container{
		WatchlistHandler: handlers.NewWatchlistHandler(addMovieUseCase, listWatchlistUseCase, updateItemStatusUseCase, deleteItemUseCase),
		MovieHandler:     handlers.NewMovieHandler(searchMoviesUseCase),
		AuthHandler:      handlers.NewAuthHandler(registerUseCase, loginUseCase, refreshTokenUseCase, logoutUseCase),
		TokenProvider:    tokenProvider,
	}
}
