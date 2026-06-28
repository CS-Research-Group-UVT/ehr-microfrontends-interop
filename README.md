This is the first backend of the paper architecture. It is used to check the health of the widgets and to retrieve various widgets information for the frontend marketplace (located on the "marketplace-frontend" branch).

## Quick Start Guide

To get this backend up and running, follow these steps:
1. Start the venv:
   ```bash
   source venv/bin/activate
   ```
2. Install the required dependencies
3. Run the backend server (on the 8001 port, **not** the default 8000 port):
   ```bash
   python3 manage.py runserver 8001
   ```