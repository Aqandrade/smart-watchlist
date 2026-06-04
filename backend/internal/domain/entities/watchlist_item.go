package entities

import "time"

type WatchlistItem struct {
	EntityID             string
	MovieName            string
	MovieDescription     string
	MovieDirector        string
	MovieReleaseDate     int16
	MovieDuration        int16
	ExternalSourceRating float64
	Status               WatchlistStatus
	Providers            []string
	CreatedAt            time.Time
}

type RecommendationCandidate struct {
	TotalUnwatched  int
	ActiveSubsCount int
	MatchedCount    int
	Movie           *WatchlistItem // nil when duration filter eliminates all matches
}
