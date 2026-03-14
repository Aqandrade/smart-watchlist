package responses

type MovieSearchResultResponse struct {
	ExternalID  int64   `json:"external_id"`
	Title       string  `json:"title"`
	Overview    string  `json:"overview"`
	ReleaseDate string  `json:"release_date"`
	VoteAverage float64 `json:"vote_average"`
}
