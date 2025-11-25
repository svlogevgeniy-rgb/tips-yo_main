#!/bin/bash

# Deploy script for tips-yo project
# Server: 91.222.236.239

echo "🚀 Starting deployment to 91.222.236.239..."

# SSH connection details (update these)
SERVER_USER="your_username"
SERVER_HOST="91.222.236.239"
PROJECT_PATH="/var/www/tips-yo"  # Update this path

# Connect to server and deploy
ssh ${SERVER_USER}@${SERVER_HOST} << 'ENDSSH'
  echo "📦 Connected to server..."
  
  # Navigate to project directory
  cd /var/www/tips-yo || exit 1
  
  echo "📥 Pulling latest changes from GitHub..."
  git pull origin main
  
  echo "📦 Installing dependencies..."
  npm install
  
  echo "🔨 Building project..."
  npm run build
  
  echo "🔄 Restarting service..."
  # Uncomment the appropriate command for your setup:
  # pm2 restart tips-yo
  # sudo systemctl restart tips-yo
  # docker-compose restart
  
  echo "✅ Deployment completed!"
ENDSSH

echo "🎉 Deployment finished!"
