package ports

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type MovieRepository interface {
	FindByName(ctx context.Context, name string) (*entities.Movie, error)
	Create(ctx context.Context, movie *entities.Movie) (*entities.Movie, error)
}
