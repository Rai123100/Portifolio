#!/usr/bin/env python3
"""Debug script to test likes functionality"""

from app import app, db
from models import User, Project, Like
from werkzeug.security import generate_password_hash

def debug_likes():
    with app.app_context():
        print("=== DEBUGGING LIKES SYSTEM ===")
        
        # Check users
        users = User.query.all()
        print(f"\nUsers in database: {len(users)}")
        for user in users:
            print(f"  - {user.username} ({user.email}) - Admin: {user.is_admin}")
        
        # Check projects
        projects = Project.query.all()
        print(f"\nProjects in database: {len(projects)}")
        for project in projects:
            print(f"  - {project.title} (ID: {project.id}) - Published: {project.is_published}")
            print(f"    Likes: {project.like_count}, Comments: {project.comment_count}")
        
        # Check likes
        likes = Like.query.all()
        print(f"\nLikes in database: {len(likes)}")
        for like in likes:
            print(f"  - User {like.user_id} likes Project {like.project_id}")
        
        # Create test project if none exist
        if not projects:
            print("\n=== Creating test project ===")
            test_project = Project()
            test_project.title = "Projeto de Teste"
            test_project.short_description = "Este é um projeto de teste para verificar as curtidas"
            test_project.description = "Descrição completa do projeto de teste"
            test_project.is_published = True
            test_project.featured = True
            test_project.tags = "Python, Flask, Test"
            db.session.add(test_project)
            db.session.commit()
            print(f"Created test project with ID: {test_project.id}")
        
        # Test like functionality
        if users and projects:
            test_user = users[0]
            test_project = projects[0]
            print(f"\n=== Testing like functionality ===")
            print(f"User: {test_user.username}, Project: {test_project.title}")
            
            # Check existing like
            existing_like = Like.query.filter_by(user_id=test_user.id, project_id=test_project.id).first()
            print(f"Existing like: {existing_like is not None}")
            
            if existing_like:
                print("Removing like...")
                db.session.delete(existing_like)
                db.session.commit()
                print("Like removed")
            else:
                print("Adding like...")
                like = Like()
                like.user_id = test_user.id
                like.project_id = test_project.id
                db.session.add(like)
                db.session.commit()
                print("Like added")
            
            print(f"Final like count for project: {test_project.like_count}")

if __name__ == "__main__":
    debug_likes()