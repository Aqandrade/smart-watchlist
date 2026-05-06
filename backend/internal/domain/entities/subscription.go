package entities

import "time"

type Subscription struct {
	ID         int
	EntityID   string
	UserID     int
	ProviderID int
	Active     bool
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

type SubscriptionListItem struct {
	EntityID     string
	ProviderID   int
	ProviderName string
	Active       bool
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
