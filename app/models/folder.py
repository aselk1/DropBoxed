from .db import db, environment, SCHEMA, add_prefix_for_prod
from .folder_files import folder_files
from flask_login import current_user


user_folder = db.Table(
    "user_folder",
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("folder_id", db.Integer, db.ForeignKey(add_prefix_for_prod("folders.id")), primary_key=True)
)

if environment == "production":
    user_folder.schema = SCHEMA


class Folder(db.Model):
    __tablename__ = "folders"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    private = db.Column(db.Boolean(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    files = db.relationship(
        "File",
        secondary=folder_files,
        back_populates="folders"
    )

    users = db.relationship(
        "User",
        secondary=user_folder,
        back_populates="folders"
    )


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "private": self.private,
            "user_id": self.user_id,
            "files": [file.to_dict() for file in self.files if file.private == False or file.user_id == current_user.id or current_user.id in [user.to_dict().id for user in file.users]],
            "users": [user.to_dict() for user in self.users]
        }
