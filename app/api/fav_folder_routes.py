from flask import Blueprint, jsonify, session, request
import json
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3)
from app.models import File, Folder, db, User
from app.models.folder import user_folder
from app.forms import FileForm


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

fav_folder_routes = Blueprint('fav_folder', __name__)

@fav_folder_routes.route('/<int:folder_id>', methods=['POST'])
@login_required
def post_fav_folder(folder_id):
    folder = Folder.query.get(folder_id)
    current_user.fav_folders.append(folder)
    db.session.add(current_user)
    db.session.commit()
    return current_user.to_dict()

@fav_folder_routes.route('/<int:folder_id>', methods=['DELETE'])
@login_required
def delete_fav_folder(folder_id):
    folder = Folder.query.get(folder_id)
    current_user.fav_folders.remove(folder)
    db.session.add(current_user)
    db.session.commit()
    return current_user.to_dict()
