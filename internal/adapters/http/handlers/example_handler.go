package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/requests"
	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/responses"
	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
)

type ExampleHandler struct {
	addExample *usecases.AddExampleUseCase
}

func NewExampleHandler(addExample *usecases.AddExampleUseCase) *ExampleHandler {
	return &ExampleHandler{addExample: addExample}
}

func (h *ExampleHandler) Create(c *gin.Context) {
	var req requests.CreateExampleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	example, err := h.addExample.Execute(c.Request.Context(), req.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create example"})
		return
	}

	c.JSON(http.StatusCreated, responses.ToExampleResponse(example))
}
