package usecases_test

import (
	"context"
	"testing"
	"time"

	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

func boolPtr(v bool) *bool { return &v }

func TestListSubscriptionsUseCase_Execute_NoFilter(t *testing.T) {
	repo := &mockSubscriptionRepository{
		listFunc: func(_ context.Context, userID int, active *bool) ([]entities.SubscriptionListItem, error) {
			if active != nil {
				t.Error("expected active filter to be nil")
			}
			return []entities.SubscriptionListItem{
				{EntityID: "uuid-1", ProviderName: "Netflix", Active: true, CreatedAt: time.Now()},
				{EntityID: "uuid-2", ProviderName: "Amazon Prime Video", Active: false, CreatedAt: time.Now()},
			}, nil
		},
	}

	uc := usecases.NewListSubscriptionsUseCase(repo)
	items, err := uc.Execute(context.Background(), 1, nil)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if len(items) != 2 {
		t.Errorf("expected 2 items, got %d", len(items))
	}
}

func TestListSubscriptionsUseCase_Execute_FilterActive(t *testing.T) {
	repo := &mockSubscriptionRepository{
		listFunc: func(_ context.Context, userID int, active *bool) ([]entities.SubscriptionListItem, error) {
			if active == nil || !*active {
				t.Error("expected active filter to be true")
			}
			return []entities.SubscriptionListItem{
				{EntityID: "uuid-1", ProviderName: "Netflix", Active: true, CreatedAt: time.Now()},
			}, nil
		},
	}

	uc := usecases.NewListSubscriptionsUseCase(repo)
	items, err := uc.Execute(context.Background(), 1, boolPtr(true))

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if len(items) != 1 {
		t.Errorf("expected 1 item, got %d", len(items))
	}
}

func TestListSubscriptionsUseCase_Execute_EmptyList(t *testing.T) {
	repo := &mockSubscriptionRepository{
		listFunc: func(_ context.Context, _ int, _ *bool) ([]entities.SubscriptionListItem, error) {
			return []entities.SubscriptionListItem{}, nil
		},
	}

	uc := usecases.NewListSubscriptionsUseCase(repo)
	items, err := uc.Execute(context.Background(), 1, nil)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if len(items) != 0 {
		t.Errorf("expected empty list, got %d items", len(items))
	}
}
