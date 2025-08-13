# Astronaut Portfolio - Digital Space Explorer

## Overview

An interactive full-stack portfolio web application with a space/astronaut theme featuring project showcases, user authentication, and administrative functionality. The application uses Flask as the backend framework with PostgreSQL for data persistence, designed to present developer projects in an engaging space-themed interface with particle effects and cosmic animations.

## User Preferences

Preferred communication style: Simple, everyday language.
Language: Portuguese (all content should be in Portuguese)
Tools/Technologies to highlight: HTML5, CSS3, JavaScript, Google Cloud, AWS, Node.js, Git, GitHub, Canva, Figma, Sass, Microsoft SQL Server, Python

## Recent Changes (Updated - August 13, 2025)
- ✓ Successfully migrated from Replit Agent to standard Replit environment
- ✓ Updated skills carousel with complete technology stack (HTML5, CSS3, JavaScript, Google Cloud, AWS, Node.js, Git, GitHub, Canva, Figma, Sass, Microsoft SQL Server, Python)
- ✓ Added new space-themed profile image for modern astronaut aesthetic
- ✓ Completely redesigned About page with modern layout including:
  - Professional profile image integration with orbital animations
  - Statistics cards showing portfolio metrics
  - Improved technology showcase with categorized sections
  - Enhanced responsive design and space theme consistency
- ✓ Fixed PostgreSQL database connectivity for Replit environment
- ✓ Resolved app factory pattern for proper deployment structure
- ✓ Enhanced skills carousel with improved centering and hover effects:
  - Better visual alignment and responsive spacing
  - Advanced hover animations with color transitions
  - Improved control buttons with enhanced styling
  - Added floating and scaling effects for interactive elements
- ✓ Updated profile images to match modern avatar design theme
- ✓ Added futuristic visual elements to profile section:
  - Animated SVG rocket with flame effects and floating animation
  - Circuit pattern elements with pulsing animations
  - Floating tech icons (microchip, satellite, robot, atom) with unique animations
  - Holographic grid lines with gradient effects
  - Enhanced orbital decorations and glowing effects
  - Multiple layered background elements for depth and context

## System Architecture

### Frontend Architecture
- **Template Engine**: Jinja2 templates with Bootstrap 5 for responsive design
- **Styling**: Custom CSS with space theme variables, particle effects background
- **JavaScript**: Vanilla JS for interactivity, particles.js for space effects
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Theme**: Dark space theme with blue/cyan accents, astronaut iconography

### Backend Architecture
- **Framework**: Flask with Blueprint-style route organization
- **Database ORM**: SQLAlchemy with declarative base for model definitions
- **Authentication**: JWT tokens for session management with 24-hour expiration
- **File Handling**: Werkzeug for secure file uploads with size limits (16MB)
- **Form Processing**: Flask-WTF with CSRF protection and validation
- **Email Service**: Flask-Mail for notification system

### Data Models
- **User Model**: Authentication, profile management, admin privileges
- **Project Model**: Portfolio projects with media, links, publication status
- **Comment System**: User engagement on projects
- **Like System**: Project appreciation tracking
- **Achievement Model**: Professional milestones display

### Security Features
- **Password Hashing**: Werkzeug security for password management
- **CSRF Protection**: Flask-WTF form security
- **File Upload Validation**: Restricted file types and size limits
- **JWT Authentication**: Secure token-based sessions
- **Environment Variables**: Sensitive configuration externalized

### Administrative Features
- **Admin Dashboard**: Project and user management interface
- **Content Management**: CRUD operations for projects and achievements
- **User Role Management**: Admin/user privilege separation
- **Analytics Display**: Portfolio statistics and engagement metrics

## External Dependencies

### Core Framework Dependencies
- **Flask**: Web application framework
- **SQLAlchemy**: Database ORM and connection pooling
- **PostgreSQL**: Primary database (configurable via DATABASE_URL)
- **Flask-JWT-Extended**: Token-based authentication
- **Flask-Mail**: Email notification system
- **Flask-CORS**: Cross-origin resource sharing

### Frontend Libraries
- **Bootstrap 5**: Responsive CSS framework
- **Font Awesome 6**: Icon library for space-themed icons
- **Particles.js**: Interactive particle background effects

### File and Media Handling
- **Werkzeug**: File upload security and utilities
- **PIL/Pillow**: Image processing (implied for profile images)

### Email Service Integration
- **SMTP Configuration**: Gmail SMTP or configurable mail server
- **Environment Variables**: MAIL_USERNAME, MAIL_PASSWORD for credentials

### Development and Deployment
- **Environment Configuration**: DATABASE_URL, JWT_SECRET_KEY, MAIL_* variables
- **ProxyFix Middleware**: Production deployment behind reverse proxy
- **Connection Pooling**: SQLAlchemy engine optimization for database connections