package usecases

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
)

type DeleteWatchlistItemUseCase struct {
	watchlistRepo ports.WatchlistRepository
}

func NewDeleteWatchlistItemUseCase(watchlistRepo ports.WatchlistRepository) *DeleteWatchlistItemUseCase {
	return &DeleteWatchlistItemUseCase{watchlistRepo: watchlistRepo}
}

func (uc *DeleteWatchlistItemUseCase) Execute(ctx context.Context, entityID string) error {
	return uc.watchlistRepo.Delete(ctx, entityID, hardcodedUserID)
}
