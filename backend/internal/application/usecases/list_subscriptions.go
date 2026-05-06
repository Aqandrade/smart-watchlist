package usecases

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type ListSubscriptionsUseCase struct {
	subscriptionRepo ports.SubscriptionRepository
}

func NewListSubscriptionsUseCase(subscriptionRepo ports.SubscriptionRepository) *ListSubscriptionsUseCase {
	return &ListSubscriptionsUseCase{subscriptionRepo: subscriptionRepo}
}

func (uc *ListSubscriptionsUseCase) Execute(ctx context.Context, userID int, active *bool) ([]entities.SubscriptionListItem, error) {
	return uc.subscriptionRepo.List(ctx, userID, active)
}
