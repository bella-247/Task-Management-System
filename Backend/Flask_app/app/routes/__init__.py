from flask import Blueprint, request

main = Blueprint("main", __name__)

@main.route("/")
def greet():
    return "<h1>Welcome to Our website</h1>"