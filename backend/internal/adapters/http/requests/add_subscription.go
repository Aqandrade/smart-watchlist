package requests

import "github.com/Aqandrade/smart-watchlist/internal/domain/entities"

type AddSubscriptionRequest struct {
	ProviderName entities.ProviderName `json:"provider_name" binding:"required,oneof=Netflix 'Amazon Prime Video' 'Disney Plus' 'HBO Max' 'Paramount Plus' 'Apple TV Plus' Globoplay 'Star Plus' Crunchyroll Mubi"`
}
