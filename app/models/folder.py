from .db import db, environment, SCHEMA, add_prefix_for_prod
from .folder_files import folder_files


class Folder(db.Model):
    __tablename__ = "folders"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    private = db.Column(db.Boolean(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    files = db.relationship(
        "File",
        secondary=folder_files,
        back_populates="folders"
    )


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "private": self.private,
            "user_id": self.user_id
        }
