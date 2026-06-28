This is the backend for the AI models (second backend of the paper architecture). It is built using Django and Django REST Framework (DRF) to provide a robust API for interacting with the AI models. The backend handles requests, processes data, sends the data to the AI models, and serves responses to the other backend of the paper (on the branch called "widgets-backend").

## Quick Start Guide

To get this up and running locally (for development purposes only), follow these steps:
1. Start the venvironment:
   ```bash
   source venv/bin/activate
   ```
2. Install the required dependencies
3. Run the backend server (on port 8000, the default one):
   ```bash
   python3 manage.py runserver
   ```
   
In production you should never run the project using the manage.py runserver command. Instead, you should use a production-ready WSGI server like Gunicorn or uWSGI, and configure it to serve your Django application.