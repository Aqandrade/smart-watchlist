package ports

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type MovieWatchProviderRepository interface {
	Create(ctx context.Context, providers []entities.MovieWatchProvider) error
}
