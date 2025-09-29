<template>
  <view class="container" :class="{ 'care-mode': careMode }">
    <!-- 渐变背景装饰 -->
    <view class="bg-decoration">
      <view class="circle circle-1"></view>
      <view class="circle circle-2"></view>
      <view class="circle circle-3"></view>
      <view class="circle circle-4"></view>
    </view>
    
    <!-- 主内容 -->
    <view class="main-content">
      <!-- 登录卡片 -->
      <view class="login-card">
        <!-- Logo区域 -->
        <view class="logo-container">
          <image 
            class="logo-image" 
            src="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/logo.jpg" 
            mode="widthFix" 
            lazy-load
            alt="平台Logo"
          />
        </view>
        
        <view class="card-header">
          <text class="welcome-title">欢迎登录</text>
          <view class="title-line">
            <view class="line-purple"></view>
            <view class="line-light"></view>
          </view>
        </view>
        
        <!-- 微信登录组件 -->
        <view class="login-button-container">
          <wechat-login @login-success="handleWechatLoginSuccess" @login-error="handleWechatLoginError" />
        </view>
      </view>
      
      <!-- 底部说明 -->
      <view class="bottom-text">
        <text class="info-text">开启大先生小先生共学之旅</text>
        <text class="copyright-text">© 2025 历历在目团队 版权所有</text>
      </view>
    </view>
  </view>
</template>

<script>
import WechatLogin from '@/components/WechatLogin.vue'
import careModeMixin from '@/mixins/careMode.js'

export default {
  mixins: [careModeMixin],
  components: {
    WechatLogin
  },
  data() {
    return {
      isVisible: false
    }
  },
  onLoad() {
    // 页面加载完成后显示动画
    setTimeout(() => {
      this.isVisible = true
    }, 100)
  },
  methods: {
    // 处理微信登录成功
    handleWechatLoginSuccess(loginData) {
      console.log('登录成功:', loginData)
      // 不在这里处理跳转，让WechatLogin组件自己处理
    },
    
    // 处理微信登录失败
    handleWechatLoginError(error) {
      console.error('登录失败:', error)
      
      uni.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      })
    }
  }
}
</script>

<style scoped>
/* 基础容器 - 浅紫色系风格 */
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 背景装饰 - 紫色系气泡 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  animation: float 8s ease-in-out infinite;
}

.circle-1 {
  width: 300rpx;
  height: 300rpx;
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 200rpx;
  height: 200rpx;
  top: 25%;
  right: 15%;
  animation-delay: 2s;
  background: rgba(233, 30, 99, 0.1);
}

.circle-3 {
  width: 150rpx;
  height: 150rpx;
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

.circle-4 {
  width: 250rpx;
  height: 250rpx;
  bottom: 15%;
  right: 10%;
  animation-delay: 6s;
  background: rgba(156, 39, 176, 0.08);
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(180deg); }
}

/* 主内容 */
.main-content {
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rpx 40rpx 40rpx 40rpx;
  box-sizing: border-box;
}

/* 登录卡片 */
.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 30rpx;
  padding: 60rpx 40rpx;
  width: 100%;
  max-width: 600rpx;
  box-shadow: 0 20rpx 60rpx rgba(156, 39, 176, 0.1);
  animation: slideUp 0.6s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo容器 */
.logo-container {
  margin-bottom: 40rpx;
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8rpx 20rpx rgba(156, 39, 176, 0.15);
  background-color: #fff;
  padding: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

/* 卡片头部 */
.card-header {
  text-align: center;
  margin-bottom: 60rpx;
  width: 100%;
}

.welcome-title {
  font-size: 48rpx;
  font-weight: 700;
  color: #6a1b9a;
  display: block;
  margin-bottom: 20rpx;
  letter-spacing: 2rpx;
}

.title-line {
  display: flex;
  justify-content: center;
  gap: 10rpx;
}

.line-purple {
  width: 60rpx;
  height: 4rpx;
  background: #9c27b0;
  border-radius: 2rpx;
}

.line-light {
  width: 60rpx;
  height: 4rpx;
  background: #ce93d8;
  border-radius: 2rpx;
}

/* 登录按钮容器 */
.login-button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 20rpx;
  box-sizing: border-box;
}

/* 底部说明 */
.bottom-text {
  position: absolute;
  bottom: 60rpx;
  left: 50%;
  transform: translateX(-50%);
  animation: fadeIn 1s ease-out 0.3s both;
  text-align: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.info-text {
  font-size: 28rpx;
  color: #6a1b9a;
  text-align: center;
  line-height: 1.6;
  display: block;
  text-shadow: 0 1rpx 2rpx rgba(255, 255, 255, 0.8);
  margin-bottom: 10rpx;
}

.copyright-text {
  font-size: 24rpx;
  color: #9c27b0;
  opacity: 0.7;
  text-align: center;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .main-content {
    padding: 30rpx;
  }
  
  .login-card {
    padding: 50rpx 30rpx;
  }
  
  .logo-container {
    width: 140rpx;
    height: 140rpx;
  }
  
  .welcome-title {
    font-size: 42rpx;
  }
  
  .bottom-text {
    bottom: 40rpx;
  }
}

/* 关怀模式适配 */
.container.care-mode .welcome-title {
  font-size: 56rpx;
}

.container.care-mode .info-text {
  font-size: 32rpx;
}

.container.care-mode .copyright-text {
  font-size: 28rpx;
}

.container.care-mode .logo-container {
  width: 180rpx;
  height: 180rpx;
}
</style>
