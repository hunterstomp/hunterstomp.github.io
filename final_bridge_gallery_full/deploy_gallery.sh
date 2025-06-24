#!/bin/bash

# Simple deployment script for the gallery backend and frontend locally

# Backend setup
echo "Setting up backend..."
cd backend
pip install flask PyJWT
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/CN=localhost"
python app.py &

# Frontend setup (serve with simple HTTP server)
echo "Serving frontend..."
cd ../frontend
python -m http.server 8000 &

echo "✅ Backend running on https://localhost:5000"
echo "✅ Frontend running on http://localhost:8000"
