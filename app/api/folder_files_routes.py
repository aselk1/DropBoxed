from flask import Blueprint, jsonify, session, request
import json
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3)
from app.models import File, Folder, db
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


folder_files_routes = Blueprint('folder_files', __name__)


@folder_files_routes.route('/<int:folder_id>/<int:file_id>', methods=['POST'])
@login_required
def post_folder(folder_id, file_id):
    folder = Folder.query.get(folder_id)
    file = File.query.get(file_id)
    print(file)
    if current_user.id == folder.user_id:
        folder.files.append(file)
        db.session.add(folder)
        db.session.commit()
        return folder.to_dict()
    return {'errors': ['Unauthorized']}


# @folder_files_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_folder(id):
#     folder = Folder.query.get(id)
#     if current_user.id == folder.user_id:
#         db.session.delete(folder)
#         db.session.commit()
#         return {"data": "deleted"}
#     return {'errors': ['Unauthorized']}
