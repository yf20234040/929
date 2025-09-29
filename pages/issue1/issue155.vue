<template>
  <view class="media-gallery">
    <!-- 缩略图浏览模式 -->
    <view class="thumbnail-grid" v-if="!isDetailMode">
      <view 
        class="media-item" 
        v-for="(item, index) in mediaList" 
        :key="index"
        @tap="enterDetailMode(index)"
        @longpress="showActionSheet(index)"
      >
        <!-- 图片缩略图 -->
        <image 
          v-if="item.type === 'image'"
          :src="item.url" 
          class="media-thumbnail"
          mode="aspectFill"
        ></image>
        
        <!-- 视频缩略图 -->
        <view v-if="item.type === 'video'" class="video-thumbnail-container">
          <image 
            :src="getVideoThumbnail(item.url)" 
            class="media-thumbnail"
            mode="aspectFill"
          ></image>
          <view class="video-play-icon">
            <view class="play-triangle"></view>
          </view>
        </view>
        
        <!-- 媒体类型标记 -->
        <view class="media-type-tag" :class="item.type">
          {{ item.type === 'image' ? '图片' : '视频' }}
        </view>
      </view>
    </view>
    
    <!-- 详情浏览模式 -->
    <view class="detail-view" v-if="isDetailMode">
      <!-- 图片详情 -->
      <view v-if="currentMedia.type === 'image'" class="image-detail">
        <image 
          :src="currentMedia.url" 
          class="detail-image"
          mode="widthFix"
          @longpress="showActionSheet(currentIndex)"
          @tap="exitDetailMode"
        ></image>
      </view>
      
      <!-- 视频详情 -->
      <view v-if="currentMedia.type === 'video'" class="video-detail">
        <video
          :src="currentMedia.url"
          class="detail-video"
          :controls="true"
          :autoplay="true"
          @longpress="showActionSheet(currentIndex)"
          @tap="toggleVideoControls"
        ></video>
        <view class="video-tip" v-if="!showVideoControls">点击显示控制栏</view>
      </view>
      
      <!-- 左右切换指示器 -->
      <view class="nav-indicator left" @tap="prevMedia" v-if="currentIndex > 0">
        <view class="arrow"></view>
      </view>
      <view class="nav-indicator right" @tap="nextMedia" v-if="currentIndex < mediaList.length - 1">
        <view class="arrow"></view>
      </view>
      
      <!-- 页码指示器 -->
      <view class="page-indicator">
        <text>{{ currentIndex + 1 }} / {{ mediaList.length }}</text>
      </view>
      
      <!-- 返回按钮（使用静态图标） -->
      <view class="back-btn" @tap="exitDetailMode">
        <image 
          src="/static/最小化.png" 
          mode="widthFix" 
          class="back-img"
          alt="返回按钮"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 媒体列表
      mediaList: [
        { 'url': 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/7.27%E7%BA%BF%E4%B8%8B%E9%85%8D%E9%9F%B3/1.jpg', 'type': 'image' },
        { 'url': 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/7.27%E7%BA%BF%E4%B8%8B%E9%85%8D%E9%9F%B3/2.jpg', 'type': 'image' },
        { 'url': 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/7.27%E7%BA%BF%E4%B8%8B%E9%85%8D%E9%9F%B3/3.jpg', 'type': 'image' },
        { 'url': 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/7.27%E7%BA%BF%E4%B8%8B%E9%85%8D%E9%9F%B3/4.jpg', 'type': 'image' },
        { 'url': 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/7.27%E7%BA%BF%E4%B8%8B%E9%85%8D%E9%9F%B3/5.jpg', 'type': 'image' },
        { 'url': 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/7.27%E7%BA%BF%E4%B8%8B%E9%85%8D%E9%9F%B3/6.jpg', 'type': 'image' },
        { 'url': 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/7.27%E7%BA%BF%E4%B8%8B%E9%85%8D%E9%9F%B3/7.mp4', 'type': 'video' }
      ],
      
      // 状态管理
      isDetailMode: false,
      currentIndex: 0,
      showVideoControls: true
    };
  },
  
  computed: {
    // 当前显示的媒体
    currentMedia() {
      return this.mediaList[this.currentIndex] || {};
    }
  },
  
  onLoad() {
    // 初始化小程序环境信息
    const systemInfo = uni.getSystemInfoSync();
    this.screenWidth = systemInfo.screenWidth;
    this.screenHeight = systemInfo.screenHeight;
  },
  
  methods: {
    // 进入详情模式
    enterDetailMode(index) {
      this.currentIndex = index;
      this.isDetailMode = true;
      uni.hideNavigationBarLoading();
    },
    
    // 退出详情模式
    exitDetailMode() {
      this.isDetailMode = false;
      uni.showNavigationBarLoading();
    },
    
    // 获取视频缩略图
    getVideoThumbnail(videoUrl) {
      return this.mediaList[0].url;
    },
    
    // 上一个媒体
    prevMedia() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.resetVideoState();
      }
    },
    
    // 下一个媒体
    nextMedia() {
      if (this.currentIndex < this.mediaList.length - 1) {
        this.currentIndex++;
        this.resetVideoState();
      }
    },
    
    // 重置视频状态
    resetVideoState() {
      if (this.currentMedia.type === 'video') {
        this.showVideoControls = true;
      }
    },
    
    // 切换视频控制栏显示
    toggleVideoControls() {
      this.showVideoControls = !this.showVideoControls;
    },
    
    // 显示操作菜单
    showActionSheet(index) {
      const item = this.mediaList[index];
      const itemList = ['保存到相册'];
      
      if (item.type === 'video') {
        itemList.push('发送给朋友');
      }
      
      uni.showActionSheet({
        itemList: itemList,
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              this.downloadMedia(index);
              break;
            case 1:
              this.shareMedia(index);
              break;
          }
        }
      });
    },
    
    // 下载媒体
    downloadMedia(index) {
      const item = this.mediaList[index];
      uni.showLoading({
        title: item.type === 'image' ? '图片保存中...' : '视频保存中...',
        mask: true
      });
      
      uni.downloadFile({
        url: item.url,
        success: (res) => {
          if (res.statusCode === 200) {
            if (item.type === 'image') {
              this.saveImageToPhotosAlbum(res.tempFilePath);
            } else {
              this.saveVideoToPhotosAlbum(res.tempFilePath);
            }
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '下载失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('下载失败:', err);
          uni.showToast({
            title: '下载失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 保存图片到相册
    saveImageToPhotosAlbum(filePath) {
      uni.saveImageToPhotosAlbum({
        filePath: filePath,
        success: () => {
          uni.hideLoading();
          uni.showToast({
            title: '图片已保存',
            icon: 'success'
          });
        },
        fail: (err) => {
          this.handleSaveError(err);
        }
      });
    },
    
    // 保存视频到相册
    saveVideoToPhotosAlbum(filePath) {
      uni.saveVideoToPhotosAlbum({
        filePath: filePath,
        success: () => {
          uni.hideLoading();
          uni.showToast({
            title: '视频已保存',
            icon: 'success'
          });
        },
        fail: (err) => {
          this.handleSaveError(err);
        }
      });
    },
    
    // 处理保存失败
    handleSaveError(err) {
      uni.hideLoading();
      if (err.errMsg.includes('auth deny') || err.errMsg.includes('permission denied')) {
        uni.showModal({
          title: '权限不足',
          content: '请在设置中开启保存到相册的权限',
          confirmText: '去设置',
          success: (res) => {
            if (res.confirm) {
              uni.openSetting();
            }
          }
        });
      } else {
        uni.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    },
    
    // 分享媒体
    shareMedia(index) {
      uni.showToast({
        title: '分享功能已触发',
        icon: 'success'
      });
    }
  },
  
  // 配置分享功能
  onShareAppMessage() {
    const currentItem = this.mediaList[this.currentIndex];
    return {
      title: currentItem.type === 'image' ? '分享图片' : '分享视频',
      path: '/pages/media-gallery/media-gallery',
      imageUrl: currentItem.type === 'image' ? currentItem.url : this.getVideoThumbnail(currentItem.url)
    };
  }
};
</script>

<style scoped>
/* 基础样式 */
.media-gallery {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 缩略图网格布局 */
.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rpx;
  padding: 2rpx;
}

.media-item {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 比例 */
  overflow: hidden;
}

.media-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.media-item:active .media-thumbnail {
  transform: scale(0.95);
}

/* 视频缩略图容器 */
.video-thumbnail-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 视频播放图标 */
.video-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10rpx 0 10rpx 18rpx;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.9);
  margin-left: 3rpx;
}

/* 缩略图的媒体类型标记 */
.media-type-tag {
  position: absolute;
  bottom: 10rpx;
  right: 10rpx;
  padding: 5rpx 10rpx;
  font-size: 20rpx;
  color: white;
  border-radius: 4rpx;
  background-color: rgba(0, 0, 0, 0.5);
}

.media-type-tag.image {
  background-color: rgba(41, 128, 185, 0.7);
}

.media-type-tag.video {
  background-color: rgba(231, 76, 60, 0.7);
}

/* 详情浏览模式 */
.detail-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 图片详情 */
.image-detail {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx;
  box-sizing: border-box;
}

.detail-image {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.3s ease;
}

/* 视频详情 */
.video-detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detail-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-tip {
  position: absolute;
  bottom: 80rpx;
  color: rgba(255, 255, 255, 0.7);
  font-size: 24rpx;
  padding: 10rpx 20rpx;
  background-color: rgba(166, 166, 166, 0.3);
  border-radius: 30rpx;
  animation: fadeInOut 2s infinite;
}

/* 导航指示器左右滑动 */
.nav-indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 80rpx;
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10rpx;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.nav-indicator:active {
  opacity: 1;
}

.nav-indicator.left {
  left: 20rpx;
}

.nav-indicator.right {
  right: 20rpx;
}

.arrow {
  width: 0;
  height: 0;
  border-style: solid;
}

.nav-indicator.left .arrow {
  border-width: 20rpx 25rpx 20rpx 0;
  border-color: transparent rgba(255, 255, 255, 0.8) transparent transparent;
}

.nav-indicator.right .arrow {
  border-width: 20rpx 0 20rpx 25rpx;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.8);
}

/* 页码指示器 */
.page-indicator {
  position: absolute;
  top: 30rpx;
  left: 50%;
  transform: translateX(-50%);
  padding: 8rpx 16rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 26rpx;
  border-radius: 20rpx;
}

/* 返回按钮（使用静态图标） */
.back-btn {
  position: absolute;
  top: 5rpx;
  left: 5rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
}

.back-btn:active {
  background-color: rgba(0, 0, 0, 0.7);
}

.back-img {
  width: 30rpx;
  height: auto;
}

/* 动画效果 */
@keyframes fadeInOut {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* 适配不同屏幕 */
@media (orientation: landscape) {
  .thumbnail-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
