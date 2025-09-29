<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">评价表</text>
      <text class="page-subtitle">"洞见历史"研学项目评价体系</text>
    </view>
    
    <!-- 内容滚动区域 -->
    <scroll-view class="content" scroll-y>
      <!-- 评价表列表 -->
      <view class="evaluation-list">
        <view 
          v-for="(evaluation, index) in evaluationList" 
          :key="evaluation.id"
          class="evaluation-item"
          @tap="goToEvaluation(evaluation)"
        >
          <!-- 评价表图标 -->
          <view class="evaluation-icon" :style="{ backgroundColor: getIconColor(evaluation.type) }">
            <text class="icon-text">{{ getFileIcon(evaluation.type) }}</text>
          </view>

          <!-- 评价表信息 -->
          <view class="evaluation-info">
            <text class="evaluation-name">{{ evaluation.name }}</text>
            <text class="evaluation-desc">{{ evaluation.description }}</text>
          </view>

          <!-- 查看按钮 -->
          <view class="view-btn-container">
            <view class="view-btn" @tap.stop="previewEvaluation(evaluation)">
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
  name: 'EvaluationList',
  data() {
    return {
      // 评价表列表
      evaluationList: [
        { 
          id: 1,
          name: '团队互评表', 
          type: 'docx', 
          description: '团队成员相互评价，促进协作进步',
          targetPage: '/pages/issue1/issue11241'
        },
        { 
          id: 2,
          name: '评价表（中学生版）', 
          type: 'docx', 
          description: '针对中学生的评价标准和方式',
          targetPage: '/pages/issue1/issue11242'
        },
        { 
          id: 3,
          name: '评价表（助教版）', 
          type: 'docx', 
          description: '助教参与项目的评价体系',
          targetPage: '/pages/issue1/issue11243',
        },
        { 
          id: 4,
          name: '评价表（家长版）', 
          type: 'docx', 
          description: '家长参与评价的表格和标准',
          targetPage: '/pages/issue1/issue11244',
        },
        {
          id: 5,
          name: '评价表（家长版Excel）', 
          type: 'xlsx', 
          description: '家长版评价表Excel格式',
          targetPage: '/pages/issue1/issue11245',
        },
        {
          id: 6,
          name: '评价表（组长版）', 
          type: 'docx', 
          description: '项目组长评价团队成员的标准',
          targetPage: '/pages/issue1/issue11246',
        },
        {
          id: 7,
          name: '评价表（老师版）', 
          type: 'docx', 
          description: '指导老师评价学生的标准',
          targetPage: '/pages/issue1/issue11247',
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
      if (type === 'xlsx') return '📊';
      return '📁';
    },
    
    // 根据文件类型返回对应图标背景色
    getIconColor(type) {
      const colors = {
        docx: '#8dd4d4',
        pdf: '#ff90bb',
        xlsx: '#efcaef',
        default: '#e3f2fd'
      };
      return colors[type] || colors.default;
    },

    // 预览评价表文件
    goToEvaluation(evaluation) {
      // 优先使用URL进行在线预览
      if (evaluation.url) {
        openDocumentFromUrl({ 
          url: evaluation.url, 
          type: evaluation.type,
          name: evaluation.name
        });
        return;
      }
      
      // 如果没有URL，则跳转到目标页面
      if (evaluation.targetPage) {
        uni.navigateTo({
          url: evaluation.targetPage,
          fail: (err) => {
            console.error('跳转失败:', err)
            uni.showToast({ title: '页面不存在', icon: 'none' })
          }
        })
      } else {
        uni.showToast({ title: '暂无内容', icon: 'none' })
      }
    },

    // 预览评价表文件（点击查看按钮时触发）
    previewEvaluation(evaluation) {
      if (evaluation.url) {
        // 显示预览提示
        uni.showToast({
          title: '准备预览...',
          icon: 'loading',
          duration: 1000
        });
        
        // 使用openDocumentFromUrl进行预览
        openDocumentFromUrl({ 
          url: evaluation.url, 
          type: evaluation.type,
          name: evaluation.name
        });
      } else if (evaluation.targetPage) {
        // 如果没有URL，跳转到目标页面
        uni.navigateTo({
          url: evaluation.targetPage,
          fail: (err) => {
            console.error('跳转失败:', err)
            uni.showToast({ title: '页面不存在', icon: 'none' })
          }
        })
      } else {
        uni.showToast({ 
          title: '暂无内容', 
          icon: 'none' 
        });
      }
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

/* 页面标题 */
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

/* 内容区域 */
.content {
  padding: 30rpx 20rpx;
  height: calc(100vh - 200rpx);
  box-sizing: border-box;
}

.evaluation-list {
  margin: 0;
}

/* 评价表项样式 */
.evaluation-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.evaluation-item:active {
  background-color: #f8f9fa;
  transform: translateY(2rpx);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
}

/* 评价表图标 */
.evaluation-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 12rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.icon-text {
  font-size: 40rpx;
  color: white;
}

/* 评价表信息 */
.evaluation-info {
  flex: 1;
  overflow: hidden;
  margin-right: 20rpx;
}

.evaluation-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #1e293b;
  display: block;
  margin-bottom: 8rpx;
  line-height: 1.3;
}

.evaluation-desc {
  font-size: 26rpx;
  color: #64748b;
  line-height: 1.4;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 查看按钮容器 */
.view-btn-container {
  width: 120rpx;
  flex-shrink: 0;
}

/* 查看按钮样式 */
.view-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 16rpx 0;
  border-radius: 12rpx;
  font-size: 26rpx;
  font-weight: 600;
  transition: all 0.2s ease;
  text-align: center;
  width: 100%;
  border: none;
}

.view-btn:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>
