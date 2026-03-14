package usecases

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

const defaultPage = 1
const defaultPageSize = 20

type ListWatchlistUseCase struct {
	watchlistRepo ports.WatchlistRepository
}

func NewListWatchlistUseCase(watchlistRepo ports.WatchlistRepository) *ListWatchlistUseCase {
	return &ListWatchlistUseCase{watchlistRepo: watchlistRepo}
}

func (uc *ListWatchlistUseCase) Execute(ctx context.Context, page, pageSize int) ([]entities.WatchlistItem, int, error) {
	if page < 1 {
		page = defaultPage
	}
	if pageSize < 1 || pageSize > 100 {
		pageSize = defaultPageSize
	}

	return uc.watchlistRepo.ListWatchlist(ctx, hardcodedUserID, page, pageSize)
}
