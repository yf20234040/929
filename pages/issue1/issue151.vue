<template>
  <view class="container">
    <!-- 内容区 - 两栏网格布局 -->
    <view class="content">
      <view class="grid-layout">
        <!-- 循环展示媒体内容 -->
        <view class="media-card" 
              v-for="(item, index) in mediaList" 
              :key="index"
              @click="openPreview(item)">
          
          <!-- 媒体容器 -->
          <view class="media-container">
            <!-- 图片展示 -->
            <image v-if="item.type === 'image'" 
                   :src="item.url" 
                   class="media-item" 
                   mode="aspectFill"
                   lazy-load>
            </image>
            
            <!-- 视频展示 - 使用封面图替代视频组件，彻底阻止初始播放 -->
            <view v-if="item.type === 'video'" class="video-placeholder">
              <image :src="item.coverUrl || defaultVideoCover" 
                     class="media-item" 
                     mode="aspectFill"
                     lazy-load>
              </image>
              <!-- 视频标识 -->
              <view class="video-tag">
                <text class="play-icon">▶</text>
              </view>
            </view>
          </view>
          
          <!-- 内容描述 -->
          <view class="media-desc">
            <text>{{ item.description }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 预览层 -->
    <view v-if="previewVisible" class="preview-overlay">
      <view class="preview-container">
        <!-- 预览内容 -->
        <view class="preview-content">
          <!-- 图片预览 - 点击关闭 -->
          <image v-if="currentMedia && currentMedia.type === 'image'" 
                 :src="currentMedia.url" 
                 class="preview-image" 
                 mode="widthFix"
                 @click="closePreview">
          </image>
          
          <!-- 视频预览 - 双击全屏 -->
          <video v-if="currentMedia && currentMedia.type === 'video'" 
                 :src="currentMedia.url" 
                 class="preview-video" 
                 :controls="false"
                 :autoplay="isPlaying"
                 :loop="false"
                 :enable-fullscreen="true"
                 @timeupdate="updateProgress"
                 @ended="onVideoEnded"
                 @tap="handleVideoTap"
                 id="videoPlayer">
          </video>
        </view>
        
        <!-- 视频控制区 (仅视频显示) -->
        <view v-if="currentMedia && currentMedia.type === 'video'" class="video-controls">
          <!-- 播放/暂停按钮 -->
          <view class="control-btn play-pause-btn" @click="togglePlayPause">
            <text class="control-icon">{{ isPlaying ? '||' : '▶' }}</text>
          </view>
          
          <!-- 进度条 -->
          <view class="progress-container">
            <view class="video-progress" @click="seekVideo">
              <view class="progress-bar" :style="{ width: progress + '%' }"></view>
              <view class="progress-thumb" :style="{ left: progress + '%' }"></view>
            </view>
            <view class="time-display">
              <text>{{ formatTime(currentTime) }}</text>
              <text>/</text>
              <text>{{ formatTime(duration) }}</text>
            </view>
          </view>
          
          <!-- 缩小按钮 -->
          <view class="control-btn close-btn" @click="closePreview">
            <text class="control-icon">↩</text>
          </view>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 默认视频封面图
      defaultVideoCover: 'https://picsum.photos/400/560?grayscale&blur=2',
      // 媒体资源列表 - 仅保留您存入的内容
      mediaList: [
        {
          id: 1,
          type: 'image',
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/2.26%E8%B8%A9%E7%82%B9/1280X1280%20%281%29.JPEG',
          description: '2.26踩点'
        },
        {
          id: 2,
          type: 'video',
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/2.26%E8%B8%A9%E7%82%B9/2.26%E5%AE%9E%E5%9C%B0%E8%B0%83%E7%A0%94%EF%BC%88%E8%B8%A9%E7%82%B9%EF%BC%89.mp4',
          coverUrl: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/2.26%E8%B8%A9%E7%82%B9/1280X1280%20%281%29.JPEG', // 视频封面图
          description: '2.26实地调研（踩点）.mp4'
        },
        {
          id: 3,
          type: 'image',
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/2.26%E8%B8%A9%E7%82%B9/1280X1280%20%282%29.JPEG',
          description: '2.26踩点'
        },
        {
          id: 4,
          type: 'image',
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/2.26%E8%B8%A9%E7%82%B9/1280X1280.JPEG',
          description: '2.26踩点'
        }
      ],
      // 预览相关
      previewVisible: false,
      currentMedia: null,
      // 视频相关状态
      progress: 0,
      currentTime: 0,
      duration: 0,
      isPlaying: true,
      // 双击检测
      lastTapTime: 0,
      tapCount: 0
    };
  },
  methods: {
    // 打开预览 - 点击视频后直接放大播放
    openPreview(item) {
      this.currentMedia = item;
      this.previewVisible = true;
      
      // 视频默认自动播放
      if (item.type === 'video') {
        this.isPlaying = true;
        this.progress = 0;
        this.currentTime = 0;
        this.duration = 0;
        
        // 确保视频正确加载并播放
        setTimeout(() => {
          const videoContext = uni.createVideoContext('videoPlayer', this);
          videoContext.play();
        }, 100);
      }
    },
    
    // 关闭预览
    closePreview() {
      // 暂停预览视频
      if (this.currentMedia && this.currentMedia.type === 'video') {
        const videoContext = uni.createVideoContext('videoPlayer', this);
        videoContext.pause();
      }
      
      this.previewVisible = false;
      this.currentMedia = null;
    },
    
    // 更新视频进度
    updateProgress(e) {
      this.currentTime = e.detail.currentTime;
      this.duration = e.detail.duration;
      
      if (this.duration > 0) {
        this.progress = (this.currentTime / this.duration) * 100;
      }
    },
    
    // 视频播放结束
    onVideoEnded() {
      this.isPlaying = false;
      this.progress = 100;
    },
    
    // 切换播放/暂停
    togglePlayPause() {
      const videoContext = uni.createVideoContext('videoPlayer', this);
      if (this.isPlaying) {
        videoContext.pause();
      } else {
        videoContext.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    
    // 处理视频点击 - 检测双击
    handleVideoTap() {
      const now = Date.now();
      const lastTime = this.lastTapTime;
      
      // 双击检测（300ms内连续点击）
      if (now - lastTime < 300) {
        // 双击事件 - 全屏播放
        const videoContext = uni.createVideoContext('videoPlayer', this);
        videoContext.requestFullScreen({ direction: 90 });
        this.tapCount = 0;
      } else {
        // 单击事件 - 切换播放状态
        this.togglePlayPause();
        this.tapCount = 1;
      }
      
      this.lastTapTime = now;
    },
    
    // 视频进度条点击跳转
    seekVideo(e) {
      if (!this.duration) return;
      
      // 计算点击位置对应的时间
      const progressWidth = e.currentTarget.offsetWidth;
      const clickPosition = e.detail.x;
      const seekPercentage = clickPosition / progressWidth;
      const seekTime = seekPercentage * this.duration;
      
      // 跳转到指定时间
      const videoContext = uni.createVideoContext('videoPlayer', this);
      videoContext.seek(seekTime);
      this.currentTime = seekTime;
      this.progress = seekPercentage * 100;
    },
    
    // 格式化时间（秒 -> MM:SS）
    formatTime(seconds) {
      if (!seconds || isNaN(seconds) || seconds < 0) return "00:00";
      
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: env(safe-area-inset-top);
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 8px;
}

/* 网格布局 */
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

/* 媒体卡片 */
.media-card {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.media-card:active {
  transform: scale(0.98);
}

/* 媒体容器 */
.media-container {
  position: relative;
  width: 100%;
  padding-top: 140%; /* 4:5.6 比例 */
}

.media-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 视频占位容器 - 用图片替代视频组件 */
.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 视频标识 */
.video-tag {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  backdrop-filter: blur(2px);
}

.play-icon {
  color: #ffffff;
  font-size: 16px;
  line-height: 1;
}

/* 媒体描述 */
.media-desc {
  padding: 8px;
  font-size: 14px;
  color: #333333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

/* 预览层样式 */
.preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

.preview-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.preview-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
}

.preview-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 视频控制区 */
.video-controls {
  display: flex;
  align-items: center;
  padding: 15px 16px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
}

.control-btn {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.2s;
  margin: 0 5px;
}

.control-btn:active {
  background-color: rgba(255, 255, 255, 0.4);
  transform: scale(0.95);
}

.control-icon {
  font-size: 20px;
  color: #ffffff;
  line-height: 1;
}

.progress-container {
  flex: 1;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 视频进度条 */
.video-progress {
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  position: relative;
  border-radius: 2px;
}

.progress-bar {
  height: 100%;
  background-color: #007aff;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.progress-thumb {
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: #007aff;
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.time-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

</style>
    