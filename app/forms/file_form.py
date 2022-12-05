from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import File





class FileForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired(), Length(max=60)])
    desc = StringField('desc',validators=[Length(max=160)])
    private = BooleanField('private', false_values=(0, '0', False, 'false'))
