from flask import Blueprint, request, jsonify
from app.auth.auth import register_user, login_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        print("Recieved data : ", data)
        response = register_user(data)
        return response
    except Exception as e:
        print("Error : ", e)
        return jsonify({"error": "Registration failed"}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        response = login_user(data)
        return response
    except Exception as e:
        print("Error : ", e)
        return jsonify({"error": "Login failed"}), 500