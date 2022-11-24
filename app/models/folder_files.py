from .db import db, environment, SCHEMA, add_prefix_for_prod

folder_files = db.Table(
    "folder_files",
    db.Column(
        "folder_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("folders.id")),
        primary_key=True
    ),
    db.Column(
        "file_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("files.id")),
        primary_key=True
    )
)

if environment == "production":
    folder_files.schema = SCHEMA
