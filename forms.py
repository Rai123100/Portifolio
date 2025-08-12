from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, PasswordField, BooleanField, SelectField, DateField
from wtforms.validators import DataRequired, Email, Length, EqualTo, Optional, URL
from wtforms.widgets import TextArea

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')

class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=3, max=20)])
    full_name = StringField('Full Name', validators=[DataRequired(), Length(min=2, max=100)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    password2 = PasswordField('Confirm Password', 
                             validators=[DataRequired(), EqualTo('password')])
    profile_image = FileField('Profile Image', 
                             validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif'], 'Images only!')])

class ProjectForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=200)])
    short_description = TextAreaField('Short Description', 
                                    validators=[DataRequired(), Length(max=300)])
    description = TextAreaField('Description', validators=[DataRequired()])
    image = FileField('Project Image', 
                     validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif'], 'Images only!')])
    demo_link = StringField('Demo Link', validators=[Optional(), URL()])
    github_link = StringField('GitHub Link', validators=[Optional(), URL()])
    tags = StringField('Tags (comma separated)', validators=[Optional()])
    is_published = BooleanField('Publish')
    featured = BooleanField('Featured')

class CommentForm(FlaskForm):
    content = TextAreaField('Comment', validators=[DataRequired(), Length(min=1, max=500)])

class AchievementForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=200)])
    description = TextAreaField('Description', validators=[DataRequired()])
    icon = SelectField('Icon', choices=[
        ('trophy', 'Trophy'),
        ('medal', 'Medal'),
        ('award', 'Award'),
        ('star', 'Star'),
        ('rocket', 'Rocket'),
        ('globe', 'Globe')
    ])
    date_achieved = DateField('Date Achieved', validators=[Optional()])
    is_published = BooleanField('Publish')

class ProfileForm(FlaskForm):
    full_name = StringField('Full Name', validators=[DataRequired(), Length(min=2, max=100)])
    profile_image = FileField('Profile Image', 
                             validators=[FileAllowed(['jpg', 'png', 'jpeg', 'gif'], 'Images only!')])
