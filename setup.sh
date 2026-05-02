#!/bin/bash
# ForgeX Email Setup Script
# Run this to set up emails quickly

echo "🔥 ForgeX Email Configuration"
echo "=============================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo ""
    echo "Creating .env file..."
    echo ""
    echo "Please fill in the following:"
    echo ""
    read -p "Enter your Gmail address: " EMAIL
    read -p "Enter your 16-digit App Password: " PASSWORD
    
    echo "" > .env
    echo "EMAIL_USER=$EMAIL" >> .env
    echo "EMAIL_PASSWORD=$PASSWORD" >> .env
    echo "PORT=3000" >> .env
    
    echo ""
    echo "✅ .env file created!"
else
    echo "✅ .env file found"
fi

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Run: npm start"
echo ""
echo "Then open your browser to: http://localhost:3000"
