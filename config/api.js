// API配置文件
const config = {
  // 开发环境
  development: {
    baseURL: 'http://localhost:3000',
    timeout: 10000
  },
  
  // 生产环境 - 阿里云服务器
  production: {
    baseURL: 'https://llzmlxb.xyz', // 阿里云服务器地址
    timeout: 10000
  }
}

// 根据环境选择配置
const isDev = process.env.NODE_ENV === 'development'
const currentConfig = isDev ? config.development : config.production

export default {
  // API基础地址
  baseURL: currentConfig.baseURL,
  
  // 请求超时时间
  timeout: currentConfig.timeout,
  
  // 具体API端点
  endpoints: {
    // 认证相关
    auth: {
      getPhoneNumber: '/api/auth/get-phone-number',
      test: '/api/auth/test'
    },
    
    // AI相关
    ai: {
      ask: '/api/ai/ask',
      faq: '/api/ai/faq',
      test: '/api/ai/test'
    }
  },
  
  // 获取完整API地址的辅助方法
  getFullURL(endpoint) {
    return `${this.baseURL}${endpoint}`
  }
}
