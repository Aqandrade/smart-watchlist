package usecases

import (
	"context"
	"errors"
	"strconv"

	"github.com/google/uuid"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

const hardcodedUserID = 1

type AddMovieToWatchlistUseCase struct {
	movieRepo              ports.MovieRepository
	watchlistRepo          ports.WatchlistRepository
	providerRepo           ports.ProviderRepository
	movieWatchProviderRepo ports.MovieWatchProviderRepository
	movieProvider          ports.MovieDataProvider
}

func NewAddMovieToWatchlistUseCase(
	movieRepo ports.MovieRepository,
	watchlistRepo ports.WatchlistRepository,
	providerRepo ports.ProviderRepository,
	movieWatchProviderRepo ports.MovieWatchProviderRepository,
	movieProvider ports.MovieDataProvider,
) *AddMovieToWatchlistUseCase {
	return &AddMovieToWatchlistUseCase{
		movieRepo:              movieRepo,
		watchlistRepo:          watchlistRepo,
		providerRepo:           providerRepo,
		movieWatchProviderRepo: movieWatchProviderRepo,
		movieProvider:          movieProvider,
	}
}

func (uc *AddMovieToWatchlistUseCase) Execute(ctx context.Context, movieName string) (*entities.Watchlist, error) {
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

	_, err = uc.watchlistRepo.FindByMovieIDAndUserID(ctx, movie.ID, hardcodedUserID)
	if err != nil && !errors.Is(err, entities.ErrWatchlistNotFound) {
		return nil, err
	}
	if err == nil {
		return nil, entities.ErrMovieAlreadyInWatchlist
	}

	watchlist := &entities.Watchlist{
		EntityID: uuid.NewString(),
		MovieID:  movie.ID,
		UserID:   hardcodedUserID,
		Status:   entities.WatchlistStatusPending,
	}

	return uc.watchlistRepo.Create(ctx, watchlist)
}

func (uc *AddMovieToWatchlistUseCase) createMovieFromProvider(ctx context.Context, movieName string) (*entities.Movie, error) {
	detail, err := uc.movieProvider.SearchMovie(ctx, movieName)
	if err != nil {
		return nil, err
	}

	releaseYear := uc.parseReleaseYear(detail.ReleaseDate)

	movie := &entities.Movie{
		EntityID:             uuid.NewString(),
		Name:                 detail.Title,
		Description:          detail.Overview,
		Director:             detail.Director,
		ReleaseDate:          releaseYear,
		Duration:             int16(detail.Runtime),
		ExternalSource:       "TMDB",
		ExternalSourceID:     detail.ID,
		ExternalSourceRating: detail.VoteAverage,
	}

	movie, err = uc.movieRepo.Create(ctx, movie)
	if err != nil {
		return nil, err
	}

	uc.createWatchProviders(ctx, movie.ID, detail.ID)

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
