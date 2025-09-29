<template>
  <view class="container">
    <!-- 页面标题区域 -->
    <view class="header">
      <text class="title">霍兰德职业兴趣测试</text>
      <text class="subtitle">前期准备与测评结果</text>
    </view>

    <!-- 项目介绍区域 -->
    <view class="section">
      <view class="section-title">
        <text>📝 项目缘起</text>
      </view>
      <view class="content-card">
        <text class="content-text">洞见历史项目创新性地构建了"职业兴趣引导+跨学段协作"的成长共同体模式。在项目启动阶段，依托霍兰德职业兴趣测试（Holland Code）的六维评估体系，通过兴趣岛选择、职业倾向问卷、情景模拟任务等多元测评工具，系统梳理参与者的职业兴趣图谱。</text>
        <text class="content-text">测评结果经过交叉验证后，项目组运用大数据匹配算法，将具有RIASEC代码相关性（如现实型中学生与研究型大学生、艺术型中学生与社会型大学生）的学员组成跨学段成长搭档，形成覆盖"学术导师-职业引路人-朋辈伙伴"三重支持体系的学习小组。</text>
      </view>
    </view>

    <!-- 测试结果区域 -->
    <view class="section">
      <view class="section-title">
        <text>📊 测试结果</text>
      </view>
      
      <view class="result-tabs">
        <view class="tab active">大学生测评</view>
        <view class="tab">中学生测评</view>
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
            <text class="file-meta">
              <text class="file-type">{{ file.type.toUpperCase() }}</text>
              <text class="file-divider">|</text>
              <text class="file-size">点击查看详情</text>
            </text>
          </view>
          <view class="view-btn">
            <icon type="arrowright" size="24" color="#1677ff" />
          </view>
        </view>
      </view>
    </view>

    <!-- 兴趣配对结果区域 -->
    <view class="section">
      <view class="section-title">
        <text>🔄 兴趣配对结果</text>
      </view>
      <view class="content-card">
        <text class="content-text">项目组基于霍兰德职业兴趣测试的RIASEC六维评估体系，将大学生与中学生进行了科学配对，形成了优势互补的学习小组。配对结果充分考虑了现实型(R)、研究型(I)、艺术型(A)、社会型(S)、企业型(E)和常规型(C)六种职业兴趣类型的匹配度，以促进跨学段协作学习效果最大化。</text>
        
        <view class="pairing-info">
          <view class="pairing-item">
            <text class="pairing-label">配对原则：</text>
            <text class="pairing-value">RIASEC代码相关性匹配</text>
          </view>
          <view class="pairing-item">
            <text class="pairing-label">参与人数：</text>
            <text class="pairing-value">大学生24人，中学生36人</text>
          </view>
          <view class="pairing-item">
            <text class="pairing-label">组成小组：</text>
            <text class="pairing-value">12个跨学段学习小组</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="footer">
      <text class="organizer">"洞见历史"研学项目组 © 2024</text>
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
        { name: "职业兴趣加研究主题收集表（大学生）", type: "xlsx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%9C%8D%E5%85%B0%E5%BE%B7%E8%81%8C%E4%B8%9A%E5%85%B4%E8%B6%A3%E6%B5%8B%E8%AF%95/%E8%81%8C%E4%B8%9A%E5%85%B4%E8%B6%A3%E5%8A%A0%E7%A0%94%E7%A9%B6%E4%B8%BB%E9%A2%98%E6%94%B6%E9%9B%86%E8%A1%A8.xlsx" },
        { name: "学生测评结果（中学生）", type: "xlsx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%9C%8D%E5%85%B0%E5%BE%B7%E8%81%8C%E4%B8%9A%E5%85%B4%E8%B6%A3%E6%B5%8B%E8%AF%95/%E5%AD%A6%E7%94%9F%E6%B5%8B%E8%AF%84%E7%BB%93%E6%9E%9C.xlsx" }
	  ]
    };
  },
  methods: {
    // 根据文件类型返回对应图标
    getFileIcon(type) {
      if (type === 'xlsx') return '📊';
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
}

.section-title text {
  font-size: 30rpx;
  font-weight: bold;
  color: #1677ff;
}

/* 内容卡片样式 */
.content-card {
  background-color: #f9f9f9;
  border-radius: 12rpx;
  padding: 20rpx;
  line-height: 1.6;
}

.content-text {
  font-size: 24rpx;
  color: #333;
  display: block;
  margin-bottom: 15rpx;
}

.content-text:last-child {
  margin-bottom: 0;
}

/* 标签页样式 */
.result-tabs {
  display: flex;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  overflow: hidden;
  background-color: #f5f7fa;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 15rpx 0;
  font-size: 26rpx;
  color: #666;
  background-color: #f5f7fa;
}

.tab.active {
  background-color: #1677ff;
  color: white;
  font-weight: bold;
}

/* 文件列表样式 */
.file-list {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
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
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 5rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-meta {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 22rpx;
}

.file-type {
  color: #1677ff;
  background-color: #e8f3ff;
  padding: 3rpx 12rpx;
  border-radius: 12rpx;
}

.file-divider {
  color: #ccc;
  font-size: 18rpx;
}

.file-size {
  color: #666;
}

.view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: #e8f3ff;
}

/* 配对信息样式 */
.pairing-info {
  margin-top: 20rpx;
  background-color: #e8f3ff;
  border-radius: 10rpx;
  padding: 15rpx;
}

.pairing-item {
  display: flex;
  margin-bottom: 12rpx;
}

.pairing-item:last-child {
  margin-bottom: 0;
}

.pairing-label {
  font-size: 24rpx;
  font-weight: bold;
  color: #1677ff;
  min-width: 140rpx;
}

.pairing-value {
  font-size: 24rpx;
  color: #333;
  flex: 1;
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

/* 响应式调整 */
@media (max-width: 750rpx) {
  .file-card {
    padding: 15rpx;
  }
  
  .file-icon-container {
    width: 60rpx;
    height: 60rpx;
  }
}
</style>