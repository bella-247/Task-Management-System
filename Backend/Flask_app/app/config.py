import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URI =  os.environ.get("SQLALCHEMY_DATABASE_URI", "idon't know the password")
SQLALCHEMY_TRACK_MODIFICATIONS = False
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'supersecretkey')
