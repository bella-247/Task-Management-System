from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.tasks import Tasks
from app import db

task_bp = Blueprint("tasks", __name__)

@task_bp.route("/", methods = ['POST'])
@jwt_required()
def add_task():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_task = Tasks(
        title = data['title'],
        description = data['description'],
        user_id = user_id
        )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        "task" : new_task.to_dict(),
        "message" : "Task added successfully"
    }), 201

@task_bp.route('/', methods = ["GET"])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Tasks.query.filter_by(user_id = user_id).all()
    return jsonify({
            "tasks" : [task.to_dict() for task in tasks],
            "message" : "Tasks found"
        }), 200


@task_bp.route('/<int:id>', methods = ["GET"])
@jwt_required()
def get_task(id):
    user_id = get_jwt_identity()
    task = Tasks.query.filter_by(user_id = user_id, id = id).first()
    if task:
        return jsonify({
            "task" : task.to_dict(), 
            "message" : "Task found"
            }), 200
    else:
        return jsonify({"message": "Task not found"}), 404
    

@task_bp.route('/<int:id>', methods = ["PUT"])
@jwt_required()
def update_task(id):
    user_id = get_jwt_identity()
    task = Tasks.query.filter_by(user_id = user_id, id = id).first()
    if task:
        data = request.get_json()
        task.title = data['title']
        task.description = data['description']
        task.isDone = data['isDone']

        db.session.commit()
        return jsonify({
                "task" : task.to_dict(),
                "message": "Task updated successfully"
            }), 200
    else:
        return jsonify({"message": "Task not found"}), 404
    
@task_bp.route('/<int:id>', methods = ["DELETE"])
@jwt_required()
def delete_task(id):
    user_id = get_jwt_identity()
    task = Tasks.query.filter_by(user_id = user_id, id = id).first()
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify(
            {
                "task" : task.to_dict(),
                "message": "Task deleted successfully"}
            ), 200
    else:
        return jsonify({"message": "Task not found"}), 404
    

