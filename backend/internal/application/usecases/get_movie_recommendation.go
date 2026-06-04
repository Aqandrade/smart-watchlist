package usecases

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type GetMovieRecommendationUseCase struct {
	watchlistRepo ports.WatchlistRepository
}

func NewGetMovieRecommendationUseCase(
	watchlistRepo ports.WatchlistRepository,
) *GetMovieRecommendationUseCase {
	return &GetMovieRecommendationUseCase{watchlistRepo: watchlistRepo}
}

// Execute returns the best movie recommendation for the user.
// All filtering (active subscriptions, duration) is pushed to the repository layer for efficiency.
func (uc *GetMovieRecommendationUseCase) Execute(ctx context.Context, userID int, maxDuration *int16) (*entities.WatchlistItem, error) {
	candidate, err := uc.watchlistRepo.FindRecommendation(ctx, userID, maxDuration)
	if err != nil {
		return nil, err
	}

	switch {
	case candidate.TotalUnwatched == 0:
		return nil, entities.ErrNoMoviesInWatchlist
	case candidate.ActiveSubsCount == 0:
		return nil, entities.ErrNoActiveSubscriptions
	case candidate.MatchedCount == 0:
		return nil, entities.ErrNoMoviesMatchingActiveSubscriptions
	case candidate.Movie == nil:
		return nil, entities.ErrNoMoviesMatchingDuration
	default:
		return candidate.Movie, nil
	}
}
