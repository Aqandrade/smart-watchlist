package usecases_test

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

func int16Ptr(v int16) *int16 { return &v }

func makeMovieItem(entityID, name string, duration int16, rating float64) *entities.WatchlistItem {
	return &entities.WatchlistItem{
		EntityID:             entityID,
		MovieName:            name,
		MovieDuration:        duration,
		ExternalSourceRating: rating,
		Status:               entities.WatchlistStatusPending,
		Providers:            []string{"Netflix"},
		CreatedAt:            time.Now(),
	}
}

func newRecommendationUC(candidate *entities.RecommendationCandidate, repoErr error) *usecases.GetMovieRecommendationUseCase {
	repo := &mockWatchlistRepository{
		findRecommendationFunc: func(_ context.Context, _ int, _ *int16) (*entities.RecommendationCandidate, error) {
			return candidate, repoErr
		},
	}
	return usecases.NewGetMovieRecommendationUseCase(repo)
}

func TestGetRecommendation_NoMovies(t *testing.T) {
	uc := newRecommendationUC(&entities.RecommendationCandidate{TotalUnwatched: 0}, nil)
	_, err := uc.Execute(context.Background(), 1, nil)
	if !errors.Is(err, entities.ErrNoMoviesInWatchlist) {
		t.Errorf("expected ErrNoMoviesInWatchlist, got %v", err)
	}
}

func TestGetRecommendation_NoActiveSubscriptions(t *testing.T) {
	uc := newRecommendationUC(&entities.RecommendationCandidate{TotalUnwatched: 5, ActiveSubsCount: 0}, nil)
	_, err := uc.Execute(context.Background(), 1, nil)
	if !errors.Is(err, entities.ErrNoActiveSubscriptions) {
		t.Errorf("expected ErrNoActiveSubscriptions, got %v", err)
	}
}

func TestGetRecommendation_NoMatchingSubscriptions(t *testing.T) {
	uc := newRecommendationUC(&entities.RecommendationCandidate{TotalUnwatched: 5, ActiveSubsCount: 2, MatchedCount: 0}, nil)
	_, err := uc.Execute(context.Background(), 1, nil)
	if !errors.Is(err, entities.ErrNoMoviesMatchingActiveSubscriptions) {
		t.Errorf("expected ErrNoMoviesMatchingActiveSubscriptions, got %v", err)
	}
}

func TestGetRecommendation_NoMatchingDuration(t *testing.T) {
	uc := newRecommendationUC(&entities.RecommendationCandidate{
		TotalUnwatched:  5,
		ActiveSubsCount: 1,
		MatchedCount:    3,
		Movie:           nil, // duration filter eliminated all
	}, nil)
	_, err := uc.Execute(context.Background(), 1, int16Ptr(60))
	if !errors.Is(err, entities.ErrNoMoviesMatchingDuration) {
		t.Errorf("expected ErrNoMoviesMatchingDuration, got %v", err)
	}
}

// Bug fix: 1 movie matching subscription (9 total) → should recommend, not error
func TestGetRecommendation_SingleMatchReturnsRecommendation(t *testing.T) {
	movie := makeMovieItem("abc", "Inception", 148, 8.8)
	uc := newRecommendationUC(&entities.RecommendationCandidate{
		TotalUnwatched:  9,
		ActiveSubsCount: 1,
		MatchedCount:    1,
		Movie:           movie,
	}, nil)
	result, err := uc.Execute(context.Background(), 1, nil)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if result.MovieName != "Inception" {
		t.Errorf("expected Inception, got %s", result.MovieName)
	}
}

func TestGetRecommendation_ReturnsBestRated(t *testing.T) {
	movie := makeMovieItem("b", "Movie B", 90, 8.5)
	uc := newRecommendationUC(&entities.RecommendationCandidate{
		TotalUnwatched:  3,
		ActiveSubsCount: 1,
		MatchedCount:    3,
		Movie:           movie, // repository already returns the best
	}, nil)
	result, err := uc.Execute(context.Background(), 1, nil)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if result.MovieName != "Movie B" {
		t.Errorf("expected Movie B, got %s", result.MovieName)
	}
}

func TestGetRecommendation_WithDurationFilter(t *testing.T) {
	movie := makeMovieItem("a", "Movie A", 60, 9.0)
	uc := newRecommendationUC(&entities.RecommendationCandidate{
		TotalUnwatched:  3,
		ActiveSubsCount: 1,
		MatchedCount:    3,
		Movie:           movie,
	}, nil)
	result, err := uc.Execute(context.Background(), 1, int16Ptr(90))
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if result.MovieName != "Movie A" {
		t.Errorf("expected Movie A, got %s", result.MovieName)
	}
}

func TestGetRecommendation_NoDurationFilter(t *testing.T) {
	movie := makeMovieItem("a", "Movie A", 180, 9.5)
	uc := newRecommendationUC(&entities.RecommendationCandidate{
		TotalUnwatched:  2,
		ActiveSubsCount: 1,
		MatchedCount:    2,
		Movie:           movie,
	}, nil)
	result, err := uc.Execute(context.Background(), 1, nil)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if result.MovieName != "Movie A" {
		t.Errorf("expected Movie A, got %s", result.MovieName)
	}
}

func TestGetRecommendation_RepositoryError(t *testing.T) {
	repoErr := errors.New("db connection failed")
	uc := newRecommendationUC(nil, repoErr)
	_, err := uc.Execute(context.Background(), 1, nil)
	if !errors.Is(err, repoErr) {
		t.Errorf("expected repository error to propagate, got %v", err)
	}
}
