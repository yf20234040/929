/**
 * 微信登录后端API处理
 * 支持：小程序登录 / 手机号登录 / App端微信登录
 */

const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();

// 微信小程序配置
const WECHAT_MP_CONFIG = {
  appId: 'wx26ff9c276f816bd8',
  appSecret: '26f0b6c6b8d571de7c8a8f72374c5b9f'
};

// JWT密钥
const JWT_SECRET = 'lixiaobao-secret-key-2024';

// 模拟数据库
let users = [];

// 获取微信access_token
async function getWechatAccessToken() {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WECHAT_MP_CONFIG.appId}&secret=${WECHAT_MP_CONFIG.appSecret}`;
  const response = await axios.get(url);
  if (response.data.access_token) return response.data.access_token;
  throw new Error('获取access_token失败: ' + JSON.stringify(response.data));
}

// 获取用户手机号
async function getPhoneNumber(accessToken, code) {
  const url = 'https://api.weixin.qq.com/wxa/business/getuserphonenumber';
  const response = await axios.post(url, { code }, {
    headers: { 'Content-Type': 'application/json' },
    params: { access_token: accessToken }
  });

  if (response.data.errcode === 0) {
    return response.data.phone_info.phoneNumber;
  } else {
    throw new Error(`获取手机号失败: ${response.data.errmsg}`);
  }
}

// 查找或创建用户
function findOrCreateUser(phoneNumber) {
  let user = users.find(u => u.phoneNumber === phoneNumber);
  if (!user) {
    user = {
      id: Date.now().toString(),
      phoneNumber,
      name: `用户${phoneNumber.slice(-4)}`,
      nickName: `用户${phoneNumber.slice(-4)}`,
      avatar: '',
      age: '',
      gender: '',
      signature: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(user);
  }
  return user;
}

// 生成JWT token
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, phoneNumber: user.phoneNumber },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * 手机号登录接口
 * POST /api/auth/get-phone-number
 * body: { code }
 */
router.post('/get-phone-number', async (req, res) => {
  try {
    console.log('=== 手机号登录请求 ===');
    console.log('请求参数:', req.body);
    
    const { code } = req.body;
    if (!code) {
      console.log('错误: 缺少code参数');
      return res.status(400).json({ error: '缺少code参数' });
    }

    console.log('开始获取access_token...');
    const accessToken = await getWechatAccessToken();
    console.log('access_token获取成功');

    console.log('开始获取手机号...');
    const phoneNumber = await getPhoneNumber(accessToken, code);
    console.log('手机号获取成功:', phoneNumber);

    const user = findOrCreateUser(phoneNumber);
    const token = generateToken(user);

    console.log('登录成功，返回用户信息');
    res.json({
      code: 0,
      message: '登录成功',
      data: { token, userInfo: user }
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ error: '获取手机号失败', details: error.message });
  }
});

/**
 * 小程序微信登录接口
 * POST /api/auth/mp-wechat-login
 * body: { code, encryptedData, iv }
 */
router.post('/mp-wechat-login', async (req, res) => {
  try {
    const { code, encryptedData, iv } = req.body;
    if (!code || !encryptedData || !iv)
      return res.status(400).json({ error: '缺少参数' });

    const accessToken = await getWechatAccessToken();
    const phoneNumber = await getPhoneNumber(accessToken, code);
    const user = findOrCreateUser(phoneNumber);
    const token = generateToken(user);

    res.json({ code: 0, message: '登录成功', data: { token, userInfo: user } });
  } catch (error) {
    res.status(500).json({ error: '小程序登录失败', details: error.message });
  }
});

/**
 * App端微信登录接口
 * POST /api/auth/wechat-login
 * body: { code }
 */
router.post('/wechat-login', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: '缺少code参数' });

    const accessToken = await getWechatAccessToken();
    const phoneNumber = await getPhoneNumber(accessToken, code);
    const user = findOrCreateUser(phoneNumber);
    const token = generateToken(user);

    res.json({ code: 0, message: '登录成功', data: { token, userInfo: user } });
  } catch (error) {
    res.status(500).json({ error: 'App微信登录失败', details: error.message });
  }
});

// 测试接口
router.get('/', (req, res) => {
  res.json({ message: '微信认证服务运行正常', timestamp: new Date().toISOString() });
});

module.exports = router;
