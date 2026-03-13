package dto

type TMDBSearchResponse struct {
	Results []TMDBMovie `json:"results"`
}

type TMDBMovie struct {
	ID          int64   `json:"id"`
	Title       string  `json:"title"`
	Overview    string  `json:"overview"`
	ReleaseDate string  `json:"release_date"`
	VoteAverage float64 `json:"vote_average"`
}

type TMDBMovieDetail struct {
	Runtime int         `json:"runtime"`
	Credits TMDBCredits `json:"credits"`
}

type TMDBCredits struct {
	Crew []TMDBCrewMember `json:"crew"`
}

type TMDBCrewMember struct {
	Job  string `json:"job"`
	Name string `json:"name"`
}

type TMDBWatchProvidersResponse struct {
	Results map[string]TMDBCountryProviders `json:"results"`
}

type TMDBCountryProviders struct {
	Flatrate []TMDBProvider `json:"flatrate"`
}

type TMDBProvider struct {
	ProviderName string `json:"provider_name"`
}
