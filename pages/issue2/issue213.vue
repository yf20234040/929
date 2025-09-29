<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">会议资料</text>
        <text class="page-subtitle">启动仪式相关文档与演示文稿</text>
      </view>
      <view class="header-decoration">
        <view class="decoration-circle"></view>
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 文件展示区域 -->
    <view class="files-section">
      <view class="section-header">
        <text class="section-title">📚 会议文档</text>
        <text class="section-desc">启动仪式相关文件与演示材料</text>
      </view>
      
      <view class="files-grid">
        <view
          v-for="(file, index) in fileList"
          :key="index"
          class="file-card"
          :class="'file-card-' + (index % 3 + 1)"
          @tap="viewFile(file)"
        >
          <!-- 文件图标容器 -->
          <view class="file-icon-container">
            <text class="file-icon">{{ getFileIcon(file.type) }}</text>
            <view class="file-type-badge">{{ file.type.toUpperCase() }}</view>
          </view>

          <!-- 文件信息 -->
          <view class="file-info">
            <text class="file-name">{{ file.name }}</text>
            <view class="file-meta">
              <text class="meta-item">📅 2024-03-30</text>
              <text class="meta-item">🏢 启动仪式</text>
            </view>
            <view class="file-description">
              <text class="desc-text">{{ getFileDescription(file.type) }}</text>
            </view>
          </view>

          <!-- 操作按钮 -->
          <view class="action-buttons">
            <view class="view-btn primary">
              <text class="btn-text">查看</text>
              <text class="btn-icon">👁️</text>
            </view>
            <view class="download-btn secondary">
              <text class="btn-text">下载</text>
              <text class="btn-icon">⬇️</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 文件类型说明 -->
    <view class="info-section">
      <view class="info-card">
        <view class="info-header">
          <text class="info-icon">📋</text>
          <text class="info-title">文件说明</text>
        </view>
        <view class="info-content">
          <text class="info-text">• DOCX：Word文档，包含启动会的详细文稿内容</text>
          <text class="info-text">• PPTX：PowerPoint演示文稿，用于会议讲解和展示</text>
          <text class="info-text">• 所有文件均可在线查看或下载到本地</text>
        </view>
      </view>
    </view>

    <!-- 底部装饰 -->
    <view class="footer">
      <text class="organizer">"洞见历史"研学第二期项目组</text>
    </view>
  </view>
</template>

