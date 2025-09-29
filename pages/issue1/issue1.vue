<template>
  <view class="container" :class="{ 'care-mode': careMode }">
    <!-- 顶部导航栏，风格与issue2一致 -->
    <view class="nav-bar beautify-navbar" :style="{paddingTop: statusBarHeight}">
      <view class="nav-left" @click="goBack">
        <text class="back-arrow">‹</text>
      </view>
      <view class="nav-title">第一期</view>
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
      selectedItem: 0, // 当前选中的一级目录索引
      selectedSubMenuIndex: null, // 当前选中的二级目录索引
      directoryItems: [
        {
          title: '项目管理中心',
          children: [
            { title: '计划与进度', page: '/pages/issue1/issue111' },
            { title: '评价体系', page: '/pages/issue1/issue112' },
            { title: '第二期招募与培训', page: '/pages/issue1/issue113' }
          ]
        },
		{
		  title: '活动执行过程',
		  children: [
		    { title: '2.26踩点', page: '/pages/issue1/issue151' },
		    { title: '4.22 第一次线上见面会', page: '/pages/issue1/issue152' },
		    { title: '6.11 第二次线下见面会', page: '/pages/issue1/issue153' },
		    { title: '7.17线下拍摄', page: '/pages/issue1/issue154' },
		    { title: '7.27线下配音', page: '/pages/issue1/issue155' }
		  ]
		},
        {
          title: '成果展示橱窗',
          children: [
			{ title: '汇报会进展', page: '/pages/issue1/issue121' },
            { title: '荣誉与报道', page: '/pages/issue1/issue122' }
          ]
        },
        {
          title: '内容创作工坊',
          children: [
            { title: '脚本与文稿', page: '/pages/issue1/issue131' }
          ]
        },
        {
          title: '协作工具库',
          children: [
            { title: '查看详情', page: '/pages/issue1/issue141' }
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
    // 选中一级目录
    selectItem(idx) {
      this.selectedItem = idx;
      // 如果是项目管理中心，默认高亮第一个二级目录
      if (this.directoryItems[idx].title === '项目管理中心') {
        this.selectedSubMenuIndex = 0;
      } else {
        this.selectedSubMenuIndex = null;
      }
    },
    // 选中二级目录并跳转
    selectRightSubMenu(idx) {
      this.selectedSubMenuIndex = idx;
      const sub = this.directoryItems[this.selectedItem].children[idx];
      if (sub && sub.page) {
        uni.navigateTo({ url: sub.page });
      }
    }
  },
  mounted() {
    // 顶部安全区适配
    const sys = uni.getSystemInfoSync();
    this.statusBarHeight = sys.statusBarHeight ? sys.statusBarHeight + 'px' : '40px';
    // 默认选中第一个二级目录
    if (this.directoryItems[0].title === '项目管理中心') {
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
