package usecases

import (
	"context"
	"errors"

	"github.com/google/uuid"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type AddSubscriptionUseCase struct {
	subscriptionRepo ports.SubscriptionRepository
	providerRepo     ports.ProviderRepository
}

func NewAddSubscriptionUseCase(subscriptionRepo ports.SubscriptionRepository, providerRepo ports.ProviderRepository) *AddSubscriptionUseCase {
	return &AddSubscriptionUseCase{
		subscriptionRepo: subscriptionRepo,
		providerRepo:     providerRepo,
	}
}

func (uc *AddSubscriptionUseCase) Execute(ctx context.Context, userID int, providerName entities.ProviderName) (*entities.Subscription, error) {
	provider, err := uc.providerRepo.FindByName(ctx, string(providerName))
	if err != nil {
		return nil, err
	}

	existing, err := uc.subscriptionRepo.FindByUserIDAndProviderID(ctx, userID, provider.ID)
	if err != nil && !errors.Is(err, entities.ErrSubscriptionNotFound) {
		return nil, err
	}

	if existing != nil {
		if existing.Active {
			return nil, entities.ErrSubscriptionAlreadyExists
		}
		return uc.subscriptionRepo.UpdateStatus(ctx, existing.EntityID, userID, true)
	}

	subscription := &entities.Subscription{
		EntityID:   uuid.NewString(),
		UserID:     userID,
		ProviderID: provider.ID,
		Active:     true,
	}

	return uc.subscriptionRepo.Create(ctx, subscription)
}
