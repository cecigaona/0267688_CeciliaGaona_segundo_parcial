package main

import (
	"net/http"
	"yourproject/database"
	"yourproject/routes"
	"yourproject/seeder"

	"github.com/gin-gonic/gin"
)

// CORSMiddleware: dar acceso a ciertas personas con ciertos permisos
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func main() {
	database.InitDB()

	// seed base con los datos
	seeder.SeedDatabase()

	r := gin.Default()

	// Use our custom CORS middleware
	r.Use(CORSMiddleware())

	routes.SetupRoutes(r)
	r.Run()
}