<script>
import { openDocumentFromUrl } from '../../utils/openDoc.js'
export default {
  data() {
    return {
      fileList: [
        { name: "启动会稿子", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/%E5%90%AF%E5%8A%A8%E4%BC%9A%E7%A8%BF%E5%AD%90.docx" },
        { name: "启动会讲解", type: "pptx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/%E5%90%AF%E5%8A%A8%E4%BC%9A%E8%AE%B2%E8%A7%A3.pptx" }
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
    getFileDescription(type) {
      if (type === 'docx') return 'Word文档，包含详细文稿内容';
      if (type === 'pptx') return 'PowerPoint演示文稿，用于会议展示';
      if (type === 'pdf') return 'PDF文档，便于阅读和分享';
      return '通用文档格式';
    },
    viewFile(file) {
      openDocumentFromUrl({ url: file.url, type: file.type })
    },
    downloadFile(file) {
      uni.showLoading({ title: '下载中...' });
      uni.downloadFile({
        url: file.url,
        success: (res) => {
          uni.hideLoading();
          if (res.statusCode === 200) {
            uni.saveFile({
              tempFilePath: res.tempFilePath,
              success: () => {
                uni.showToast({ title: '文件已保存' });
              },
              fail: () => {
                uni.showToast({ title: '保存失败', icon: 'none' });
              }
            });
          } else {
            uni.showToast({ title: '下载失败', icon: 'none' });
          }
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({ title: '网络错误', icon: 'none' });
        }
      });
    }
  }
};
</script>

<style scoped>
/* 基础颜色调整为蓝白浅色风格 */
.container {
  min-height: 100vh;
  background-color: #f5f7fa; /* 浅灰背景 */
  padding: 40rpx 30rpx;
  box-sizing: border-box;
}

/* 页面标题样式 - 调整为蓝白配色 */
.page-header {
  margin-bottom: 60rpx;
  position: relative;
}

.header-content {
  text-align: center;
  margin-bottom: 30rpx;
  background-color: white;
  border-radius: 16rpx;
  padding: 30rpx 0;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.page-title {
  display: block;
  font-size: 34rpx;
  font-weight: bold;
  color: #1677ff; /* 主蓝色 */
  margin-bottom: 16rpx;
}

.page-subtitle {
  display: block;
  font-size: 26rpx;
  color: #666; /* 深灰色文本 */
  font-weight: 300;
}

.header-decoration {
  display: none; /* 移除原有装饰 */
}

/* 文件展示区域样式 - 调整为蓝白配色 */
.files-section {
  margin-bottom: 60rpx;
}

.section-header {
  margin-bottom: 30rpx;
}

.section-title {
  display: block;
  font-size: 30rpx;
  font-weight: bold;
  color: #1677ff; /* 主蓝色 */
  margin-bottom: 12rpx;
  padding-left: 5rpx;
}

.section-desc {
  display: block;
  font-size: 24rpx;
  color: #666; /* 深灰色文本 */
  padding-left: 5rpx;
}

.files-grid {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.file-card {
  background-color: white; /* 白色卡片 */
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05); /* 轻微阴影 */
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 30rpx;
  border-left: 5rpx solid #1677ff; /* 蓝色左侧边框 */
}

.file-card:hover {
  transform: translateY(-4rpx);
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
}

/* 文件图标容器 - 调整为蓝色系 */
.file-icon-container {
  position: relative;
  width: 100rpx;
  height: 100rpx;
  background-color: #e8f3ff; /* 浅蓝色背景 */
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.file-icon {
  font-size: 40rpx;
  color: #1677ff; /* 蓝色图标 */
}

.file-type-badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background-color: #1677ff; /* 蓝色标签 */
  color: white;
  font-size: 20rpx;
  font-weight: bold;
  padding: 6rpx 12rpx;
  border-radius: 12rpx;
  min-width: 50rpx;
  text-align: center;
}

/* 文件信息样式调整 */
.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #333; /* 深灰色文件名 */
  margin-bottom: 16rpx;
  line-height: 1.4;
}

.file-meta {
  display: flex;
  gap: 20rpx;
  margin-bottom: 16rpx;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 22rpx;
  color: #666; /* 灰色元数据 */
  background-color: #f5f7fa; /* 浅灰背景 */
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
}

.desc-text {
  font-size: 24rpx;
  color: #5a6c7d; /* 中灰色描述 */
  line-height: 1.5;
}

/* 操作按钮样式 - 调整为蓝色系 */
.action-buttons {
  display: flex;
  gap: 16rpx;
  flex-shrink: 0;
}

.view-btn, .download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 16rpx 24rpx;
  border-radius: 8rpx;
  transition: all 0.3s ease;
  min-width: 120rpx;
}

.view-btn.primary {
  background-color: #1677ff; /* 主蓝色按钮 */
  color: white;
}

.download-btn.secondary {
  background-color: #e8f3ff; /* 浅蓝色按钮 */
  color: #1677ff; /* 蓝色文字 */
  border: none;
}

.view-btn:hover, .download-btn:hover {
  opacity: 0.9;
  transform: none;
}

.btn-text {
  font-size: 26rpx;
  font-weight: 500;
}

.btn-icon {
  font-size: 24rpx;
}

/* 信息卡片样式 - 调整为蓝白配色 */
.info-section {
  margin-bottom: 60rpx;
}

.info-card {
  background-color: white; /* 白色卡片 */
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 24rpx;
  padding-bottom: 15rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.info-icon {
  font-size: 36rpx;
  color: #1677ff; /* 蓝色图标 */
}

.info-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #1677ff; /* 蓝色标题 */
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.info-text {
  font-size: 24rpx;
  color: #333; /* 深灰色文本 */
  line-height: 1.6;
}

/* 底部样式调整 */
.bottom-decoration {
  display: none; /* 移除装饰点 */
}

.footer {
  text-align: center;
  padding: 25rpx 0;
  color: #666;
}

.organizer {
  font-size: 24rpx;
  display: block;
}

@media (max-width: 750rpx) {
  .container {
    padding: 30rpx 20rpx;
  }
  
  .file-card {
    flex-direction: column;
    text-align: center;
    gap: 24rpx;
  }
  
  .file-info {
    text-align: center;
  }
  
  .file-meta {
    justify-content: center;
  }
  
  .action-buttons {
    flex-direction: row;
    gap: 20rpx;
  }
}
</style>