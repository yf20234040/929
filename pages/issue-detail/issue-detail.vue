<template>
  <view class="container" :class="{ 'care-mode': careMode }">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="goBack">
        <text class="back-arrow">←</text>
      </view>
      <view class="header-center">
        <text class="header-title">洞见历史</text>
      </view>
      <view class="header-right">
        <text class="header-search">🔍</text>
        <text class="header-info">ℹ️</text>
      </view>
    </view>

    <!-- 左右分栏布局 -->
    <view class="split-layout">
      <!-- 左侧目录导航 -->
      <view class="left-panel">
        <view class="directory-header">
          <text class="directory-title">目录</text>
          <text class="directory-arrow">▼</text>
          <text class="directory-add">+</text>
        </view>
        
        <view class="nav-list">
          <view 
            class="nav-item" 
            :class="{ active: selectedCategory === item.id }"
            v-for="item in categories" 
            :key="item.id"
            @click="selectCategory(item.id)"
          >
            <view class="nav-icon">{{ item.icon }}</view>
            <text class="nav-text">{{ item.name }}</text>
            <view class="nav-arrow" v-if="item.hasSubItems">
              {{ item.expanded ? '▼' : '▶' }}
            </view>
          </view>
          
          <!-- 子项目 -->
          <view 
            class="sub-item" 
            v-for="subItem in getSubItems()" 
            :key="subItem.id"
            @click="selectSubItem(subItem)"
          >
            <view class="sub-icon">{{ subItem.icon }}</view>
            <text class="sub-text">{{ subItem.title }}</text>
          </view>
        </view>
      </view>

      <!-- 右侧内容展示 -->
      <view class="right-panel">
        <view class="content-header">
          <text class="content-title">{{ currentCategory.name }}</text>
        </view>
        
        <view class="content-list">
          <view 
            class="content-item" 
            v-for="item in currentCategory.items" 
            :key="item.id"
            @click="viewContent(item)"
          >
            <view class="item-icon-wrapper">
              <view class="item-icon">{{ item.icon }}</view>
            </view>
            <view class="item-info">
              <text class="item-title">{{ item.title }}</text>
              <text class="item-desc">{{ item.description }}</text>
            </view>
            <view class="item-extra-icon" v-if="item.extraIcon">
              <image :src="item.extraIcon" class="extra-icon-image"></image>
            </view>
          </view>
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
      selectedCategory: 'issue1',
      categories: [
        {
          id: 'issue1',
          name: '第一期',
          icon: '📚',
          expanded: true,
          hasSubItems: true,
          extraIcon: '/static/2.png',
          items: [
            {
              id: 'pmc',
              title: '项目管理中心',
              description: '项目整体管理与协调',
              icon: '📋'
            },
            {
              id: 'execution',
              title: '活动执行过程',
              description: '项目活动执行与跟踪',
              icon: '⚡'
            },
            {
              id: 'tools',
              title: '协作工具库',
              description: '团队协作工具与资源',
              icon: '🛠️'
            },
            {
              id: 'workshop',
              title: '内容创作工坊',
              description: '创意内容制作与分享',
              icon: '🎨'
            },
            {
              id: 'showcase',
              title: '成果展示橱窗',
              description: '项目成果展示与分享',
              icon: '🏆'
            }
          ]
        },
        {
          id: 'issue2',
          name: '第二期',
          icon: '🎯',
          expanded: true,
          hasSubItems: true,
          items: [
            {
              id: 'launch',
              title: '项目的启动仪式',
              description: '项目正式启动与介绍',
              icon: '🚀'
            },
            {
              id: 'academic',
              title: '项目成果 学术组',
              description: '学术研究成果展示',
              icon: '🎓'
            },
            {
              id: 'propaganda',
              title: '项目成果 宣传组',
              description: '宣传推广成果展示',
              icon: '📢'
            },
            {
              id: 'art',
              title: '项目成果 艺术组',
              description: '艺术创作成果展示',
              icon: '🎭'
            },
            {
              id: 'micro',
              title: '项目成果 微课组',
              description: '微课制作成果展示',
              icon: '📹'
            },
            {
              id: 'summary',
              title: '项目汇报总结',
              description: '项目整体总结报告',
              icon: '📊'
            }
          ]
        },
        {
          id: 'issue3',
          name: '第三期',
          icon: '🌟',
          expanded: true,
          hasSubItems: true,
          items: [
            {
              id: 'contacts',
              title: '成员通讯录',
              description: '团队成员联系方式',
              icon: '👥'
            },
            {
              id: 'holland',
              title: '前期准备 霍兰德职业兴趣测试',
              description: '职业兴趣测试结果',
              icon: '🧪'
            },
            {
              id: 'meeting',
              title: '项目首次见面会',
              description: '团队首次会议记录',
              icon: '🤝'
            },
            {
              id: 'materials',
              title: '项目学习资料汇总',
              description: '学习资源整理汇总',
              icon: '📚'
            },
            {
              id: 'april1',
              title: '四月一日项目启动仪式',
              description: '项目正式启动仪式',
              icon: '🎉'
            }
          ]
        }
      ]
    }
  },
  computed: {
    currentCategory() {
      return this.categories.find(cat => cat.id === this.selectedCategory) || this.categories[0];
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      // 切换展开状态
      const category = this.categories.find(cat => cat.id === categoryId);
      if (category && category.hasSubItems) {
        category.expanded = !category.expanded;
      }
    },
    getSubItems() {
      const category = this.categories.find(cat => cat.id === this.selectedCategory);
      return category && category.expanded ? category.items : [];
    },
    selectSubItem(item) {
      uni.showToast({
        title: `选择了${item.title}`,
        icon: 'none'
      });
    },
    viewContent(item) {
      uni.showToast({
        title: `查看${item.title}`,
        icon: 'none'
      });
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #556b2f; /* 整体背景色 */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.header-left .header-right {
  display: flex;
  align-items: center;
}

.back-arrow {
  font-size: 24px;
  margin-right: 10px;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
}

.header-search,
.header-info {
  font-size: 20px;
  margin-left: 15px;
}

.split-layout {
  display: flex;
  flex: 1;
}

.left-panel {
  width: 200px;
  background-color: #f9f9f9;
  border-right: 1px solid #eee;
  padding: 10px;
  overflow-y: auto;
}

.directory-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.directory-title {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}

.directory-arrow {
  font-size: 12px;
  color: #666;
  margin-right: auto;
}

.directory-add {
  font-size: 20px;
  color: #007bff;
}

.nav-list {
  margin-bottom: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}

.nav-item.active {
  background-color: #e9e9e9;
}

.nav-icon {
  margin-right: 10px;
}

.nav-text {
  flex: 1;
  font-size: 14px;
}

.nav-arrow {
  font-size: 12px;
  color: #666;
}

.sub-item {
  display: flex;
  align-items: center;
  padding: 8px 10px 8px 30px; /* Indent sub-items */
  margin-bottom: 3px;
  border-radius: 3px;
}

.sub-item:hover {
  background-color: #f0f0f0;
}

.sub-icon {
  margin-right: 8px;
  font-size: 12px;
}

.sub-text {
  font-size: 13px;
}

.right-panel {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.content-header {
  margin-bottom: 15px;
}

.content-title {
  font-size: 18px;
  font-weight: bold;
}

.content-list {
  display: flex;
  flex-direction: column; /* 改为垂直排列 */
  gap: 10px; /* 卡片之间的间距 */
  padding: 10px;
}

.content-item {
  background-color: #8b9d6e; /* 卡片背景色 */
  border-radius: 12px; /* 圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 阴影 */
  padding: 15px 20px; /* 内边距 */
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative; /* 用于定位额外图标 */
  overflow: hidden; /* 隐藏超出部分的背景 */
}

.content-item::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 80px; /* 斜切背景的宽度 */
  height: 80px; /* 斜切背景的高度 */
  background-color: #6b8e23; /* 斜切背景色 */
  transform: skewX(-20deg) translateX(30px); /* 斜切并向右移动 */
  transform-origin: top right;
  z-index: 0;
}

.item-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #556b2f; /* 图标背景色 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  z-index: 1; /* 确保在斜切背景之上 */
}

.item-icon {
  font-size: 22px;
}

.item-info {
  flex: 1;
  z-index: 1; /* 确保在斜切背景之上 */
}

.item-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333; /* 标题颜色 */
}

.item-desc {
  font-size: 13px;
  color: #888; /* 描述颜色 */
}

.item-extra-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  z-index: 2; /* 确保在所有内容之上 */
}

.extra-icon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
