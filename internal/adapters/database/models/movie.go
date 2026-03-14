package models

import "time"

type Movie struct {
	ID                   int
	EntityID             string
	Name                 string
	Description          string
	Director             string
	ReleaseDate          int16
	Duration             int16
	ExternalSource       string
	ExternalSourceID     int64
	ExternalSourceRating float64
	CreatedAt            time.Time
	UpdatedAt            time.Time
}
