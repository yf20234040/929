<template>
  <view class="container" :class="{ 'care-mode': careMode }">
    <!-- 顶部导航栏 -->
    <view class="header">
      <text class="main-title">个人中心</text>
    </view>

    <!-- 内容滚动区域 -->
    <scroll-view class="content" scroll-y :style="{ paddingBottom: '140rpx' }">
      <!-- 用户名片卡片 -->
      <view class="card-section" @click="editProfile">
        <view class="user-card">
          <!-- 背景装饰 -->
          <view class="card-bg">
            <view class="bg-circle circle-1"></view>
            <view class="bg-circle circle-2"></view>
            <view class="bg-circle circle-3"></view>
          </view>
          
          <!-- 用户头像 -->
          <view class="avatar-container">
            <image 
              v-if="userInfo.avatarUrl" 
              :src="userInfo.avatarUrl" 
              class="user-avatar"
              :style="{ width: selectedAvatarSize + 'rpx', height: selectedAvatarSize + 'rpx', borderRadius: (selectedAvatarSize / 2) + 'rpx' }"
              mode="aspectFill"
              @error="handleAvatarError"
            />
            <view v-else class="user-avatar default-avatar" :style="{ width: selectedAvatarSize + 'rpx', height: selectedAvatarSize + 'rpx', borderRadius: (selectedAvatarSize / 2) + 'rpx' }">
              <text class="avatar-text" :style="{ fontSize: (selectedAvatarSize * 0.4) + 'rpx' }">{{ getAvatarText() }}</text>
            </view>
          </view>
          
          <!-- 用户信息 -->
          <view class="user-info">
            <text class="user-name">{{ getDisplayName() }}</text>
            
            <!-- 用户标签 -->
            <view class="user-tags" v-if="userInfo.userType && (userInfo.userType === '学生' || userInfo.userType === '老师')">
              <view class="tag" :class="userInfo.userType === '学生' ? 'tag-student' : 'tag-teacher'">
                <text class="tag-icon">{{ userInfo.userType === '学生' ? '🎓' : '👨‍🏫' }}</text>
                <text class="tag-text">{{ userInfo.userType }}</text>
              </view>
            </view>
            
            <!-- 个性签名 -->
            <text class="user-signature" v-if="userInfo.signature">{{ userInfo.signature }}</text>
            <text class="user-signature placeholder" v-else>点击编辑个人资料</text>
          </view>
          
        </view>
      </view>
        
      <!-- 未登录状态 -->
      <view class="login-card" v-if="!isLoggedIn">
        <view class="login-avatar">👤</view>
        <view class="login-info">
          <text class="login-title">欢迎使用历小包</text>
          <text class="login-desc">登录后享受更多功能</text>
        </view>
        <button class="login-btn" @click="goToLogin">登录</button>
      </view>

    <!-- 设置功能 -->
    <view class="settings-section" v-if="isLoggedIn">
      <view class="settings-card" @click="goToSettings">
        <text class="setting-icon">⚙️</text>
        <text class="setting-text">设置</text>
        <text class="setting-arrow">></text>
      </view>
    </view>

      <!-- 客服功能 -->
      <view class="customer-service-section" v-if="isLoggedIn">
        <view 
          class="customer-service-btn" 
          @click="showContactModal"
        >
          <view class="service-content">
            <text class="service-icon">💬</text>
            <text class="service-text">联系客服</text>
            <text class="service-arrow">></text>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <!-- 客服联系弹窗 -->
    <view class="contact-modal" v-if="showModal" @click="hideContactModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">联系客服</text>
          <text class="modal-close" @click="hideContactModal">×</text>
        </view>
        <view class="modal-body">
          <text class="modal-text">请选择联系方式：</text>
          <view class="contact-options">
            <button class="contact-btn" open-type="contact" @contact="handleContact" session-from="个人中心">
              <text class="contact-icon">💬</text>
              <text class="contact-text">微信客服</text>
            </button>
            <view class="contact-btn" @click="copyWechat">
              <text class="contact-icon">📱</text>
              <text class="contact-text">复制微信号</text>
            </view>
          </view>
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
      statusBarHeight: 0,
      isLoggedIn: false,
      userInfo: {},
      selectedAvatarSize: 160,
      showModal: false
    }
  },
  mounted() {
    this.getStatusBarHeight();
    this.checkLoginStatus();
  },
  onLoad() {
    this.checkLoginStatus();
    this.loadAvatarSize();
    this.loadCareMode();
  },
  onShow() {
    this.checkLoginStatus();
    this.loadAvatarSize();
    this.loadCareMode(); // 确保从设置页面返回时重新加载关怀模式状态
  },
  methods: {
    // 检查登录状态
    checkLoginStatus() {
      const userInfo = uni.getStorageSync('userInfo');
      const isLoggedIn = uni.getStorageSync('isLoggedIn');
      
      this.isLoggedIn = isLoggedIn === true || isLoggedIn === 'true' || isLoggedIn === 1 || isLoggedIn === '1';
      this.userInfo = userInfo || {};
      
      // 调试信息
      console.log('用户信息:', this.userInfo);
      console.log('用户类型:', this.userInfo.userType);
    },
    
    // 跳转到登录页面
    goToLogin() {
      uni.reLaunch({
        url: '/pages/login/login'
      });
    },
    
    // 编辑资料
    editProfile() {
      uni.navigateTo({
        url: '/pages/profile/edit-profile'
      });
    },
    
    // 获取显示名称
    getDisplayName() {
      // 优先显示昵称
      if (this.userInfo.nickName && this.userInfo.nickName.trim()) {
        return this.userInfo.nickName.trim();
      }
      // 其次显示真实姓名
      if (this.userInfo.name && this.userInfo.name.trim()) {
        return this.userInfo.name.trim();
      }
      // 如果有手机号，显示星号遮挡的手机号
      if (this.userInfo.phone && this.userInfo.phone.trim()) {
        return this.maskPhoneNumber(this.userInfo.phone);
      }
      // 默认提示
      return '点击设置昵称';
    },
    
    // 手机号星号遮挡
    maskPhoneNumber(phone) {
      if (!phone || phone.length < 11) {
        return phone;
      }
      // 保留前3位和后4位，中间用星号遮挡
      return phone.substring(0, 3) + '****' + phone.substring(7);
    },
    
    // 获取头像文字
    getAvatarText() {
      if (this.userInfo.nickName) {
        return this.userInfo.nickName.charAt(0).toUpperCase();
      } else if (this.userInfo.name) {
        return this.userInfo.name.charAt(0).toUpperCase();
      }
      return '👤';
    },
    
    // 处理头像加载错误
    handleAvatarError() {
      console.log('头像加载失败，使用默认头像');
      this.userInfo.avatarUrl = '';
    },
    
    
    // 加载头像大小设置
    loadAvatarSize() {
      const savedSize = uni.getStorageSync('avatarSize');
      if (savedSize) {
        this.selectedAvatarSize = savedSize;
      }
    },
    
    // 获取状态栏高度
    getStatusBarHeight() {
      const systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight || 0;
    },
    
    // 处理客服联系
    // 显示客服联系弹窗
    showContactModal() {
      this.showModal = true;
    },
    
    // 隐藏客服联系弹窗
    hideContactModal() {
      this.showModal = false;
    },
    
    // 处理微信客服联系
    handleContact(e) {
      console.log('客服联系事件:', e.detail);
      console.log('客服路径:', e.detail.path);
      console.log('客服查询参数:', e.detail.query);
      
      // 关闭弹窗
      this.hideContactModal();
      
      // 显示转接提示
      uni.showToast({
        title: '正在为您转接客服',
        icon: 'loading',
        duration: 1500
      });
    },
    
    // 复制微信号
    copyWechat() {
      const wechatId = 'lixiaobao_service'; // 替换为实际的微信号
      uni.setClipboardData({
        data: wechatId,
        success: () => {
          this.hideContactModal();
          uni.showToast({
            title: '微信号已复制',
            icon: 'success',
            duration: 2000
          });
        },
        fail: () => {
          uni.showToast({
            title: '复制失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
    
    // 跳转到设置页面
    goToSettings() {
      uni.navigateTo({
        url: '/pages/settings/settings'
      });
    },
    
    // 跳转到个人资料编辑页面
    goToProfile() {
      uni.navigateTo({
        url: '/pages/profile/edit-profile'
      });
    },
    
    
  }
}
</script>

<style scoped>
/* 基础样式 */
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #aaaaff 10%, #aaaaff 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 头部样式 */
.header {
  text-align: center;
  margin-top: 0%;
  padding: 150rpx 40rpx 100rpx 40rpx;
}

.main-title {
  font-size: 60rpx;
  font-weight: bold;
  color: #ffffff; /* 主色调文字 */
  line-height: 1.5;
}

/* 内容区域 */
.content {
  padding: 0 30rpx 30rpx 30rpx;
  box-sizing: border-box;
}

/* 名片卡片区域 */
.card-section {
  margin-bottom: 40rpx;
}

.user-card {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 40rpx;
  padding: 80rpx 50rpx 60rpx 50rpx;
  box-shadow: 0 25rpx 80rpx rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20rpx);
  overflow: hidden;
  transition: all 0.3s ease;
  margin: 0 10rpx;
}

.user-card:active {
  transform: translateY(4rpx);
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
}

/* 背景装饰 */
.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
}

.circle-1 {
  width: 200rpx;
  height: 200rpx;
  top: -100rpx;
  right: -50rpx;
}

.circle-2 {
  width: 150rpx;
  height: 150rpx;
  bottom: -75rpx;
  left: -30rpx;
}

.circle-3 {
  width: 100rpx;
  height: 100rpx;
  top: 50%;
  right: 20rpx;
}

/* 头像容器 */
.avatar-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 40rpx;
  z-index: 1;
}

.user-avatar {
  border: 8rpx solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.2);
  object-fit: cover;
}

.default-avatar {
  background:linear-gradient(135deg, #9797e2 0%,  #aaaaff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}



/* 用户信息 */
.user-info {
  text-align: center;
  margin-bottom: 40rpx;
  z-index: 1;
  position: relative;
}

.user-name {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
  line-height: 1.3;
}


/* 用户标签 */
.user-tags {
  display: flex;
  justify-content: center;
  margin-bottom: 24rpx;
}

.tag {
  display: flex;
  align-items: center;
  padding: 12rpx 28rpx;
  border-radius: 35rpx;
  font-size: 28rpx;
  font-weight: 600;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.15);
}

.tag-student {
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  color: white;
}

.tag-teacher {
  background: linear-gradient(135deg, #ff6b8b 0%, #ee5a52 100%);
  color: white;
}

.tag-icon {
  font-size: 24rpx;
  margin-right: 10rpx;
}

.tag-text {
  font-size: 28rpx;
}

/* 个性签名 */
.user-signature {
  font-size: 30rpx;
  color: #666;
  line-height: 1.6;
  display: block;
  max-width: 100%;
  word-wrap: break-word;
}

.user-signature.placeholder {
  color: #999;
  font-style: italic;
}


/* 登录卡片 */
.login-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20rpx);
}

.login-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50rpx;
  background: #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #6c757d;
  flex-shrink: 0;
}

