from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import File


class FileForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired()])
    desc = StringField('desc')
    private = BooleanField('private', validators=[DataRequired()])
