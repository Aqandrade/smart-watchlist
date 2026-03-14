package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/responses"
	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type MovieHandler struct {
	searchMoviesUseCase *usecases.SearchMoviesUseCase
}

func NewMovieHandler(searchMoviesUseCase *usecases.SearchMoviesUseCase) *MovieHandler {
	return &MovieHandler{searchMoviesUseCase: searchMoviesUseCase}
}

func (h *MovieHandler) Search(c *gin.Context) {
	query := c.Query("query")
	if query == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "query is required"})
		return
	}

	results, err := h.searchMoviesUseCase.Execute(c.Request.Context(), query)
	if err != nil {
		if errors.Is(err, entities.ErrProviderUnavailable) {
			c.JSON(http.StatusFailedDependency, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	responseItems := make([]responses.MovieSearchResultResponse, 0, len(results))
	for _, r := range results {
		responseItems = append(responseItems, responses.MovieSearchResultResponse{
			ExternalID:  r.ExternalID,
			Title:       r.Title,
			Overview:    r.Overview,
			ReleaseDate: r.ReleaseDate,
			VoteAverage: r.VoteAverage,
		})
	}

	c.JSON(http.StatusOK, responseItems)
}
