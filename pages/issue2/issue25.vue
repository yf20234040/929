<template>
  <view class="container">
    <!-- 页面标题区域 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">学术论文成果</text>
        <text class="page-subtitle">项目相关文档资料汇总</text>
      </view>
      <view class="header-decoration">
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 文件列表区域 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">文档资料</text>
        <text class="section-desc">点击查看详细内容</text>
      </view>
      
      <view class="file-list">
        <view
          v-for="(file, index) in fileList"
          :key="index"
          class="file-card"
          :class="'file-' + (index % 3)"
          @tap="viewFile(file)"
        >
          <view class="file-icon-container">
            <text class="file-icon">{{ getFileIcon(file.type) }}</text>
          </view>
          <view class="file-info">
            <text class="file-name">{{ file.name }}</text>
            <text class="file-meta">
              <text class="file-type">{{ file.type.toUpperCase() }}</text>
              <text class="file-divider">|</text>
              <text class="file-size">查看详情</text>
            </text>
          </view>
          <view class="view-btn">
            <text class="btn-arrow">→</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部装饰区域 -->
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
      // 文件列表数据
      fileList: [
        { name: "KWL——需求与问题搜集", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/KWL%E2%80%94%E2%80%94%E9%9C%80%E6%B1%82%E4%B8%8E%E9%97%AE%E9%A2%98%E6%90%9C%E9%9B%86.docx" },
        { name: "洞见历史作品使用协议书", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E4%BD%9C%E5%93%81%E4%BD%BF%E7%94%A8%E5%8D%8F%E8%AE%AE%E4%B9%A6.docx" },
        { name: "博物馆研学活动（介绍）", type: "pptx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%8D%8F%E4%BD%9C%E5%B7%A5%E5%85%B7%E5%BA%93/%E5%8D%9A%E7%89%A9%E9%A6%86%E7%A0%94%E5%AD%A6%E6%B4%BB%E5%8A%A8%EF%BC%88%E4%BB%8B%E7%BB%8D%EF%BC%89.pptx" },  
      ],
    };
  },
  methods: {
    // 根据文件类型返回对应图标
    getFileIcon(type) {
      if (type === 'docx') return '📄';
      if (type === 'pptx') return '📊';
      if (type === 'pdf') return '📖';
      return '📁';
    },

    // 查看文件方法
    viewFile(file) {
      openDocumentFromUrl({ url: file.url, type: file.type })
    }
  }
};
</script>

<style scoped>
/* 基础容器样式 - 使用指定的紫色渐变 */
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  box-sizing: border-box;
}

/* 页面标题样式 - 紫色系配色 */
.page-header {
  margin-bottom: 60rpx;
  position: relative;
  padding-top: 20rpx;
}

.header-content {
  text-align: center;
  margin-bottom: 20rpx;
}

.page-title {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
  text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.2);
}

.page-subtitle {
  display: block;
  font-size: 26rpx;
  color: rgba(255,255,255,0.9);
  font-weight: 400;
}

.header-decoration {
  display: flex;
  justify-content: center;
  align-items: center;
}

