# models.py
from sqlalchemy import Column, Integer, String, TIMESTAMP, text, LargeBinary
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    first_name = Column(String(50))
    last_name = Column(String(50))
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))

class Classroom(Base):
    __tablename__ = "classrooms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    created_by = Column(Integer)

class File(Base):
    __tablename__ = "files"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255))
    file_data = Column(LargeBinary)  # For storing binary file data
    uploaded_by = Column(Integer)
    classroom_id = Column(Integer)