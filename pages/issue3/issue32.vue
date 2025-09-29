<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="header">
      <text class="title">洞见历史第三期项目会议记录</text>
      <text class="subtitle">首次见面与研讨会详情</text>
    </view>

    <!-- 第一部分：大学生首次见面 -->
    <view class="section">
      <view class="section-title">
        <text>一、大学生首次见面会</text>
        <text class="date-tag">3.28</text>
      </view>
      
      <view class="content-card">
        <text class="content-text">本次见面会旨在让参与项目的大学生们相互熟悉，介绍项目的主要内容与目标，解答大家关于项目实施的疑惑，为后续的跨学段协作奠定基础。</text>
      </view>
      
      <view class="section-subtitle">
        <text>见面会照片</text>
      </view>
      
      <view class="image-grid">
        <view
          v-for="(img, index) in firstMeetingImgs"
          :key="index"
          class="image-card"
          @tap="previewImage(firstMeetingImgs, index)"
        >
          <image
            :src="img"
            class="image-thumbnail"
            mode="aspectFill"
            lazy-load
          />
          <view class="image-overlay">
            <text class="overlay-text">点击查看</text>
            <text class="overlay-icon">🔍</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 第二部分：项目首次研讨会 -->
    <view class="section">
      <view class="section-title">
        <text>二、项目首次研讨会</text>
        <text class="date-tag">3.29</text>
      </view>
      
      <view class="content-card">
        <text class="content-text">研讨会围绕项目背景及目标、资料学习与反馈、实施与分工、评价机制构建、项目特色与创新等议题展开深入讨论，确定了项目的基本框架和实施方向。</text>
      </view>
      
      <view class="section-subtitle">
        <text>会议文档</text>
      </view>
      
      <view class="file-list">
        <view 
          v-for="(file, index) in fileList" 
          :key="index" 
          class="file-card" 
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
            <text class="view-btn-text">查看</text>
          </view>
        </view>
      </view>
      
      <view class="section-subtitle">
        <text>研讨会照片</text>
      </view>
      
      <view class="image-grid">
        <view
          v-for="(img, index) in seminarImgs"
          :key="index"
          class="image-card"
          @tap="previewImage(seminarImgs, index)"
        >
          <image
            :src="img"
            class="image-thumbnail"
            mode="aspectFill"
            lazy-load
          />
          <view class="image-overlay">
            <text class="overlay-text">点击查看</text>
            <text class="overlay-icon">🔍</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="footer">
      <text class="organizer">"洞见历史"研学第三期项目组 © 2025</text>
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
        { 
          name: "洞见历史第三期项目首次见面研讨会会议记录", 
          type: "docx", 
          url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%BC%80%E4%BC%9A/3.39%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F%E9%A1%B9%E7%9B%AE%E9%A6%96%E6%AC%A1%E8%A7%81%E9%9D%A2%E7%A0%94%E8%AE%A8%E4%BC%9A%E4%BC%9A%E8%AE%AE%E8%AE%B0%E5%BD%95.docx" 
        }
      ],
      // 首次见面会图片
      firstMeetingImgs: [
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%9B%BE%E7%89%87%E6%94%B6%E9%9B%86/3.28%E8%A7%81%E9%9D%A2%E4%BC%9A.png',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%9B%BE%E7%89%87%E6%94%B6%E9%9B%86/3.28%E8%A7%81%E9%9D%A2%E4%BC%9A%20%282%29.png'
      ],
      // 研讨会图片
      seminarImgs: [
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%9B%BE%E7%89%87%E6%94%B6%E9%9B%86/3.29%E4%BC%9A%E8%AE%AE.png',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%9B%BE%E7%89%87%E6%94%B6%E9%9B%86/3.29%E4%BC%9A%E8%AE%AE2.png',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%9B%BE%E7%89%87%E6%94%B6%E9%9B%86/3.29%E4%BC%9A%E8%AE%AE3.png',
        'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%9B%BE%E7%89%87%E6%94%B6%E9%9B%86/3.29%E4%BC%9A%E8%AE%AE4.png'
      ]
    };
  },
  methods: {
    // 根据文件类型获取对应图标
    getFileIcon(type) {
      if (type === 'docx') return '📄';
      if (type === 'pptx') return '📊';
      if (type === 'pdf') return '📖';
      return '📁';
    },

    // 查看文件
    viewFile(file) {
      openDocumentFromUrl({ url: file.url, type: file.type })
    },
    
    // 预览图片
    previewImage(imgList, index) {
      uni.previewImage({
        current: imgList[index],
        urls: imgList,
        indicator: 'number'
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
  padding: 30rpx 0;
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

/* 通用区块样式 */
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title text {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.date-tag {
  background-color: #e8f3ff;
  color: #1677ff;
  font-size: 24rpx;
  padding: 5rpx 15rpx;
  border-radius: 20rpx;
  font-weight: normal;
}

.section-subtitle {
  font-size: 26rpx;
  color: #1677ff;
  margin: 25rpx 0 15rpx;
  display: block;
  font-weight: bold;
}

/* 内容卡片样式 */
.content-card {
  background-color: #f9f9f9;
  border-radius: 12rpx;
  padding: 20rpx;
  line-height: 1.6;
  margin-bottom: 10rpx;
}

.content-text {
  font-size: 24rpx;
  color: #333;
  display: block;
}

/* 图片网格样式 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-bottom: 10rpx;
}

.image-card {
  position: relative;
  border-radius: 12rpx;
  overflow: hidden;
  height: 240rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.image-thumbnail {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
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

.image-card:active {
  transform: scale(0.98);
}

.overlay-text {
  color: white;
  font-size: 24rpx;
  margin-bottom: 8rpx;
}

.overlay-icon {
  color: white;
  font-size: 30rpx;
}

/* 文件列表样式 */
.file-list {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
  margin-bottom: 10rpx;
}

.file-card {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 12rpx;
  border-left: 5rpx solid #1677ff;
  transition: background-color 0.2s ease;
}

.file-card:active {
  background-color: #f0f0f0;
}

.file-icon-container {
  width: 70rpx;
  height: 70rpx;
  background-color: #e8f3ff;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.file-icon {
  font-size: 36rpx;
  color: #1677ff;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 5rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-type {
  font-size: 22rpx;
  color: #666;
  background-color: #e8f3ff;
  color: #1677ff;
  padding: 3rpx 12rpx;
  border-radius: 12rpx;
  display: inline-block;
}

/* 查看按钮样式 */
.view-btn {
  min-width: 100rpx;
  height: 50rpx;
  background-color: #1677ff;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15rpx;
}

.view-btn-text {
  color: #ffffff;
  font-size: 26rpx;
  font-weight: 500;
}

/* 底部样式 */
.footer {
  text-align: center;
  padding: 25rpx 0;
  color: #666;
  margin-top: 20rpx;
}

.organizer {
  font-size: 24rpx;
  display: block;
}

/* 响应式调整 */
@media (min-width: 750rpx) {
  .image-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>