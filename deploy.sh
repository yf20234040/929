#!/bin/bash

# 部署脚本 - 将文件上传到阿里云服务器并启动服务

SERVER_IP="8.137.115.16"
SERVER_USER="root"
SERVER_PATH="/var/www/lixiaobao/server"

echo "开始部署历小包微信登录后端服务..."

# 1. 创建服务器目录
echo "创建服务器目录..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $SERVER_PATH"

# 2. 上传package.json
echo "上传package.json..."
scp server/package.json $SERVER_USER@$SERVER_IP:$SERVER_PATH/

# 3. 上传app.js
echo "上传app.js..."
scp server/app.js $SERVER_USER@$SERVER_IP:$SERVER_PATH/

# 4. 上传wechat-auth.js
echo "上传wechat-auth.js..."
scp server/wechat-auth.js $SERVER_USER@$SERVER_IP:$SERVER_PATH/

# 5. 在服务器上安装依赖并启动服务
echo "在服务器上安装依赖并启动服务..."
ssh $SERVER_USER@$SERVER_IP "cd $SERVER_PATH && npm install && pm2 start app.js --name 'lixiaobao-server' && pm2 save && pm2 startup"

# 6. 测试服务
echo "测试服务..."
ssh $SERVER_USER@$SERVER_IP "curl http://localhost:3000"

echo "部署完成！"
echo "服务器地址: http://$SERVER_IP:3000"

