package usecases_test

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type mockSubscriptionRepository struct {
	createFunc                   func(ctx context.Context, s *entities.Subscription) (*entities.Subscription, error)
	findByUserIDAndProviderIDFunc func(ctx context.Context, userID, providerID int) (*entities.Subscription, error)
	listFunc                     func(ctx context.Context, userID int, active *bool) ([]entities.SubscriptionListItem, error)
	updateStatusFunc             func(ctx context.Context, entityID string, userID int, active bool) (*entities.Subscription, error)
}

func (m *mockSubscriptionRepository) Create(ctx context.Context, s *entities.Subscription) (*entities.Subscription, error) {
	return m.createFunc(ctx, s)
}

func (m *mockSubscriptionRepository) FindByUserIDAndProviderID(ctx context.Context, userID, providerID int) (*entities.Subscription, error) {
	return m.findByUserIDAndProviderIDFunc(ctx, userID, providerID)
}

func (m *mockSubscriptionRepository) List(ctx context.Context, userID int, active *bool) ([]entities.SubscriptionListItem, error) {
	return m.listFunc(ctx, userID, active)
}

func (m *mockSubscriptionRepository) UpdateStatus(ctx context.Context, entityID string, userID int, active bool) (*entities.Subscription, error) {
	return m.updateStatusFunc(ctx, entityID, userID, active)
}

type mockProviderRepository struct {
	findByNameFunc func(ctx context.Context, name string) (*entities.Provider, error)
}

func (m *mockProviderRepository) FindByName(ctx context.Context, name string) (*entities.Provider, error) {
	return m.findByNameFunc(ctx, name)
}

func TestAddSubscriptionUseCase_Execute_CreateNew(t *testing.T) {
	providerRepo := &mockProviderRepository{
		findByNameFunc: func(_ context.Context, _ string) (*entities.Provider, error) {
			return &entities.Provider{ID: 1, Name: "Netflix"}, nil
		},
	}
	subscriptionRepo := &mockSubscriptionRepository{
		findByUserIDAndProviderIDFunc: func(_ context.Context, _, _ int) (*entities.Subscription, error) {
			return nil, entities.ErrSubscriptionNotFound
		},
		createFunc: func(_ context.Context, s *entities.Subscription) (*entities.Subscription, error) {
			s.ID = 1
			s.CreatedAt = time.Now()
			s.UpdatedAt = time.Now()
			return s, nil
		},
	}

	uc := usecases.NewAddSubscriptionUseCase(subscriptionRepo, providerRepo)
	sub, err := uc.Execute(context.Background(), 1, entities.ProviderNameNetflix)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if sub.UserID != 1 || sub.ProviderID != 1 {
		t.Errorf("unexpected subscription values: %+v", sub)
	}
	if !sub.Active {
		t.Error("expected subscription to be active")
	}
}

func TestAddSubscriptionUseCase_Execute_AlreadyActiveReturnsConflict(t *testing.T) {
	providerRepo := &mockProviderRepository{
		findByNameFunc: func(_ context.Context, _ string) (*entities.Provider, error) {
			return &entities.Provider{ID: 1, Name: "Netflix"}, nil
		},
	}
	subscriptionRepo := &mockSubscriptionRepository{
		findByUserIDAndProviderIDFunc: func(_ context.Context, _, _ int) (*entities.Subscription, error) {
			return &entities.Subscription{EntityID: "uuid-1", Active: true}, nil
		},
	}

	uc := usecases.NewAddSubscriptionUseCase(subscriptionRepo, providerRepo)
	_, err := uc.Execute(context.Background(), 1, entities.ProviderNameNetflix)

	if !errors.Is(err, entities.ErrSubscriptionAlreadyExists) {
		t.Errorf("expected ErrSubscriptionAlreadyExists, got %v", err)
	}
}

func TestAddSubscriptionUseCase_Execute_ReactivatesInactive(t *testing.T) {
	reactivated := false
	providerRepo := &mockProviderRepository{
		findByNameFunc: func(_ context.Context, _ string) (*entities.Provider, error) {
			return &entities.Provider{ID: 1, Name: "Netflix"}, nil
		},
	}
	subscriptionRepo := &mockSubscriptionRepository{
		findByUserIDAndProviderIDFunc: func(_ context.Context, _, _ int) (*entities.Subscription, error) {
			return &entities.Subscription{EntityID: "uuid-1", UserID: 1, ProviderID: 1, Active: false}, nil
		},
		updateStatusFunc: func(_ context.Context, entityID string, userID int, active bool) (*entities.Subscription, error) {
			reactivated = true
			return &entities.Subscription{EntityID: entityID, UserID: userID, ProviderID: 1, Active: active}, nil
		},
	}

	uc := usecases.NewAddSubscriptionUseCase(subscriptionRepo, providerRepo)
	sub, err := uc.Execute(context.Background(), 1, entities.ProviderNameNetflix)

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if !reactivated {
		t.Error("expected UpdateStatus to be called")
	}
	if !sub.Active {
		t.Error("expected subscription to be reactivated")
	}
}

func TestAddSubscriptionUseCase_Execute_ProviderNotFound(t *testing.T) {
	providerRepo := &mockProviderRepository{
		findByNameFunc: func(_ context.Context, _ string) (*entities.Provider, error) {
			return nil, entities.ErrProviderNotFound
		},
	}

	uc := usecases.NewAddSubscriptionUseCase(&mockSubscriptionRepository{}, providerRepo)
	_, err := uc.Execute(context.Background(), 1, entities.ProviderNameNetflix)

	if !errors.Is(err, entities.ErrProviderNotFound) {
		t.Errorf("expected ErrProviderNotFound, got %v", err)
	}
}
