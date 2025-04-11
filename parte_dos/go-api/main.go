package main

import (
    "github.com/gin-gonic/gin"
    "yourproject/database"
    "yourproject/routes"
)

func main() {
    database.InitDB()

    r := gin.Default()
    routes.SetupRoutes(r)
    r.Run() // default is localhost:8080
}
