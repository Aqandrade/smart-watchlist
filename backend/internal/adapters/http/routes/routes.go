package routes

import (
	"github.com/gin-gonic/gin"

	appsetup "github.com/Aqandrade/smart-watchlist/config/application"
	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/middlewares"
)

func SetupRoutes(router *gin.Engine, container *appsetup.Container) {
	v1 := router.Group("/v1")

	auth := v1.Group("/auth")
	auth.POST("/register", container.AuthHandler.Register)
	auth.POST("/login", container.AuthHandler.Login)
	auth.POST("/refresh", container.AuthHandler.Refresh)
	auth.POST("/logout", container.AuthHandler.Logout)

	protected := v1.Group("")
	protected.Use(middlewares.Auth(container.TokenProvider))
	protected.POST("/watchlist", container.WatchlistHandler.AddMovie)
	protected.GET("/watchlist", container.WatchlistHandler.List)
	protected.PATCH("/watchlist/:watchlistItemId", container.WatchlistHandler.UpdateItemStatus)
	protected.DELETE("/watchlist/:watchlistItemId", container.WatchlistHandler.DeleteItem)
	protected.GET("/movies/search", container.MovieHandler.Search)
}
