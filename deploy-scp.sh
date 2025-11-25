#!/bin/bash

# Deploy via SCP - builds locally and uploads to server

echo "🔨 Building project locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "📦 Build successful!"

# Server details (update these)
SERVER_USER="your_username"
SERVER_HOST="91.222.236.239"
SERVER_PATH="/var/www/tips-yo"

echo "📤 Uploading dist folder to server..."
scp -r dist/* ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Site should be updated at http://91.222.236.239/"
else
    echo "❌ Upload failed!"
    exit 1
fi
