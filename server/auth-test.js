const express = require('express');
const router = express.Router();

// 设置响应头以支持中文
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// 测试登录接口
router.post('/get-phone-number', async (req, res) => {
  try {
    const { code } = req.body;
    
    console.log('收到登录请求，code:', code);
    
    // 模拟返回手机号
    const mockPhoneNumber = '138****8888';
    
    res.json({
      success: true,
      message: '登录成功',
      data: {
        userInfo: {
          phoneNumber: mockPhoneNumber,
          nickName: '测试用户'
        }
      }
    });
    
  } catch (error) {
    console.error('登录处理失败:', error);
    res.status(500).json({
      success: false,
      error: '登录服务暂时不可用，请稍后再试'
    });
  }
});

module.exports = router;
