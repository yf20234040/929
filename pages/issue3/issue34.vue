<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">项目启动仪式</text>
        <text class="page-subtitle">4.1</text>
      </view>
      <view class="header-decoration">
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 文件部分 - 修改为一行一个文件 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">会议内容和总结</text>
        <text class="section-desc">点击查看详情</text>
      </view>
      
      <!-- 将file-grid改为file-list，使用flex垂直布局 -->
      <view class="file-list">
        <view
          v-for="(file, index) in fileList"
          :key="index"
          class="file-card"
          :class="'file-' + (index % 4)"
          @tap="viewFile(file)"
        >
          <view class="file-icon-container">
            <text class="file-icon">{{ getFileIcon(file.type) }}</text>
          </view>
          <view class="file-info">
            <text class="file-name">{{ file.name }}</text>
            <text class="file-type">{{ file.type.toUpperCase() }}</text>
          </view>
          <view class="view-btn">
            <text class="btn-text">查看</text>
            <text class="btn-arrow">→</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 图片部分 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">会议合影</text>
        <text class="section-desc">点击查看</text>
      </view>
      
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
import { openDocumentFromUrl } from '../../utils/openDoc.js'
export default {
  data() {
    return {
      // 文件列表
      fileList: [
        { name: "洞见历史三期培训会 0401", type: "pptx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E4%B8%89%E6%9C%9F%E5%9F%B9%E8%AE%AD%E4%BC%9A%200401.pptx" },
        { name: "洞见历史第三期项目启动仪式", type:"docx", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F.docx"},
        { name: "致家长的一封信",type: "docx",url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/%E8%87%B4%E5%AE%B6%E9%95%BF%E7%9A%84%E4%B8%80%E5%B0%81%E4%BF%A1.docx"},
        { name: "致家长的一封信",type: "pdf",url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/%E8%87%B4%E5%AE%B6%E9%95%BF%E7%9A%84%E4%B8%80%E5%B0%81%E4%BF%A1pdf.pdf"}
      ],
      // 图片列表
      imgList: [
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/0ffbf188e2ff70afa1ac35efdac9fbe.png',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/23578b3964d9fb057686d0ea67a0234.jpg',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/340c2c7c7a00f2fc9bc7d3cecc71340.png',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/494b643bfec8e39d89312830d3dd1d4.jpg',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/5a84ab911d46658c996e08aafaef8c2.jpg',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/b09642139d3353e78fd884781f77c60.png',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/ce23bef3802031935100bdb8b7767bb.png',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/25%E5%B9%B44%E6%9C%881%E5%8F%B7%E9%A1%B9%E7%9B%AE%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/f771172104b7dea90a5c3748fa1c7e1.png'
      ]
    };
  },
  methods: {
    getFileIcon(type) {
      if (type === 'docx') return '📄';
      if (type === 'pptx') return '📄';
      if (type === 'pdf') return '📖';
      return '📁';
    },

    viewFile(file) {
      openDocumentFromUrl({ url: file.url, type: file.type })
    },
    
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

.decoration-circle {
  width: 12rpx;
  height: 12rpx;
  background: #4f46e5;
  border-radius: 50%;
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

/* 文件列表样式 - 改为一行一个文件 */
.file-list {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  gap: 16rpx; /* 每个文件卡片之间的间距 */
}

.file-card {
  background: #ffffff;
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20rpx;
  border: 1rpx solid #f1f5f9;
  width: 100%; /* 占满容器宽度 */
}

.file-card:hover {
  transform: translateY(-3rpx);
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.08);
  border-color: #e2e8f0;
}

.file-0 { border-left: 4rpx solid #ef4444; }
.file-1 { border-left: 4rpx solid #06b6d4; }
.file-2 { border-left: 4rpx solid #3b82f6; }
.file-3 { border-left: 4rpx solid #10b981; }

.file-icon-container {
  width: 60rpx;
  height: 60rpx;
  background-color: #f1f5f9;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.file-0 .file-icon-container { background-color: #fee2e2; }
.file-1 .file-icon-container { background-color: #cffafe; }
.file-2 .file-icon-container { background-color: #dbeafe; }
.file-3 .file-icon-container { background-color: #dcfce7; }

.file-icon {
  font-size: 28rpx;
  color: #4b5563;
}

.file-0 .file-icon { color: #dc2626; }
.file-1 .file-icon { color: #0891b2; }
.file-2 .file-icon { color: #2563eb; }
.file-3 .file-icon { color: #059669; }

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  font-size: 26rpx;
  font-weight: 500;
  color: #333333;
  margin-bottom: 8rpx;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-type {
  font-size: 22rpx;
  color: #6b7280;
  background: #f8fafc;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background-color: #f1f5f9;
  padding: 12rpx 20rpx;
  border-radius: 8rpx;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background-color: #e2e8f0;
}

.btn-text {
  color: #4b5563;
  font-size: 24rpx;
  font-weight: 500;
}

.btn-arrow {
  color: #6b7280;
  font-size: 20rpx;
  transition: transform 0.3s ease;
}

.file-card:hover .btn-arrow {
  transform: translateX(4rpx);
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
  gap: 20rpx;
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

.image-0 { border: 2rpx solid #ef4444; }
.image-1 { border: 2rpx solid #06b6d4; }
.image-2 { border: 2rpx solid #3b82f6; }
.image-3 { border: 2rpx solid #10b981; }
.image-4 { border: 2rpx solid #f59e0b; }

.media-thumbnail {
  width: 100%;
  height: 200rpx;
  display: block;
  transition: transform 0.3s ease;
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
  
  .section-container {
    padding: 24rpx;
  }
}
</style>