.decoration-line {
  width: 160rpx;
  height: 3rpx;
  background: linear-gradient(90deg, transparent, #c0b3e0, transparent);
  border-radius: 2rpx;
}

/* 区块容器样式 - 紫色系卡片设计 */
.section-container {
  margin-bottom: 70rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 36rpx;
  box-shadow: 0 10rpx 25rpx -5rpx rgba(55, 48, 163, 0.1), 0 8rpx 10rpx -6rpx rgba(55, 48, 163, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

/* 顶部装饰条 - 紫色渐变 */
.section-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6rpx;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.section-container:hover {
  box-shadow: 0 20rpx 25rpx -5rpx rgba(55, 48, 163, 0.15), 0 10rpx 10rpx -5rpx rgba(55, 48, 163, 0.1);
  transform: translateY(-2rpx);
}

.section-header {
  text-align: center;
  margin-bottom: 40rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f1f5f9;
}

.section-title {
  display: block;
  font-size: 34rpx;
  font-weight: 600;
  color: #4a4080;
  margin-bottom: 10rpx;
  position: relative;
}

/* 标题小装饰 - 紫色 */
.section-title::after {
  content: '';
  position: absolute;
  bottom: -12rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 4rpx;
  background-color: #764ba2;
  border-radius: 2rpx;
}

.section-desc {
  display: block;
  font-size: 22rpx;
  color: #6b7280;
  margin-top: 20rpx;
}

/* 文件列表样式 - 紫色系配色方案 */
.file-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.file-card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 28rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 24rpx;
  border: 1rpx solid #f3f0ff;
  overflow: hidden;
  position: relative;
}

/* 卡片悬停效果 */
.file-card:hover {
  transform: translateY(-4rpx);
  box-shadow: 0 10rpx 15rpx -3rpx rgba(55, 48, 163, 0.1), 0 4rpx 6rpx -2rpx rgba(55, 48, 163, 0.05);
  border-color: #e9e4ff;
}

/* 不同文件卡片的主题色 - 紫色系变化 */
.file-0 { border-left: 6rpx solid #667eea; }
.file-1 { border-left: 6rpx solid #805ad5; }
.file-2 { border-left: 6rpx solid #764ba2; }

/* 文件图标容器 - 紫色系背景 */
.file-icon-container {
  width: 80rpx;
  height: 80rpx;
  border-radius: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.file-card:hover .file-icon-container {
  transform: scale(1.05);
}

.file-0 .file-icon-container { background-color: #f0edff; }
.file-1 .file-icon-container { background-color: #faf5ff; }
.file-2 .file-icon-container { background-color: #f5f0ff; }

.file-icon {
  font-size: 36rpx;
}

/* 图标颜色 - 紫色系变化 */
.file-0 .file-icon { color: #667eea; }
.file-1 .file-icon { color: #805ad5; }
.file-2 .file-icon { color: #764ba2; }

/* 文件信息区域 */
.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  font-size: 30rpx;
  font-weight: 500;
  color: #3d316b;
  margin-bottom: 8rpx;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.file-card:hover .file-name {
  color: #667eea;
}

.file-meta {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 22rpx;
}

.file-type {
  color: #5d518c;
  background: #f7f5ff;
  padding: 4rpx 14rpx;
  border-radius: 14rpx;
  font-weight: 500;
}

.file-divider {
  color: #e9e4ff;
  font-size: 18rpx;
}

.file-size {
  color: #7e72b2;
  transition: color 0.3s ease;
}

.file-card:hover .file-size {
  color: #667eea;
}

/* 查看按钮样式 - 紫色系交互反馈 */
.view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background-color: #f7f5ff;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.file-card:hover .view-btn {
  background-color: #f0edff;
}

.btn-arrow {
  color: #7e72b2;
  font-size: 26rpx;
  transition: all 0.3s ease;
}

.file-card:hover .btn-arrow {
  transform: translateX(6rpx);
  color: #667eea;
}

/* 底部装饰区域 - 紫色系动画 */
.bottom-decoration {
  margin-top: 80rpx;
  display: flex;
  justify-content: center;
  padding-bottom: 40rpx;
}

.decoration-dots {
  display: flex;
  gap: 18rpx;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  background: #c0b3e0;
  border-radius: 50%;
  animation: pulse 2s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.4s;
}

.dot:nth-child(3) {
  animation-delay: 0.8s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
    background-color: #9f7aea;
  }
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .container {
    padding: 30rpx 20rpx;
  }
  
  .page-title {
    font-size: 42rpx;
  }
  
  .section-title {
    font-size: 30rpx;
  }
  
  .section-container {
    padding: 28rpx 20rpx;
  }
  
  .file-card {
    padding: 24rpx;
    gap: 20rpx;
  }
  
  .file-icon-container {
    width: 70rpx;
    height: 70rpx;
  }
  
  .file-name {
    font-size: 28rpx;
  }
}
</style>