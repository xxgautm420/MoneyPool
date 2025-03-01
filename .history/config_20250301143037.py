import os

class Config:
    """Configuration class for Flask application."""
    
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql+psycopg2://postgres:201103@localhost/postgres'
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable track modifications to save resources
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'  # For session management and CSRF protection

    # Additional configurations can be added here