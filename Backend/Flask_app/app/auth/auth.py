from flask_jwt_extended import create_access_token
from app.models.user import User
from sqlalchemy import or_
from app import db
from datetime import timedelta

def register_user(data):
    try:
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if field not in data:
                print(f"{field} is required")
                raise Exception(f"{field} is required")
            

        existing_user = User.query.filter(or_(User.email == data['email'],User.username == data['username'])).first()
        if existing_user:
            print("User already exists")
            raise Exception("User already exists")
        
        new_user = User(
            username = data['username'],
            email = data['email'],
        )
        new_user.password = data['password']

        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=str(new_user.id), expires_delta=timedelta(days=1))  # 1 day expiration

        return {
            "message": "User successfully registered",
            "access_token": access_token,
            "user" : new_user.to_dict()
        }, 201
    
    except Exception as e:
        db.session.rollback()
        print("Error : ", e)
        return {"message": str(e)}, 400


def login_user(data):
    try:
        filterBy = 'email' if '@' in data['email'] else 'username' 
        user = User.query.filter_by(**{filterBy: data['email']}).first()

        if user and user.check_password(data['password']):
                access_token = create_access_token(identity = str(user.id), expires_delta=timedelta(days=1))  # 1 day expiration

                return {
                    "access_token": access_token,
                    "message": "User successfully logged in",
                    "user" : user.to_dict()
                    }
        else:
            return {"message" : "Invalid Email or password"}, 404
        

    except Exception as e:
        print("Error : ", e)
        return {"message": str(e)}, 500
