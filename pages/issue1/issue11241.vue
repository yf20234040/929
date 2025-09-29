<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">团队互评表</text>
      <text class="page-subtitle">"洞见历史"研学项目团队互评表</text>
    </view>
    
    <!-- 评价表内容 -->
    <view class="evaluation-content">
      <view class="content-section">
        <text class="section-title">评价说明</text>
        <text class="section-text">本评价表用于团队成员之间的相互评价，旨在促进团队协作和共同进步。</text>
      </view>
      
      <view class="content-section">
        <text class="section-title">评价维度</text>
        <view class="evaluation-items">
          <view class="evaluation-item">
            <text class="item-title">1. 参与度</text>
            <text class="item-desc">团队成员在项目中的参与程度和积极性</text>
          </view>
          <view class="evaluation-item">
            <text class="item-title">2. 协作能力</text>
            <text class="item-desc">与团队成员的合作配合能力</text>
          </view>
          <view class="evaluation-item">
            <text class="item-title">3. 学习态度</text>
            <text class="item-desc">对学习内容的认真程度和求知欲</text>
          </view>
          <view class="evaluation-item">
            <text class="item-title">4. 创新能力</text>
            <text class="item-desc">在项目中的创新思维和解决问题的能力</text>
          </view>
        </view>
      </view>
      
      <view class="content-section">
        <text class="section-title">评价方式</text>
        <text class="section-text">采用5分制评分，1分表示需要改进，5分表示表现优秀。请根据实际情况客观评价。</text>
      </view>
      
      <view class="content-section">
        <text class="section-title">注意事项</text>
        <text class="section-text">• 评价应客观公正，避免个人偏见\n• 评价结果仅用于团队改进，不对外公开\n• 如有疑问，可联系项目负责人</text>
      </view>
    </view>
    
    <!-- 操作按钮 -->
    <view class="action-buttons">
      <button class="download-btn" @click="downloadForm">下载评价表</button>
      <button class="preview-btn" @click="previewForm">在线预览</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      docOnlineUrl: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83/%E8%AF%84%E4%BB%B7%E4%BD%93%E7%B3%BB/%E2%80%9C%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E2%80%9D%E7%A0%94%E5%AD%A6%E9%A1%B9%E7%9B%AE%E5%9B%A2%E9%98%9F%E4%BA%92%E8%AF%84%E8%A1%A8.docx"
    };
  },
  
  onLoad() {
    console.log('团队互评表页面加载');
  },
  
  methods: {
    // 下载评价表
    downloadForm() {
      uni.showToast({
        title: '开始下载...',
        icon: 'loading'
      });
      
      this.openDocument();
    },
    
    // 在线预览评价表
    previewForm() {
      uni.showToast({
        title: '准备预览...',
        icon: 'loading'
      });
      
      this.openDocument();
    },
    
    // 打开文档
    openDocument() {
      import('../../utils/openDoc.js').then(module => {
        module.openDocumentFromUrl({
          url: this.docOnlineUrl,
          type: 'docx'
        });
      }).catch(err => {
        console.error('导入openDocumentFromUrl失败:', err);
        uni.showToast({ title: '预览功能加载失败', icon: 'none' });
      });
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  text-align: center;
  color: white;
}

.page-title {
  font-size: 40rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.page-subtitle {
  font-size: 28rpx;
  opacity: 0.9;
  display: block;
}

.evaluation-content {
  padding: 30rpx;
}

.content-section {
  margin-bottom: 40rpx;
  background: white;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
  border-left: 6rpx solid #667eea;
  padding-left: 20rpx;
}

.section-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  display: block;
  white-space: pre-line;
}

.evaluation-items {
  margin-top: 20rpx;
}

.evaluation-item {
  margin-bottom: 20rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 8rpx;
}

.item-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.item-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
  display: block;
}

.action-buttons {
  padding: 30rpx;
  display: flex;
  gap: 20rpx;
}

.download-btn, .preview-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  font-size: 30rpx;
  font-weight: bold;
  border: none;
}

.download-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.preview-btn {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

.download-btn:active, .preview-btn:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>