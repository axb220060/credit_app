from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from twilio.rest import Client
from dotenv import load_dotenv
import os
import jwt
from datetime import datetime, timedelta
import re
from bson import ObjectId


load_dotenv()


if not os.getenv("JWT_SECRET_KEY"):
    raise ValueError("JWT_SECRET_KEY environment variable is not set")

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://localhost", "http://192.168.12.222:8080"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})


client = MongoClient(os.getenv("MONGODB_URI"))
db = client.auth_db
users_collection = db.users


twilio_client = Client(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)

def validate_phone_number(phone: str) -> bool:

    pattern = r"^\+[1-9]\d{1,14}$"
    return bool(re.match(pattern, phone))

def validate_email(email: str) -> bool:

    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(pattern, email))

@app.route("/api/register", methods=["POST"])
def register():

    print("Received registration request")  # Debug log
    data = request.get_json()
    print("Request data:", data)  # Debug log
    
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")

    print(f"Name: {name}, Email: {email}, Phone: {phone}") 


    if not all([name, email, phone]):
        return jsonify({"error": "All fields are required"}), 400

    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    if not validate_phone_number(phone):
        return jsonify({"error": "Invalid phone number format"}), 400


    if users_collection.find_one({"$or": [{"email": email}, {"phone": phone}]}):
        return jsonify({"error": "User already exists"}), 409


    user = {
        "name": name,
        "email": email,
        "phone": phone,
        "created_at": datetime.utcnow()
    }
    users_collection.insert_one(user)

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/api/login/send-otp", methods=["POST"])
def send_otp():
    """Send OTP to the provided phone number."""
    data = request.get_json()
    phone = data.get("phone")

    if not phone or not validate_phone_number(phone):
        return jsonify({"error": "Invalid phone number"}), 400

    user = users_collection.find_one({"phone": phone})
    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        verification = twilio_client.verify.v2.services(
            os.getenv("TWILIO_VERIFY_SERVICE_SID")
        ).verifications.create(to=phone, channel="sms")
        return jsonify({"message": "OTP sent successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/login/verify-otp", methods=["POST"])
def verify_otp():
    """Verify OTP and generate JWT token."""
    data = request.get_json()
    phone = data.get("phone")
    otp = data.get("otp")

    if not all([phone, otp]):
        return jsonify({"error": "Phone and OTP are required"}), 400

    try:
        verification_check = twilio_client.verify.v2.services(
            os.getenv("TWILIO_VERIFY_SERVICE_SID")
        ).verification_checks.create(to=phone, code=otp)

        if verification_check.status == "approved":
            user = users_collection.find_one({"phone": phone})
            token = jwt.encode(
                {
                    "user_id": str(user["_id"]),
                    "exp": datetime.utcnow() + timedelta(days=1)
                },
                os.getenv("JWT_SECRET_KEY"),
                algorithm="HS256"
            )
            return jsonify({"token": token}), 200
        else:
            return jsonify({"error": "Invalid OTP"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_user_from_token(request):

    auth_header = request.headers.get("Authorization")
    print("Auth header:", auth_header)  # Debug log
    
    if not auth_header or not auth_header.startswith("Bearer "):
        print("Invalid or missing Authorization header")  
        return None
    
    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
        user_id = payload.get("user_id")
        print("Decoded user_id:", user_id)  
        
        if not user_id:
            print("No user_id in token payload")  
        
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        print("Found user:", user)  
        return user
    except jwt.InvalidTokenError as e:
        print("Invalid token error:", str(e))  
        return None
    except Exception as e:
        print("Unexpected error:", str(e))  
        return None

@app.route("/api/user", methods=["GET"])
def get_user():

    print("Received request to /api/user")  
    print("Request headers:", dict(request.headers))  
    
    user = get_user_from_token(request)
    if not user:
        print("User not found or unauthorized")  
        return jsonify({"error": "Unauthorized"}), 401
    
    response_data = {
        "name": user["name"],
        "email": user["email"],
        "phone": user["phone"]
    }
    print("Sending user data:", response_data)  
    return jsonify(response_data), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)