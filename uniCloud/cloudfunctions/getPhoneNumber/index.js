'use strict';

exports.main = async (event, context) => {
  // 客户端上传的参数
  const { access_token, openid } = event;
  
  // 参数校验
  if (!access_token) {
    return {
      code: 1,
      message: '缺少access_token参数'
    };
  }
  
  try {
    // 使用uniCloud.getPhoneNumber方法获取手机号
    // 文档：https://uniapp.dcloud.net.cn/uniCloud/univerify.html
    const phoneNumberRes = await uniCloud.getPhoneNumber({
      provider: 'univerify',
      apiKey: process.env.UNIVERIFY_API_KEY, // 在uniCloud控制台配置
      apiSecret: process.env.UNIVERIFY_API_SECRET, // 在uniCloud控制台配置
      access_token,
      openid
    });
    
    // 获取成功
    if (phoneNumberRes.code === 0) {
      // 返回手机号给客户端
      return {
        code: 0,
        message: '获取手机号成功',
        data: {
          phoneNumber: phoneNumberRes.phoneNumber
        }
      };
    } else {
      // 获取失败
      return {
        code: phoneNumberRes.code,
        message: phoneNumberRes.message || '获取手机号失败'
      };
    }
  } catch (error) {
    console.error('获取手机号错误：', error);
    return {
      code: 1,
      message: '获取手机号失败：' + (error.message || '未知错误')
    };
  }
};