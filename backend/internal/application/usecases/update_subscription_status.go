package usecases

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type UpdateSubscriptionStatusUseCase struct {
	subscriptionRepo ports.SubscriptionRepository
}

func NewUpdateSubscriptionStatusUseCase(subscriptionRepo ports.SubscriptionRepository) *UpdateSubscriptionStatusUseCase {
	return &UpdateSubscriptionStatusUseCase{subscriptionRepo: subscriptionRepo}
}

func (uc *UpdateSubscriptionStatusUseCase) Execute(ctx context.Context, userID int, entityID string, active bool) (*entities.Subscription, error) {
	return uc.subscriptionRepo.UpdateStatus(ctx, entityID, userID, active)
}
