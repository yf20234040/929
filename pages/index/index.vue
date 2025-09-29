<template>
  <view class="container" :class="{ 'care-mode': careMode }">
    <!-- 页面内容区域，配合keep-alive缓存 -->
    <keep-alive>
      <HomeTab v-if="currentTab === 0" />
      <DocumentsTab v-else-if="currentTab === 1" />
      <TeamTab v-else-if="currentTab === 3" />
      <ProfileTab v-else-if="currentTab === 4" />
    </keep-alive>

    <!-- 自定义底部导航栏 -->
    <view class="custom-tabbar" :style="{ paddingBottom: safeBottom }">
      <!-- 首页 -->
      <view class="tabbar-item" @click="switchTab(0)">
        <view class="tabbar-icon">🏠</view>
        <text class="tabbar-text" :class="{ active: currentTab === 0 }">首页</text>
      </view>
      <!-- 媒体 -->
      <view class="tabbar-item" @click="switchTab(1)">
        <view class="tabbar-icon">📄</view>
        <text class="tabbar-text" :class="{ active: currentTab === 1 }">实践</text>
      </view>
      <!-- 占位符（平衡AI按钮居中） -->
      <view class="tabbar-spacer"></view>

      <!-- 工具箱按钮（暂时禁用AI功能） -->
      <view class="tabbar-item ai-button" @click="showComingSoon">
        <view class="toolbox-circle">
          <!-- 圆形裁剪Logo，优先用预处理好的圆形图 -->
          <image 
            class="toolbox-img" 
            src="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/logo.jpg" 
            mode="aspectFill" 
            @error="handleImgError"
          />
        </view>
      </view>

      <!-- 占位符（平衡AI按钮居中） -->
      <view class="tabbar-spacer"></view>
      <!-- 团队 -->
      <view class="tabbar-item" @click="switchTab(3)">
        <view class="tabbar-icon">👥</view>
        <text class="tabbar-text" :class="{ active: currentTab === 3 }">团队</text>
      </view>
      <!-- 我的 -->
      <view class="tabbar-item" @click="switchTab(4)">
        <view class="tabbar-icon profile-icon">👤</view>
        <text class="tabbar-text" :class="{ active: currentTab === 4 }">我</text>
      </view>
    </view>
  </view>
</template>

<script>
// 引入各页面组件（移除AiTab组件引用，因为它是独立页面）
import HomeTab from './HomeTab.vue'
import DocumentsTab from './DocumentsTab.vue'
import TeamTab from './TeamTab.vue'
import ProfileTab from './ProfileTab.vue'
import careModeMixin from '@/mixins/careMode.js'

