from .db import db, environment, SCHEMA, add_prefix_for_prod
from .folder_files import folder_files
from .file import user_file, fav_file
from .folder import user_folder, fav_folder
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, current_user


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    files = db.relationship(
        "File",
        secondary=user_file,
        back_populates="users"
    )

    folders = db.relationship(
        "Folder",
        secondary=user_folder,
        back_populates="users"
    )

    fav_files = db.relationship(
        "File",
        secondary=fav_file,
        back_populates="fav_users"
    )

    fav_folders = db.relationship(
        "Folder",
        secondary=fav_folder,
        back_populates="fav_users"
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "fav_files": [file.to_dict() for file in self.fav_files if file.private == False or file.user_id == current_user.id or current_user.id in [user.to_dict().id for user in file.users]],
            "fav_folders": [folder.to_dict() for folder in self.fav_folders if folder.private == False or folder.user_id == current_user.id or current_user.id in [user.to_dict().id for user in folder.users]],
        }
