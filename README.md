

## Setup

### Frontend Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. The `.env` file is already in the backend directory with the necessary credentials. However, you'll need to:

   a. Install MongoDB on your local machine if you haven't already:

   - For Mac: `brew install mongodb-community`
   - For Windows:
     1. Download and install from the [MongoDB website](https://www.mongodb.com/try/download/community)
     2. During installation, select "Complete" setup and make sure "Install MongoDB as a Service" is checked
     3. Optionally install MongoDB Compass (the GUI) if you want a visual interface
   - For Linux: `sudo apt install mongodb` (Ubuntu) or equivalent

   b. Start the MongoDB service:

   - For Mac: `brew services start mongodb-community`
   - For Windows:
     1. The service should start automatically after installation
     2. To verify, open Services (Win+R, type "services.msc") and check if "MongoDB Server" is running
     3. If not running, right-click and select "Start"
   - For Linux: `sudo systemctl start mongodb`

   c. The application is configured to connect to a local MongoDB instance at:

   ```
   MONGODB_URI=mongodb://localhost:27017/auth_db
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_VERIFY_SERVICE_SID=your_twilio_verify_service_sid
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

5. Start the Flask server:
   ```bash
   python app.py
   ```

## Usage

1. Register a new account with your name, email, and phone number
2. Login using your registered phone number
3. Enter the OTP sent to your phone
4. Access the dashboard after successful authentication

## Development

- Frontend runs on `http://localhost:3000`
- Backend API runs on `http://localhost:5001`

## Deployment

### Frontend (Next.js)

The Next.js application can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting service.

```bash
# Build for production
npm run build

# Start the production server
npm start
```

### Backend (Flask)

The Flask backend can be deployed using WSGI servers like Gunicorn with Nginx:

```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 wsgi:app
```
