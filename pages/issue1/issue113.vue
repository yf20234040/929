<!-- 项目管理中心-第二期招募与培训 -->
<template>
  <view class="container">
    <!-- 内容滚动区域（去除顶部导航栏后，内容区域直接顶到页面顶部） -->
    <scroll-view class="content" scroll-y>
      <!-- 第一板块："洞见历史" 研学项目第二期成员招募方案（终版） -->
      <view class="main-section">
        <!-- 带点击跳转效果的主标题 -->
        <view class="clickable-title" @click="navigateToDetail">
          <view class="main-section-title">
            "洞见历史" 研学项目第二期成员招募方案（终版）
            <text class="title-arrow">↓</text>
          </view>
        </view>
        
        <!-- 招募方案内容 -->
        <view class="header">
          <text class="intro">特色二课＆跨学科主题学习活动，邀你加入！</text>
        </view>

        <!-- 招募背景 -->
        <view class="section">
          <text class="section-title">一、招募背景</text>
          <view class="section-content">
            <view class="paragraph">
              "洞见历史"研学项目作为项目式学习与创新教育实践体验活动，采用问题驱动的学习方法和 U - S - S 协同育人机制，以学生实际需要为导向，让参与者在真实社会情景中进行跨学科融合学习。
            </view>
            <view class="paragraph">
              项目第一期已成功结项并获良好反响，现开展第二期活动，面向全校招募大学生助教团成员。
            </view>
          </view>
        </view>

        <!-- 招募详情 -->
        <view class="section">
          <text class="section-title">二、招募详情</text>
          
          <view class="info-grid">
            <view class="info-item">
              <text class="info-label">招募组织</text>
              <text class="info-value">"洞见历史"研学项目组</text>
            </view>
            <view class="info-item">
              <text class="info-label">招募时间</text>
              <text class="info-value">2024年1月25日—1月29日</text>
            </view>
            <view class="info-item">
              <text class="info-label">招募对象</text>
              <text class="info-value">重庆师范大学2022级、2023级全日制本科生</text>
            </view>
            <view class="info-item">
              <text class="info-label">招募人数</text>
              <text class="info-value">历史学（师范）：4人；其他专业：4人</text>
            </view>
          </view>
        </view>

        <!-- 招募条件 -->
        <view class="section">
          <text class="section-title">三、招募条件</text>
          <view class="condition-list">
            <view class="condition-item">
              <text class="item-number">1.</text>
              <text class="item-content">对项目式学习以及创新教育实践真正感兴趣</text>
            </view>
            <view class="condition-item">
              <text class="item-number">2.</text>
              <text class="item-content">热爱教育且不抱有完全功利化心态加入本项目</text>
            </view>
            <view class="condition-item">
              <text class="item-number">3.</text>
              <text class="item-content">具有较强的学习意愿与长期坚持的毅力</text>
            </view>
            <view class="condition-item">
              <text class="item-number">4.</text>
              <text class="item-content">具有团队协作精神与团队合作能力</text>
            </view>
            <view class="condition-item">
              <text class="item-number">5.</text>
              <text class="item-content">希望尽早走近中学、积累与中学生交流经验，提升综合素养与就业力</text>
            </view>
          </view>
        </view>

        <!-- 招募流程 -->
        <view class="section">
          <text class="section-title">四、招募流程</text>
          
          <view class="process-step">
            <view class="step-header">
              <view class="step-number">01</view>
              <text class="step-title">前期筹备与宣发</text>
            </view>
            <view class="step-content">
              <view class="paragraph">1. 制定报名表，组建项目招募咨询群</view>
              <view class="paragraph">2. 项目组现成员开展项目招募宣发工作</view>
            </view>
          </view>
          
          <view class="process-step">
            <view class="step-header">
              <view class="step-number">02</view>
              <text class="step-title">中期报名</text>
            </view>
            <view class="step-content">
              <view class="paragraph"><text class="highlight">报名时间：</text>2024年1月25日—2024年1月29日16：00前</view>
              <view class="paragraph"><text class="highlight">报名方式：</text>加入报名咨询QQ群177913199并将报名表（附件一）发送至邮箱1265511919@qq.com，报名表命名为"年级+专业+姓名"</view>
            </view>
          </view>
          
          <view class="process-step">
            <view class="step-header">
              <view class="step-number">03</view>
              <text class="step-title">后期录取结果公布</text>
            </view>
            <view class="step-content">
              <view class="paragraph">项目组根据报名表信息与项目第二期开展实际需求，在2024年1月31日18:00前于报名咨询群公布录取结果</view>
            </view>
          </view>
        </view>

        <!-- 报名表 -->
        <view class="section">
          <text class="section-title">五、报名表信息</text>
          
          <view class="form-table">
            <view class="form-row">
              <view class="form-label">姓名</view>
              <view class="form-input-placeholder">请填写姓名</view>
            </view>
            <view class="form-row">
              <view class="form-label">学院</view>
              <view class="form-input-placeholder">请填写学院</view>
            </view>
            <view class="form-row">
              <view class="form-label">年级</view>
              <view class="form-input-placeholder">请填写年级</view>
            </view>
            <view class="form-row">
              <view class="form-label">专业</view>
              <view class="form-input-placeholder">请填写专业</view>
            </view>
            <view class="form-row">
              <view class="form-label">QQ</view>
              <view class="form-input-placeholder">请填写QQ号</view>
            </view>
            <view class="form-row">
              <view class="form-label">手机号</view>
              <view class="form-input-placeholder">请填写手机号</view>
            </view>
            <view class="form-row form-row-multiline">
              <view class="form-label">个人介绍</view>
              <view class="form-input-placeholder">请填写性格特征、技能擅长等</view>
            </view>
            <view class="form-row form-row-multiline">
              <view class="form-label">提升方向</view>
              <view class="form-input-placeholder">最希望自己在哪1 - 3个方面得到提升与进步</view>
            </view>
            <view class="form-row form-row-multiline">
              <view class="form-label">项目认识</view>
              <view class="form-input-placeholder">请谈谈对项目式学习的认识与自己的思考</view>
            </view>
            <view class="form-row form-row-multiline">
              <view class="form-label">加入目的</view>
              <view class="form-input-placeholder">请谈谈加入该项目的目的</view>
            </view>
            <view class="form-row form-row-multiline">
              <view class="form-label">时间规划</view>
              <view class="form-input-placeholder">请谈谈参与本项目后，如何协调该项目与自己其他事项间的规划</view>
            </view>
          </view>
          
          <view class="form-note">
            <text>注：若填写内容超出表格空间，可添加附页在表格后</text>
          </view>
        </view>

        <!-- 注意事项 -->
        <view class="section">
          <text class="section-title">六、注意事项</text>
          
          <view class="note-list">
            <view class="note-item">1. 做好项目招募宣发工作，确保招募通知发布到位</view>
            <view class="note-item">2. 做好招募咨询群管理与咨询工作，及时准确向咨询的同学解答相关疑问</view>
          </view>
        </view>

        <!-- 联系我们 -->
        <view class="section contact-section">
          <text class="section-title">联系我们</text>
          <view class="contact-info">
            <view class="contact-item">
              <text class="contact-label">咨询QQ群：</text>
              <text class="contact-value">177913199</text>
            </view>
            <view class="contact-item">
              <text class="contact-label">报名邮箱：</text>
              <text class="contact-value">1265511919@qq.com</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 板块分隔线 -->
      <view class="divider"></view>
      
      <!-- 第二板块：第二期培训计划表 -->
      <view class="main-section">
        <view class="clickable-title" @click="navigateToTrainingPlan">
          <view class="main-section-title">
            第二期培训计划表
            <text class="title-arrow">↓</text>
          </view>
        </view>
        
        <!-- 项目简介 -->
        <view class="section">
          <text class="section-title">项目简介</text>
          <view class="paragraph">
            本项目是第二期相关计划，致力于通过创新的方式推动各项任务的开展，以实现预期的目标。培训计划将围绕项目核心内容，通过系统性培训提升成员专业能力与实践技能。
          </view>
        </view>

        <!-- 阶段进度看板 -->
        <view class="section">
          <text class="section-title">阶段进度看板</text>
          <view class="table-container">
            <view class="progress-table">
              <view class="table-header">
                <view class="table-cell">课次</view>
                <view class="table-cell">时间</view>
                <view class="table-cell">地点</view>
                <view class="table-cell">内容</view>
              </view>
              <view class="table-row">
                <view class="table-cell">1</view>
                <view class="table-cell">2024.2.2</view>
                <view class="table-cell">腾讯会议（1h - 1.5h）</view>
                <view class="table-cell">1. 第一期复盘会（找问题、提解决）；2.第二期成员自我介绍及了解第一期项目开展情况与pbl开展基本模块（可参与第一期遗留问题探讨）；3.答疑解惑。</view>
              </view>
              <view class="table-row">
                <view class="table-cell">2</view>
                <view class="table-cell">2024.2.8</view>
                <view class="table-cell">腾讯会议（1h - 1.5h）</view>
                <view class="table-cell">1.认识pbl及其基本内容和实施；2.认识pbl对于自身发展与未来职业发展的意义；3.了解项目开展中的一些技巧与方法、注意事项等（来自第一期的“助力”）；4.答疑解惑。</view>
              </view>
              <view class="table-row">
                <view class="table-cell">3</view>
                <view class="table-cell">2024.2.18</view>
                <view class="table-cell">腾讯会议（1h - 1.5h）</view>
                <view class="table-cell">1.明确第二期的任务点（博物馆、微课）；2.大学生助教定方向与组队；3.小任务：2024.2.18 - 2024.2.22，各组初步构思第二期两大项目制学习板块的开展规划；4.答疑解惑。</view>
              </view>
              <view class="table-row">
                <view class="table-cell">4</view>
                <view class="table-cell">2024.2.23</view>
                <view class="table-cell">腾讯会议（1h - 1.5h）</view>
                <view class="table-cell">1.集中反馈各组规划构思时遇见的问题或提出各自意见、想法等；2.两组互相交流、共思共讨；3.针对开学时的第二期开展做好动员工作，帮助第二期成员做好基础准备。</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 板块分隔线 -->
      <view class="divider"></view>
      
      <!-- 第三板块：招募方案文档 -->
      <view class="main-section">
        <view class="clickable-title" @click="navigateToRecruitmentDoc">
          <view class="main-section-title">
            "洞见历史"研学项目第二期成员招募方案.docx
            <text class="title-arrow">↓</text>
          </view>
        </view>
        
        <view class="section">
          <view class="document-info">
            <view class="paragraph">
              该文档包含"洞见历史"研学项目第二期成员招募的完整方案，包括详细的招募流程、职责说明、考核标准等内容。
            </view>
            <view class="paragraph">
              点击标题可查看完整文档内容。
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgError: false
    };
  },
  methods: {
    // 跳转到 pages/issue1/issue1
    navigateToIssue1() {
      uni.navigateTo({
        url: '/pages/issue1/issue1'
      });
    },
    // 跳转到招募方案详情页
    navigateToDetail() {
      uni.navigateTo({
        url: '/pages/issue1/issue1131'
      });
    },
    // 跳转到培训计划表详情页
    navigateToTrainingPlan() {
      uni.navigateTo({
        url: '/pages/issue1/issue1132'
      });
    },
    // 跳转到招募方案文档页
    navigateToRecruitmentDoc() {
      uni.navigateTo({
        url: '/pages/issue1/issue1133'
      });
    },
    // 处理图片加载错误
    handleImgError(e) {
      this.imgError = true;
      e.target.src = "/static/img/error-img.png";
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f0f7ff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 内容区域样式（去除导航栏后，高度调整为100vh） */
.content {
  padding: 30rpx;
  box-sizing: border-box;
  height: 100vh;
}

/* 主板块样式 */
.main-section {
  margin-bottom: 50rpx;
}

/* 可点击标题样式 */
.clickable-title {
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;
}

.main-section-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #5a8bc7;
  text-align: center;
  padding: 25rpx 0;
  margin-bottom: 30rpx;
  border-bottom: 3rpx solid #5a8bc7;
  position: relative;
  padding-right: 60rpx; /* 为箭头预留空间 */
  box-sizing: border-box;
  transition: color 0.2s ease;
}

/* 文本箭头样式（确保显示） */
.title-arrow {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  color: #5a8bc7;
  font-size: 28rpx;
  font-weight: bold;
  transition: all 0.2s ease;
}

/* 点击反馈效果 */
.clickable-title:active .main-section-title {
  color: #4a7bb8;
}

.clickable-title:active .title-arrow {
  transform: translateY(-50%) translateX(8rpx);
  color: #4a7bb8;
}

.main-section-title::after {
  content: "";
  position: absolute;
  width: 80rpx;
  height: 6rpx;
  background-color: #5a8bc7;
  bottom: -3rpx;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 3rpx;
}

/* 板块分隔线 */
.divider {
  height: 20rpx;
  background-color: #f0f7ff;
  margin: 40rpx 0;
  position: relative;
}

.divider::after {
  content: "";
  position: absolute;
  top: 10rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 120rpx;
  height: 6rpx;
  background-color: #8ab2e1;
  border-radius: 3rpx;
}

/* 头部样式 */
.header {
  text-align: center;
  margin-bottom: 40rpx;
  padding: 30rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.intro {
  font-size: 28rpx;
  color: #666666;
  line-height: 1.6;
}

/* 章节样式 */
.section {
  margin-bottom: 30rpx;
  padding: 30rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border-top: 6rpx solid #8ab2e1;
  transition: transform 0.2s ease;
}

.section:active {
  transform: translateY(2rpx);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 24rpx;
  display: block;
  color: #5a8bc7;
  padding-bottom: 12rpx;
  border-bottom: 2px solid #f0f7ff;
}

/* 段落样式 */
.paragraph {
  font-size: 28rpx;
  color: #555555;
  line-height: 1.8;
  margin-bottom: 15rpx;
}

.highlight {
  color: #5a8bc7;
  font-weight: bold;
}

/* 信息网格 */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
}

.info-item {
  background-color: #f0f7ff;
  padding: 20rpx;
  border-radius: 12rpx;
  font-size: 26rpx;
}

.info-label {
  color: #5a8bc7;
  font-weight: bold;
  display: block;
  margin-bottom: 8rpx;
}

.info-value {
  color: #666666;
  line-height: 1.5;
}

/* 条件列表 */
.condition-list {
  margin-top: 10rpx;
}

.condition-item {
  display: flex;
  margin-bottom: 15rpx;
  font-size: 26rpx;
  line-height: 1.6;
}

.item-number {
  color: #5a8bc7;
  font-weight: bold;
  margin-right: 10rpx;
  min-width: 24rpx;
}

.item-content {
  color: #666666;
}

/* 流程步骤 */
.process-step {
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1px dashed #f0f7ff;
}

.process-step:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.step-number {
  width: 40rpx;
  height: 40rpx;
  background-color: #8ab2e1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: bold;
  margin-right: 15rpx;
}

.step-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #5a8bc7;
}

