package controllers

import (
    "net/http"
    "yourproject/database"
    "yourproject/models"

    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
    var body struct {
        Username string
        Password string
    }

    if err := c.ShouldBindJSON(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    hash, _ := bcrypt.GenerateFromPassword([]byte(body.Password), 14)

    user := models.User{Username: body.Username, Password: string(hash)}
    result := database.DB.Create(&user)

    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Could not create user"})
        return
    }
    
    // Create initial UserData record
    userData := models.UserData{
        UserID: user.ID,
        Nombre: body.Username, // Default name is username
        Edad: 0,
        Estatura: 0,
        Peso: 0,
        Genero: "",
    }
    database.DB.Create(&userData)

    c.JSON(http.StatusOK, gin.H{"message": "User created"})
}

func Login(c *gin.Context) {
    var body struct {
        Username string
        Password string
    }

    if err := c.ShouldBindJSON(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    var user models.User
    result := database.DB.Where("username = ?", body.Username).First(&user)
    
    // Check if user exists
    if result.Error != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    // Verify password
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "message": "Logged in",
        "user_id": user.ID,
    })
}

func UpdateUserData(c *gin.Context) {
    var body models.UserData

    if err := c.ShouldBindJSON(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    var user models.User
    if err := database.DB.First(&user, body.UserID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    database.DB.Where("user_id = ?", body.UserID).Delete(&models.UserData{})
    database.DB.Create(&body)

    c.JSON(http.StatusOK, gin.H{"message": "User data updated"})
}

func GetUserData(c *gin.Context) {
    id := c.Param("id")

    var data models.UserData
    if err := database.DB.Where("user_id = ?", id).First(&data).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "No data found"})
        return
    }

    c.JSON(http.StatusOK, data)
}
