import os
from flask import render_template, request, redirect, url_for, flash, session, jsonify, current_app
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from datetime import datetime
import uuid

from app import db
from models import User, Project, Comment, Like, Achievement
from forms import LoginForm, RegisterForm, ProjectForm, CommentForm, AchievementForm, ProfileForm
from utils import allowed_file, send_notification_email

def register_routes(app):
    
    @app.route('/')
    def index():
        """Homepage with featured projects and recent achievements"""
        featured_projects = Project.query.filter_by(is_published=True, featured=True).limit(3).all()
        recent_projects = Project.query.filter_by(is_published=True).order_by(Project.created_at.desc()).limit(6).all()
        achievements = Achievement.query.filter_by(is_published=True).order_by(Achievement.date_achieved.desc()).limit(4).all()
        
        return render_template('index.html', 
                             featured_projects=featured_projects,
                             recent_projects=recent_projects,
                             achievements=achievements)
    
    @app.route('/about')
    def about():
        """About me page"""
        return render_template('about.html')
    
    @app.route('/projects')
    def projects():
        """Projects listing page"""
        page = request.args.get('page', 1, type=int)
        tag = request.args.get('tag', '')
        
        query = Project.query.filter_by(is_published=True)
        
        if tag:
            query = query.filter(Project.tags.contains(tag))
        
        projects = query.order_by(Project.created_at.desc()).paginate(
            page=page, per_page=9, error_out=False)
        
        # Get all unique tags
        all_projects = Project.query.filter_by(is_published=True).all()
        all_tags = set()
        for project in all_projects:
            all_tags.update(project.tag_list)
        
        # Get user liked projects if logged in
        user_liked_projects = []
        if 'user_id' in session:
            user_likes = Like.query.filter_by(user_id=session['user_id']).all()
            user_liked_projects = [like.project_id for like in user_likes]
        
        return render_template('projects.html', 
                             projects=projects, 
                             all_tags=sorted(all_tags),
                             current_tag=tag,
                             user_liked_projects=user_liked_projects)
    
    @app.route('/project/<int:project_id>')
    def project_detail(project_id):
        """Individual project detail page"""
        project = Project.query.get_or_404(project_id)
        if not project.is_published:
            flash('Project not found.', 'error')
            return redirect(url_for('projects'))
        
        comments = Comment.query.filter_by(project_id=project_id).order_by(Comment.created_at.desc()).all()
        user_liked = False
        
        if 'user_id' in session:
            user_liked = Like.query.filter_by(user_id=session['user_id'], project_id=project_id).first() is not None
        
        comment_form = CommentForm()
        
        return render_template('project_detail.html', 
                             project=project, 
                             comments=comments,
                             user_liked=user_liked,
                             comment_form=comment_form)
    
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        """User login"""
        if 'user_id' in session:
            return redirect(url_for('index'))
        
        form = LoginForm()
        
        if form.validate_on_submit():
            user = User.query.filter_by(email=form.email.data).first()
            
            if user and user.check_password(form.password.data):
                session['user_id'] = user.id
                session['username'] = user.username
                session['is_admin'] = user.is_admin
                
                flash(f'Welcome back, {user.full_name}!', 'success')
                
                if user.is_admin:
                    return redirect(url_for('admin_dashboard'))
                return redirect(url_for('index'))
            else:
                flash('Invalid email or password.', 'error')
        
        return render_template('login.html', form=form)
    
    @app.route('/register', methods=['GET', 'POST'])
    def register():
        """User registration"""
        if 'user_id' in session:
            return redirect(url_for('index'))
        
        form = RegisterForm()
        
        if form.validate_on_submit():
            # Check if user already exists
            if User.query.filter_by(username=form.username.data).first():
                flash('Username already taken.', 'error')
                return render_template('register.html', form=form)
            
            if User.query.filter_by(email=form.email.data).first():
                flash('Email already registered.', 'error')
                return render_template('register.html', form=form)
            
            # Handle profile image upload
            profile_image = 'default-avatar.svg'
            if form.profile_image.data:
                file = form.profile_image.data
                if allowed_file(file.filename):
                    filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                    file.save(file_path)
                    profile_image = filename
            
            # Create new user
            user = User()
            user.username = form.username.data
            user.full_name = form.full_name.data
            user.email = form.email.data
            user.profile_image = profile_image
            user.set_password(form.password.data)
            
            db.session.add(user)
            db.session.commit()
            
            flash('Registration successful! Please log in.', 'success')
            return redirect(url_for('login'))
        
        return render_template('register.html', form=form)
    
    @app.route('/logout')
    def logout():
        """User logout"""
        session.clear()
        flash('You have been logged out.', 'info')
        return redirect(url_for('index'))
    
    @app.route('/profile', methods=['GET', 'POST'])
    def profile():
        """User profile page"""
        if 'user_id' not in session:
            flash('Please log in to view your profile.', 'error')
            return redirect(url_for('login'))
        
        user = User.query.get(session['user_id'])
        if not user:
            flash('User not found.', 'error')
            return redirect(url_for('logout'))
            
        form = ProfileForm(obj=user)
        
        if form.validate_on_submit():
            user.full_name = form.full_name.data
            
            # Handle profile image upload
            if form.profile_image.data:
                file = form.profile_image.data
                if allowed_file(file.filename):
                    filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                    file.save(file_path)
                    user.profile_image = filename
            
            db.session.commit()
            flash('Profile updated successfully!', 'success')
            return redirect(url_for('profile'))
        
        return render_template('profile.html', form=form, user=user)
    
    @app.route('/like/<int:project_id>', methods=['POST'])
    def toggle_like(project_id):
        """Toggle like for a project"""
        if 'user_id' not in session:
            return jsonify({'error': 'Login required'}), 401
        
        project = Project.query.get_or_404(project_id)
        existing_like = Like.query.filter_by(user_id=session['user_id'], project_id=project_id).first()
        
        if existing_like:
            db.session.delete(existing_like)
            liked = False
        else:
            like = Like()
            like.user_id = session['user_id']
            like.project_id = project_id
            db.session.add(like)
            liked = True
        
        db.session.commit()
        
        return jsonify({
            'liked': liked,
            'like_count': project.like_count
        })
    
    @app.route('/comment/<int:project_id>', methods=['POST'])
    def add_comment(project_id):
        """Add comment to a project"""
        if 'user_id' not in session:
            flash('Please log in to comment.', 'error')
            return redirect(url_for('login'))
        
        form = CommentForm()
        project = Project.query.get_or_404(project_id)
        
        if form.validate_on_submit():
            comment = Comment()
            comment.content = form.content.data
            comment.user_id = session['user_id']
            comment.project_id = project_id
            db.session.add(comment)
            db.session.commit()
            
            # Send notification email to admin
            comment_user = User.query.get(session['user_id'])
            if comment_user:
                send_notification_email(
                    f"New comment on '{project.title}'",
                    f"{comment_user.full_name} commented: {form.content.data}"
                )
            
            flash('Comment added successfully!', 'success')
        
        return redirect(url_for('project_detail', project_id=project_id))
    
    # Admin Routes
    @app.route('/admin')
    def admin_dashboard():
        """Admin dashboard"""
        if 'user_id' not in session or not session.get('is_admin'):
            flash('Access denied.', 'error')
            return redirect(url_for('login'))
        
        total_projects = Project.query.count()
        published_projects = Project.query.filter_by(is_published=True).count()
        total_users = User.query.count()
        total_comments = Comment.query.count()
        
        recent_comments = Comment.query.order_by(Comment.created_at.desc()).limit(5).all()
        
        return render_template('admin/dashboard.html',
                             total_projects=total_projects,
                             published_projects=published_projects,
                             total_users=total_users,
                             total_comments=total_comments,
                             recent_comments=recent_comments)
    
    @app.route('/admin/projects')
    def admin_projects():
        """Admin projects management"""
        if 'user_id' not in session or not session.get('is_admin'):
            flash('Access denied.', 'error')
            return redirect(url_for('login'))
        
        page = request.args.get('page', 1, type=int)
        projects = Project.query.order_by(Project.created_at.desc()).paginate(
            page=page, per_page=10, error_out=False)
        
        return render_template('admin/projects.html', projects=projects)
    
    @app.route('/admin/project/new', methods=['GET', 'POST'])
    @app.route('/admin/project/<int:project_id>/edit', methods=['GET', 'POST'])
    def admin_project_form(project_id=None):
        """Admin project form (create/edit)"""
        if 'user_id' not in session or not session.get('is_admin'):
            flash('Access denied.', 'error')
            return redirect(url_for('login'))
        
        project = Project.query.get(project_id) if project_id else None
        form = ProjectForm(obj=project)
        
        if form.validate_on_submit():
            if not project:
                project = Project()
            
            project.title = form.title.data
            project.short_description = form.short_description.data
            project.description = form.description.data
            project.demo_link = form.demo_link.data
            project.github_link = form.github_link.data
            project.tags = form.tags.data
            project.is_published = form.is_published.data
            project.featured = form.featured.data
            
            # Handle image upload
            if form.image.data and hasattr(form.image.data, 'filename'):
                file = form.image.data
                if allowed_file(file.filename):
                    filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                    file.save(file_path)
                    project.image = filename
            
            if not project_id:
                db.session.add(project)
                flash('Project created successfully!', 'success')
            else:
                flash('Project updated successfully!', 'success')
            
            db.session.commit()
            return redirect(url_for('admin_projects'))
        
        return render_template('admin/project_form.html', form=form, project=project)
    
    @app.route('/admin/project/<int:project_id>/delete', methods=['POST'])
    def admin_delete_project(project_id):
        """Admin delete project"""
        if 'user_id' not in session or not session.get('is_admin'):
            flash('Access denied.', 'error')
            return redirect(url_for('login'))
        
        project = Project.query.get_or_404(project_id)
        db.session.delete(project)
        db.session.commit()
        
        flash('Project deleted successfully!', 'success')
        return redirect(url_for('admin_projects'))
