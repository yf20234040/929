/**
 * 关怀模式全局混入
 * 为所有页面提供关怀模式功能
 */
export default {
  data() {
    return {
      careMode: false
    }
  },
  
  onLoad() {
    this.loadCareMode();
  },
  
  onShow() {
    this.loadCareMode();
  },
  
  methods: {
    // 加载关怀模式设置
    loadCareMode() {
      const savedCareMode = uni.getStorageSync('careMode');
      if (savedCareMode !== null) {
        this.careMode = savedCareMode;
        this.applyCareMode();
      }
    },
    
    // 应用关怀模式样式
    applyCareMode() {
      // 在微信小程序中，通过动态类名来应用关怀模式样式
      console.log('关怀模式状态:', this.careMode ? '已开启' : '已关闭');
    },
    
    // 切换关怀模式（仅在设置页面使用）
    toggleCareMode() {
      this.careMode = !this.careMode;
      uni.setStorageSync('careMode', this.careMode);
      
      // 应用关怀模式样式
      this.applyCareMode();
      
      uni.showToast({
        title: this.careMode ? '已开启关怀模式' : '已关闭关怀模式',
        icon: 'success',
        duration: 1500
      });
    }
  }
}
