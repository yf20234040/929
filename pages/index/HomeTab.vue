<template>
  <view class="container" :class="{ 'care-mode': careMode }">
    <!-- 顶部图片区域 -->
    <view class="header-image-container">
      <image 
        class="header-image" 
        src="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5%E5%9B%BE%E7%89%87.png" 
        mode="widthFix"
        @error="handleImageError"
      ></image>
      <!-- 图片覆盖层文字 -->
      <view class="image-overlay">
        <text class="overlay-title">跨学科项目式研学</text>
        <text class="overlay-subtitle">高校与中学协同 · 历史文化实践 · 创新人才培养</text>
      </view>
    </view>

    <!-- 内容滚动区域 -->
    <scroll-view class="content" scroll-y>
      <!-- 项目背景 -->
      <view class="section">
        <text class="section-title">一、项目背景</text>
        <view class="section-content">
          <view class="paragraph">
            <text class="highlight">教育痛点：</text>传统教学重理论轻实践，中学生跨学科学习不足，师范生创新教学能力欠缺。
          </view>
          <view class="paragraph">
            <text class="highlight">政策契机：</text>响应教育 4.0 时代需求，推动《教育 4.0 背景下的卓越师资培养》教改项目落地。
          </view>
        </view>
      </view>

      <!-- 阶段进度看板 -->
      <view class="section">
        <text class="section-title">二、阶段进度看板</text>
        <view class="section-content">
          <view class="table-container">
            <view class="progress-table">
              <view class="table-header">
                <view class="table-cell">阶段</view>
                <view class="table-cell">启动时间</view>
                <view class="table-cell">核心任务</view>
                <view class="table-cell">成果状态</view>
              </view>
              <view class="table-row">
                <view class="table-cell">一期</view>
                <view class="table-cell">2023-03</view>
                <view class="table-cell">12 部博物馆视频制作</view>
                <view class="table-cell">✔️ 已完成</view>
              </view>
              <view class="table-row">
                <view class="table-cell">二期</view>
                <view class="table-cell">2024-03</view>
                <view class="table-cell">
                  1. 艺术组<br>
                  2. 微课组<br>
                  3. 宣传组<br>
                  4. 学术组
                </view>
                <view class="table-cell">✔️ 已完成</view>
              </view>
              <view class="table-row">
                <view class="table-cell">三期</view>
                <view class="table-cell">2025-03</view>
                <view class="table-cell">
                  1. 宣传组<br>
                  2. 艺术组<br>
                  3. 历史组<br>
                  4. 组装组
                </view>
                <view class="table-cell">✔️ 已完成</view>
              </view>
              <view class="table-row">
                <view class="table-cell">第四期</view>
                <view class="table-cell">2025-09</view>
                <view class="table-cell">筹备中</view>
                <view class="table-cell">❗️️ 未完成</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 项目优势 -->
      <view class="section">
        <text class="section-title">三、项目优势</text>
        <view class="section-content">
          <!-- 动态研学与传统研学对比 -->
          <text class="section-subtitle">（一）动态研学与传统研学差异化对比</text>
          <view class="table-container">
            <view class="compare-table">
              <view class="table-header">
                <view class="table-cell">维度</view>
                <view class="table-cell">传统研学</view>
                <view class="table-cell">动态研学</view>
              </view>
              <view class="table-row">
                <view class="table-cell">内容设计</view>
                <view class="table-cell">学科分割</view>
                <view class="table-cell">学科整合</view>
              </view>
              <view class="table-row">
                <view class="table-cell">学生角色</view>
                <view class="table-cell">被动接受者</view>
                <view class="table-cell">主动参与者、合作者</view>
              </view>
              <view class="table-row">
                <view class="table-cell">知识获取</view>
                <view class="table-cell">系统性强，适合打基础</view>
                <view class="table-cell">实用性强，适合培养综合能力</view>
              </view>
              <view class="table-row">
                <view class="table-cell">流程</view>
                <view class="table-cell">固定</view>
                <view class="table-cell">灵活设计</view>
              </view>
              <view class="table-row">
                <view class="table-cell">学习形式</view>
                <view class="table-cell">固定流程，单向传递，静态场景</view>
                <view class="table-cell">实用性强，适合培养综合能力</view>
              </view>
              <view class="table-row">
                <view class="table-cell">评价方式</view>
                <view class="table-cell">标准化指标为主</view>
                <view class="table-cell">注重过程性评价、学生自评与反思</view>
              </view>
            </view>
          </view>
        </view>

        <view class="section-content">
          <!-- 动态研学模式 -->
          <text class="section-subtitle">（二）动态研学模式</text>
          <view class="paragraph">
            动态研学模式以拟定主题为核心，围绕学科目标和项目目标设计任务，通过监控与反馈机制，结合一对一教师、专家等指导，培养学生综合能力。
          </view>
          <view class="paragraph">
            阶段包括准备阶段（分工、知识前测等）、实施过程（设计、制作、转换等），学习地点涵盖大成藏、博物馆、企业公司等社会资源。
          </view>
          <view class="paragraph">
            动态研学强调动态调整、实时完善，注重调动参与者积极性，通过复盘总结归纳不足并改善。
          </view>
          
          <!-- 图片占位 - 添加浅色适配处理 -->
          <view class="img-placeholder">
            <view class="image-filter-wrapper">
              <image src="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5/%E5%8A%A8%E6%80%81%E7%A0%94%E5%AD%A6%E6%A8%A1%E5%BC%8F.png" 
                     mode="widthFix" 
                     @error="handleImageError"
                     class="light-image">
              </image>
            </view>
            <text class="img-desc">动态研学模式流程图</text>
          </view>
        </view>

        <view class="section-content">
          <!-- 项目数据支撑 -->
          <text class="section-subtitle">（三）数据支撑</text>
          <view class="paragraph">
            <text class="highlight">项目周期：</text>累计开展3期(第一期至第三期)
          </view>
          <view class="paragraph">
            <text class="highlight">参与规模：</text>总人数近300人(从第1期24人增长至第3期)
          </view>
          <view class="paragraph">
            <text class="highlight">能力提升：</text>中学生100%覆盖历史探究、数字创作、跨学科应用能力
          </view>
          <view class="paragraph">
            <text class="highlight">学术成果：</text>3篇论文(例:《浅谈军工企业改革-以重庆国营建设机床厂为例》)
          </view>
          <view class="paragraph">
            <text class="highlight">宣传成果：</text>近20部视频(《家书》被建川博物馆采用)，3天浏览量约9000条
          </view>
          <view class="img-placeholder">
            <view class="image-filter-wrapper">
              <image src="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5/%E6%95%B0%E6%8D%AE%E6%94%AF%E6%92%91%E6%B1%87%E6%80%BB.png" 
                     @error="handleImageError"
                     class="light-image">
              </image>
            </view>
            <text class="img-desc">数据支撑汇总</text>
          </view>
        </view>

        <view class="section-content">
          <!-- 双线融合模式 -->
          <text class="section-subtitle">（四）双线融合的社会资源+学校资源结合模式</text>
          <view class="paragraph">
          本项目整合社会资源与学校资源，将大学（重庆师范大学）与中学（育才中学）、博物馆（建川博物馆）、社会企业联合（长安厂等），打破了传统教育或服务的单一性，构建协同育人和资源共享的研学模式，实现了学校社会资源的互补，弥补了学校在实践场景、前沿技术、社会化服务的不足，同时为社会培养综合性人才贡献力量。
          </view>
          <view class="paragraph">
            <text class="highlight">对大学：</text>突破资源边界，响应第二课堂制度，提升学生实践能力与综合素质
          </view>
          <view class="paragraph">
            <text class="highlight">对中学：</text>拓展资源，优化成本，提升教学质量和学生综合素质
          </view>
          <view class="paragraph">
            <text class="highlight">对企业：</text>扩大知名度与影响力，实现社会责任与经济效益双赢
          </view>
        </view>

        <view class="section-content">
          <!-- 大先生带小先生机制 -->
          <text class="section-subtitle">（五）大先生带小先生机制</text>
          <view class="paragraph">
              “大先生牵手小先生”模式是一种融合教育者（“大先生”共学社区）与青少年学生（“小先生”）协同参与教育与社会治理的创新实践。其核心在于通过代际互动、资源共享和角色转换，构建“教学相长”的育人生态。
          </view>
          <view class="paragraph">
              这是一项完善的共学体系，大学生与中学生共学，打破传统单向传授模式，主体双方既是学习者又是实践导师，大学生（大先生）则从知识传授者转变为资源整合者与成长引导者。
          </view>
          <view class="paragraph">
              在三期项目实践中，我们不断完善这一机制：从2023年一期的一对一尝试，到2024年二期的一对多扩展，再到2025年三期回归一对一并增加意向匹配机制，显著提升了合作效率与成果质量。
          </view>
          <view class="paragraph">
              核心目标是“应试补救”与“素养赋能”：为初中生设计兴趣培养项目，为高中生提供新高考衔接课程，聚焦史料分析、论文写作等关键能力培养。
          </view>
        </view>

        <view class="section-content">
          <!-- 服务对象 -->
          <text class="section-subtitle">（六）服务对象和内容</text>
          <view class="paragraph">
              我们构建连接多元教育主体的创新生态，满足不同用户群体的独特需求：
          </view>
          <view class="paragraph">
            <text class="highlight">1. 中学生：</text>通过"大学生带中学生"模式，提供体验驱动的学习体验，培养批判性思维、团队协作等核心素养，配套个性化学习建议。
          </view>
          <view class="paragraph">
            <text class="highlight">2. 中学教师：</text>提供跨学科课程设计支持、教学资源库和效果评估工具，减轻教学负担，提升专业能力。
          </view>
          <view class="paragraph">
            <text class="highlight">3. 学校：</text>协助构建系统化跨学科研学体系，促进大中小学协同育人，提升教育竞争力与社会影响力。
          </view>
          <view class="paragraph">
            <text class="highlight">4. 教育机构：</text>提供个性化研学解决方案，助力开发特色课程与教育IP，提升市场竞争力。
          </view>
        </view>
      </view>

      
    </scroll-view>
  </view>
