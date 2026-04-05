package usecases

import (
	"context"
	"errors"
	"strconv"

	"github.com/google/uuid"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
	"github.com/Aqandrade/smart-watchlist/internal/domain/services"
)

type AddMovieToWatchlistUseCase struct {
	movieRepo              ports.MovieRepository
	watchlistRepo          ports.WatchlistRepository
	providerRepo           ports.ProviderRepository
	movieWatchProviderRepo ports.MovieWatchProviderRepository
	movieProvider          ports.MovieDataProvider
	movieSelector          *services.MovieSelector
}

func NewAddMovieToWatchlistUseCase(
	movieRepo ports.MovieRepository,
	watchlistRepo ports.WatchlistRepository,
	providerRepo ports.ProviderRepository,
	movieWatchProviderRepo ports.MovieWatchProviderRepository,
	movieProvider ports.MovieDataProvider,
	movieSelector *services.MovieSelector,
) *AddMovieToWatchlistUseCase {
	return &AddMovieToWatchlistUseCase{
		movieRepo:              movieRepo,
		watchlistRepo:          watchlistRepo,
		providerRepo:           providerRepo,
		movieWatchProviderRepo: movieWatchProviderRepo,
		movieProvider:          movieProvider,
		movieSelector:          movieSelector,
	}
}

func (uc *AddMovieToWatchlistUseCase) Execute(ctx context.Context, userID int, movieName string) (*entities.Watchlist, error) {
	movie, err := uc.movieRepo.FindByName(ctx, movieName)
	if err != nil && !errors.Is(err, entities.ErrMovieNotFound) {
		return nil, err
	}

	if movie == nil {
		movie, err = uc.createMovieFromProvider(ctx, movieName)
		if err != nil {
			return nil, err
		}
	}

	_, err = uc.watchlistRepo.FindByMovieIDAndUserID(ctx, movie.ID, userID)
	if err != nil && !errors.Is(err, entities.ErrWatchlistNotFound) {
		return nil, err
	}
	if err == nil {
		return nil, entities.ErrMovieAlreadyInWatchlist
	}

	watchlist := &entities.Watchlist{
		EntityID: uuid.NewString(),
		MovieID:  movie.ID,
		UserID:   userID,
		Status:   entities.WatchlistStatusPending,
	}

	return uc.watchlistRepo.Create(ctx, watchlist)
}

func (uc *AddMovieToWatchlistUseCase) createMovieFromProvider(ctx context.Context, movieName string) (*entities.Movie, error) {
	results, err := uc.movieProvider.SearchMovies(ctx, movieName)
	if err != nil {
		return nil, err
	}

	selected, err := uc.movieSelector.SelectByExactName(results, movieName)
	if err != nil {
		return nil, err
	}

	detail, err := uc.movieProvider.GetMovieDetails(ctx, selected.ExternalID)
	if err != nil {
		return nil, err
	}

	releaseYear := uc.parseReleaseYear(selected.ReleaseDate)

	movie := &entities.Movie{
		EntityID:             uuid.NewString(),
		Name:                 selected.Title,
		Description:          selected.Overview,
		Director:             detail.Director,
		ReleaseDate:          releaseYear,
		Duration:             int16(detail.Runtime),
		ExternalSource:       "TMDB",
		ExternalSourceID:     selected.ExternalID,
		ExternalSourceRating: selected.VoteAverage,
	}

	movie, err = uc.movieRepo.Create(ctx, movie)
	if err != nil {
		return nil, err
	}

	uc.createWatchProviders(ctx, movie.ID, selected.ExternalID)

	return movie, nil
}

func (uc *AddMovieToWatchlistUseCase) createWatchProviders(ctx context.Context, movieID int, externalMovieID int64) {
	providers, err := uc.movieProvider.GetWatchProviders(ctx, externalMovieID)
	if err != nil {
		return
	}

	var movieProviders []entities.MovieWatchProvider
	for _, p := range providers {
		dbProvider, err := uc.providerRepo.FindByName(ctx, p.ProviderName)
		if err != nil {
			continue
		}

		movieProviders = append(movieProviders, entities.MovieWatchProvider{
			EntityID:   uuid.NewString(),
			MovieID:    movieID,
			ProviderID: dbProvider.ID,
		})
	}

	if len(movieProviders) > 0 {
		_ = uc.movieWatchProviderRepo.Create(ctx, movieProviders)
	}
}

func (uc *AddMovieToWatchlistUseCase) parseReleaseYear(releaseDate string) int16 {
	if len(releaseDate) < 4 {
		return 0
	}
	year, err := strconv.Atoi(releaseDate[:4])
	if err != nil {
		return 0
	}
	return int16(year)
}
