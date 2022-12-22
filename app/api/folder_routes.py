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


folder_routes = Blueprint('folders', __name__)

@folder_routes.route('')
@login_required
def get_folders():
    folders = Folder.query.filter(or_(Folder.private == False, Folder.user_id == current_user.id, Folder.users.contains(current_user)))
    folders2 = [folder.to_dict() for folder in folders]
    if len(folders2) < 1:
        folders = Folder.query.filter(or_(Folder.private == False, Folder.user_id == current_user.id))
    return {'folders': [folder.to_dict() for folder in folders]}

@folder_routes.route('', methods=['POST'])
@login_required
def post_folder():
    form = FileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        folder = Folder(
            name=form.data['name'],
            private=form.data['private'],
            user_id=current_user.id
        )
        db.session.add(folder)
        db.session.commit()
        return folder.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@folder_routes.route('/<int:id>')
@login_required
def get_folder(id):
    folder = Folder.query.get(id)
    if current_user.id != folder.id:
        if folder.private == True:
            return {"Error": "Folder is private."}
    return folder.to_dict()


@folder_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_folder(id):
    folder = Folder.query.get(id)
    if current_user.id == folder.user_id:
        form = FileForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            folder.name = form.data['name']
            folder.private = form.data['private']
            db.session.add(folder)
            db.session.commit()
            return folder.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

@folder_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_folder(id):
    folder = Folder.query.get(id)
    if current_user.id == folder.user_id:
        db.session.delete(folder)
        db.session.commit()
        return {"data": "deleted"}
    return {'errors': ['Unauthorized']}


@folder_routes.route('/<int:folder_id>/<int:user_id>', methods=['POST'])
@login_required
def post_folder_file(folder_id, user_id):
    folder = Folder.query.get(folder_id)
    user = User.query.get(user_id)
    if current_user.id == folder.user_id:
        folder.users.append(user)
        db.session.add(folder)
        db.session.commit()
        return folder.to_dict()
    return {'errors': ['Unauthorized']}

@folder_routes.route('/<int:folder_id>/<int:user_id>', methods=['DELETE'])
@login_required
def delete_folder_file(folder_id, user_id):
    folder = Folder.query.get(folder_id)
    user = User.query.get(user_id)
    if current_user.id == folder.user_id:
        folder.users.remove(user)
        db.session.add(folder)
        db.session.commit()
        return folder.to_dict()
    return {'errors': ['Unauthorized']}
