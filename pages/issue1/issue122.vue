<!-- 项目管理中心-评价体系 -->
<template>
  <view class="container">
    <!-- 内容滚动区域 -->
    <scroll-view class="content" scroll-y>
      <!-- 文件列表 -->
      <view class="file-list">
        <view 
          v-for="(file, index) in fileList" 
          :key="file.id"
          class="file-item"
          @tap="previewFile(file)"
        >
          <!-- 文件图标 -->
          <view class="file-icon" :style="{ backgroundColor: getIconColor(file.type) }">
            <text class="iconfont">{{ getFileIcon(file.type) }}</text>
          </view>

          <!-- 文件信息 - 增加灵活空间分配 -->
          <view class="file-info">
            <text class="file-name">{{ file.name }}</text>
          </view>

          <!-- 查看按钮 - 固定宽度避免挤压文字 -->
          <view class="view-btn-container">
            <view class="view-btn" @tap.stop="viewFile(file)">
              <text class="view-text">查看</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { openDocumentFromUrl } from '../../utils/openDoc.js'
export default {
  name: 'FileListWithNavigation',
  data() {
    return {
      // 文件列表
      fileList: [
        { 
          id: 1,
          name: '“洞见历史”研学活动荣誉证书申请表', 
          type: 'docx', 
          targetPage: '/pages/issue1/issue1221'
        },
        { 
          id: 2,
          name: '媒体与报道', 
          type: 'jpg', 
          targetPage: '/pages/issue1/issue1222'
        },
      ]
    }
  },
  onLoad() {
    console.log('当前页面路径:', this.$mp.page.route)
  },
  methods: {
    // 根据文件类型返回对应图标
    getFileIcon(type) {
      if (type === 'docx') return '📄';
      if (type === 'jpg') return '🖼';
      
      return '📁';
    },
    
    // 根据文件类型返回对应图标背景色
    getIconColor(type) {
      const colors = {
        docx: '#8dd4d4',
        pdf: '#ff90bb',
        xlsx: '#ffff7f',
        default: '#e3f2fd'
      };
      return colors[type] || colors.default;
    },

    // 预览文件（点击文件项时触发）
    previewFile(file) {
      if (file.type === 'pdf') {
        uni.showToast({ 
          title: '准备预览PDF文件', 
          icon: 'none' 
        });
      } else {
        uni.showModal({
          title: '提示',
          content: '微信暂不支持直接预览该格式，建议点击查看按钮跳转查看',
          showCancel: false
        });
      }
    },

    // 查看文件（改为在线预览）
    viewFile(file) {
      if (file.url) {
        openDocumentFromUrl({ url: file.url, type: file.type })
      } else if (file.targetPage) {
        // 根据targetPage动态获取URL
        const urlMapping = this.getFileUrlByTargetPage(file.targetPage)
        if (urlMapping) {
          openDocumentFromUrl({ url: urlMapping.url, type: urlMapping.type })
        } else {
          // 跳转到目标页面
          uni.navigateTo({
            url: file.targetPage,
            fail: (err) => {
              console.error('跳转失败:', err)
              uni.showToast({ title: '页面不存在', icon: 'none' })
            }
          })
        }
      } else {
        uni.showToast({ title: '暂无在线预览', icon: 'none' })
      }
    },
    
    // 根据targetPage获取文件URL映射
    getFileUrlByTargetPage(targetPage) {
      const urlMappings = {
        '/pages/issue1/issue1221': { 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%88%90%E6%9E%9C%E5%B1%95%E7%A4%BA%E6%A9%B1%E7%AA%97/%E2%80%9C%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E2%80%9D%E7%A0%94%E5%AD%A6%E6%B4%BB%E5%8A%A8%E8%8D%A3%E8%AA%89%E8%AF%81%E4%B9%A6%E7%94%B3%E8%AF%B7%E8%A1%A8.docx',
          type: 'docx'
        },
        '/pages/issue1/issue1222': { 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%88%90%E6%9E%9C%E5%B1%95%E7%A4%BA%E6%A9%B1%E7%AA%97/%E5%BB%BA%E5%B7%9D%E5%8D%9A%E7%89%A9%E9%A6%86%E7%BE%A4%E8%BD%AC%E5%8F%91%E5%BE%AE%E5%8D%9A%E6%88%AA%E5%9B%BE.jpg',
          type: 'jpg'
        }
      }
      return urlMappings[targetPage] || null
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 内容区域 - 适配微信小程序滚动 */
.content {
  padding: 20rpx;
  height: 100vh;
  box-sizing: border-box; /* 确保padding不影响整体高度 */
}

.file-list {
  margin: 0;
}

/* 文件项样式 - 优化弹性布局 */
.file-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 24rpx 20rpx;
  margin-bottom: 16rpx;
  border: 1px solid #e0f2fe;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box; /* 确保内容不超出容器 */
}

.file-item:active {
  background-color: #f0f9ff;
  transform: translateY(1px);
}

/* 文件图标 - 固定尺寸不挤压其他元素 */
.file-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 8rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
  flex-shrink: 0; /* 防止图标被压缩 */
}

.iconfont {
  font-size: 38rpx;
  color: #1e88e5;
}

/* 文件信息 - 优先分配空间 */
.file-info {
  flex: 1; /* 占据剩余空间 */
  overflow: hidden;
  margin-right: 20rpx; /* 与按钮保持距离 */
}

.file-name {
  font-size: 30rpx; /* 适当缩小字体，避免过长 */
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4; /* 优化行高 */
}

/* 查看按钮容器 - 固定宽度，不挤压文字 */
.view-btn-container {
  width: 120rpx; /* 固定宽度，确保按钮不压缩文字 */
  flex-shrink: 0; /* 禁止收缩 */
}

/* 查看按钮样式 */
.view-btn {
  background-color: #e0f2fe;
  color: #0284c7;
  padding: 12rpx 0; /* 水平内边距改为0，由容器控制宽度 */
  border-radius: 8rpx;
  font-size: 26rpx;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center; /* 文字居中 */
  width: 100%; /* 占满容器宽度 */
}

.view-btn:active {
  background-color: #bae6fd;
  color: #0369a1;
}
</style>
