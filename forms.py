from flask_wtf import FlaskForm
from wtforms import StringField, validators

class MyForm(FlaskForm):
    name = StringField("Your name", [validators.InputRequired()])
    email = StringField("Email", [
        validators.InputRequired(),
        validators.Email()
    ])
    message = StringField("Message", [validators.InputRequired()])
