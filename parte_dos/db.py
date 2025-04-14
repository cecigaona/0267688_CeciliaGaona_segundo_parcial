from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DECIMAL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

# Reemplaza los valores con tus credenciales de PostgreSQL
DATABASE_URL = "postgresql://postgres:1234@localhost:5432/login_api"

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)  # Guardarás el hash

    data = relationship("UserData", back_populates="user", uselist=False)

class UserData(Base):
    __tablename__ = 'user_data'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    edad = Column(Integer)
    estatura = Column(DECIMAL(5, 2))
    peso = Column(DECIMAL(5, 2))
    nombre = Column(String(100))
    genero = Column(String(10))

    user = relationship("User", back_populates="data")


def init_db():
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)
    print("✔️ Tablas creadas exitosamente.")

if __name__ == "__main__":
    init_db()