package responses

import "time"

type SubscriptionResponse struct {
	EntityID     string    `json:"entity_id"`
	ProviderID   int       `json:"provider_id"`
	ProviderName string    `json:"provider_name"`
	Active       bool      `json:"active"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type ListSubscriptionsResponse struct {
	Items []SubscriptionResponse `json:"items"`
}
