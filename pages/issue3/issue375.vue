<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">研学视频记录</text>
        <text class="page-subtitle"></text>
      </view>
      <view class="header-decoration">
        <view class="decoration-circle"></view>
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 视频画廊 -->
    <view class="video-gallery">
      <view
        v-for="(video, index) in videoList"
        :key="index"
        class="video-card"
        :class="'card-' + (index % 4)"
      >
        <!-- 视频播放器容器 -->
        <view class="video-container">
          <video
            :src="video.url"
            controls
            class="video-player"
            poster="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/static/play.png"
            :id="'video-' + index"
            @play="handlePlay(index)"
          ></video>
        </view>

        <!-- 视频信息卡片 -->
        <view class="video-info">
          <view class="video-title-container">
            <text class="video-title">{{ video.name }}</text>
            <view class="video-badge">
              <text class="badge-text">微课</text>
            </view>
          </view>
          <view class="video-meta">
            <text class="meta-item">📚 历史教育</text>
            <text class="meta-item">🎬 视频内容</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部装饰 -->
    <view class="bottom-decoration">
      <view class="decoration-dots">
        <view class="dot"></view>
        <view class="dot"></view>
        <view class="dot"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoList: [
        { name: "研学视频", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%A0%94%E5%AD%A6%E8%A7%86%E9%A2%91.mp4" },
        
	  ],
      currentPlaying: -1, // 当前播放的视频索引
      videoCtxCache: {} // 缓存视频上下文
    };
  },
  methods: {
    // 处理视频播放事件
    handlePlay(index) {
      // 避免重复处理同一视频
      if (this.currentPlaying === index) return;

      // 暂停之前播放的视频
      if (this.currentPlaying !== -1) {
        // 安全获取视频上下文（兼容动态创建场景）
        const prevCtx = this.videoCtxCache[this.currentPlaying] || uni.createVideoContext(`video-${this.currentPlaying}`, this);
        prevCtx.pause();
      }

      // 更新当前播放索引
      this.currentPlaying = index;
      // 缓存当前视频上下文
      this.videoCtxCache[index] = uni.createVideoContext(`video-${index}`, this);
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background:  #DCEEFF;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
}

.page-header {
  margin-bottom: 60rpx;
  position: relative;
}

.header-content {
  text-align: center;
  margin-bottom: 30rpx;
}

.page-title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #9494de;
  margin-bottom: 16rpx;
  text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.3);
}

.page-subtitle {
  display: block;
  font-size: 28rpx;
  color: #9494de;
  font-weight: 300;
}

.header-decoration {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20rpx;
}

.decoration-circle {
  width: 12rpx;
  height: 12rpx;
  background: #ffffff;
  border-radius: 50%;
  opacity: 0.8;
}

.decoration-line {
  width: 60rpx;
  height: 3rpx;
  background: linear-gradient(90deg, transparent, #ffffff, transparent);
  border-radius: 2rpx;
}

.video-gallery {
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.video-card {
  background: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.15);
  transition: all 0.3s ease;
  position: relative;
}

.video-card:hover {
  transform: translateY(-8rpx);
  box-shadow: 0 16rpx 48rpx rgba(0,0,0,0.2);
}

.card-0 { border-left: 6rpx solid #ff6b6b; }
.card-1 { border-left: 6rpx solid #4ecdc4; }
.card-2 { border-left: 6rpx solid #45b7d1; }
.card-3 { border-left: 6rpx solid #96ceb4; }

.video-container {
  position: relative;
  background: #f8f9fa;
}

.video-player {
  width: 100%;
  height: 400rpx;
  display: block;
}

.video-info {
  padding: 30rpx;
}

.video-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.video-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #2c3e50;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-badge {
  background: linear-gradient(135deg, #667eea, #55aaff);
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  margin-left: 20rpx;
}

.badge-text {
  color: #ffffff;
  font-size: 22rpx;
  font-weight: 500;
}

.video-meta {
  display: flex;
  gap: 20rpx;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 24rpx;
  color: #7f8c8d;
  background: #f8f9fa;
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
}

.bottom-decoration {
  margin-top: 60rpx;
  display: flex;
  justify-content: center;
}

.decoration-dots {
  display: flex;
  gap: 16rpx;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  background: rgba(255,255,255,0.6);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.dot:nth-child(2) { animation-delay: 0.3s; }
.dot:nth-child(3) { animation-delay: 0.6s; }

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@media (max-width: 750rpx) {
  .container { padding: 30rpx 20rpx; }
  .page-title { font-size: 40rpx; }
  .video-info { padding: 24rpx; }
  .video-title { font-size: 28rpx; }
}
</style>