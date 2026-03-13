package routes

import (
	"github.com/gin-gonic/gin"

	appsetup "github.com/Aqandrade/smart-watchlist/config/application"
)

func SetupRoutes(router *gin.Engine, container *appsetup.Container) {
	_ = router.Group("/v1")
}
