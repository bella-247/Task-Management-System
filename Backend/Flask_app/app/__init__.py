from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.config import SQLALCHEMY_DATABASE_URI, JWT_SECRET_KEY
from flask_migrate import Migrate
from datetime import timedelta

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)  # 1 day expiration
    # app.config['PROPAGATE_EXCEPTIONS'] = True
    app.config['DEBUG'] = True
    app.config['ENV'] = 'development'

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app = app, db = db)
    CORS(app)

    @app.errorhandler(422)
    def handle_unprocessable_entity(err):
        # Add debugging
        print("422 Error:", str(err))
        return jsonify({"message": "Invalid request data", "error": str(err)}), 422

    @jwt.invalid_token_loader
    def invalid_token_callback(error_string):
        print("Invalid token:", error_string)
        return jsonify({
            'message': 'Invalid token',
            'error': error_string
        }), 422

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        print("Expired token:", jwt_payload)
        return jsonify({
            'message': 'Token has expired',
            'error': 'token_expired'
        }), 401

    @app.route('/health')
    def health_check():
        return jsonify({"status": "healthy"}), 200

    from app.routes import main
    from app.routes.auth_routes import auth_bp
    from app.routes.task_routes import task_bp

    app.register_blueprint(auth_bp, url_prefix = "/auth")
    app.register_blueprint(task_bp, url_prefix="/tasks")
    app.register_blueprint(main)
    
    return app
