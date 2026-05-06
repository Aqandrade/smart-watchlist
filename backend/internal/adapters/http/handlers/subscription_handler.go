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

var subscriptionErrorStatusMap = map[error]int{
	entities.ErrSubscriptionNotFound:      http.StatusNotFound,
	entities.ErrSubscriptionAlreadyExists: http.StatusConflict,
	entities.ErrProviderNotFound:          http.StatusUnprocessableEntity,
}

type SubscriptionHandler struct {
	listUseCase         *usecases.ListSubscriptionsUseCase
	addUseCase          *usecases.AddSubscriptionUseCase
	updateStatusUseCase *usecases.UpdateSubscriptionStatusUseCase
}

func NewSubscriptionHandler(
	listUseCase *usecases.ListSubscriptionsUseCase,
	addUseCase *usecases.AddSubscriptionUseCase,
	updateStatusUseCase *usecases.UpdateSubscriptionStatusUseCase,
) *SubscriptionHandler {
	return &SubscriptionHandler{
		listUseCase:         listUseCase,
		addUseCase:          addUseCase,
		updateStatusUseCase: updateStatusUseCase,
	}
}

func (h *SubscriptionHandler) List(c *gin.Context) {
	var active *bool
	if activeParam := c.Query("active"); activeParam != "" {
		val, err := strconv.ParseBool(activeParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "active must be true or false"})
			return
		}
		active = &val
	}

	userID := c.GetInt(middlewares.UserIDKey)
	items, err := h.listUseCase.Execute(c.Request.Context(), userID, active)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	responseItems := make([]responses.SubscriptionResponse, 0, len(items))
	for _, item := range items {
		responseItems = append(responseItems, responses.SubscriptionResponse{
			EntityID:     item.EntityID,
			ProviderID:   item.ProviderID,
			ProviderName: item.ProviderName,
			Active:       item.Active,
			CreatedAt:    item.CreatedAt,
			UpdatedAt:    item.UpdatedAt,
		})
	}

	c.JSON(http.StatusOK, responses.ListSubscriptionsResponse{Items: responseItems})
}

func (h *SubscriptionHandler) Add(c *gin.Context) {
	var req requests.AddSubscriptionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "provider_name is required and must be a valid provider"})
		return
	}

	userID := c.GetInt(middlewares.UserIDKey)
	subscription, err := h.addUseCase.Execute(c.Request.Context(), userID, req.ProviderName)
	if err != nil {
		status := h.mapErrorToStatus(err)
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, responses.SubscriptionResponse{
		EntityID:   subscription.EntityID,
		ProviderID: subscription.ProviderID,
		Active:     subscription.Active,
		CreatedAt:  subscription.CreatedAt,
		UpdatedAt:  subscription.UpdatedAt,
	})
}

func (h *SubscriptionHandler) UpdateStatus(c *gin.Context) {
	entityID := c.Param("entityId")

	var req requests.UpdateSubscriptionStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "active is required"})
		return
	}

	userID := c.GetInt(middlewares.UserIDKey)
	subscription, err := h.updateStatusUseCase.Execute(c.Request.Context(), userID, entityID, *req.Active)
	if err != nil {
		status := h.mapErrorToStatus(err)
		c.JSON(status, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, responses.SubscriptionResponse{
		EntityID:   subscription.EntityID,
		ProviderID: subscription.ProviderID,
		Active:     subscription.Active,
		CreatedAt:  subscription.CreatedAt,
		UpdatedAt:  subscription.UpdatedAt,
	})
}

func (h *SubscriptionHandler) mapErrorToStatus(err error) int {
	for sentinel, status := range subscriptionErrorStatusMap {
		if errors.Is(err, sentinel) {
			return status
		}
	}
	return http.StatusInternalServerError
}
