<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">文稿图片成果展示</text>
        <text class="page-subtitle"></text>
      </view>
      <view class="header-decoration">
        
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 图片部分 -->
    <view class="section-container">
      
      
      <view class="image-grid">
        <view
          v-for="(img, index) in imgList"
          :key="index"
          class="image-card"
          :class="'image-' + (index % 5)"
          @tap="previewImage(index)"
        >
          <image
            :src="img"
            class="media-thumbnail"
            mode="aspectFill"
          />
          <view class="image-overlay">
            <text class="overlay-text">点击查看</text>
            <text class="overlay-icon">🔍</text>
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
      // 图片列表
      imgList: [
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%86%85%E5%AE%B9%E5%88%9B%E4%BD%9C%E5%B7%A5%E5%9D%8A/%E8%84%9A%E6%9C%AC%E4%B8%8E%E6%96%87%E7%A8%BF/%E6%96%87%E7%A8%BF1%2070%E5%B9%B4%E4%BB%A3%E7%A5%A8%E8%AF%81%E7%94%9F%E6%B4%BB%20%E6%A2%81%E6%81%92%E7%91%9E%20%E5%BC%A0%E7%8E%89%E6%9E%97.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%86%85%E5%AE%B9%E5%88%9B%E4%BD%9C%E5%B7%A5%E5%9D%8A/%E8%84%9A%E6%9C%AC%E4%B8%8E%E6%96%87%E7%A8%BF/%E6%96%87%E7%A8%BF2%20%2070%E5%B9%B4%E4%BB%A3%E7%A5%A8%E8%AF%81%E7%94%9F%E6%B4%BB%20%E6%A2%81%E6%81%92%E7%91%9E%20%E5%BC%A0%E7%8E%89%E6%9E%97.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%86%85%E5%AE%B9%E5%88%9B%E4%BD%9C%E5%B7%A5%E5%9D%8A/%E8%84%9A%E6%9C%AC%E4%B8%8E%E6%96%87%E7%A8%BF/%E6%96%87%E7%A8%BF3%20%2070%E5%B9%B4%E4%BB%A3%E7%A5%A8%E8%AF%81%E7%94%9F%E6%B4%BB%20%E6%A2%81%E6%81%92%E7%91%9E%20%E5%BC%A0%E7%8E%89%E6%9E%97.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%86%85%E5%AE%B9%E5%88%9B%E4%BD%9C%E5%B7%A5%E5%9D%8A/%E8%84%9A%E6%9C%AC%E4%B8%8E%E6%96%87%E7%A8%BF/%E6%96%87%E7%A8%BF4%20%2070%E5%B9%B4%E4%BB%A3%E7%A5%A8%E8%AF%81%E7%94%9F%E6%B4%BB%20%E6%A2%81%E6%81%92%E7%91%9E%20%E5%BC%A0%E7%8E%89%E6%9E%97.jpg'
      ]
    };
  },
  methods: {
    previewImage(index) {
      uni.previewImage({
        current: this.imgList[index],
        urls: this.imgList
      });
    }
  }
};
</script>

<style scoped>
/* 基础样式 - 浅色系白色为主 */
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
}

/* 页面标题样式 */
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
  color: #333333;
  margin-bottom: 16rpx;
}

.page-subtitle {
  display: block;
  font-size: 28rpx;
  color: #666666;
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
  background: #6c63ff;
  border-radius: 50%;
}

.decoration-line {
  width: 60rpx;
  height: 3rpx;
  background: linear-gradient(90deg, transparent, #6c63ff, transparent);
  border-radius: 2rpx;
}

/* 区块容器样式 */
.section-container {
  margin-bottom: 60rpx;
}

.section-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.section-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 12rpx;
}

.section-desc {
  display: block;
  font-size: 24rpx;
  color: #666666;
}

/* 图片网格样式 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
  gap: 20rpx;
}

.image-card {
  position: relative;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #ffffff;
}

.image-card:hover {
  transform: translateY(-6rpx) scale(1.02);
  box-shadow: 0 12rpx 32rpx rgba(0,0,0,0.15);
}

/* 不同图片卡片的主题色边框 */
.image-0 { border: 3rpx solid #ff6b6b; }
.image-1 { border: 3rpx solid #4ecdc4; }
.image-2 { border: 3rpx solid #45b7d1; }
.image-3 { border: 3rpx solid #96ceb4; }
.image-4 { border: 3rpx solid #f39c12; }

.media-thumbnail {
  width: 100%;
  height: 200rpx;
  display: block;
  transition: transform 0.3s ease;
}

.image-card:hover .media-thumbnail {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

.overlay-text {
  color: #ffffff;
  font-size: 22rpx;
  margin-bottom: 8rpx;
}

.overlay-icon {
  font-size: 28rpx;
  color: #ffffff;
}

/* 底部装饰 */
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
  background: #6c63ff;
  opacity: 0.6;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .container {
    padding: 30rpx 20rpx;
  }
  
  .page-title {
    font-size: 40rpx;
  }
  
  .section-title {
    font-size: 32rpx;
  }
  
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>