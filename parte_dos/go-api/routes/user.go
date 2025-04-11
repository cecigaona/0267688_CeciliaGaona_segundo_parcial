package routes

import (
    "github.com/gin-gonic/gin"
    "yourproject/controllers"
)

func SetupRoutes(router *gin.Engine) {
    router.GET("/health", controllers.HealthCheck)
    router.POST("/register", controllers.Register)
    router.POST("/login", controllers.Login)
    router.PUT("/user_data", controllers.UpdateUserData)
    router.GET("/user_data/:id", controllers.GetUserData)
}
