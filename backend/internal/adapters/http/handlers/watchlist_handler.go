package handlers

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/middlewares"
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
	entities.ErrWatchlistNotFound:       http.StatusNotFound,
}

type WatchlistHandler struct {
	addMovieUseCase         *usecases.AddMovieToWatchlistUseCase
	listWatchlistUseCase    *usecases.ListWatchlistUseCase
	updateItemStatusUseCase *usecases.UpdateWatchlistItemStatusUseCase
	deleteItemUseCase       *usecases.DeleteWatchlistItemUseCase
}

func NewWatchlistHandler(
	addMovieUseCase *usecases.AddMovieToWatchlistUseCase,
	listWatchlistUseCase *usecases.ListWatchlistUseCase,
	updateItemStatusUseCase *usecases.UpdateWatchlistItemStatusUseCase,
	deleteItemUseCase *usecases.DeleteWatchlistItemUseCase,
) *WatchlistHandler {
	return &WatchlistHandler{
		addMovieUseCase:         addMovieUseCase,
		listWatchlistUseCase:    listWatchlistUseCase,
		updateItemStatusUseCase: updateItemStatusUseCase,
		deleteItemUseCase:       deleteItemUseCase,
	}
}

func (h *WatchlistHandler) AddMovie(c *gin.Context) {
	var req requests.AddMovieToWatchlistRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movie_name is required"})
		return
	}

	userID := c.GetInt(middlewares.UserIDKey)
	watchlist, err := h.addMovieUseCase.Execute(c.Request.Context(), userID, req.MovieName)
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

func (h *WatchlistHandler) List(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "20"))

	items, total, err := h.listWatchlistUseCase.Execute(c.Request.Context(), usecases.ListWatchlistInput{
		UserID:   c.GetInt(middlewares.UserIDKey),
		Page:     page,
		PageSize: pageSize,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	responseItems := make([]responses.WatchlistItemResponse, 0, len(items))
	for _, item := range items {
		responseItems = append(responseItems, responses.WatchlistItemResponse{
			EntityID:             item.EntityID,
			MovieName:            item.MovieName,
			MovieDescription:     item.MovieDescription,
			MovieDirector:        item.MovieDirector,
			MovieReleaseDate:     item.MovieReleaseDate,
			MovieDuration:        item.MovieDuration,
			ExternalSourceRating: item.ExternalSourceRating,
			Status:               string(item.Status),
			Providers:            item.Providers,
			CreatedAt:            item.CreatedAt,
		})
	}

	c.JSON(http.StatusOK, responses.ListWatchlistResponse{
		Items:      responseItems,
		Page:       page,
		PageSize:   pageSize,
		TotalItems: total,
	})
}

func (h *WatchlistHandler) UpdateItemStatus(c *gin.Context) {
	watchlistItemID := c.Param("watchlistItemId")

	var req requests.UpdateWatchlistItemStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status is required"})
		return
	}

	status := entities.WatchlistStatus(req.Status)
	if status != entities.WatchlistStatusPending && status != entities.WatchlistStatusWatched {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid status, accepted values: PENDING, WATCHED"})
		return
	}

	userID := c.GetInt(middlewares.UserIDKey)
	watchlist, err := h.updateItemStatusUseCase.Execute(c.Request.Context(), userID, watchlistItemID, status)
	if err != nil {
		httpStatus := h.mapErrorToStatus(err)
		c.JSON(httpStatus, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, responses.UpdateWatchlistItemStatusResponse{
		EntityID:  watchlist.EntityID,
		Status:    string(watchlist.Status),
		UpdatedAt: watchlist.UpdatedAt,
	})
}

func (h *WatchlistHandler) DeleteItem(c *gin.Context) {
	watchlistItemID := c.Param("watchlistItemId")
	userID := c.GetInt(middlewares.UserIDKey)

	if err := h.deleteItemUseCase.Execute(c.Request.Context(), userID, watchlistItemID); err != nil {
		httpStatus := h.mapErrorToStatus(err)
		c.JSON(httpStatus, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}

func (h *WatchlistHandler) mapErrorToStatus(err error) int {
	for sentinel, status := range errorStatusMap {
		if errors.Is(err, sentinel) {
			return status
		}
	}
	return http.StatusInternalServerError
}
