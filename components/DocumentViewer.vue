<template>
  <view class="document-viewer">
    <!-- 文档预览弹窗 -->
    <view class="modal" v-if="visible" @click="closeModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">{{ title }}</text>
          <view class="modal-close" @click="closeModal">
            <text class="close-icon">×</text>
          </view>
        </view>
        
        <view class="modal-body">
          <!-- 文档类型提示 -->
          <view class="doc-tip">
            <text class="tip-icon">📄</text>
            <text class="tip-text">由于微信小程序限制，建议使用以下方式查看文档：</text>
          </view>
          
          <!-- 操作按钮 -->
          <view class="action-buttons">
            <button class="action-btn primary" @click="openInWechat">
              <text class="btn-icon">📱</text>
              <text class="btn-text">在微信中打开</text>
            </button>
            
            <button class="action-btn secondary" @click="copyLink">
              <text class="btn-icon">🔗</text>
              <text class="btn-text">复制链接</text>
            </button>
            
            <button class="action-btn secondary" @click="downloadFile">
              <text class="btn-icon">⬇️</text>
              <text class="btn-text">下载文件</text>
            </button>
          </view>
          
          <!-- 文件信息 -->
          <view class="file-info">
            <view class="info-item">
              <text class="info-label">文件名：</text>
              <text class="info-value">{{ fileName }}</text>
            </view>
            <view class="info-item">
              <text class="info-label">文件大小：</text>
              <text class="info-value">{{ fileSize }}</text>
            </view>
            <view class="info-item">
              <text class="info-label">文件类型：</text>
              <text class="info-value">{{ fileType }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'DocumentViewer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '文档预览'
    },
    fileUrl: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    },
    fileSize: {
      type: String,
      default: ''
    },
    fileType: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    
    // 在微信中打开
    openInWechat() {
      if (this.fileUrl) {
        // 使用优化后的预览功能
        import('../utils/openDoc.js').then(module => {
          module.openDocumentFromUrl({
            url: this.fileUrl,
            name: this.title,
            type: this.fileType
          });
        }).catch(err => {
          console.error('导入openDocumentFromUrl失败:', err);
          uni.showToast({ title: '预览功能加载失败', icon: 'none' });
        });
      }
      this.closeModal();
    },
    
    // 复制链接
    copyLink() {
      if (this.fileUrl) {
        uni.setClipboardData({
          data: this.fileUrl,
          success: () => {
            uni.showToast({
              title: '链接已复制',
              icon: 'success'
            });
          }
        });
      }
    },
    
    // 下载文件
    downloadFile() {
      if (this.fileUrl) {
        uni.downloadFile({
          url: this.fileUrl,
          success: (res) => {
            if (res.statusCode === 200) {
              uni.showToast({
                title: '文件下载成功',
                icon: 'success'
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: '下载失败',
              icon: 'none'
            });
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.document-viewer {
  position: relative;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  width: 90%;
  max-width: 600rpx;
  background: white;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 40rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.modal-close {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f5f5f5;
}

.close-icon {
  font-size: 36rpx;
  color: #666;
}

.modal-body {
  padding: 40rpx;
}

.doc-tip {
  display: flex;
  align-items: flex-start;
  margin-bottom: 40rpx;
  padding: 30rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
}

.tip-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
  margin-top: 4rpx;
}

.tip-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-bottom: 40rpx;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88rpx;
  border-radius: 44rpx;
  font-size: 30rpx;
  font-weight: 500;
  border: none;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.3);
}

.action-btn.secondary {
  background: #f8f9fa;
  color: #333;
  border: 2rpx solid #e9ecef;
}

.action-btn:active {
  transform: translateY(2rpx);
}

.btn-icon {
  font-size: 32rpx;
  margin-right: 15rpx;
}

.file-info {
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 30rpx;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 28rpx;
  color: #666;
  width: 140rpx;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}
</style>
