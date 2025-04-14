package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "yourproject/database"
    "yourproject/routes"
    "yourproject/seeder"
)

// CORSMiddleware implements a custom CORS middleware
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
    
    // Seed the database with test data
    seeder.SeedDatabase()

    r := gin.Default()
    
    // Use our custom CORS middleware
    r.Use(CORSMiddleware())
    
    routes.SetupRoutes(r)
    r.Run() // default is localhost:8080
}
