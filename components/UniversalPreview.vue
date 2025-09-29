<template>
  <view class="universal-preview">
    <!-- 预览按钮 -->
    <view class="preview-btn" @click="handlePreview" :class="{ 'loading': loading }">
      <text class="btn-text">{{ loading ? '预览中...' : '查看' }}</text>
    </view>
  </view>
</template>

<script>
import { previewDocument } from '../utils/documentUtils.js';

export default {
  name: 'UniversalPreview',
  props: {
    // 文件对象或URL字符串
    file: {
      type: [String, Object],
      required: true
    },
    // 文档标题
    title: {
      type: String,
      default: ''
    },
    // 文档类型
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async handlePreview() {
      if (this.loading) return;
      
      this.loading = true;
      
      try {
        // 构建文件对象
        let fileObj;
        
        if (typeof this.file === 'string') {
          // 如果是字符串，当作URL处理
          fileObj = {
            url: this.file,
            name: this.title || '文档',
            type: this.type
          };
        } else {
          // 如果是对象，直接使用
          fileObj = this.file;
        }
        
        // 检查是否有URL
        if (!fileObj.url) {
          uni.showToast({
            title: '文档链接无效',
            icon: 'none'
          });
          return;
        }
        
        // 使用预览功能
        previewDocument(fileObj, this.title);
        
      } catch (error) {
        console.error('预览失败:', error);
        uni.showToast({
          title: '预览失败',
          icon: 'none'
        });
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.universal-preview {
  display: inline-block;
}

.preview-btn {
  background-color: #e0f2fe;
  color: #0284c7;
  padding: 12rpx 24rpx;
  border-radius: 8rpx;
  font-size: 26rpx;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center;
  min-width: 120rpx;
}

.preview-btn:active {
  background-color: #bae6fd;
  color: #0369a1;
}

.preview-btn.loading {
  background-color: #f3f4f6;
  color: #9ca3af;
}

.btn-text {
  font-size: 26rpx;
}
</style>
















