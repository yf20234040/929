/**
 * 关怀模式全局混入
 * 为所有页面提供关怀模式功能
 */
export default {
  data() {
    return {
      careMode: false // 关怀模式开关状态
    }
  },

  // 页面加载和显示时同步状态
  onLoad() {
    this.loadCareMode();
  },
  onShow() {
    this.loadCareMode();
  },

  methods: {
    // 从本地存储加载状态
    loadCareMode() {
      const savedCareMode = uni.getStorageSync('careMode');
      // 初始化时若未设置，默认关闭（null为首次打开时的状态）
      if (savedCareMode !== null) {
        this.careMode = savedCareMode;
        this.applyCareMode(); // 应用样式
      }
    },

    // 应用关怀模式样式（可扩展额外逻辑）
    applyCareMode() {
      console.log('关怀模式状态:', this.careMode ? '已开启' : '已关闭');
    },

    // 切换关怀模式（供设置页调用）
    toggleCareMode() {
      this.careMode = !this.careMode;
      uni.setStorageSync('careMode', this.careMode); // 持久化状态
      this.applyCareMode();
      // 显示操作反馈
      uni.showToast({
        title: this.careMode ? '已开启关怀模式' : '已关闭关怀模式',
        icon: 'success',
        duration: 1500
      });
    }
  }
}

