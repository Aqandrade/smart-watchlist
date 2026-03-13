package ports

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type WatchlistRepository interface {
	Create(ctx context.Context, watchlist *entities.Watchlist) (*entities.Watchlist, error)
	FindByMovieIDAndUserID(ctx context.Context, movieID, userID int) (*entities.Watchlist, error)
}
