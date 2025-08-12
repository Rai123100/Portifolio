import os
from flask import current_app
from flask_mail import Message
from app import mail

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    """Check if uploaded file has allowed extension"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def send_notification_email(subject, message):
    """Send notification email to admin"""
    try:
        msg = Message(
            subject=subject,
            recipients=["raicarvalho343@gmail.com"],
            body=message
        )
        mail.send(msg)
    except Exception as e:
        current_app.logger.error(f"Failed to send email: {str(e)}")

def generate_linkedin_share_url(project):
    """Generate LinkedIn share URL for project"""
    base_url = "https://www.linkedin.com/sharing/share-offsite/"
    project_url = f"https://your-domain.com/project/{project.id}"
    
    params = {
        'url': project_url,
        'title': project.title,
        'summary': project.short_description
    }
    
    return base_url + "?" + "&".join([f"{k}={v}" for k, v in params.items()])
