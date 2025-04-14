package database

import (
	"fmt"
	"os"
	"time"

	"yourproject/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	var err error
	for i := 0; i < 10; i++ {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		fmt.Printf("Waiting for DB... (%d/10): %v\n", i+1, err)
		time.Sleep(2 * time.Second)
	}

	if err != nil {
		panic("Failed to connect to database!")
	}

	DB.AutoMigrate(&models.User{}, &models.UserData{})
}
