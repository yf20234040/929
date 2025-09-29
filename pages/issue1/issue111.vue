<!-- 项目管理中心-计划与进度 -->
<template>
  <view class="content-page">
    <!-- 标题区域 -->
    <view class="title-bar">
      <text class="title">计划与进度</text>
      <view class="decor-line"></view>
    </view>

    <!-- 时间轴区域 -->
    <view class="timeline-section">
      <view class="section-header">
        <text class="section-title">洞见历史时间轴（进度计划）</text>
        <view class="tag">时间轴</view>
      </view>
      
      <!-- 时间轴图片展示区域 -->
      <view class="media-container" v-if="timelineUrl">
        <image 
          :src="timelineUrl" 
          mode="widthFix" 
          class="media-image"
          lazy-load
          @tap="previewImage(timelineUrl)"
        ></image>
        <view class="media-info">
          <text class="file-name">洞见历史时间轴（进度计划）.png</text>
          <view class="action-buttons">
            <button class="action-btn" @tap="previewImage(timelineUrl)">
              <text class="icon">👁️</text> 查看
            </button>
            <button class="action-btn" @tap="copyUrl(timelineUrl)">
              <text class="icon">📋</text> 复制链接
            </button>
          </view>
        </view>
      </view>
      
      <!-- 占位区域（当URL未设置时显示） -->
      <view class="file-placeholder timeline-placeholder" v-else>
        <text class="placeholder-text">此处插入时间轴图片URL</text>
        <text class="file-name">洞见历史时间轴（进度计划）.png</text>
      </view>
    </view>

    <!-- 表格区域 -->
    <view class="table-section">
      <view class="section-header">
        <text class="section-title">育才中学研学项目进度情况表（终）</text>
        <view class="tag">表格</view>
      </view>
      
      <!-- 表格内容展示 -->
      <view class="table-wrapper">
        <view class="table-container">
          <!-- 表格头部 -->
          <view class="table-header">
            <view class="table-cell" style="width: 8%;">分组</view>
            <view class="table-cell" style="width: 11%;">大先生</view>
            <view class="table-cell" style="width: 11%;">小先生</view>
            <view class="table-cell" style="width: 6%;">文本稿</view>
            <view class="table-cell" style="width: 6%;">脚本</view>
            <view class="table-cell" style="width: 8%;">实地拍摄</view>
            <view class="table-cell" style="width: 8%;">视频剪辑</view>
            <view class="table-cell" style="width: 8%;">后期配音</view>
            <view class="table-cell" style="width: 9%;">博物馆审核</view>
            <view class="table-cell" style="width: 9%;">视频完善</view>
            <view class="table-cell" style="width: 6%;">发布</view>
            <view class="table-cell" style="width: 10%;">备注</view>
          </view>
          
          <!-- 表格内容 -->
          <view class="table-body">
            <!-- A 组数据 -->
            <view class="table-row" v-for="(item, index) in groupAData" :key="'a-' + index">
              <view class="table-cell" v-if="index === 0" style="width: 8%;" rowspan="6">A 组</view>
              <view class="table-cell" style="width: 11%;">{{ item.bigTeacher }}</view>
              <view class="table-cell" style="width: 11%;">{{ item.smallTeacher }}</view>
              <view class="table-cell" style="width: 6%;">{{ item.textDraft }}</view>
              <view class="table-cell" style="width: 6%;">{{ item.script }}</view>
              <view class="table-cell" style="width: 8%;">{{ item.onSiteShooting }}</view>
              <view class="table-cell" style="width: 8%;">{{ item.videoEditing }}</view>
              <view class="table-cell" style="width: 8%;">{{ item.postDubbing }}</view>
              <view class="table-cell" style="width: 9%;">{{ item.museumReview }}</view>
              <view class="table-cell" style="width: 9%;">{{ item.videoImprovement }}</view>
              <view class="table-cell" style="width: 6%;">{{ item.videoRelease }}</view>
              <view class="table-cell" style="width: 10%;">{{ item.remark }}</view>
            </view>
            
            <!-- B 组数据 -->
            <view class="table-row" v-for="(item, index) in groupBData" :key="'b-' + index">
              <view class="table-cell" v-if="index === 0" style="width: 8%;" rowspan="6">B 组</view>
              <view class="table-cell" style="width: 11%;">{{ item.bigTeacher }}</view>
              <view class="table-cell" style="width: 11%;">{{ item.smallTeacher }}</view>
              <view class="table-cell" style="width: 6%;">{{ item.textDraft }}</view>
              <view class="table-cell" style="width: 6%;">{{ item.script }}</view>
              <view class="table-cell" style="width: 8%;">{{ item.onSiteShooting }}</view>
              <view class="table-cell" style="width: 8%;">{{ item.videoEditing }}</view>
              <view class="table-cell" style="width: 8%;">{{ item.postDubbing }}</view>
              <view class="table-cell" style="width: 9%;">{{ item.museumReview }}</view>
              <view class="table-cell" style="width: 9%;">{{ item.videoImprovement }}</view>
              <view class="table-cell" style="width: 6%;">{{ item.videoRelease }}</view>
              <view class="table-cell" style="width: 10%;">{{ item.remark }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 装饰元素 -->
    <view class="decor-element decor1"></view>
    <view class="decor-element decor2"></view>
    <view class="decor-element decor3"></view>
  </view>
</template>

<script>
export default {
  name: 'ProjectSchedule',
  data() {
    return {
      // 时间轴图片URL
      timelineUrl: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83/%E8%AE%A1%E5%88%92%E4%B8%8E%E8%BF%9B%E5%BA%A6/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E6%97%B6%E9%97%B4%E8%BD%B4%EF%BC%88%E8%BF%9B%E5%BA%A6%E8%AE%A1%E5%88%92%EF%BC%89.png',
      // A组数据
      groupAData: [
        {
          bigTeacher: '马明波',
          smallTeacher: '冉钰琪',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '自主配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: '第一个视频'
        },
        {
          bigTeacher: '张玉林',
          smallTeacher: '梁恒瑞',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '统一配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: '7.27下午配音，头角'
        },
        {
          bigTeacher: '潘映桦',
          smallTeacher: '汪娅楠',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '自主配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: ''
        },
        {
          bigTeacher: '杨银',
          smallTeacher: '茆隽鸣',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '自主配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: '大学生见习，7月20多号结束，每周一有空'
        },
        {
          bigTeacher: '刘琳潇',
          smallTeacher: '宋宛桐',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '自主配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: '原对接大学生黄思颖退出'
        },
        {
          bigTeacher: '马明波',
          smallTeacher: '敖啸笑',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '自主配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: '原对接大学生黎琦琦退出'
        }
      ],
      // B组数据
      groupBData: [
        {
          bigTeacher: '刘琳潇',
          smallTeacher: '徐启翔',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '统一配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: '7.27下午配音，头角'
        },
        {
          bigTeacher: '洪美灵',
          smallTeacher: '韦欣怡',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '自主配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: ''
        },
        {
          bigTeacher: '陈敏',
          smallTeacher: '陈欣语',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '自主配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: ''
        },
        {
          bigTeacher: '于佳琪',
          smallTeacher: '彭诗涵',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '自主配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: ''
        },
        {
          bigTeacher: '杨仙蝶',
          smallTeacher: '黄思睿',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '自主配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: ''
        },
        {
          bigTeacher: '徐佳妮',
          smallTeacher: '毛荣轩',
          textDraft: '✔',
          script: '✔',
          onSiteShooting: '✔',
          videoEditing: '✔',
          postDubbing: '自主配音',
          museumReview: '',
          videoImprovement: '',
          videoRelease: '',
          remark: ''
        }
      ]
    }
  },
  methods: {
    /**
     * 预览图片
     * @param {String} url 图片URL
     */
    previewImage(url) {
      uni.previewImage({
        urls: [url],
        current: url,
        success: (res) => {
          console.log('预览图片成功', res)
        },
        fail: (err) => {
          console.error('预览图片失败', err)
          uni.showToast({
            title: '预览失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    
    /**
     * 复制URL到剪贴板
     * @param {String} url 要复制的URL
     */
    copyUrl(url) {
      uni.setClipboardData({
        data: url,
        success: () => {
          uni.showToast({
            title: '链接已复制',
            icon: 'success',
            duration: 2000
          })
        },
        fail: (err) => {
          console.error('复制失败', err)
          uni.showToast({
            title: '复制失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.content-page {
  padding: 30rpx;
  background-color: #fff5f5;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 标题样式 */
.title-bar {
  margin-bottom: 40rpx;
  position: relative;
  z-index: 1;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #ff5e87;
  text-shadow: 1rpx 1rpx 3rpx rgba(0,0,0,0.1);
}

.decor-line {
  height: 8rpx;
  width: 120rpx;
  background: linear-gradient(90deg, #ffcc00, #ff6b6b);
  border-radius: 4rpx;
  margin-top: 15rpx;
}

/* 章节通用样式 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  z-index: 1;
  position: relative;
}

.section-title {
  font-size: 28rpx;
  color: #4a4a4a;
  font-weight: 600;
}

.tag {
  padding: 5rpx 15rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  font-weight: 500;
}

/* 时间轴区域样式 */
.timeline-section {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 25rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 8rpx 20rpx rgba(255, 100, 130, 0.15);
  position: relative;
  z-index: 1;
}

.timeline-section .tag {
  background-color: #84dfff;
  color: #2a86b1;
}

/* 表格区域样式 */
.table-section {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 25rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 8rpx 20rpx rgba(255, 200, 80, 0.15);
  position: relative;
  z-index: 1;
}

.table-section .tag {
  background-color: #ffec8b;
  color: #b8860b;
}

/* 媒体内容容器 */
.media-container {
  width: 100%;
  border-radius: 16rpx;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
}

.media-image {
  width: 100%;
  border-radius: 16rpx 16rpx 0 0;
  background-color: #f5f5f5;
}

.media-info {
  padding: 15rpx;
  background-color: #fafafa;
  border-top: 1px solid #eee;
}

.file-name {
  font-size: 22rpx;
  color: #666;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5rpx 15rpx;
  border-radius: 10rpx;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-buttons {
  display: flex;
  gap: 15rpx;
  margin-top: 15rpx;
}

.action-btn {
  flex: 1;
  padding: 10rpx 0;
  font-size: 22rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  border: none;
  line-height: 1;
}

.timeline-section .action-btn {
  background-color: #e6f7ff;
  color: #1890ff;
}

/* 文件占位区域 */
.file-placeholder {
  width: 100%;
  min-height: 200rpx;
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2rpx dashed;
  position: relative;
  padding: 20rpx;
}

.timeline-placeholder {
  border-color: #84dfff;
  background-color: rgba(132, 223, 255, 0.08);
}

.placeholder-text {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 15rpx;
  text-align: center;
}

/* 表格样式 */
.table-wrapper {
  width: 100%;
  overflow-x: auto; /* 允许水平滚动 */
  -webkit-overflow-scrolling: touch; /* 平滑滚动 */
  padding-bottom: 10rpx;
}

.table-container {
  min-width: 1000rpx; /* 确保表格有足够宽度展示内容 */
  width: 100%;
  border-radius: 16rpx;
  overflow: hidden;
  border: 1px solid #eee;
  margin-top: 10rpx;
}

.table-header {
  display: flex;
  background-color: #fff1f1;
  font-weight: bold;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
  background-color: #fff;
}

.table-row:nth-child(even) {
  background-color: #fcfcfc;
}

.table-cell {
  border: 1px solid #eee;
  padding: 8rpx 5rpx;
  text-align: center;
  font-size: 20rpx;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50rpx;
}

/* 装饰元素 */
.decor-element {
  position: absolute;
  border-radius: 50%;
  z-index: 0;
  opacity: 0.3;
  transform: translateZ(0); /* 硬件加速 */
}

.decor1 {
  width: 200rpx;
  height: 200rpx;
  background-color: #ff6b8b;
  top: 10%;
  right: 5%;
  animation: float 6s ease-in-out infinite;
}

.decor2 {
  width: 150rpx;
  height: 150rpx;
  background-color: #8bff6b;
  bottom: 20%;
  left: 8%;
  animation: float 8s ease-in-out infinite;
}

.decor3 {
  width: 120rpx;
  height: 120rpx;
  background-color: #6b8bff;
  bottom: 40%;
  right: 10%;
  animation: float 7s ease-in-out infinite;
}

/* 浮动动画 */
@keyframes float {
  0% { transform: translateY(0rpx); }
  50% { transform: translateY(-20rpx); }
  100% { transform: translateY(0rpx); }
}

/* 适配不同屏幕尺寸 */
@media (max-width: 375rpx) {
  .content-page {
    padding: 20rpx;
  }
  
  .title {
    font-size: 32rpx;
  }
  
  .section-title {
    font-size: 26rpx;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 10rpx;
  }
  
  .table-cell {
    font-size: 18rpx;
    padding: 6rpx 3rpx;
  }
}
</style>