export default {
  mixins: [careModeMixin],
  name: 'TabBarContainer',
  components: { HomeTab, DocumentsTab, TeamTab, ProfileTab },
  data() {
    return {
      currentTab: 0, // 当前激活的标签
      safeBottom: '0px', // 安全区域底部间距
      tabbarHeight: '120rpx' // 导航栏高度
    }
  },
  methods: {
    // 切换标签逻辑
    switchTab(idx) {
      this.currentTab = idx;
      
      // 如果是切换到个人中心，检查登录状态
      if (idx === 4) {
        setTimeout(() => {
          this.checkLoginStatus();
        }, 100);
      }
    },
    // 跳转到项目中心页面
    showComingSoon() {
      uni.navigateTo({
        url: '/pages/index/AiTab',
        fail: (err) => {
          console.error('跳转项目中心失败:', err)
          uni.showToast({
            title: '页面不存在',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    // 处理图片加载错误
    handleImgError(e) {
      e.target.src = '/static/logo.jpg' // 替换为默认图片路径
    },
    
    // 检查登录状态
    checkLoginStatus() {
      const isLoggedIn = uni.getStorageSync('isLoggedIn')
      // 不强制跳转，让用户先看到首页内容
    }
  },
  onLoad(options) {
    // 处理tab参数
    if (options.tab) {
      const tabIndex = parseInt(options.tab);
      if (tabIndex >= 0 && tabIndex <= 4) {
        this.currentTab = tabIndex;
      }
    }
    
    // 检查登录状态
    this.checkLoginStatus()
    
    // 获取设备安全区域信息
    try {
      const sysInfo = uni.getSystemInfoSync()
      this.safeBottom = sysInfo.safeAreaInsets 
        ? `${sysInfo.safeAreaInsets.bottom}px` 
        : '0px'
      // 计算导航栏总高度（基础高度 + 安全区域底部）
      this.tabbarHeight = `${120 + (sysInfo.safeAreaInsets?.bottom || 0)}rpx`
    } catch (e) {
      console.error('获取系统信息失败:', e)
    }
  },
  
  onShow() {
    // 不强制检查登录状态，让用户自由浏览
  }
}
</script>

<style scoped>
/* 导航栏基础样式 */
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120rpx;
  background: #fff5f7; /* 浅粉色背景 */
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 20rpx;
  box-shadow: 0 -2rpx 15rpx rgba(255, 192, 203, 0.2); /* 粉色阴影 */
  z-index: 100;
  border-top: 1rpx solid #ffe6ec;
}

/* 标签项通用样式 */
.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100rpx;
  height: 100%;
  transition: all 0.3s ease;
  z-index: 1;
}

/* 占位符（用于居中AI按钮） */
.tabbar-spacer {
  width: 110rpx;
  height: 1rpx;
  pointer-events: none;
}

/* 图标样式 */
.tabbar-icon {
  font-size: 42rpx;
  margin-bottom: 0rpx;
  transition: all 0.3s ease;
  transform: translateY(5rpx);
}

/* 个人中心图标特殊处理 */
.profile-icon {
  font-size: 38rpx;
  transform: translateY(7rpx);
}

/* 文字样式 */
.tabbar-text {
  font-size: 24rpx;
  margin-top: 5rpx;
  color: #d4b2bc; /* 淡粉色文字 */
  transition: all 0.3s ease;
  font-weight: 500;
}

/* 激活态文字样式 */
.tabbar-text.active {
  font-weight: bold;
  transform: scale(1.05);
}

/* 点击反馈动画 */
.tabbar-item:active .tabbar-icon {
  transform: scale(1.3) translateY(5rpx);
  filter: brightness(1.2);
}

/* AI按钮特殊样式 */
.ai-button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-38rpx);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 按钮圆形容器 */
.toolbox-circle {
  width: 120rpx;
  height: 120rpx;
  background: linear-gradient(135deg, #FF4B91, #FF69B4, #FF85A2);
  background-image: 
    linear-gradient(135deg, #FF4B91, #FF69B4, #FF85A2),
    linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6rpx 20rpx rgba(255, 75, 145, 0.4);
  border: 8rpx solid #ffffff;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

/* Logo图片样式（圆形裁剪） */
.toolbox-img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* 强制圆形裁剪 */
  object-fit: cover; /* 保持比例并覆盖容器 */
}

/* 光泽效果装饰 */
.toolbox-circle::after {
  content: '';
  position: absolute;
  top: -30%;
  left: -30%;
  width: 60%;
  height: 60%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transform: rotate(30deg);
}

/* AI按钮点击反馈 */
.ai-button:active .toolbox-circle {
  transform: scale(1.15) rotate(8deg);
  box-shadow: 0 10rpx 30rpx rgba(255, 75, 145, 0.6);
  filter: brightness(1.1);
  border-color: #fff0f5;
}

/* 悬停动画 */
.tabbar-item:hover .tabbar-icon {
  transform: translateY(5rpx) scale(1.2);
  text-shadow: 0 0 10rpx currentColor;
  filter: brightness(1.2);
}

.ai-button:hover .toolbox-circle {
  transform: scale(1.05);
  box-shadow: 0 8rpx 25rpx rgba(255, 75, 145, 0.5);
}


</style>
    