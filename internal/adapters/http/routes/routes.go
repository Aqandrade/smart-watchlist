package routes

import (
	"github.com/gin-gonic/gin"

	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/handlers"
)

func SetupRoutes(router *gin.Engine, exampleHandler *handlers.ExampleHandler) {
	api := router.Group("/v1")
	{
		api.POST("/examples", exampleHandler.Create)
	}
}
