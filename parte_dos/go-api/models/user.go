package models

import "gorm.io/gorm"

type User struct {
    gorm.Model
    Username string    `gorm:"unique;not null"`
    Password string    `gorm:"not null"`
    Data     UserData  `gorm:"constraint:OnDelete:CASCADE;"`
}

type UserData struct {
    gorm.Model
    UserID   uint    `gorm:"not null"`
    Edad     int
    Estatura float64
    Peso     float64
    Nombre   string
    Genero   string
}
