package usecases_test

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

func TestUpdateSubscriptionStatusUseCase_Execute_Success(t *testing.T) {
	repo := &mockSubscriptionRepository{
		updateStatusFunc: func(_ context.Context, entityID string, userID int, active bool) (*entities.Subscription, error) {
			return &entities.Subscription{
				EntityID:  entityID,
				UserID:    userID,
				Active:    active,
				UpdatedAt: time.Now(),
			}, nil
		},
	}

	uc := usecases.NewUpdateSubscriptionStatusUseCase(repo)
	sub, err := uc.Execute(context.Background(), 1, "uuid-1", false)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if sub.Active {
		t.Error("expected subscription to be inactive")
	}
	if sub.EntityID != "uuid-1" {
		t.Errorf("expected entity_id uuid-1, got %s", sub.EntityID)
	}
}

func TestUpdateSubscriptionStatusUseCase_Execute_NotFound(t *testing.T) {
	repo := &mockSubscriptionRepository{
		updateStatusFunc: func(_ context.Context, _ string, _ int, _ bool) (*entities.Subscription, error) {
			return nil, entities.ErrSubscriptionNotFound
		},
	}

	uc := usecases.NewUpdateSubscriptionStatusUseCase(repo)
	_, err := uc.Execute(context.Background(), 1, "uuid-inexistente", false)

	if !errors.Is(err, entities.ErrSubscriptionNotFound) {
		t.Errorf("expected ErrSubscriptionNotFound, got %v", err)
	}
}
