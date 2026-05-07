package ports

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type SubscriptionRepository interface {
	Create(ctx context.Context, s *entities.Subscription) (*entities.Subscription, error)
	FindByUserIDAndProviderID(ctx context.Context, userID, providerID int) (*entities.Subscription, error)
	List(ctx context.Context, userID int, active *bool) ([]entities.SubscriptionListItem, error)
	UpdateStatus(ctx context.Context, entityID string, userID int, active bool) (*entities.Subscription, error)
}
