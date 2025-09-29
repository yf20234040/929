<template>
  <view class="container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="title">特色二课＆跨学科主题学习活动</text>
      <text class="subtitle">——"洞见历史"研学项目（第二期）</text>
      <text class="meeting-type">启动会议程</text>
    </view>
    
    <!-- 会议信息卡片 -->
    <view class="info-card">
      <view class="info-item">
        <view class="info-icon">
          <icon type="clock" size="20" color="#1677ff" />
        </view>
        <view class="info-content">
          <text class="info-label">时间</text>
          <text class="info-value">2024年3月30日（星期六）晚上9:30</text>
        </view>
      </view>
      
      <view class="info-item">
        <view class="info-icon">
          <icon type="location" size="20" color="#1677ff" />
        </view>
        <view class="info-content">
          <text class="info-label">地点</text>
          <text class="info-value">腾讯会议室：541151518</text>
        </view>
      </view>
      
      <view class="info-item">
        <view class="info-icon">
          <icon type="user" size="20" color="#1677ff" />
        </view>
        <view class="info-content">
          <text class="info-label">主持人</text>
          <text class="info-value">冯雅儒 "洞见历史"研学项目组第二期负责人</text>
        </view>
      </view>
    </view>
    
    <!-- 参会人员 -->
    <view class="section">
      <view class="section-title">
        <text>参会人员</text>
      </view>
      <view class="participants">
        <view class="participant-item">
          <text class="number">1.</text>
          <text class="participant-text">重庆师范大学历史与社会学院（考古文博学院）的领导、专业教师</text>
        </view>
        <view class="participant-item">
          <text class="number">2.</text>
          <text class="participant-text">重庆市育才中学校"行知历史"课程创新基地的领导、专业教师</text>
        </view>
        <view class="participant-item">
          <text class="number">3.</text>
          <text class="participant-text">参与"洞见历史"研学项目第二期活动大学生</text>
        </view>
      </view>
    </view>
    
    <!-- 会议议程 -->
    <view class="section">
      <view class="section-title">
        <text>会议议程</text>
      </view>
      <view class="agenda-list">
        <view class="agenda-item" v-for="(item, index) in agendaItems" :key="index">
          <view class="agenda-number">{{ index + 1 }}</view>
          <view class="agenda-content">
            <text>{{ item }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部信息 -->
    <view class="footer">
      <text class="organizer">"洞见历史"研学第二期项目组</text>
      <text class="date">2024年3月30日</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      agendaItems: [
        "主持人介绍现场嘉宾、来宾；",
        "项目第二期大学指导老师陈春梅介绍项目概况；",
        "项目第二期中学指导老师朱姝发言；",
        "历史学市级一流专业负责人常云平老师讲话；",
        "主持人宣布汇报会结束、开摄像头截屏留念。"
      ]
    };
  }
};
</script>

<style scoped>
.container {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 20rpx;
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
  line-height: 1.4;
}

.subtitle {
  font-size: 28rpx;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.meeting-type {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  display: block;
  padding: 10rpx 20rpx;
  background-color: #e8f3ff;
  border-radius: 8rpx;
  inline-size: fit-content;
  margin: 0 auto;
}

/* 信息卡片样式 */
.info-card {
  background-color: white;
  border-radius: 16rpx;
  padding: 25rpx;
  margin-bottom: 25rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.info-item {
  display: flex;
  padding: 15rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-icon {
  margin-right: 20rpx;
  margin-top: 5rpx;
}

.info-content {
  flex: 1;
}

.info-label {
  font-size: 26rpx;
  color: #666;
  display: block;
  margin-bottom: 5rpx;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  line-height: 1.5;
}

/* 通用区块样式 */
.section {
  background-color: white;
  border-radius: 16rpx;
  margin-bottom: 25rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.section-title {
  background-color: #e8f3ff;
  padding: 18rpx 25rpx;
}

.section-title text {
  font-size: 30rpx;
  font-weight: bold;
  color: #1677ff;
}

/* 参会人员样式 */
.participants {
  padding: 20rpx 25rpx;
}

.participant-item {
  display: flex;
  margin-bottom: 20rpx;
  line-height: 1.6;
}

.participant-item:last-child {
  margin-bottom: 0;
}

.number {
  font-size: 28rpx;
  color: #1677ff;
  font-weight: bold;
  margin-right: 15rpx;
  min-width: 30rpx;
}

.participant-text {
  font-size: 26rpx;
  color: #333;
}

/* 议程样式 */
.agenda-list {
  padding: 15rpx 25rpx;
}

.agenda-item {
  display: flex;
  margin-bottom: 25rpx;
  align-items: flex-start;
  line-height: 1.6;
}

.agenda-item:last-child {
  margin-bottom: 10rpx;
}

.agenda-number {
  width: 40rpx;
  height: 40rpx;
  background-color: #1677ff;
  color: white;
  border-radius: 50%;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
  flex-shrink: 0;
  margin-top: 5rpx;
}

.agenda-content text {
  font-size: 26rpx;
  color: #333;
}

/* 底部样式 */
.footer {
  text-align: center;
  padding: 25rpx 0;
  color: #666;
}

.organizer {
  font-size: 26rpx;
  display: block;
  margin-bottom: 10rpx;
}

.date {
  font-size: 24rpx;
  display: block;
}
</style>
