package usecases

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type SearchMoviesUseCase struct {
	movieProvider ports.MovieDataProvider
}

func NewSearchMoviesUseCase(movieProvider ports.MovieDataProvider) *SearchMoviesUseCase {
	return &SearchMoviesUseCase{movieProvider: movieProvider}
}

func (uc *SearchMoviesUseCase) Execute(ctx context.Context, query string) ([]entities.MovieSearchResult, error) {
	return uc.movieProvider.SearchMovies(ctx, query)
}
