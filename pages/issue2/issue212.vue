<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="header">
      <text class="title">会议照片</text>
      <text class="subtitle">启动仪式精彩瞬间记录</text>
    </view>

    <!-- 照片统计信息 -->
    <view class="stats-section">
      <view class="stats-card">
        <view class="info-icon">
          <icon type="photo" size="24" color="#1677ff" />
        </view>
        <view class="info-content">
          <text class="stats-number">{{ imgList.length }}</text>
          <text class="stats-label">张照片</text>
        </view>
      </view>
      <view class="stats-card">
        <view class="info-icon">
          <icon type="success" size="24" color="#1677ff" />
        </view>
        <view class="info-content">
          <text class="stats-number">1</text>
          <text class="stats-label">个活动</text>
        </view>
      </view>
      <view class="stats-card">
        <view class="info-icon">
          <icon type="calendar" size="24" color="#1677ff" />
        </view>
        <view class="info-content">
          <text class="stats-number">2024</text>
          <text class="stats-label">年记录</text>
        </view>
      </view>
    </view>

    <!-- 照片画廊 -->
    <view class="section">
      <view class="section-title">
        <text>📷 启动仪式照片集</text>
      </view>
      <text class="gallery-desc">点击照片可查看大图</text>
      
      <view class="photo-grid">
        <view
          v-for="(img, index) in imgList"
          :key="index"
          class="photo-card"
          @tap="previewImage(index)"
        >
          <view class="photo-wrapper">
            <image
              :src="img"
              class="photo-image"
              mode="aspectFill"
              lazy-load
            />
            <view class="photo-overlay">
              <text class="overlay-icon">🔍</text>
            </view>
          </view>
          <view class="photo-info">
            <text class="photo-title">启动仪式照片 {{ index + 1 }}</text>
            <text class="photo-date">2024-03-30</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="footer">
      <text class="organizer">"洞见历史"研学第二期项目组</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 图片列表 - 实际项目中可根据需要扩展或从接口获取
      imgList: [
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/1.PNG",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/2.PNG",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/3.PNG",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/4.JPEG",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/5.jpg",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/6.jpg",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/7.jpg",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/8.jpg",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/9.jpg",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/10.jpg"
      ]
    };
  },
  onLoad() {
    // 页面加载时可进行数据初始化操作
    console.log('会议照片页面加载完成');
  },
  methods: {
    /**
     * 预览图片
     * @param {Number} index - 图片索引
     */
    previewImage(index) {
      if (!this.imgList || this.imgList.length === 0) return;
      
      uni.previewImage({
        current: this.imgList[index], // 当前显示图片的http链接
        urls: this.imgList, // 需要预览的图片http链接列表
        indicator: 'number', // 显示数字指示器
        loop: true, // 支持循环预览
        success: (res) => {
          console.log('预览图片成功', res);
        },
        fail: (err) => {
          console.error('预览图片失败', err);
          uni.showToast({
            title: '预览失败，请重试',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 20rpx;
  box-sizing: border-box;
}

/* 标题样式 */
.header {
  text-align: center;
  padding: 30rpx 20rpx;
  margin-bottom: 20rpx;
  background-color: white;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 34rpx;
  font-weight: bold;
  color: #1677ff;
  display: block;
  margin-bottom: 15rpx;
}

.subtitle {
  font-size: 26rpx;
  color: #666;
  display: block;
}

/* 统计信息样式 */
.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  margin-bottom: 25rpx;
}

.stats-card {
  background-color: white;
  border-radius: 16rpx;
  padding: 25rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.info-icon {
  margin-right: 20rpx;
}

.info-content {
  flex: 1;
}

.stats-number {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5rpx;
}

.stats-label {
  font-size: 24rpx;
  color: #666;
}

/* 照片画廊样式 */
.section {
  background-color: white;
  border-radius: 16rpx;
  margin-bottom: 25rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  padding: 0 25rpx 25rpx;
}

.section-title {
  padding: 18rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  margin-bottom: 20rpx;
}

.section-title text {
  font-size: 30rpx;
  font-weight: bold;
  color: #1677ff;
}

.gallery-desc {
  display: block;
  color: #666;
  font-size: 24rpx;
  margin-bottom: 20rpx;
  padding-left: 5rpx;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.photo-card {
  border-radius: 12rpx;
  overflow: hidden;
  background-color: #f9f9f9;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.photo-card:active {
  transform: scale(0.98);
}

.photo-wrapper {
  position: relative;
  width: 100%;
  height: 240rpx;
  overflow: hidden;
}

.photo-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.photo-card:hover .photo-image {
  transform: scale(1.05);
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.overlay-icon {
  color: white;
  font-size: 40rpx;
}

.photo-info {
  padding: 15rpx;
}

.photo-title {
  font-size: 24rpx;
  color: #333;
  display: block;
  margin-bottom: 5rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.photo-date {
  font-size: 20rpx;
  color: #999;
}

/* 底部样式 */
.footer {
  text-align: center;
  padding: 25rpx 0;
  color: #666;
}

.organizer {
  font-size: 24rpx;
  display: block;
}

/* 响应式调整 - 适配不同屏幕尺寸 */
@media (min-width: 750rpx) {
  .photo-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .photo-wrapper {
    height: 280rpx;
  }
}

/* 适配更大屏幕 */
@media (min-width: 1000rpx) {
  .photo-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>