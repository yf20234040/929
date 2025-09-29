<template>
  <view class="container" :class="{ 'care-mode': careMode }">
    <!-- 顶部导航栏 -->
    <view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-left" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="title">设置</text>
    </view>

    <!-- 设置内容 -->
    <view class="content">
      <view class="settings-card">
        <view class="setting-item" @click="goToProfile">
          <text class="setting-icon">👤</text>
          <text class="setting-text">个人资料</text>
          <text class="setting-arrow">></text>
        </view>
        <view class="setting-divider"></view>
        <view class="setting-item" @click="toggleCareMode">
          <text class="setting-icon">🔍</text>
          <text class="setting-text">关怀模式</text>
          <view class="setting-switch" :class="{ active: careMode }">
            <view class="switch-thumb"></view>
          </view>
        </view>
        <!-- 新增：退出登录按钮 -->
        <view class="setting-divider"></view>
        <view class="setting-item logout-item" @click="handleLogout">
          <text class="setting-icon logout-icon">🚪</text>
          <text class="setting-text logout-text">退出登录</text>
          <text class="setting-arrow">></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import careModeMixin from '@/mixins/careMode.js'

export default {
  mixins: [careModeMixin],
  
  data() {
    return {
      statusBarHeight: 0
    }
  },
  
  onLoad() {
    this.getStatusBarHeight();
    this.loadCareMode();
  },
  
  onShow() {
    this.loadCareMode();
  },
  
  methods: {
    // 获取状态栏高度
    getStatusBarHeight() {
      const systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight || 0;
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    
    // 跳转到个人资料编辑页面
    goToProfile() {
      uni.navigateTo({
        url: '/pages/profile/edit-profile'
      });
    },
    
    // 处理退出登录逻辑
    handleLogout() {
      // 1. 显示确认弹窗（避免误操作）
      uni.showModal({
        title: '确认退出',
        content: '确定要退出当前账号吗？',
        confirmText: '退出',
        cancelText: '取消',
        confirmColor: '#ff4d4f', // 强调色（红色）
        success: (res) => {
          if (res.confirm) {
            // 2. 清除登录状态（根据实际项目存储方式调整，如uni.setStorageSync/uni.removeStorageSync）
            uni.removeStorageSync('wechatLoginToken'); // 清除登录token
            uni.removeStorageSync('userInfo'); // 清除用户信息
            
            // 3. 关闭所有页面，跳转到主页
            uni.reLaunch({
              url: '/pages/login/index', // 
              success: () => {
                // 4. 提示退出成功
                uni.showToast({
                  title: '退出成功',
                  icon: 'success',
                  duration: 1500
                });
              },
              fail: (err) => {
                console.error('跳转登录页失败：', err);
                uni.showToast({
                  title: '退出失败，请重试',
                  icon: 'none'
                });
              }
            });
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #aaaaff 0%, #aaaaff 100%);
  position: relative;
  overflow: hidden;
}

/* 顶部导航栏 */
.header {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  position: relative;
  z-index: 10;
}

.nav-left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10rpx);
  margin-right: 20rpx;
}

.back-icon {
  font-size: 32rpx;
  color: white;
  font-weight: bold;
}

.title {
  font-size: 45rpx;
  font-weight: bold;
  color: white;
}

/* 内容区域 */
.content {
  padding: 40rpx 30rpx;
}

/* 设置卡片 */
.settings-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20rpx);
  overflow: hidden;
}

.setting-item {
  display: flex;
  align-items: center;
  padding: 30rpx 40rpx;
  transition: background-color 0.2s ease;
}

.setting-item:active {
  background-color: rgba(102, 126, 234, 0.05);
}

.setting-divider {
  height: 1rpx;
  background: rgba(0, 0, 0, 0.05);
  margin: 0 40rpx;
}

.setting-icon {
  font-size: 36rpx;
  margin-right: 30rpx;
  width: 40rpx;
  text-align: center;
}

.setting-text {
  flex: 1;
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}

.setting-arrow {
  font-size: 28rpx;
  color: #ccc;
}

/* 新增：退出登录按钮样式（红色强调，区分普通选项） */
.logout-item:active {
  background-color: rgba(255, 77, 79, 0.05); /* 红色背景高亮 */
}
.logout-icon {
  color: #ff4d4f; /* 图标红色 */
}
.logout-text {
  color: #ff4d4f; /* 文字红色 */
}

/* 关怀模式开关 */
.setting-switch {
  width: 80rpx;
  height: 40rpx;
  background: #e0e0e0;
  border-radius: 20rpx;
  position: relative;
  transition: all 0.3s ease;
}

.setting-switch.active {
  background: #667eea;
}

.switch-thumb {
  width: 36rpx;
  height: 36rpx;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2rpx;
  left: 2rpx;
  transition: all 0.3s ease;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
}

.setting-switch.active .switch-thumb {
  transform: translateX(40rpx);
}

/* 关怀模式样式（适配退出登录按钮） */
.container.care-mode {
  font-size: 1.2em;
}

.container.care-mode .title {
  font-size: 42rpx;
}

.container.care-mode .setting-text,
.container.care-mode .logout-text { /* 关怀模式下退出文字放大 */
  font-size: 36rpx;
}

.container.care-mode .setting-icon,
.container.care-mode .logout-icon { /* 关怀模式下退出图标放大 */
  font-size: 42rpx;
}

.container.care-mode .setting-switch {
  width: 100rpx;
  height: 50rpx;
}

.container.care-mode .switch-thumb {
  width: 46rpx;
  height: 46rpx;
}

.container.care-mode .setting-switch.active .switch-thumb {
  transform: translateX(50rpx);
}
</style>