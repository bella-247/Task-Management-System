from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.config import SQLALCHEMY_DATABASE_URI, JWT_SECRET_KEY
from flask_migrate import Migrate

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
    app.config['PROPAGATE_EXCEPTIONS'] = True

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app = app, db = db)
    CORS(app)

    from app.routes import main
    from app.routes.auth_routes import auth_bp
    from app.routes.task_routes import task_bp

    app.register_blueprint(auth_bp, url_prefix = "/auth")
    app.register_blueprint(task_bp, url_prefix="/tasks")
    app.register_blueprint(main)
    return app
