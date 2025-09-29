<template>
  <view class="container">
    <!-- 内容区 - 两栏网格布局 -->
    <view class="content">
      <view class="grid-layout">
        <!-- 循环展示媒体内容 -->
        <view class="media-card" 
              v-for="(item, index) in mediaList" 
              :key="index"
              @click="viewDetail(item)">
          
          <!-- 媒体容器 -->
          <view class="media-container">
            <!-- 图片展示 -->
            <image v-if="item.type === 'image'" 
                   :src="item.url" 
                   class="media-item" 
                   mode="aspectFill"
                   lazy-load>
            </image>
            
            <!-- 视频展示 -->
            <video v-if="item.type === 'video'" 
                   :src="item.url" 
                   class="media-item" 
                   mode="aspectFill"
                   lazy-load
                   :controls="false">
            </video>
            
            <!-- 视频标识 -->
            <view v-if="item.type === 'video'" class="video-tag">
              <icon type="play" size="16" color="#ffffff"></icon>
            </view>
          </view>
          
          <!-- 内容描述 -->
          <view class="media-desc">
            <text>{{ item.description }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 加载更多提示 -->
    <view v-if="loading" class="loading-indicator">
      <view class="loading-spinner"></view>
      <text class="loading-text">加载中...</text>
    </view>
    
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 媒体资源列表 - URL存放位置，可直接替换为实际资源地址
      mediaList: [
        {
          id: 1,
          type: 'image',
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/4.22%E7%AC%AC%E4%B8%80%E6%AC%A1%E7%BA%BF%E4%B8%8A%E8%A7%81%E9%9D%A2%E4%BC%9A/1280X1280.PNG', // 图片URL
          description: '线上见面会PPT'
        },
        {
          id: 2,
          type: 'image',
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/4.22%E7%AC%AC%E4%B8%80%E6%AC%A1%E7%BA%BF%E4%B8%8A%E8%A7%81%E9%9D%A2%E4%BC%9A/%E7%BA%BF%E4%B8%8A%E8%A7%81%E9%9D%A2%E4%BC%9A.jpg',
          description: '线上见面会截图'
        },
      ],
      loading: false
    };
  },
  onLoad() {
    // 页面加载时的初始化操作
  },
  onReachBottom() {
    // 页面滚动到底部时加载更多内容
    this.loadMoreMedia();
  },
  methods: {
    // 查看媒体详情
    viewDetail(item) {
      uni.navigateTo({
        url: `/pages/detail/detail?item=${encodeURIComponent(JSON.stringify(item))}`
      });
    },
    
    // 加载更多媒体内容
    loadMoreMedia() {
      if (this.loading) return;
      
      this.loading = true;
      
      // 模拟网络请求延迟
      setTimeout(() => {
        // 新增媒体内容 - URL存放位置
        const newMedia = [
          {
            id: this.mediaList.length + 1,
            type: Math.random() > 0.5 ? 'image' : 'video',
            url: Math.random() > 0.5 
              ? `https://picsum.photos/400/500?random=${this.mediaList.length + 1}` 
              : 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%E9%98%E9%87%E8%A1%E8%97%E8%B4%E9%9D%E9%9B%E8%89%B2.mp4',
            description: `新${Math.random() > 0.5 ? '图片' : '视频'}内容 ${this.mediaList.length + 1}`
          },
          {
            id: this.mediaList.length + 2,
            type: Math.random() > 0.5 ? 'image' : 'video',
            url: Math.random() > 0.5 
              ? `https://picsum.photos/400/500?random=${this.mediaList.length + 2}` 
              : 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%E9%98%E9%87%E8%A1%E8%97%E8%B4%E9%9D%E6%B5%E8%8B%B1%E5%AD%97.mp4',
            description: `新${Math.random() > 0.5 ? '图片' : '视频'}内容 ${this.mediaList.length + 2}`
          }
        ];
        
        this.mediaList = [...this.mediaList, ...newMedia];
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafafa;
  /* 增加顶部安全距离，适配刘海屏 */
  padding-top: env(safe-area-inset-top);
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 8px;
}

/* 网格布局 */
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

/* 媒体卡片 */
.media-card {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.media-card:active {
  transform: scale(0.98);
}

/* 媒体容器 */
.media-container {
  position: relative;
  width: 100%;
  padding-top: 140%; /* 4:5.6 比例，类似小红书图片比例 */
}

.media-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 视频标签 */
.video-tag {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 媒体描述 */
.media-desc {
  padding: 8px;
  font-size: 14px;
  color: #333333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

/* 加载指示器 */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #dddddd;
  border-top-color: #333333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}

.loading-text {
  font-size: 14px;
  color: #999999;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

</style>