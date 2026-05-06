package entities

import "time"

type ProviderName string

const (
	ProviderNameNetflix          ProviderName = "Netflix"
	ProviderNameAmazonPrimeVideo ProviderName = "Amazon Prime Video"
	ProviderNameDisneyPlus       ProviderName = "Disney Plus"
	ProviderNameHBOMax           ProviderName = "HBO Max"
	ProviderNameParamountPlus    ProviderName = "Paramount Plus"
	ProviderNameAppleTVPlus      ProviderName = "Apple TV Plus"
	ProviderNameGloboplay        ProviderName = "Globoplay"
	ProviderNameStarPlus         ProviderName = "Star Plus"
	ProviderNameCrunchyroll      ProviderName = "Crunchyroll"
	ProviderNameMubi             ProviderName = "Mubi"
)

type Provider struct {
	ID        int
	EntityID  string
	Name      string
	CreatedAt time.Time
	UpdatedAt time.Time
}
