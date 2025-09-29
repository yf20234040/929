@echo off
echo 正在启动历小包后端服务器...

cd %~dp0
cd ..

echo 检查环境...
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo 错误: 未安装Node.js，请先安装Node.js
  pause
  exit /b
)

echo 安装依赖...
npm install

echo 启动服务器...
node server/app.js

pause