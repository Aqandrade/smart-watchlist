package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/requests"
	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/responses"
	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

var errorStatusMap = map[error]int{
	entities.ErrMovieNotFoundOnProvider: http.StatusFailedDependency,
	entities.ErrProviderUnavailable:     http.StatusFailedDependency,
	entities.ErrWatchProviderNotFound:   http.StatusFailedDependency,
	entities.ErrMovieAlreadyInWatchlist: http.StatusConflict,
}

type WatchlistHandler struct {
	addMovieUseCase *usecases.AddMovieToWatchlistUseCase
}

func NewWatchlistHandler(addMovieUseCase *usecases.AddMovieToWatchlistUseCase) *WatchlistHandler {
	return &WatchlistHandler{addMovieUseCase: addMovieUseCase}
}

func (h *WatchlistHandler) AddMovie(c *gin.Context) {
	var req requests.AddMovieToWatchlistRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movie_name is required"})
		return
	}

	watchlist, err := h.addMovieUseCase.Execute(c.Request.Context(), req.MovieName)
	if err != nil {
		status := h.mapErrorToStatus(err)
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, responses.WatchlistResponse{
		EntityID:  watchlist.EntityID,
		MovieName: req.MovieName,
		Status:    string(watchlist.Status),
		CreatedAt: watchlist.CreatedAt,
	})
}

func (h *WatchlistHandler) mapErrorToStatus(err error) int {
	for sentinel, status := range errorStatusMap {
		if errors.Is(err, sentinel) {
			return status
		}
	}
	return http.StatusInternalServerError
}
