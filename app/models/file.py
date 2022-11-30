from .db import db, environment, SCHEMA, add_prefix_for_prod
from .folder_files import folder_files


class File(db.Model):
    __tablename__ = "files"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    desc = db.Column(db.String(160))
    file_url = db.Column(db.String(), nullable=False)
    private = db.Column(db.Boolean(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    folders = db.relationship(
        "Folder",
        secondary=folder_files,
        back_populates="files",
        # backref="files"
    )


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "desc": self.desc,
            "file_url": self.file_url,
            "private": self.private,
            "user_id": self.user_id,
        }
