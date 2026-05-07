package routes

import (
	"github.com/gin-gonic/gin"

	appsetup "github.com/Aqandrade/smart-watchlist/config/application"
	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/middlewares"
)

func SetupRoutes(router *gin.Engine, container *appsetup.Container) {
	v1 := router.Group("/v1")

	setAuthRoutes(v1, container)

	protected := v1.Group("")
	protected.Use(middlewares.Auth(container.TokenProvider))

	setWatchlistRoutes(protected, container)
	setMovieRoutes(protected, container)
	setSubscriptionRoutes(protected, container)
}

func setAuthRoutes(v1 *gin.RouterGroup, container *appsetup.Container) {
	auth := v1.Group("/auth")
	auth.POST("/register", container.AuthHandler.Register)
	auth.POST("/login", container.AuthHandler.Login)
	auth.POST("/refresh", container.AuthHandler.Refresh)
	auth.POST("/logout", container.AuthHandler.Logout)
}

func setWatchlistRoutes(protected *gin.RouterGroup, container *appsetup.Container) {
	protected.POST("/watchlist", container.WatchlistHandler.AddMovie)
	protected.GET("/watchlist", container.WatchlistHandler.List)
	protected.PATCH("/watchlist/:watchlistItemId", container.WatchlistHandler.UpdateItemStatus)
	protected.DELETE("/watchlist/:watchlistItemId", container.WatchlistHandler.DeleteItem)
}

func setMovieRoutes(protected *gin.RouterGroup, container *appsetup.Container) {
	protected.GET("/movies/search", container.MovieHandler.Search)
}

func setSubscriptionRoutes(protected *gin.RouterGroup, container *appsetup.Container) {
	protected.GET("/subscriptions", container.SubscriptionHandler.List)
	protected.POST("/subscriptions", container.SubscriptionHandler.Add)
	protected.PATCH("/subscriptions/:entityId", container.SubscriptionHandler.UpdateStatus)
}
