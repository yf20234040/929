# 微信手机号获取API集成说明

## 概述

当前代码中的手机号获取功能是模拟实现。要获取用户的真实手机号，需要集成真实的后端API。

## 实现步骤

### 1. 后端API实现

你的后端需要实现一个接口来处理微信手机号获取：

```javascript
// 后端API示例 (Node.js)
app.post('/api/wechat/get-phone', async (req, res) => {
  try {
    const { code } = req.body;
    
    // 1. 使用code获取access_token
    const tokenResponse = await axios.post('https://api.weixin.qq.com/wxa/business/getuserphonenumber', {
      code: code
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        access_token: YOUR_ACCESS_TOKEN // 你的微信小程序access_token
      }
    });
    
    // 2. 解析返回的手机号
    const phoneInfo = tokenResponse.data.phone_info;
    
    res.json({
      success: true,
      phoneNumber: phoneInfo.phoneNumber, // 真实手机号
      message: '获取手机号成功'
    });
    
  } catch (error) {
    res.json({
      success: false,
      message: '获取手机号失败'
    });
  }
});
```

### 2. 前端API调用

在 `components/WechatLogin.vue` 中，将模拟代码替换为真实API调用：

```javascript
// 调用后端API获取真实手机号
async callBackendAPI(code) {
  try {
    const response = await uni.request({
      url: 'https://your-backend-api.com/api/wechat/get-phone',
      method: 'POST',
      data: {
        code: code
      },
      header: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.statusCode === 200 && response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || '获取手机号失败');
    }
  } catch (error) {
    console.error('API调用失败:', error);
    throw error;
  }
}
```

### 3. 微信小程序配置

确保在微信小程序后台配置了手机号获取权限：

1. 登录微信公众平台
2. 进入"开发" -> "开发管理" -> "开发设置"
3. 在"服务器域名"中添加你的后端API域名
4. 在"业务域名"中配置相关域名

### 4. 权限配置

在 `manifest.json` 中确保已配置手机号获取权限：

```json
{
  "mp-weixin": {
    "permission": {
      "scope.phoneNumber": {
        "desc": "用于获取用户手机号进行登录"
      }
    }
  }
}
```

## 注意事项

1. **安全性**：手机号是敏感信息，确保API调用使用HTTPS
2. **权限**：用户必须授权才能获取手机号
3. **错误处理**：妥善处理用户拒绝授权的情况
4. **数据保护**：遵守相关法律法规，保护用户隐私

## 测试

1. 在微信开发者工具中测试
2. 确保后端API正常运行
3. 验证手机号获取功能
4. 测试用户拒绝授权的情况

## 当前状态

- ✅ 前端代码结构已完成
- ✅ 模拟实现已就绪
- ⏳ 需要集成真实后端API
- ⏳ 需要配置微信小程序权限

---

**下一步**：请将模拟的API调用替换为真实的后端接口调用。
