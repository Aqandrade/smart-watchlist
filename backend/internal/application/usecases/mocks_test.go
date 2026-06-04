package usecases_test

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type mockWatchlistRepository struct {
	findRecommendationFunc func(ctx context.Context, userID int, maxDuration *int16) (*entities.RecommendationCandidate, error)
}

func (m *mockWatchlistRepository) Create(ctx context.Context, w *entities.Watchlist) (*entities.Watchlist, error) {
	panic("not implemented")
}

func (m *mockWatchlistRepository) FindByMovieIDAndUserID(ctx context.Context, movieID, userID int) (*entities.Watchlist, error) {
	panic("not implemented")
}

func (m *mockWatchlistRepository) ListWatchlist(ctx context.Context, userID, page, pageSize int) ([]entities.WatchlistItem, int, error) {
	panic("not implemented")
}

func (m *mockWatchlistRepository) FindRecommendation(ctx context.Context, userID int, maxDuration *int16) (*entities.RecommendationCandidate, error) {
	return m.findRecommendationFunc(ctx, userID, maxDuration)
}

func (m *mockWatchlistRepository) UpdateStatus(ctx context.Context, entityID string, userID int, status entities.WatchlistStatus) (*entities.Watchlist, error) {
	panic("not implemented")
}

func (m *mockWatchlistRepository) Delete(ctx context.Context, entityID string, userID int) error {
	panic("not implemented")
}
