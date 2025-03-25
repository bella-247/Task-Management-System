from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.tasks import Tasks
from app import db

task_bp = Blueprint("tasks", __name__)

@task_bp.route('', methods = ["GET"])
@jwt_required()
def get_tasks():
    try:
        # Add debugging
        print("Authorization header:", request.headers.get('Authorization'))
        
        user_id = get_jwt_identity()
        print("User ID from token:", user_id)
        
        tasks = Tasks.query.filter_by(user_id = user_id).all()
        return jsonify({
            "tasks" : [task.to_dict() for task in tasks],
            "message" : "Tasks found"
        }), 200
    
    except Exception as e:
        print("Error in get_tasks:", str(e))
        return jsonify({"message": "Tasks not found"}), 404


@task_bp.route("", methods = ['POST'])
@jwt_required()
def add_task():
    try:
        print("started to add the data")
        data = request.get_json()
        print(data)
        user_id = get_jwt_identity()

        del data['id']
        del data['due_time']

        new_task = Tasks(**data, user_id = user_id)

        db.session.add(new_task)
        db.session.commit()

        return jsonify({
            "task" : new_task.to_dict(),
            "message" : "Task added successfully"
        }), 201

    except Exception as e:
        db.session.rollback()
        print(str(e))
        return jsonify({"message": "Task not added" + str(e),}), 400


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
    print("updating tasks..")
    user_id = get_jwt_identity()
    task = Tasks.query.filter_by(user_id = user_id, id = id).first()
    if task:
        data = request.get_json()
        for key, value in data.items():
            if hasattr(task, key):
                setattr(task, key, value)
        

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
