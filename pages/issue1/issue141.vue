<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">协作工具库</text>
        <text class="page-subtitle"> </text>
      </view>
      <view class="header-decoration">
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 文件部分 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">文档资料</text>
        <text class="section-desc">点击查看详情</text>
      </view>
      
      <view class="file-grid">
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
        <text class="section-title">图片资料</text>
        <text class="section-desc">育才学生需求调查表</text>
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

    <!-- 4F复盘法部分 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">工具</text>
        <text class="section-desc">4F复盘法</text>
      </view>
      
      <view class="single-image-container">
        <view class="image-card" @tap="previewFImage">
          <image
            :src="fImage"
            class="f-thumbnail"
            mode="widthFix"
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
        { name: "KWL——需求与问题搜集", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/KWL%E2%80%94%E2%80%94%E9%9C%80%E6%B1%82%E4%B8%8E%E9%97%AE%E9%A2%98%E6%90%9C%E9%9B%86.docx" },
        { name: "洞见历史作品使用协议书", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E4%BD%9C%E5%93%81%E4%BD%BF%E7%94%A8%E5%8D%8F%E8%AE%AE%E4%B9%A6.docx" },
		{ name: "博物馆研学活动（介绍）", type: "pptx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E5%8D%9A%E7%89%A9%E9%A6%86%E7%A0%94%E5%AD%A6%E6%B4%BB%E5%8A%A8%EF%BC%88%E4%BB%8B%E7%BB%8D%EF%BC%89.pptx" },
      ],
      // 图片列表
      imgList: [
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E8%82%B2%E6%89%8D%E5%AD%A6%E7%94%9F%E9%9C%80%E6%B1%82%E8%B0%83%E6%9F%A5%E8%A1%A8/%E5%86%89%E9%92%B0%E7%90%AA/c269efbdc8cc3218ad22827bbd5527a.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E8%82%B2%E6%89%8D%E5%AD%A6%E7%94%9F%E9%9C%80%E6%B1%82%E8%B0%83%E6%9F%A5%E8%A1%A8/%E5%86%89%E9%92%B0%E7%90%AA/d9cd52ad65651ea29ad64d9cf1792c4.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E8%82%B2%E6%89%8D%E5%AD%A6%E7%94%9F%E9%9C%80%E6%B1%82%E8%B0%83%E6%9F%A5%E8%A1%A8/%E5%AE%8B%E5%AE%9B%E6%A1%90/1f3050f918b75cfaaee91a662183565.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E8%82%B2%E6%89%8D%E5%AD%A6%E7%94%9F%E9%9C%80%E6%B1%82%E8%B0%83%E6%9F%A5%E8%A1%A8/%E5%AE%8B%E5%AE%9B%E6%A1%90/b53754e4ea0f273021e343df2de9fc9.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E8%82%B2%E6%89%8D%E5%AD%A6%E7%94%9F%E9%9C%80%E6%B1%82%E8%B0%83%E6%9F%A5%E8%A1%A8/%E5%BD%AD%E8%AF%97%E6%B6%B5/3eeda260dfac42b6af34f5632e7c8c3.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E8%82%B2%E6%89%8D%E5%AD%A6%E7%94%9F%E9%9C%80%E6%B1%82%E8%B0%83%E6%9F%A5%E8%A1%A8/%E5%BD%AD%E8%AF%97%E6%B6%B5/7e229f2c5b3021213969a0e639321b5.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E8%82%B2%E6%89%8D%E5%AD%A6%E7%94%9F%E9%9C%80%E6%B1%82%E8%B0%83%E6%9F%A5%E8%A1%A8/%E5%BE%90%E5%90%AF%E7%BF%94/4b7177b8eeaa80b5ae0524e19716872.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E8%82%B2%E6%89%8D%E5%AD%A6%E7%94%9F%E9%9C%80%E6%B1%82%E8%B0%83%E6%9F%A5%E8%A1%A8/%E5%BE%90%E5%90%AF%E7%BF%94/4b7177b8eeaa80b5ae0524e19716872.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E8%82%B2%E6%89%8D%E5%AD%A6%E7%94%9F%E9%9C%80%E6%B1%82%E8%B0%83%E6%9F%A5%E8%A1%A8/%E6%95%96%E5%95%B8%E7%AC%91/21f5da03aeed171bdaec8339dfa01a4.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E8%82%B2%E6%89%8D%E5%AD%A6%E7%94%9F%E9%9C%80%E6%B1%82%E8%B0%83%E6%9F%A5%E8%A1%A8/%E6%95%96%E5%95%B8%E7%AC%91/df5fcb36973e08ca89ac038f27c6963.jpg'
      ],
      // 4F复盘法图片
      fImage: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/4F%E5%A4%8D%E7%9B%98%E6%B3%95.png" // 图片URL
    };
  },
  methods: {
    getFileIcon(type) {
      if (type === 'docx') return '📄';
      if (type === 'pptx') return '📊';
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
    },
    
    previewFImage() {
      uni.previewImage({
        current: this.fImage,
        urls: [this.fImage]
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

/* 文件网格样式 */
.file-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300rpx, 1fr));
  gap: 24rpx;
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
}

.file-card:hover {
  transform: translateY(-3rpx);
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.08);
  border-color: #e2e8f0;
}

/* 不同文件卡片的主题色边框 */
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

/* 图片网格样式 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
  gap: 20rpx;
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

/* 不同图片卡片的主题色边框 */
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

/* 4F复盘法图片样式 */
.f-thumbnail {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-card:hover .media-thumbnail,
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
  
  .file-grid {
    grid-template-columns: 1fr;
  }
  
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .section-container {
    padding: 24rpx;
  }
}
</style>