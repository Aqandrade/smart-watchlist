package usecases

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

const defaultPage = 1
const defaultPageSize = 20

type ListWatchlistInput struct {
	UserID   int
	Page     int
	PageSize int
}

type ListWatchlistUseCase struct {
	watchlistRepo ports.WatchlistRepository
}

func NewListWatchlistUseCase(watchlistRepo ports.WatchlistRepository) *ListWatchlistUseCase {
	return &ListWatchlistUseCase{watchlistRepo: watchlistRepo}
}

func (uc *ListWatchlistUseCase) Execute(ctx context.Context, input ListWatchlistInput) ([]entities.WatchlistItem, int, error) {
	if input.Page < 1 {
		input.Page = defaultPage
	}
	if input.PageSize < 1 || input.PageSize > 100 {
		input.PageSize = defaultPageSize
	}

	return uc.watchlistRepo.ListWatchlist(ctx, input.UserID, input.Page, input.PageSize)
}
