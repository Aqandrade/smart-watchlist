package routes

import (
	"github.com/gin-gonic/gin"

	appsetup "github.com/Aqandrade/smart-watchlist/config/application"
)

func SetupRoutes(router *gin.Engine, container *appsetup.Container) {
	v1 := router.Group("/v1")

	v1.POST("/watchlist", container.WatchlistHandler.AddMovie)
	v1.GET("/watchlist", container.WatchlistHandler.List)
	v1.GET("/movies/search", container.MovieHandler.Search)
}
