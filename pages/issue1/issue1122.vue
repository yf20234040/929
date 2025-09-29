<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">媒体与报道</text>
        <text class="page-subtitle"> </text>
      </view>
      <view class="header-decoration">
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 第一张图片 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">建川博物馆群转发微博截图</text>
        <text class="section-desc"> </text>
      </view>
      
      <view class="single-image-container">
        <view class="image-card" @tap="previewFImage">
          <image
            :src="fImage"
            class="f-thumbnail"
            mode="widthFix"
            lazy-load
          />
          <view class="image-overlay">
            <text class="overlay-text">点击查看</text>
            <text class="overlay-icon">🔍</text>
          </view>
        </view>
      </view>
    </view>
	
	<!-- 第二张图片 -->
	<view class="section-container">
	  <view class="section-header">
	    <text class="section-title">大先生共学公众号报道1</text>
	    <text class="section-desc"> </text>
	  </view>
	  
	  <view class="single-image-container">
	    <view class="image-card" @tap="previewDImage">
	      <image
	        :src="DImage"
	        class="f-thumbnail"
	        mode="widthFix"
	        lazy-load
	      />
	      <view class="image-overlay">
	        <text class="overlay-text">点击查看</text>
	        <text class="overlay-icon">🔍</text>
	      </view>
	    </view>
	  </view>
	</view>
	
	<!-- 第三张图片 - 修复了点击事件 -->
	<view class="section-container">
	  <view class="section-header">
	    <text class="section-title">大先生共学公众号报道2</text>
	    <text class="section-desc"> </text>
	  </view>
	  
	  <view class="single-image-container">
	    <view class="image-card" @tap="previewBImage"> <!-- 修复：将previewDImage改为previewBImage -->
	      <image
	        :src="BImage"
	        class="f-thumbnail"
	        mode="widthFix"
	        lazy-load
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
      // 第一张图片数据
      fImage: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%88%90%E6%9E%9C%E5%B1%95%E7%A4%BA%E6%A9%B1%E7%AA%97/%E5%BB%BA%E5%B7%9D%E5%8D%9A%E7%89%A9%E9%A6%86%E7%BE%A4%E8%BD%AC%E5%8F%91%E5%BE%AE%E5%8D%9A%E6%88%AA%E5%9B%BE.jpg",
      
      // 第二张图片数据
      DImage: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%88%90%E6%9E%9C%E5%B1%95%E7%A4%BA%E6%A9%B1%E7%AA%97/%E5%A4%A7%E5%85%88%E7%94%9F%E5%85%B1%E5%AD%A6%E6%8A%A5%E9%81%931.png",
	  
	  // 第三张图片数据
	  BImage: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%88%90%E6%9E%9C%E5%B1%95%E7%A4%BA%E6%A9%B1%E7%AA%97/%E5%A4%A7%E5%85%88%E7%94%9F%E5%85%B1%E5%AD%A6%E6%8A%A5%E9%81%932.png"
	};
  },
  methods: {
    // 预览第一张图片
    previewFImage() {
      uni.previewImage({
        current: this.fImage,
        urls: [this.fImage]
      });
    },
    
    // 预览第二张图片
    previewDImage() {
      uni.previewImage({
        current: this.DImage,
        urls: [this.DImage]
      });
    },
	
	// 预览第三张图片
	previewBImage() {
	  uni.previewImage({
	    current: this.BImage,
	    urls: [this.BImage]
	  });
	}
  }
};
</script>

<style scoped>
/* 基础样式 - 浅色系简约风格 */
.container {
  min-height: 100vh;
  background-color: #f9fafb;
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
  font-weight: 700;
  color: #333333;
  margin-bottom: 16rpx;
}

.page-subtitle {
  display: block;
  font-size: 28rpx;
  color: #6b7280;
  font-weight: 400;
}

.header-decoration {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20rpx;
}

.decoration-line {
  width: 60rpx;
  height: 2rpx;
  background: linear-gradient(90deg, transparent, #4f46e5, transparent);
  border-radius: 2rpx;
}

/* 区块容器样式 */
.section-container {
  margin-bottom: 60rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.05);
}

.section-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.section-title {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 12rpx;
}

.section-desc {
  display: block;
  font-size: 24rpx;
  color: #6b7280;
}

/* 单张图片容器样式 */
.single-image-container {
  display: flex;
  justify-content: center;
  padding: 10rpx 0;
}

.image-card {
  position: relative;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #ffffff;
  border: 1rpx solid #f1f5f9;
  width: 100%;
  max-width: 600rpx;
}

.image-card:hover {
  transform: translateY(-3rpx) scale(1.01);
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.08);
  border-color: #e2e8f0;
}

.f-thumbnail {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-card:hover .f-thumbnail {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
  font-weight: 500;
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
  padding-bottom: 30rpx;
}

.decoration-dots {
  display: flex;
  gap: 16rpx;
}

.dot {
  width: 10rpx;
  height: 10rpx;
  background: #94a3b8;
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
    transform: scale(1.1);
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
  
  .section-container {
    padding: 24rpx;
  }
}
</style>
