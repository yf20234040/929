# 历小包 App

## 项目介绍

历小包是一个基于uni-app开发的跨平台应用，支持微信登录和手机号一键登录功能。

## 登录功能说明

### 微信登录

本项目实现了微信登录功能，支持在App端和小程序端使用微信账号登录。

### 手机号一键登录

项目集成了uni一键登录功能，可以实现无需短信验证码直接获取手机号进行登录。

## 配置说明

### 微信登录配置

1. 在manifest.json中配置微信开放平台的AppID和AppSecret
2. 在server/wechat-auth.js中配置微信小程序和开放平台的AppID和AppSecret

### 一键登录配置

1. 在uniCloud控制台开通一键登录服务
2. 在manifest.json中添加Univerify模块
3. 在uniCloud/cloudfunctions/getPhoneNumber/config.json中配置UNIVERIFY_API_KEY和UNIVERIFY_API_SECRET

## 使用说明

### 前端调用

```javascript
// 微信登录
const wechatLogin = new WechatLogin();
const loginResult = await wechatLogin.appWechatLogin();

// 一键登录
uni.preLogin({
  provider: 'univerify',
  success: () => {
    uni.login({
      provider: 'univerify',
      univerifyStyle: {
        fullScreen: true,
        // 自定义样式配置
      },
      success: (res) => {
        // 获取手机号
        const phoneInfo = await api.getPhoneNumber(res.authResult);
      }
    });
  }
});
```

### 后端处理

1. 微信登录：通过code获取openid和session_key，然后查找或创建用户
2. 一键登录：通过access_token获取手机号，然后查找或创建用户

## 注意事项

1. 一键登录功能仅在App端可用，且需要打包后才能正常使用
2. 微信登录需要在对应平台注册应用并配置回调域名
3. 使用uniCloud云函数处理一键登录时，需要在云函数中配置环境变量
