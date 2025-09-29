// 应用配置文件
const config = {
  // API基础URL
  baseUrl: 'http://8.137.115.16:3000',
  
  // 应用信息
  appName: '历小包',
  version: '1.0.0',
  
  // 微信小程序配置
  wechat: {
    appId: 'wx26ff9c276f816bd8'
  },
  
  // 优化配置
  optimization: {
    enableCompression: true,
    enableSubPackages: true,
    maxImageSize: 200 * 1024 // 200KB
  }
};

export default config;