</template>

<script>
import careModeMixin from '@/mixins/careMode.js'

export default {
  mixins: [careModeMixin],
  data() {
    return {};
  },
  methods: {
    // 处理图片加载错误
    handleImageError(e) {
      e.target.src = "/static/img/error-img.png";
    }
  }
};
</script>

<style scoped>
/* 基础样式 - 浅色系列 */
.container {
  min-height: 100vh;
  background-color: #f8f9fa; /* 浅灰底色 */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 顶部图片区域 */
.header-image-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 30rpx 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05); /* 浅色阴影 */
}

.header-image {
  width: 100%;
  height: auto;
  display: block;
  max-height: 400rpx;
  object-fit: cover;
  /* 顶部图片浅色处理：适当提高亮度和对比度 */
  filter: brightness(1.1) contrast(1.05) saturate(0.95);
  transition: filter 0.3s ease;
}

/* 图片覆盖层 - 优化文字与图片的对比度 */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30rpx;
  /* 渐变加深，确保文字清晰可读 */
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.4));
  color: #ffffff;
}

.overlay-title {
  font-size: 36rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
}

.overlay-subtitle {
  font-size: 24rpx;
  opacity: 0.95;
  display: block;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
}

/* 内容滚动区域 */
.content {
  padding: 30rpx;
  box-sizing: border-box;
  height: calc(100vh - 420rpx);
  background-color: #f8f9fa;
}