.step-content {
  padding-left: 55rpx;
}

/* 表单样式 */
.form-table {
  border-top: 1px solid #f0f7ff;
}

.form-row {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1px solid #f0f7ff;
  align-items: center;
}

.form-row-multiline {
  align-items: flex-start;
  padding: 20rpx 0;
}

.form-label {
  width: 200rpx;
  font-size: 28rpx;
  color: #5a8bc7;
  font-weight: bold;
}

.form-input-placeholder {
  flex: 1;
  font-size: 28rpx;
  color: #999999;
  padding: 10rpx 15rpx;
  background-color: #f9f9f9;
  border-radius: 8rpx;
  min-height: 40rpx;
}

.form-note {
  margin-top: 20rpx;
  font-size: 26rpx;
  color: #999999;
  padding-left: 200rpx;
}

/* 注意事项列表 */
.note-list {
  padding-left: 10rpx;
}

.note-item {
  font-size: 28rpx;
  color: #555555;
  line-height: 1.8;
  margin-bottom: 15rpx;
  position: relative;
  padding-left: 30rpx;
}

.note-item:before {
  content: "•";
  position: absolute;
  left: 10rpx;
  color: #8ab2e1;
  font-size: 32rpx;
  line-height: 1.5;
}

/* 联系我们 */
.contact-section {
  margin-bottom: 50rpx;
}

