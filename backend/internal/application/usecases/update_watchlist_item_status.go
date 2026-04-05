package usecases

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type UpdateWatchlistItemStatusUseCase struct {
	watchlistRepo ports.WatchlistRepository
}

func NewUpdateWatchlistItemStatusUseCase(watchlistRepo ports.WatchlistRepository) *UpdateWatchlistItemStatusUseCase {
	return &UpdateWatchlistItemStatusUseCase{watchlistRepo: watchlistRepo}
}

func (uc *UpdateWatchlistItemStatusUseCase) Execute(ctx context.Context, userID int, entityID string, status entities.WatchlistStatus) (*entities.Watchlist, error) {
	return uc.watchlistRepo.UpdateStatus(ctx, entityID, userID, status)
}