/* 章节样式 */
.section {
  margin-bottom: 40rpx;
  padding: 30rpx;
  background-color: #ffffff; /* 白色背景 */
  border-radius: 24rpx;
  box-shadow: 0 4px 20rpx rgba(0, 0, 0, 0.03); /* 浅灰色阴影 */
  border-top: 6rpx solid #4a90e2; /* 蓝色顶部边框 */
  transition: transform 0.3s ease;
}

.section-title {
  font-size: 34rpx;
  font-weight: bold;
  margin-bottom: 24rpx;
  display: block;
  padding-bottom: 12rpx;
  border-bottom: 2px solid #e6f0fb; /* 浅蓝色底边框 */
  color: #2d3748; /* 深灰色标题 */
}

.section-subtitle {
  font-size: 30rpx;
  font-weight: bold;
  margin: 24rpx 0 20rpx;
  display: block;
  color: #4a5568; /* 中灰色副标题 */
}

/* 段落样式 */
.paragraph {
  font-size: 28rpx;
  color: #333; /* 深灰色正文 */
  line-height: 1.8;
  margin-bottom: 20rpx;
  padding: 0 8rpx;
}

.highlight {
  color: #e53e3e; /* 红色强调 */
  font-weight: bold;
}

/* 表格样式 */
.table-container {
  width: 100%;
  overflow-x: auto;
  margin: 24rpx 0;
  padding: 12rpx;
  border-radius: 12rpx;
  background-color: #f9fafb; /* 极浅灰表格容器 */
}

