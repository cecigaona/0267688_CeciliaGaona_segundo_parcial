from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db import Base, User, UserData
import bcrypt

# Reemplaza los valores con tu configuración
DATABASE_URL = "postgresql://postgres:1234@localhost:5432/login_api"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Datos de ejemplo
username = "user2"
plain_password = "1234"

# Hashear la contraseña
hashed_password = bcrypt.hashpw(plain_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Crear usuario
new_user = User(username=username, password=hashed_password)
session.add(new_user)
session.commit()

# Crear datos personales para el usuario
user_data = UserData(
    user_id=new_user.id,
    edad=23,
    estatura=1.75,
    peso=68.5,
    nombre="Maria Alvarez",
    genero="Femenino"
)

session.add(user_data)
session.commit()

print(f"✔️ Usuario '{username}' insertado con ID {new_user.id}")
