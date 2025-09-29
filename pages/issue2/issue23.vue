<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">艺术组成果展示</text>
        <text class="page-subtitle">文创作品与展览图片</text>
      </view>
      <view class="header-decoration">
        <view class="decoration-circle"></view>
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 文件部分 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">文档资料</text>
        <text class="section-desc">历史研究文档与展览大纲</text>
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
        <text class="section-title">文创作品</text>
        <text class="section-desc">艺术设计与历史文创展示</text>
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
        { name: "改革开放图片史料及注释(1)", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E6%94%B9%E9%9D%A9%E5%BC%80%E6%94%BE%E5%9B%BE%E7%89%87%E5%8F%B2%E6%96%99%E5%8F%8A%E6%B3%A8%E9%87%8A%281%29.docx" },
        { name: "改革开放组 文创作品", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E6%94%B9%E9%9D%A9%E5%BC%80%E6%94%BE%E7%BB%84%20%E6%96%87%E5%88%9B%E4%BD%9C%E5%93%81.docx" },
        { name: "改革开放组展示图片", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E6%94%B9%E9%9D%A9%E5%BC%80%E6%94%BE%E7%BB%84%E5%B1%95%E7%A4%BA%E5%9B%BE%E7%89%87.docx" },
        { name: "过程性图片及说明", type: "docx", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E8%BF%87%E7%A8%8B%E6%80%A7%E5%9B%BE%E7%89%87%E5%8F%8A%E8%AF%B4%E6%98%8E.docx"},
        { name: "洋务运动组 展览图片", type: "docx", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E6%B4%8B%E5%8A%A1%E8%BF%90%E5%8A%A8%E7%BB%84%20%E5%B1%95%E8%A7%88%E5%9B%BE%E7%89%87.docx"},
        { name: "展览大纲 (洋务运动)", type: "docx", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E5%B1%95%E8%A7%88%E5%A4%A7%E7%BA%B2%20%28%E6%B4%8B%E5%8A%A1%E8%BF%90%E5%8A%A8%29.docx"},
        { name: "新中国展览图片史料及注释", type: "docx", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E6%96%B0%E4%B8%AD%E5%9B%BD%E5%B1%95%E8%A7%88%E5%9B%BE%E7%89%87%E5%8F%B2%E6%96%99%E5%8F%8A%E6%B3%A8%E9%87%88.docx"},
        { name: "展览大纲(新中国)", type: "docx", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E5%B1%95%E8%A7%88%E5%A4%A7%E7%BA%B2%28%E6%96%B0%E4%B8%AD%E5%9B%BD.docx"}
      ],
      // 图片列表
      imgList: [
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E5%B8%86%E5%B8%83%E5%8C%85%EF%BC%88%E6%94%B9%E7%89%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89.jpg",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E5%BE%BD%E7%AB%A0.jpg",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E6%98%8E%E4%BF%A1%E7%89%871.jpg",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E6%98%8E%E4%BF%A1%E7%89%872.jpg",
        "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%20%E8%89%BA%E6%9C%AF%E7%BB%84/%E4%B9%A6%E7%AD%BE.jpg"
      ]
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
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  color: #ffffff;
  margin-bottom: 16rpx;
  text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.3);
}

.page-subtitle {
  display: block;
  font-size: 28rpx;
  color: rgba(255,255,255,0.9);
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
  color: #ffffff;
  margin-bottom: 12rpx;
  text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.3);
}

.section-desc {
  display: block;
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
}

/* 文件网格样式 */
.file-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300rpx, 1fr));
  gap: 24rpx;
  margin-bottom: 40rpx;
}

.file-card {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.file-card:hover {
  transform: translateY(-6rpx);
  box-shadow: 0 16rpx 48rpx rgba(0,0,0,0.2);
}

/* 不同文件卡片的主题色 */
.file-0 { border-left: 4rpx solid #ff6b6b; }
.file-1 { border-left: 4rpx solid #4ecdc4; }
.file-2 { border-left: 4rpx solid #45b7d1; }
.file-3 { border-left: 4rpx solid #96ceb4; }

.file-icon-container {
  width: 60rpx;
  height: 60rpx;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.file-icon {
  font-size: 28rpx;
  color: #ffffff;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8rpx;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-type {
  font-size: 22rpx;
  color: #7f8c8d;
  background: #f8f9fa;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 12rpx 20rpx;
  border-radius: 20rpx;
  transition: all 0.3s ease;
}

.view-btn:hover {
  transform: scale(1.05);
}

.btn-text {
  color: #ffffff;
  font-size: 24rpx;
  font-weight: 500;
}

.btn-arrow {
  color: #ffffff;
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

.image-card {
  position: relative;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.15);
  transition: all 0.3s ease;
  cursor: pointer;
}

.image-card:hover {
  transform: translateY(-6rpx) scale(1.02);
  box-shadow: 0 16rpx 48rpx rgba(0,0,0,0.25);
}

/* 不同图片卡片的主题色 */
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
  background: rgba(255,255,255,0.6);
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
  
  .file-grid {
    grid-template-columns: 1fr;
  }
  
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

