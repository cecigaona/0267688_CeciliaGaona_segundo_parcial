package seeder

import (
	"log"
	"yourproject/database"
	"yourproject/models"

	"golang.org/x/crypto/bcrypt"
)

// datos iniciales
func SeedDatabase() {
	// Create users with health data
	seedUser("healthuser", "password123", "John Doe", 30, 180.5, 75.8, "Male")
	seedUser("fitnessuser", "password123", "Jane Smith", 28, 165.0, 62.5, "Female")
	seedUser("wellnessuser", "password123", "Alex Johnson", 35, 175.0, 70.2, "Non-binary")

	log.Println("✅ Database seeded successfully")
}

// inserta la info
func seedUser(username, password, name string, age int, height, weight float64, gender string) {
	var existingUser models.User
	result := database.DB.Where("username = ?", username).First(&existingUser)
	if result.RowsAffected > 0 {
		log.Printf("User %s already exists, skipping...\n", username)
		return
	}

	// hash contraseña
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Printf("Error hashing password for user %s: %v\n", username, err)
		return
	}

	// crear usuario
	user := models.User{
		Username: username,
		Password: string(hashedPassword),
	}

	if err := database.DB.Create(&user).Error; err != nil {
		log.Printf("Error creating user %s: %v\n", username, err)
		return
	}

	// crear info
	userData := models.UserData{
		UserID:   user.ID,
		Nombre:   name,
		Edad:     age,
		Estatura: height,
		Peso:     weight,
		Genero:   gender,
	}

	if err := database.DB.Create(&userData).Error; err != nil {
		log.Printf("Error creating health data for user %s: %v\n", username, err)
		return
	}

	log.Printf("Created user %s with ID %d and health data\n", username, user.ID)
}