.contact-info {
  margin-bottom: 20rpx;
}

.contact-item {
  display: flex;
  margin-bottom: 15rpx;
  font-size: 28rpx;
}

.contact-label {
  width: 140rpx;
  color: #666666;
  font-weight: bold;
}

.contact-value {
  flex: 1;
  color: #5a8bc7;
}

/* 表格样式 */
.table-container {
  width: 100%;
  overflow-x: auto;
  margin: 24rpx 0;
  padding: 12rpx;
  border-radius: 12rpx;
  background-color: #f9f9f9;
}

.progress-table,
.compare-table {
  width: 100%;
  min-width: 600rpx;
}

.table-header {
  display: flex;
  background-color: #e6f0ff;
  font-weight: bold;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #eeeeee;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  flex: 1;
  padding: 20rpx 15rpx;
  text-align: left;
  border-right: 1px solid #eeeeee;
  font-size: 26rpx;
  word-break: break-all;
  line-height: 1.6;
}

.table-cell:last-child {
  border-right: none;
}

.table-label {
  font-weight: bold;
  color: #5a8bc7;
  background-color: #e6f0ff;
}

/* 文档信息样式 */
.document-info {
  padding: 10rpx;
}

/* 微信小程序适配调整 */
@media (max-width: 375px) {
  .content {
    height: 100vh;
    padding: 20rpx;
  }

  .section {
    padding: 24rpx;
    margin-bottom: 25rpx;
  }

  .main-section-title {
    font-size: 30rpx;
    padding-right: 50rpx;
  }

  .title-arrow {
    font-size: 24rpx;
    right: 15rpx;
  }

  .table-cell {
    padding: 15rpx 10rpx;
    font-size: 24rpx;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .form-label {
    width: 160rpx;
    font-size: 26rpx;
  }
  
  .form-input-placeholder {
    font-size: 26rpx;
  }
  
  .form-note {
    padding-left: 160rpx;
  }
}
</style>