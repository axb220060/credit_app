import os
import sys

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

# Import Flask app
from app import app as application

# Set environment variables
os.environ['FLASK_ENV'] = 'production'
