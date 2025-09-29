<template>
  <view class="container" :class="{ 'care-mode': careMode }">
    <view class="nav-bar beautify-navbar" :style="{paddingTop: statusBarHeight}">
      <view class="nav-left" @click="goBack">
        <text class="back-arrow">‹</text>
      </view>
      <view class="nav-title">第三期</view>
      <view class="nav-right">
        <text class="nav-icon">🔍</text>
        <text class="nav-icon">ⓘ</text>
      </view>
    </view>
    <view class="content-inner">
      <view class="main-content">
        <!-- 左侧一级目录分栏 -->
        <view class="left-panel">
          <view class="directory-header">
            <text class="directory-title">目录</text>
          </view>
          <scroll-view class="directory-list" scroll-y="true">
            <view class="directory-item" v-for="(item, idx) in directoryItems" :key="idx"
                  :class="{ 'active': selectedItem === idx }" @click="selectItem(idx)">
              <view class="item-content">
                <text class="item-icon">📄</text>
                <text class="item-text">{{ item.title }}</text>
                <text class="item-arrow" v-if="item.children">▶</text>
              </view>
            </view>
          </scroll-view>
        </view>
        <!-- 右侧内容区 -->
        <view class="right-panel">
          <!-- 只要当前选中的一级目录有children，就显示二级目录列表和跳转 -->
          <template v-if="directoryItems[selectedItem] && directoryItems[selectedItem].children">
            <view class="content-header">
              <text class="content-title">{{ directoryItems[selectedItem].title }}</text>
            </view>
            <view class="submenu-list">
              <view class="submenu-item" v-for="(sub, idx) in directoryItems[selectedItem].children" :key="idx"
                    :class="{active: selectedSubMenuIndex === idx}" @click="selectRightSubMenu(idx)">
                <text class="submenu-text">{{ sub.title }}</text>
              </view>
            </view>
          </template>
          <!-- 没有children时，直接显示内容 -->
          <template v-else-if="directoryItems[selectedItem]">
            <view class="content-header">
              <text class="content-title">{{ directoryItems[selectedItem].title }}</text>
            </view>
            <view class="content-page">
              <view class="desc">{{ directoryItems[selectedItem].content }}</view>
            </view>
          </template>
          <!-- 判空：无数据时提示 -->
          <template v-else>
            <view class="content-page">
              <text class="desc">暂无内容</text>
            </view>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import careModeMixin from '@/mixins/careMode.js'

export default {
  mixins: [careModeMixin],
  data() {
    return {
      selectedItem: 0,
      selectedSubMenuIndex: null,
      directoryItems: [
        {
          title: '前期准备',
          children: [
            { title: '霍兰德职业兴趣测试', page: '/pages/issue3/issue31' },
          ]
        },
        {
          title: '项目首次见面会',
          children: [
            { title: '查看详情', page: '/pages/issue3/issue32' },
          ]
        },
		{
		  title: '项目学习资料汇总',
		  children: [
		    { title: '长安厂资料', page: '/pages/issue3/issue331' },
			{ title: '学习资料', page: '/pages/issue3/issue332' }
		  ]
		},
		{
		  title: '四月一日项目启动仪式',
		  children: [
		    { title: '查看会议详情', page: '/pages/issue3/issue34' }
		  ]
		},
		{
		  title: '任务清单',
		  children: [
		    { title: '查看详情', page: '/pages/issue3/issue35' }
		  ]
		},
		{
		  title: '小组任务成果',
		  children: [
		    { title: '宣传组', page: '/pages/issue3/issue361' },
			{ title: '社会组', page: '/pages/issue3/issue362' },
			{ title: '策划组', page: '/pages/issue3/issue363' },
			{ title: '组装组', page: '/pages/issue3/issue364' },
			{ title: '艺术组', page: '/pages/issue3/issue365' },
			{ title: '重塑组织读书报告', page: '/pages/issue3/issue366' },
			{ title: '工具--甘特图', page: '/pages/issue3/issue367' }
		  ]
		},
       {
         title: '最终成果汇报',
         children: [
           { title: '策展1.0', page: '/pages/issue3/issue371' },
		   { title: '策展2.0', page: '/pages/issue3/issue372' },
		   { title: '洞见历史第三期分享.pptx', page: '/pages/issue3/issue374' },
		   { title: '研学视频.mp4', page: '/pages/issue3/issue375' }
         ]
       }, 
      ],
      statusBarHeight: 0
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    selectItem(idx) {
      this.selectedItem = idx;
      if (this.directoryItems[idx].children) {
        this.selectedSubMenuIndex = 0;
      } else {
        this.selectedSubMenuIndex = null;
        // 如果是无children的单页面，直接跳转
        if (this.directoryItems[idx].page) {
          uni.navigateTo({ url: this.directoryItems[idx].page });
        }
      }
    },
    selectRightSubMenu(idx) {
      this.selectedSubMenuIndex = idx;
      const sub = this.directoryItems[this.selectedItem].children[idx];
      if (sub && sub.page) {
        uni.navigateTo({ url: sub.page });
      }
    }
  },
  mounted() {
    const sys = uni.getSystemInfoSync();
    this.statusBarHeight = sys.statusBarHeight ? sys.statusBarHeight + 'px' : '40px';
    if (this.directoryItems[0].children) {
      this.selectedSubMenuIndex = 0;
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}
.nav-bar {
  height: 88rpx;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  position: relative;
  z-index: 100;
}
.beautify-navbar {
  background: #fff;
  border-radius: 0 0 24rpx 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  position: relative;
  z-index: 10;
}
.nav-title {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
  color: #222;
}
.nav-left, .nav-right {
  width: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back-arrow, .nav-icon {
  font-size: 32rpx;
  color: #666;
}
.content-inner {
  padding: 0 30rpx;
  width: 100%;
  box-sizing: border-box;
}
.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.left-panel {
  width: 40%;
  background-color: #f8f9fa;
  border-right: 1rpx solid #e9ecef;
  display: flex;
  flex-direction: column;
}
.directory-header {
  height: 80rpx;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  border-bottom: 1rpx solid #e9ecef;
}
.directory-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}
.directory-list {
  flex: 1;
  padding: 0;
}
.directory-item {
  border-bottom: 1rpx solid #f0f0f0;
}
.item-content {
  display: flex;
  align-items: center;
  padding: 20rpx;
  min-height: 60rpx;
}
.item-icon {
  font-size: 24rpx;
  margin-right: 15rpx;
  color: #007bff;
}
.item-text {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}
.item-arrow {
  font-size: 20rpx;
  color: #666;
}
.directory-item.active .item-content {
  background-color: #e3f2fd;
}
.right-panel {
  flex: 1;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}
.content-header {
  height: 80rpx;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #e9ecef;
}
.content-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  flex: 1;
}
.submenu-list {
  padding: 30rpx;
}
.submenu-item {
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
  font-size: 28rpx;
  color: #007bff;
  cursor: pointer;
}
.submenu-item.active {
  background: #e3f2fd;
  font-weight: bold;
}
</style>
