<template>
  <view class="container">
    <!-- 所有内容都包裹在这个根容器内 -->
    
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">宣传组</text>
        <text class="page-subtitle">任务清单与视频成果展示</text>
      </view>
      <view class="header-decoration">
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 文件部分 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">文档</text>
        <text class="section-desc">点击查看详情</text>
      </view>
      
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

    <!-- 视频部分 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">视频成果</text>
        <text class="section-desc">点击播放查看</text>
      </view>
      
      <view class="video-list">
        <view
          v-for="(video, index) in videoList"
          :key="index"
          class="video-card"
          :class="'file-' + (index % 4)"
        >
          <view class="video-container">
            <video
              :src="video.url"
              controls
              class="video-player"
              poster="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/static/play.png"
              :id="'video-' + index"
              @play="handlePlay(index)"
            ></video>
          </view>

          <view class="video-info">
            <view class="video-title-container">
              <text class="video-title">{{ video.name }}</text>
              <view class="video-badge">
                <text class="badge-text">微课</text>
              </view>
            </view>
            <view class="video-meta">
              <text class="meta-item">📚 历史教育</text>
              <text class="meta-item">🎬 视频内容</text>
            </view>
          </view>
        </view>
      </view>
    </view>
	
	<!-- 图片部分 - 增加版本标注 -->
	<view class="section-container">
	  <view class="section-header">
	    <text class="section-title">logo版本演进</text>
	    <text class="section-desc">点击查看高清版本</text>
	  </view>
	  
	  <view class="image-grid">
	    <view
	      v-for="(img, index) in imgList"
	      :key="index"
	      class="image-card"
	      :class="'image-' + (index % 5)"
	      @tap="previewImage(index)"
	    >
	      <!-- 图片容器 -->
	      <view class="image-wrapper">
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
	      
	      <!-- 版本标注 - 新增部分 -->
	      <view class="image-version">
	        <text class="version-text">
	          {{ index === 5 ? '第六版（最终版）' : `第${index + 1}版` }}
	        </text>
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
      fileList: [
        { name: "宣传片组任务清单", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%89%87%E7%BB%84%E4%BB%BB%E5%8A%A1%E6%B8%85%E5%8D%95.docx" },
        { name: "宣传组 自媒体项目任务书", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%20%E8%87%AA%E5%AA%92%E4%BD%93%E9%A1%B9%E7%9B%AE%E4%BB%BB%E5%8A%A1%E4%B9%A6%20%281%29.docx" },
		{ name: "slogan", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/slogan.docx" },
        { name: "主题", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/%E4%B8%BB%E9%A2%98.docx" },
        { name: "电商数据分析", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/%E7%94%B5%E5%95%86%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90.docx" }
      ],
	  imgList: [
	    'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/logo/%E7%AC%AC%E4%B8%80%E7%89%88.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/logo/%E7%AC%AC%E4%BA%8C%E7%89%88.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/logo/%E7%AC%AC%E4%B8%89%E7%89%88.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/logo/%E7%AC%AC%E5%9B%9B%E7%89%88.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/logo/%E7%AC%AC%E4%BA%94%E7%89%88.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/logo/%E7%AC%AC%E5%85%AD%E7%89%88%EF%BC%88%E6%9C%80%E7%BB%88%E7%89%88%EF%BC%89.jpg'
	  ],
      videoList: [
        { name: "宣传片", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/%E5%AE%A3%E4%BC%A0%E7%89%87.mp4" },
        { name: "自媒体视频1", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/%E8%87%AA%E5%AA%92%E4%BD%93%E8%A7%86%E9%A2%911.mp4" },
        { name: "自媒体视频2", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E5%AE%A3%E4%BC%A0%E7%BB%84/%E5%AE%A3%E4%BC%A0%E7%BB%84%E6%88%90%E6%9E%9C/%E8%87%AA%E5%AA%92%E4%BD%93%E8%A7%86%E9%A2%911.mp4" }
      ],
      currentPlaying: -1,
      videoCtxCache: {}
    };
  },
  methods: {
    getFileIcon(type) {
      if (type === 'doc' || type === 'docx') return '📄';
      if (type === 'zip') return '🗜️';
      return '📁';
    },

    viewFile(file) {
      openDocumentFromUrl({ url: file.url, type: file.type })
    },
    
    previewImage(index) {
      uni.previewImage({
        current: this.imgList[index],
        urls: this.imgList,
        // 预览时显示的标题（版本信息）
        longPressActions: {
          itemList: [index === 5 ? '第六版（最终版）' : `第${index + 1}版`]
        }
      });
    },

    handlePlay(index) {
      if (this.currentPlaying === index) return;

      if (this.currentPlaying !== -1) {
        const prevCtx = this.videoCtxCache[this.currentPlaying] || uni.createVideoContext(`video-${this.currentPlaying}`, this);
        prevCtx.pause();
      }

      this.currentPlaying = index;
      this.videoCtxCache[index] = uni.createVideoContext(`video-${index}`, this);
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.page-header {
  margin-bottom: 20rpx;
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

.section-container {
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

.file-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
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
  width: 100%;
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

.video-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.video-card {
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.video-card:hover {
  transform: translateY(-3rpx);
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.08);
}

.video-container {
  position: relative;
  background: #f8f9fa;
  border-bottom: 1rpx solid #f1f5f9;
}

.video-player {
  width: 100%;
  height: 400rpx;
  display: block;
}

.video-info {
  padding: 24rpx;
}

.video-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.video-title {
  font-size: 26rpx;
  font-weight: 500;
  color: #333333;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-badge {
  background-color: #f1f5f9;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  margin-left: 20rpx;
}

.file-0 .video-badge { background-color: #fee2e2; }
.file-1 .video-badge { background-color: #cffafe; }
.file-2 .video-badge { background-color: #dbeafe; }
.file-3 .video-badge { background-color: #dcfce7; }

.file-0 .badge-text { color: #dc2626; }
.file-1 .badge-text { color: #0891b2; }
.file-2 .badge-text { color: #2563eb; }
.file-3 .badge-text { color: #059669; }

.badge-text {
  font-size: 22rpx;
  font-weight: 500;
}

.video-meta {
  display: flex;
  gap: 20rpx;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 22rpx;
  color: #6b7280;
  background: #f8fafc;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

/* 图片部分样式 - 新增版本标注样式 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200rpx, 1fr));
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
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  position: relative;
  flex-grow: 1;
}

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

/* 版本标注样式 */
.image-version {
  padding: 12rpx;
  background-color: #f8fafc;
  text-align: center;
  border-top: 1rpx solid #f1f5f9;
}

.version-text {
  font-size: 22rpx;
  color: #333333;
  font-weight: 500;
}

/* 图片卡片边框色 */
.image-0 { border: 2rpx solid #ef4444; }
.image-1 { border: 2rpx solid #06b6d4; }
.image-2 { border: 2rpx solid #3b82f6; }
.image-3 { border: 2rpx solid #10b981; }
.image-4 { border: 2rpx solid #f59e0b; }

.bottom-decoration {
  margin-top: 20rpx;
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
  
  .section-container {
    padding: 24rpx;
  }
  
  .video-player {
    height: 300rpx;
  }
  
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>