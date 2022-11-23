from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import File, db
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

@file_routes.route('/')
@login_required
def get_files():
    files = File.query.all()
    return {'files': [file.to_dict() for file in files]}

@file_routes.route('/', methods=['POST'])
@login_required
def post_file():
    form = FileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        file = File(
            name=form.data['name'],
            desc=form.data['desc'],
            file_url=form.data['file_url'],
            private=form.data['private'],
            user_id=current_user.id
        )
        db.session.add(file)
        db.session.commit()
        return file.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
