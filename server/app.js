/**
 * 历小包后端服务器
 * 处理登录和用户信息相关的API请求
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const wechatAuthRouter = require('./wechat-auth');
const aiQaRouter = require('./ai-simple');
const authTestRouter = require('./auth-test');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 测试路由
app.get('/api/test', (req, res) => {
  res.json({ message: 'API测试成功', timestamp: new Date().toISOString() });
});

// 根路由
app.get('/', (req, res) => {
  res.json({ 
    message: '历小包后端服务器运行正常', 
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 微信认证路由
app.use('/api/auth', wechatAuthRouter);

// 测试登录路由
app.use('/api/auth', authTestRouter);

// AI问答路由
console.log('注册AI路由...');
app.use('/api/ai', aiQaRouter);
console.log('AI路由注册完成');

// 代理下载路由
app.get('/api/proxy-download', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: '缺少url参数' });
    }

    console.log('代理下载请求:', url);
    
    // 使用axios下载文件
    const axios = require('axios');
    const response = await axios.get(url, {
      responseType: 'stream',
      timeout: 30000
    });

    // 设置响应头
    res.set({
      'Content-Type': response.headers['content-type'] || 'application/octet-stream',
      'Content-Length': response.headers['content-length'],
      'Cache-Control': 'public, max-age=3600'
    });

    // 流式传输文件
    response.data.pipe(res);
    
  } catch (error) {
    console.error('代理下载失败:', error.message);
    res.status(500).json({ 
      error: '代理下载失败', 
      details: error.message 
    });
  }
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ error: '服务器内部错误', details: err.message });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`访问地址: http://8.137.115.16:${PORT}/api/auth/login`);
});

module.exports = app;
