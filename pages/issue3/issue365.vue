<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">社会组</text>
		<text class="page-subtitle">成果展示</text>
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
		{ name: "洞见历史第三期艺术组任务清单",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E8%89%BA%E6%9C%AF%E7%BB%84/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F%E8%89%BA%E6%9C%AF%E7%BB%84%E4%BB%BB%E5%8A%A1%E6%B8%85%E5%8D%95%20%282%29.docx"},
		{ name: "印章",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E8%89%BA%E6%9C%AF%E7%BB%84/%E8%89%BA%E6%9C%AF%E7%BB%84%E6%88%90%E6%9E%9C/%E5%8D%B0%E7%AB%A0.docx"},
		{ name: "帆布包",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E8%89%BA%E6%9C%AF%E7%BB%84/%E8%89%BA%E6%9C%AF%E7%BB%84%E6%88%90%E6%9E%9C/%E5%B8%86%E5%B8%83%E5%8C%85.docx"},
		{ name: "沙盘组展板设计文字说明材料（国际物流）1",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E8%89%BA%E6%9C%AF%E7%BB%84/%E8%89%BA%E6%9C%AF%E7%BB%84%E6%88%90%E6%9E%9C/%E6%B2%99%E7%9B%98%E7%BB%84%E5%B1%95%E6%9D%BF%E8%AE%BE%E8%AE%A1%E6%96%87%E5%AD%97%E8%AF%B4%E6%98%8E%E6%9D%90%E6%96%99%EF%BC%88%E5%9B%BD%E9%99%85%E7%89%A9%E6%B5%81%EF%BC%89%20%281%29.docx"},
		{ name: "沙盘组展板设计文字说明材料（国际贸易）2",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E8%89%BA%E6%9C%AF%E7%BB%84/%E8%89%BA%E6%9C%AF%E7%BB%84%E6%88%90%E6%9E%9C/%E6%B2%99%E7%9B%98%E7%BB%84%E5%B1%95%E6%9D%BF%E8%AE%BE%E8%AE%A1%E6%96%87%E5%AD%97%E8%AF%B4%E6%98%8E%E6%9D%90%E6%96%99%EF%BC%88%E5%9B%BD%E9%99%85%E8%B4%B8%E6%98%93%EF%BC%89%20%281%29.docx"},
		{ name: "短袖",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E8%89%BA%E6%9C%AF%E7%BB%84/%E8%89%BA%E6%9C%AF%E7%BB%84%E6%88%90%E6%9E%9C/%E7%9F%AD%E8%A2%96.docx"},
		{ name: "货币",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E8%89%BA%E6%9C%AF%E7%BB%84/%E8%89%BA%E6%9C%AF%E7%BB%84%E6%88%90%E6%9E%9C/%E8%B4%A7%E5%B8%81.docx"},
		{ name: "透视卡",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E8%89%BA%E6%9C%AF%E7%BB%84/%E8%89%BA%E6%9C%AF%E7%BB%84%E6%88%90%E6%9E%9C/%E9%80%8F%E8%A7%86%E5%8D%A1.docx"},
		{ name: "钥匙扣",type: "docx",url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E8%89%BA%E6%9C%AF%E7%BB%84/%E8%89%BA%E6%9C%AF%E7%BB%84%E6%88%90%E6%9E%9C/%E9%92%A5%E5%8C%99%E6%89%A3.docx"},
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

/* 图片网格样式保持 */
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

/* 底部装饰保持*/
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

/* 响应式设计保持 */
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