/**
 * API服务类
 * 处理与后端的通信
 */
import config from './config.js';

class ApiService {
  constructor() {
    this.baseUrl = config.baseUrl;
    this.timeout = 10000;
  }

  /**
   * 通用请求方法
   */
  async request(options) {
    const { url, method = 'GET', data = {}, header = {} } = options;
    
    return new Promise((resolve, reject) => {
      uni.request({
        url: this.baseUrl + url,
        method,
        data,
        header: {
          'Content-Type': 'application/json',
          ...header
        },
        timeout: this.timeout,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(new Error(`请求失败：${res.statusCode}`));
          }
        },
        fail: (err) => {
          reject(new Error(`网络错误：${err.errMsg}`));
        }
      });
    });
  }

  /**
   * 微信登录
   */
  async wechatLogin(loginData) {
    try {
      const response = await this.request({
        url: '/api/auth/wechat-login',
        method: 'POST',
        data: loginData
      });
      return response;
    } catch (error) {
      console.error('微信登录失败：', error);
      throw error;
    }
  },
  
  /**
   * 获取手机号
   */
  async getPhoneNumber(authResult) {
    try {
      const response = await this.request({
        url: '/api/auth/get-phone-number',
        method: 'POST',
        data: authResult
      });
      
      return response.data;
    } catch (error) {
      console.error('获取手机号失败：', error);
      throw error;
    }
  },
  
  /**
   * 处理登录响应
   */
  handleLoginResponse(response) {
    if (response.code === 0) {
        // 保存token
        this.saveToken(response.data.token);
        return response.data;
      } else {
        throw new Error(response.message || '登录失败');
      }
    } catch (error) {
      console.error('微信登录API错误：', error);
      throw error;
    }
  }

  /**
   * 微信小程序登录
   */
  async mpWechatLogin(code, userInfo, encryptedData, iv) {
    try {
      const response = await this.request({
        url: '/api/auth/mp-wechat-login',
        method: 'POST',
        data: {
          code,
          userInfo,
          encryptedData,
          iv
        }
      });
      
      if (response.code === 0) {
        // 保存token
        this.saveToken(response.data.token);
        return response.data;
      } else {
        throw new Error(response.message || '登录失败');
      }
    } catch (error) {
      console.error('微信小程序登录API错误：', error);
      throw error;
    }
  }

  /**
   * 获取用户信息
   */
  async getUserInfo() {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('未登录');
      }

      const response = await this.request({
        url: '/api/user/info',
        method: 'GET',
        header: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.code === 0) {
        return response.data;
      } else {
        throw new Error(response.message || '获取用户信息失败');
      }
    } catch (error) {
      console.error('获取用户信息API错误：', error);
      throw error;
    }
  }

  /**
   * 保存token
   */
  saveToken(token) {
    uni.setStorageSync('token', token);
  }

  /**
   * 获取token
   */
  getToken() {
    return uni.getStorageSync('token');
  }

  /**
   * 清除token
   */
  clearToken() {
    uni.removeStorageSync('token');
  }

  /**
   * 检查是否已登录
   */
  isLoggedIn() {
    return !!this.getToken();
  }

  /**
   * 退出登录
   */
  async logout() {
    try {
      const token = this.getToken();
      if (token) {
        await this.request({
          url: '/api/auth/logout',
          method: 'POST',
          header: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('退出登录API错误：', error);
    } finally {
      this.clearToken();
    }
  }
}

export default new ApiService();
