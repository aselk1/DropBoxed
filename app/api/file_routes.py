from flask import Blueprint, jsonify, session, request
import json
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3, download_file_from_s3)
from app.models import File, db, User
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


file_routes = Blueprint('files', __name__)

@file_routes.route('')
@login_required
def get_files():
    files = File.query.filter(or_(File.private == False, File.user_id == current_user.id, File.users.contains(current_user)))
    files2 = [file.to_dict() for file in files]
    if len(files2) < 1:
        files = File.query.filter(or_(File.private == False, File.user_id == current_user.id))
    return {'files': [file.to_dict() for file in files]}

@file_routes.route('/<int:id>/download')
@login_required
def download_file(id):
    file = File.query.get(id)
    if current_user.id != file.id:
        if file.private == True:
            return {"Error": "File is private."}
    url = file.file_url.split(".com/")[1]
    data = download_file_from_s3(url)
    return {"data": data}
    # return {'files': [file.to_dict() for file in files]}

@file_routes.route('', methods=['POST'])
@login_required
def post_file():
    if "file" not in request.files:
        return {"errors": "file required"}, 400
    file = request.files["file"]
    # if not allowed_file(file.filename):
    #     return {"errors": "file type not permitted"}, 400
    file.filename = get_unique_filename(file.filename)
    form = FileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        upload = upload_file_to_s3(file)
        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
            return upload, 400
        url = upload["url"]
        file = File(
            name=form.data['name'],
            desc=form.data['desc'],
            file_url=url,
            private=form.data['private'],
            user_id=current_user.id
        )
        db.session.add(file)
        db.session.commit()
        return file.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@file_routes.route('/<int:id>')
@login_required
def get_file(id):
    file = File.query.get(id)
    if current_user.id != file.id:
        if file.private == True:
            return {"Error": "File is private."}
    return file.to_dict()


@file_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_file(id):
    new_file = None
    if "file" in request.files:
        new_file = request.files["file"]
        # if not allowed_file(new_file.filename):
        #     return {"errors": "file type not permitted"}, 400
        new_file.filename = get_unique_filename(new_file.filename)
    file = File.query.get(id)
    url = file.file_url
    if current_user.id == file.user_id:
        form = FileForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            if new_file:
                upload = upload_file_to_s3(new_file)
                if "url" not in upload:
                    return upload, 400
                deleted = delete_file_from_s3(file.file_url.split(".com/")[1])
                url = upload["url"]
            print(form.data['private'])
            file.name = form.data['name']
            file.desc = form.data['desc']
            file.private = form.data['private']
            file.file_url = url
            db.session.add(file)
            db.session.commit()
            return file.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

@file_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_file(id):
    file = File.query.get(id)
    if current_user.id == file.user_id:
        url = file.file_url.split(".com/")[1]
        data = delete_file_from_s3(url)
        db.session.delete(file)
        db.session.commit()
        return {"data": data}
    return {'errors': ['Unauthorized']}


@file_routes.route('/<int:file_id>/<int:user_id>', methods=['POST'])
@login_required
def post_folder_file(file_id, user_id):
    file = File.query.get(file_id)
    user = User.query.get(user_id)
    if current_user.id == file.user_id:
        file.users.append(user)
        db.session.add(file)
        db.session.commit()
        return file.to_dict()
    return {'errors': ['Unauthorized']}

@file_routes.route('/<int:file_id>/<int:user_id>', methods=['DELETE'])
@login_required
def delete_folder_file(file_id, user_id):
    file = File.query.get(file_id)
    user = User.query.get(user_id)
    if current_user.id == file.user_id:
        file.users.remove(user)
        db.session.add(file)
        db.session.commit()
        return file.to_dict()
    return {'errors': ['Unauthorized']}
