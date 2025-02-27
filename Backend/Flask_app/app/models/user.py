import re
from app import db
from sqlalchemy.orm import validates, backref
from sqlalchemy.ext.hybrid import hybrid_property
from app import bcrypt

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    _password_hash = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    tasks = db.relationship("Tasks", backref = backref("user", lazy = 'joined'), lazy = "dynamic")

    @validates('username')
    def validate_username(self, key, username):
        username = username.strip()
        if not username:
            raise ValueError('Username cannot be blank')
        elif len(username) < 3:
            raise ValueError('Username must be at least 5 characters long')
        return username

    @validates('email')
    def validate_email(self, key, email):
        pattern = r"^[a-zA-Z0-9+%$*_&-.#,]{5,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if not email:
            raise ValueError('Email cannot be blank')
        elif not re.match(pattern, email):
            raise ValueError('Provided email is not a valid email address')
        return email

    @hybrid_property
    def password(self):
        """Prevent direct access to password."""
        raise AttributeError('Password is not a readable attribute')

    @password.setter
    def password(self, password):
        """Validate and hash the password before storing."""
        pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+!~]).{8,}$"
        if not password:
            raise ValueError('Password cannot be blank')
        elif not re.match(pattern, password):
            raise ValueError(
                'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, '
                '1 special character, and be at least 8 characters long'
            )
        # Store the hashed password as a decoded UTF-8 string
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        if password is not None:
            password = password.strip()
        return password is not None and bcrypt.check_password_hash(self._password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at,
            'profile_picture': self.profile_picture
        }


    def __repr__(self):
        return f"<User {self.username}>"
