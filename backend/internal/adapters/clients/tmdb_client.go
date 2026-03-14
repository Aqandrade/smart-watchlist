package clients

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"time"

	"github.com/Aqandrade/smart-watchlist/internal/adapters/clients/dto"
	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type tmdbClient struct {
	httpClient *http.Client
	apiKey     string
	baseURL    string
}

func NewTMDBClient(baseURL, apiKey string) ports.MovieDataProvider {
	return &tmdbClient{
		httpClient: &http.Client{Timeout: 10 * time.Second},
		apiKey:     apiKey,
		baseURL:    baseURL,
	}
}

func (c *tmdbClient) SearchMovies(ctx context.Context, name string) ([]entities.MovieSearchResult, error) {
	searchURL := fmt.Sprintf("%s/search/movie?query=%s&language=pt-BR", c.baseURL, url.QueryEscape(name))

	resp, err := c.doRequest(ctx, searchURL)
	if err != nil {
		return nil, fmt.Errorf("%w: %s", entities.ErrProviderUnavailable, err.Error())
	}
	defer resp.Body.Close()

	var searchResp dto.TMDBSearchResponse
	if err := json.NewDecoder(resp.Body).Decode(&searchResp); err != nil {
		return nil, fmt.Errorf("%w: failed to decode search response", entities.ErrProviderUnavailable)
	}

	results := make([]entities.MovieSearchResult, 0, len(searchResp.Results))
	for _, m := range searchResp.Results {
		results = append(results, entities.MovieSearchResult{
			ExternalID:  m.ID,
			Title:       m.Title,
			Overview:    m.Overview,
			ReleaseDate: m.ReleaseDate,
			VoteAverage: m.VoteAverage,
		})
	}

	return results, nil
}

func (c *tmdbClient) GetMovieDetails(ctx context.Context, movieID int64) (*ports.MovieDetail, error) {
	detailURL := fmt.Sprintf("%s/movie/%d?append_to_response=credits", c.baseURL, movieID)

	resp, err := c.doRequest(ctx, detailURL)
	if err != nil {
		return nil, fmt.Errorf("%w: %s", entities.ErrProviderUnavailable, err.Error())
	}
	defer resp.Body.Close()

	var detail dto.TMDBMovieDetail
	if err := json.NewDecoder(resp.Body).Decode(&detail); err != nil {
		return nil, fmt.Errorf("%w: failed to decode detail response", entities.ErrProviderUnavailable)
	}

	return &ports.MovieDetail{
		ID:       movieID,
		Director: c.extractDirector(detail.Credits.Crew),
		Runtime:  detail.Runtime,
	}, nil
}

func (c *tmdbClient) GetWatchProviders(ctx context.Context, movieID int64) ([]ports.WatchProviderEntry, error) {
	providerURL := fmt.Sprintf("%s/movie/%d/watch/providers", c.baseURL, movieID)

	resp, err := c.doRequest(ctx, providerURL)
	if err != nil {
		return nil, fmt.Errorf("%w: %s", entities.ErrProviderUnavailable, err.Error())
	}
	defer resp.Body.Close()

	var providersResp dto.TMDBWatchProvidersResponse
	if err := json.NewDecoder(resp.Body).Decode(&providersResp); err != nil {
		return nil, fmt.Errorf("%w: failed to decode providers response", entities.ErrProviderUnavailable)
	}

	br, ok := providersResp.Results["BR"]
	if !ok || len(br.Flatrate) == 0 {
		return nil, entities.ErrWatchProviderNotFound
	}

	entries := make([]ports.WatchProviderEntry, 0, len(br.Flatrate))
	for _, p := range br.Flatrate {
		entries = append(entries, ports.WatchProviderEntry{
			ProviderName: p.ProviderName,
		})
	}

	return entries, nil
}

func (c *tmdbClient) doRequest(ctx context.Context, requestURL string) (*http.Response, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, requestURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+c.apiKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		resp.Body.Close()
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	return resp, nil
}

func (c *tmdbClient) extractDirector(crew []dto.TMDBCrewMember) string {
	for _, member := range crew {
		if member.Job == "Director" {
			return member.Name
		}
	}
	return ""
}
