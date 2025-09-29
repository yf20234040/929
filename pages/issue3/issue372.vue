<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">策展</text>
		<text class="page-subtitle">2.0</text>
      </view>
      <view class="header-decoration">
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 文件部分 - 修改为一行一个文件 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">文档</text>
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
		{ name: "主席团花絮",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E4%B8%BB%E5%B8%AD%E5%8F%B0%E8%8A%B1%E7%B5%AE%281%29.docx"},
		{ name: "一、洋务运动时期：近代工业的萌芽",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E7%A4%BE%E4%BC%9A%E7%BB%84/%E4%B8%80%E3%80%81%E6%B4%8B%E5%8A%A1%E8%BF%90%E5%8A%A8%E6%97%B6%E6%9C%9F%EF%BC%9A%E8%BF%91%E4%BB%A3%E5%B7%A5%E4%B8%9A%E7%9A%84%E8%90%8C%E8%8A%BD.docx"},
		{ name: "三、新中国初期：军转民的探索",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E7%A4%BE%E4%BC%9A%E7%BB%84/%E4%B8%89%E3%80%81%E6%96%B0%E4%B8%AD%E5%9B%BD%E5%88%9D%E6%9C%9F%EF%BC%9A%E5%86%9B%E8%BD%AC%E6%B0%91%E7%9A%84%E6%8E%A2%E7%B4%A2.docx"},
		{ name: "二、民国时期：转型与坚守",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E7%A4%BE%E4%BC%9A%E7%BB%84/%E4%BA%8C%E3%80%81%E6%B0%91%E5%9B%BD%E6%97%B6%E6%9C%9F%EF%BC%9A%E8%BD%AC%E5%9E%8B%E4%B8%8E%E5%9D%9A%E5%AE%88%281%29.docx"},
		{ name: "五、信息时代",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E7%A4%BE%E4%BC%9A%E7%BB%84/%E4%BA%94%E3%80%81%E4%BF%A1%E6%81%AF%E6%97%B6%E4%BB%A3.docx"},
		{ name: "口述史1",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E7%A4%BE%E4%BC%9A%E7%BB%84/%E5%8F%A3%E8%BF%B0%E5%8F%B21docx.docx"},
		{ name: "口述史2",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E7%A4%BE%E4%BC%9A%E7%BB%84/%E5%8F%A3%E8%BF%B0%E5%8F%B22.docx"},
		{ name: "四、改革开放时期：转型与腾飞",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E7%A4%BE%E4%BC%9A%E7%BB%84/%E5%9B%9B%E3%80%81%E6%94%B9%E9%9D%A9%E5%BC%80%E6%94%BE%E6%97%B6%E6%9C%9F%EF%BC%9A%E8%BD%AC%E5%9E%8B%E4%B8%8E%E8%85%BE%E9%A3%9E.docx"},
		{ name: "1.组装组",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E5%95%86%E4%B8%9A%E7%BB%84%E5%B1%95%E6%9D%BF/1.%E7%BB%84%E8%A3%85%E7%BB%84.docx"},
		{ name: "2.组装组",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E5%95%86%E4%B8%9A%E7%BB%84%E5%B1%95%E6%9D%BF/2.%E7%BB%84%E8%A3%85%E7%BB%84.docx"},
		{ name: "3.物流古代",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E5%95%86%E4%B8%9A%E7%BB%84%E5%B1%95%E6%9D%BF/3.%E7%89%A9%E6%B5%81%E5%8F%A4%E4%BB%A3.docx"},
		{ name: "4.物流现代",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E5%95%86%E4%B8%9A%E7%BB%84%E5%B1%95%E6%9D%BF/4.%E7%89%A9%E6%B5%81%E7%8E%B0%E4%BB%A3.docx"},
		{ name: "5.贸易古代",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E5%95%86%E4%B8%9A%E7%BB%84%E5%B1%95%E6%9D%BF/5.%E8%B4%B8%E6%98%93%E5%8F%A4%E4%BB%A3.docx"},
		{ name: "6.贸易现代",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E7%AD%96%E5%B1%952.0/%E5%95%86%E4%B8%9A%E7%BB%84%E5%B1%95%E6%9D%BF/6.%E8%B4%B8%E6%98%93%E7%8E%B0%E4%BB%A3.docx"},
		
	  ],
    };
  },
  methods: {
    getFileIcon(type) {
      if (type === 'docx') return '📄';
      
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