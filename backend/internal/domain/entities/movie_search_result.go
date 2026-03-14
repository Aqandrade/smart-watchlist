package entities

type MovieSearchResult struct {
	ExternalID  int64
	Title       string
	Overview    string
	ReleaseDate string
	VoteAverage float64
}
