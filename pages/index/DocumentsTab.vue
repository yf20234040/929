<template>
  <view class="home-bg" :class="{ 'care-mode': careMode }">
    <!-- 搜索栏 -->
    <view class="search-header">
      <input class="search-input" placeholder="搜索内容" />
      <svg class="search-icon" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none" />
        <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </view>
    
    <!-- 内容区域 -->
    <view class="content-inner">
      <view class="issue-cards">
        <view class="issue-card" v-for="(item, idx) in issues" :key="idx" @click="showIssueMenu(idx)">
          <view class="issue-icon">{{ item.emoji }}</view>
          <view class="issue-content">
            <text class="issue-en">{{ item.en }}</text>
            <text class="issue-zh">{{ item.zh }}</text>
            <text class="issue-desc">{{ item.desc }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 敬请期待弹窗 -->
    <view class="modal-overlay" v-if="showModal" @click="closeModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <view class="modal-icon">🎉</view>
          <text class="modal-title">敬请期待</text>
        </view>
        <view class="modal-body">
          <text class="modal-text">更多精彩内容正在精心制作中</text>
          <text class="modal-subtext">我们将为您带来更好的体验</text>
        </view>
        <view class="modal-footer">
          <button class="modal-btn" @click="closeModal">
            <text class="btn-text">知道了</text>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import careModeMixin from '@/mixins/careMode.js';

export default {
  mixins: [careModeMixin],
  name: 'HomeTab',
  data() {
    return {
      showModal: false,
      issues: [
        { 
          en: 'Project Introduction', 
          zh: '项目简介', 
          emoji: '📝', 
          desc: '项目核心概述与目标' 
        },
        { 
          en: 'First Issue', 
          zh: '第一期', 
          emoji: '🌸', 
          desc: '首期精彩内容回顾' 
        },
        { 
          en: 'Second Issue', 
          zh: '第二期', 
          emoji: '🌼', 
          desc: '二期重点内容展示' 
        },
        { 
          en: 'Third Issue', 
          zh: '第三期', 
          emoji: '🌻', 
          desc: '三期最新进展汇报' 
        },
        { 
          en: 'More Issue', 
          zh: '查看更多', 
          emoji: '📚', 
          desc: '浏览全部历史内容' 
        }
      ]
    }
  },
  methods: {
    showIssueMenu(idx) {
      // 如果是"查看更多"（索引为4），显示弹窗
      if (idx === 4) {
        this.showModal = true;
        return;
      }
      
      const issuePages = [
        '/pages/issue/introduction',
        '/pages/issue1/issue1',
        '/pages/issue2/issue2',
        '/pages/issue3/issue3'
      ];
      const targetPage = issuePages[idx];
      if (targetPage) {
        uni.navigateTo({ url: targetPage });
      }
    },
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>

<style scoped>
	
/* 基础配色定义 - 浅蓝浅粉为主 */
:root {
  --primary-light-blue: #DCEEFF;  /* 浅蓝主色 */
  --primary-light-pink: #FEE6EB;  /* 浅粉主色 */
  --accent-blue: #A4D0F8;        /* 深蓝强调色 */
  --accent-pink: #F9CAD3;        /* 深粉强调色 */
  --white: #FFFFFF;               /* 白色背景 */
  --text-dark: #333333;           /* 主要文字 */
  --text-gray: #666666;           /* 次要文字 */
  --shadow: 0 3rpx 12rpx rgba(0, 0, 0, 0.05); /* 统一阴影 */
}

/* 页面整体样式 */
.home-bg {
  min-height: 100vh;
  background-color: var(--primary-light-blue); /* 浅蓝背景 */
  /*顶部内边距 */
  padding-top: 80rpx; 
  box-sizing: border-box;
}

/* 搜索栏样式 */
.search-header {
  padding: 15rpx 30rpx 30rpx;
  display: flex;
  align-items: center;
  position: relative;
}
.search-input {
  width: 100%;
  height: 76rpx;
  background-color: var(--white);
  border-radius: 38rpx; /* 圆角 */
  border: none;
  padding-left: 36rpx;
  padding-right: 80rpx;
  font-size: 28rpx;
  color: var(--text-gray);
  box-shadow: var(--shadow);
  box-sizing: border-box;
  outline: none;
}
.search-icon {
  width: 34rpx;
  height: 34rpx;
  position: absolute;
  right: 60rpx;
  color: var(--accent-pink); /* 粉色图标 */
}

/* 内容区域 */
.content-inner {
  padding: 0 30rpx;
  width: 100%;
  box-sizing: border-box;
  /* 顶部间距，让搜索栏和内容区有合适间隔 */
  margin-top: 20rpx; 
}
.issue-cards {
  margin-bottom: 40rpx;
}

/* 卡片统一样式 */
.issue-card {
  background-color: var(--white);
  border-radius: 18rpx;
  padding: 30rpx;
  margin-bottom: 22rpx;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}
/* 点击交互效果 */
.issue-card:active {
  transform: translateY(2rpx);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

/* 卡片左侧装饰（浅蓝/浅粉交替） */
.issue-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 15rpx;
  bottom: 15rpx;
  width: 8rpx;
  border-radius: 4rpx;
}
/* 奇偶卡片交替配色 */
.issue-card:nth-child(odd)::before {
  background-color: var(--accent-pink); /* 奇数卡片 - 粉色装饰 */
}
.issue-card:nth-child(even)::before {
  background-color: var(--accent-blue); /* 偶数卡片 - 蓝色装饰 */
}

/* 卡片图标 */
.issue-icon {
  font-size: 48rpx;
  margin-left: 20rpx; 
  margin-right: 28rpx;
  color: var(--text-gray);
}

/* 卡片内容区 */
.issue-content {
  flex: 1;
  padding: 5rpx 0;
}
.issue-en {
  font-size: 24rpx;
  color: var(--text-gray);
  display: block;
  margin-bottom: 6rpx;
  letter-spacing: 0.5rpx;
}
.issue-zh {
  font-size: 34rpx;
  font-weight: 600;
  color: var(--text-dark);
  display: block;
  margin-bottom: 5rpx;
}
.issue-desc {
  font-size: 24rpx;
  color: var(--text-gray);
  display: block;
  opacity: 0.9;
}

/* 弹窗样式 */
.modal-overlay {
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
  width: 600rpx;
  background: #ffffff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50rpx) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.modal-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.modal-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.modal-body {
  text-align: center;
  margin-bottom: 40rpx;
}

.modal-text {
  display: block;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 12rpx;
  line-height: 1.5;
}

.modal-subtext {
  display: block;
  font-size: 24rpx;
  color: #999;
}

.modal-footer {
  text-align: center;
}

.modal-btn {
  background: linear-gradient(135deg, #55aaff, #aadbff);
  border: none;
  border-radius: 50rpx;
  padding: 20rpx 60rpx;
  transition: all 0.3s ease;
}

.modal-btn:active {
  transform: scale(0.95);
}

.modal-btn .btn-text {
  color: #ffffff;
  font-size: 35rpx;
  font-weight: 500;
}
</style>