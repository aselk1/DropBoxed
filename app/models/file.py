from .db import db, environment, SCHEMA, add_prefix_for_prod
from .folder_files import folder_files

user_file = db.Table(
    "user_file",
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("file_id", db.Integer, db.ForeignKey(add_prefix_for_prod("files.id")), primary_key=True)
)

if environment == "production":
    user_file.schema = SCHEMA


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

    users = db.relationship(
        "User",
        secondary=user_file,
        back_populates="files"
    )


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "desc": self.desc,
            "file_url": self.file_url,
            "private": self.private,
            "user_id": self.user_id,
            "users": [user.to_dict() for user in self.users]
        }
