import os
from dotenv import load_dotenv

load_dotenv()

# Database URI with a more secure fallback
SQLALCHEMY_DATABASE_URI = os.environ.get(
    "SQLALCHEMY_DATABASE_URI",
    "sqlite:///task_management.sqlite"  # Using the same fallback as in render.yaml
)

# Disable SQLAlchemy track modifications to improve performance
SQLALCHEMY_TRACK_MODIFICATIONS = False

# JWT secret key with the same secure key as in render.yaml and .env
JWT_SECRET_KEY = os.environ.get(
    'JWT_SECRET_KEY',
    "3-VUy%Ftb%oH7t8r]p^[&vA+{5e]SM!>mj'1ocANMU+nb?iqSx=dXWL1'r^4Ty"
)
