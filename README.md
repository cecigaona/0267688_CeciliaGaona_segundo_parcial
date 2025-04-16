# Examen Final – Sistema de Monitoreo de Salud

Este proyecto está dividido en dos partes:

---

## 🧩 Parte 1: Integración con Godot

La primera parte del proyecto se centra en la integración con el motor de videojuegos **Godot**. Dentro de esta sección encontrarás un archivo llamado `extra.Dockerfile`, el cual ha sido diseñado para compilar exitosamente el siguiente proyecto de la Asset Library oficial de Godot:

🔗 https://godotengine.org/asset-library/asset/540

Este contenedor Docker garantiza que el proyecto puede ejecutarse de manera aislada y reproducible en cualquier entorno compatible.

---

## ⚙️ Parte 2: Backend y Frontend con Go, PostgreSQL y React

La segunda parte del examen consiste en una arquitectura completa compuesta por:

- 🔙 **Backend**: API desarrollada en **Go**, conectada a una base de datos **PostgreSQL**.
- 🗃️ **Base de Datos**: PostgreSQL con esquema para usuarios y datos de salud.
- 💻 **Frontend**: Interfaz web construida con **React** que permite la visualización y gestión de la información.

Al iniciar la base de datos, se ejecuta un seeding automático que crea tres usuarios con información de salud:

### 👤 Usuarios de Prueba

| Usuario        | Contraseña   | Nombre         | Edad | Estatura (cm) | Peso (kg) | Género      |
|----------------|--------------|----------------|------|----------------|-----------|-------------|
| healthuser     | password123  | John Doe       | 30   | 180.5          | 75.8      | Male        |
| fitnessuser    | password123  | Jane Smith     | 28   | 165.0          | 62.5      | Female      |
| wellnessuser   | password123  | Alex Johnson   | 35   | 175.0          | 70.2      | Non-binary  |