.progress-table, .compare-table {
  width: 100%;
  min-width: 600rpx;
}

.table-header {
  display: flex;
  background-color: #e9f0fb; /* 浅蓝色表头 */
  font-weight: bold;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #e2e8f0; /* 浅灰色分隔线 */
  background-color: #ffffff;
}

.table-cell {
  flex: 1;
  padding: 20rpx 15rpx;
  text-align: left;
  border-right: 1px solid #e2e8f0; /* 浅灰色边框 */
  font-size: 26rpx;
  color: #333; /* 深灰色表格文字 */
  word-break: break-all;
  line-height: 1.6;
}

.table-cell:last-child {
  border-right: none;
}

.table-label {
  font-weight: bold;
  color: #2d3748;
  background-color: #e9f0fb;
}

/* 图片样式 - 浅色适配核心处理 */
.img-placeholder {
  width: 100%;
  margin: 30rpx 0;
  text-align: center;
}

/* 图片滤镜容器 */
.image-filter-wrapper {
  display: inline-block;
  width: 100%;
  border-radius: 18rpx;
  overflow: hidden;
  /* 添加浅色背景衬托图片 */
  background-color: #f1f1f1;
}

/* 内容区图片浅色处理 */
.light-image {
  width: 100%;
  height: auto;
  display: block;
  /* 核心滤镜：提高亮度，降低对比度，轻微去饱和，使图片更柔和 */
  filter: brightness(1.08) contrast(0.95) saturate(0.9);
  transition: all 0.3s ease;
}

/* 鼠标悬停/触摸反馈 */
.light-image:active {
  transform: scale(0.98);
  filter: brightness(1.1) contrast(1) saturate(0.95);
}

.img-desc {
  font-size: 26rpx;
  color: #666; /* 灰色图片描述 */
  margin-top: 15rpx;
  display: block;
  font-style: italic;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .content {
    padding: 20rpx;
    height: calc(100vh - 380rpx);
  }
  
  .section {
    padding: 24rpx;
    margin-bottom: 30rpx;
  }
  
  .header-image {
    max-height: 300rpx;
  }
  
  .overlay-title {
    font-size: 32rpx;
  }
  
  .overlay-subtitle {
    font-size: 22rpx;
  }
}
</style>