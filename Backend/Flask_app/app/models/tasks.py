from app import db
from sqlalchemy.orm import validates
from sqlalchemy import Enum

class Tasks(db.Model):
    __priorities = ["high", "medium", "low"]
    __statuses = ["Completed", "In progress", "Not started"]

    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(255), nullable = False)
    description = db.Column(db.Text, nullable = True)
    priority = db.Column(Enum(*__priorities, name = "priority_enum", native_enum = False), default = "medium", server_default = "medium", nullable = False )
    status = db.Column(Enum(*__statuses, name = 'status_enum', native_enum = False), default = "Not started", server_default = "Not started", nullable = False)
    due_date = db.Column(db.Date, nullable = False)
    reminder_time = db.Column(db.Date, nullable = True)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), server_onupdate = db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    @validates('title')
    def validate_title(self, key, title):
        if not title:
            raise AssertionError('Title cannot be blank')
        return title
    
    @validates("status")
    def validate_status(self, key, value):
        if value not in self.__statuses: # since passing this value is optional we need to check if it is not None before checking if it is in the list
            raise AssertionError(f"{key} must be one of {self.__statuses}")
        return value
    
    @validates("priority")
    def validate_priority(self, key, value):
        if value not in self.__priorities: 
            raise AssertionError(f"{key} must be one of {self.__priorities}")
        return value
    
    @validates('due_date')
    def validate_due_date(self, key, due_date):
        if not due_date:
            raise AssertionError('Due date cannot be blank')
        return due_date
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'priority': self.priority,
            'status': self.status,
            'due_date': self.due_date,
            'reminder_time': self.reminder_time,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def __repr__(self):
        return f"<Task {self.title}>"
    