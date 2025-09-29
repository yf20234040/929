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
          name: '"洞见历史"研学项目第二期成员招募方案', 
          type: 'docx', 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83/%E8%AF%84%E4%BB%B7%E4%BD%93%E7%B3%BB/%E2%80%9C%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E2%80%9D%E7%A0%94%E5%AD%A6%E9%A1%B9%E7%9B%AE%E7%AC%AC%E4%BA%8C%E6%9C%9F%E6%88%90%E5%91%98%E6%8B%9B%E5%8B%9F%E6%96%B9%E6%A1%88.docx',
          targetPage: '/pages/issue1/issue1121'
        },
        { 
          id: 2,
          name: '中学生版', 
          type: 'docx', 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83/%E8%AF%84%E4%BB%B7%E4%BD%93%E7%B3%BB/%E4%B8%AD%E5%AD%A6%E7%94%9F%E7%89%88.docx',
          targetPage: '/pages/issue1/issue1122'
        },
        { 
          id: 3,
          name: '家长版', 
          type: 'pdf', 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83/%E8%AF%84%E4%BB%B7%E4%BD%93%E7%B3%BB/%E5%AE%B6%E9%95%BF%E7%89%88.pdf',
          targetPage: '/pages/issue1/issue1123'
        },
        { 
          id: 4,
          name: '评价表', 
          type: 'xlsx', 
          targetPage: '/pages/issue1/issue1124'
        }
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
      if (type === 'pdf') return '📄';
      if (type === 'xlsx') return '📁';
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
      // 优先使用URL进行在线预览
      if (file.url) {
        openDocumentFromUrl({ url: file.url, type: file.type })
        return
      }
      
      // 根据targetPage动态获取URL
      const urlMapping = this.getFileUrlByTargetPage(file.targetPage)
      if (urlMapping) {
        openDocumentFromUrl({ url: urlMapping.url, type: urlMapping.type })
        return
      }
      
      // 如果无法在线预览，则跳转到目标页面
      if (!file.targetPage) {
        uni.showToast({ title: '未设置目标页面', icon: 'none' });
        return;
      }
      
      const targetUrl = `${file.targetPage}?name=${encodeURIComponent(file.name)}&type=${file.type}`;
      console.log(`尝试跳转到: ${targetUrl}`);
      
      uni.navigateTo({
        url: targetUrl,
        success: () => {
          console.log('跳转成功');
        },
        fail: (err) => {
          console.error('跳转失败:', err);
          
          if (err.errMsg.includes('page "pages/')) {
            uni.showToast({ 
              title: '页面不存在，请检查路径', 
              icon: 'none',
              duration: 3000
            });
          } else if (err.errMsg.includes('navigateTo:fail can not navigateTo a tabbar page')) {
            uni.switchTab({
              url: file.targetPage,
              fail: (tabErr) => {
                console.error('switchTab失败:', tabErr);
                uni.showToast({ title: '跳转失败', icon: 'none' });
              }
            });
          } else {
            uni.showToast({ title: '跳转失败', icon: 'none' });
          }
        }
      });
    },

    // 查看文件（点击查看按钮时触发，优先在线预览，失败则跳转页面）
    viewFile(file) {
      // 优先使用URL进行在线预览
      if (file.url) {
        openDocumentFromUrl({ url: file.url, type: file.type })
        return
      }
      
      // 根据targetPage动态获取URL
      const urlMapping = this.getFileUrlByTargetPage(file.targetPage)
      if (urlMapping) {
        openDocumentFromUrl({ url: urlMapping.url, type: urlMapping.type })
        return
      }
      
      // 如果无法在线预览，则跳转到目标页面
      if (!file.targetPage) {
        uni.showToast({ title: '未设置目标页面', icon: 'none' });
        return;
      }
      
      const targetUrl = `${file.targetPage}?name=${encodeURIComponent(file.name)}&type=${file.type}`;
      console.log(`尝试跳转到: ${targetUrl}`);
      
      uni.navigateTo({
        url: targetUrl,
        success: () => {
          console.log('跳转成功');
        },
        fail: (err) => {
          console.error('跳转失败:', err);
          
          if (err.errMsg.includes('page "pages/')) {
            uni.showToast({ 
              title: '页面不存在，请检查路径', 
              icon: 'none',
              duration: 3000
            });
          } else if (err.errMsg.includes('navigateTo:fail can not navigateTo a tabbar page')) {
            uni.switchTab({
              url: file.targetPage,
              fail: (tabErr) => {
                console.error('switchTab失败:', tabErr);
                uni.showToast({ title: '跳转失败', icon: 'none' });
              }
            });
          } else {
            uni.showToast({ title: '跳转失败', icon: 'none' });
          }
        }
      });
    },
    
    // 根据targetPage获取文件URL映射
    getFileUrlByTargetPage(targetPage) {
      const urlMappings = {
        '/pages/issue1/issue1121': { 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83/%E8%AF%84%E4%BB%B7%E4%BD%93%E7%B3%BB/%E2%80%9C%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E2%80%9D%E7%A0%94%E5%AD%A6%E9%A1%B9%E7%9B%AE%E7%AC%AC%E4%BA%8C%E6%9C%9F%E6%88%90%E5%91%98%E6%8B%9B%E5%8B%9F%E6%96%B9%E6%A1%88.docx',
          type: 'docx'
        },
        '/pages/issue1/issue1122': { 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83/%E8%AF%84%E4%BB%B7%E4%BD%93%E7%B3%BB/%E4%B8%AD%E5%AD%A6%E7%94%9F%E7%89%88.docx',
          type: 'docx'
        },
        '/pages/issue1/issue1123': { 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83/%E8%AF%84%E4%BB%B7%E4%BD%93%E7%B3%BB/%E5%AE%B6%E9%95%BF%E7%89%88.pdf',
          type: 'pdf'
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