.login-info {
  flex: 1;
}

.login-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
}

.login-desc {
  font-size: 26rpx;
  color: #666;
  display: block;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25rpx;
  padding: 16rpx 32rpx;
  font-size: 26rpx;
  font-weight: bold;
}

/* 设置功能 */
.settings-section {
  margin-top: 30rpx;
}

.settings-card {
  display: flex;
  align-items: center;
  padding: 30rpx 40rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20rpx);
  transition: background-color 0.2s ease;
}

.settings-card:active {
  background-color: rgba(102, 126, 234, 0.05);
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

/* 客服功能 */
.customer-service-section {
  margin-top: 30rpx;
}

.customer-service-btn {
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 24rpx;
  padding: 0;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20rpx);
  overflow: hidden;
  transition: all 0.3s ease;
}

.customer-service-btn::after {
  border: none;
}

.customer-service-btn:active {
  transform: translateY(2rpx);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.service-content {
  display: flex;
  align-items: center;
  padding: 30rpx 40rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.service-icon {
  font-size: 36rpx;
  margin-right: 30rpx;
  width: 40rpx;
  text-align: center;
}

.service-text {
  flex: 1;
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}

.service-arrow {
  font-size: 28rpx;
  color: #ccc;
}


/* 关怀模式样式 */
.container.care-mode {
  font-size: 1.2em;
}

.container.care-mode .user-name {
  font-size: 60rpx;
}

.container.care-mode .setting-text {
  font-size: 36rpx;
}

/* 客服联系弹窗 */
.contact-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 20rpx;
  width: 600rpx;
  max-width: 90%;
  overflow: hidden;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.modal-close {
  font-size: 40rpx;
  color: #999;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f5f5f5;
}

.modal-body {
  padding: 30rpx;
}

.modal-text {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 30rpx;
  text-align: center;
}

.contact-options {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.contact-btn {
  display: flex;
  align-items: center;
  padding: 24rpx 30rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
  border: 1rpx solid #e9ecef;
  transition: all 0.3s ease;
}

.contact-btn:active {
  background: #e9ecef;
  transform: scale(0.98);
}

.contact-btn::after {
  border: none;
}

.contact-icon {
  font-size: 36rpx;
  margin-right: 20rpx;
}

.contact-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

/* 关怀模式下的弹窗 */
.container.care-mode .modal-title {
  font-size: 36rpx;
}

.container.care-mode .modal-text {
  font-size: 32rpx;
}

.container.care-mode .contact-text {
  font-size: 32rpx;
}

.container.care-mode .contact-btn {
  padding: 30rpx 36rpx;
}

.container.care-mode .settings-title {
  font-size: 38rpx;
}

.container.care-mode .service-text {
  font-size: 36rpx;
}

.container.care-mode .setting-icon,
.container.care-mode .service-icon {
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

/* 响应式调整 */
@media (max-width: 375px) {
  .content {
    padding: 0 20rpx 20rpx 20rpx;
  }
  
  .user-card {
    padding: 50rpx 30rpx 30rpx 30rpx;
  }
  
  .main-title {
    font-size: 42rpx;
  }
}
</style>