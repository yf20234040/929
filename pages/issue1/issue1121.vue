<template>
  <view class="container">
    <!-- 加载提示 -->
    <view class="loading" v-if="isLoading && !showGuide">
      <view class="loading-icon"></view>
      <text class="loading-text">正在准备文档...</text>
    </view>
    
    <!-- 引导用户使用微信原生预览 -->
    <view class="guide" v-if="showGuide">
      <view class="guide-icon">
        <icon type="info" size="50" color="#007aff"></icon>
      </view>
      <text class="guide-title">文档预览指引</text>
      <text class="guide-desc">由于微信小程序限制，建议使用微信原生文档预览功能</text>
      <button class="open-btn" @click="openWithWeChat">打开文档</button>
    </view>
    
    <!-- 错误提示 -->
    <view class="error" v-if="hasError">
      <icon type="warn" size="40" color="#f00"></icon>
      <text class="error-text">文档无法加载</text>
      <text class="error-desc">{{errorMsg}}</text>
      <button class="retry-btn" @click="retry">重试</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      docOnlineUrl: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86%E4%B8%AD%E5%BF%83/%E8%AF%84%E4%BB%B7%E4%BD%93%E7%B3%BB/%E2%80%9C%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E2%80%9D%E7%A0%94%E5%AD%A6%E9%A1%B9%E7%9B%AE%E7%AC%AC%E4%BA%8C%E6%9C%9F%E6%88%90%E5%91%98%E6%8B%9B%E5%8B%9F%E6%96%B9%E6%A1%88.docx",
      isLoading: true,
      showGuide: false,
      hasError: false,
      errorMsg: ""
    };
  },
  
  onLoad() {
    // 页面加载后检查环境并准备文档
    this.checkEnvAndPrepareDoc();
  },
  
  methods: {
    async checkEnvAndPrepareDoc() {
      try {
        // 检查是否在微信小程序环境
        if (typeof wx !== 'undefined') {
          // 短延迟后显示引导界面（避免频繁切换）
          setTimeout(() => {
            this.isLoading = false;
            this.showGuide = true;
          }, 1500);
        } else {
          this.hasError = true;
          this.errorMsg = "请在微信小程序中打开";
        }
      } catch (err) {
        this.isLoading = false;
        this.hasError = true;
        this.errorMsg = "初始化失败，请重试";
        console.error(err);
      }
    },
    
    async openWithWeChat() {
      this.isLoading = true;
      this.showGuide = false;
      
      try {
        // 方法1：使用微信的文件下载+打开文档能力（推荐）
        wx.downloadFile({
          url: this.docOnlineUrl,
          success: (res) => {
            if (res.statusCode === 200) {
              // 下载成功后打开文档
              wx.openDocument({
                filePath: res.tempFilePath,
                fileType: 'docx', // 明确指定文件类型
                showMenu: true,   // 允许用户进行分享等操作
                success: () => {
                  console.log('文档打开成功');
                  this.isLoading = false;
                },
                fail: (err) => {
                  this.handleError('打开文档失败，请重试', err);
                }
              });
            } else {
              this.handleError('文件下载失败，状态码：' + res.statusCode);
            }
          },
          fail: (err) => {
            this.handleError('下载文件失败，请检查网络', err);
          }
        });
      } catch (err) {
        this.handleError('操作失败，请重试', err);
      }
    },
    
    handleError(msg, err) {
      this.isLoading = false;
      this.hasError = true;
      this.errorMsg = msg;
      console.error('文档操作错误:', err);
    },
    
    retry() {
      this.hasError = false;
      this.isLoading = true;
      setTimeout(() => {
        this.checkEnvAndPrepareDoc();
      }, 500);
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-icon {
  width: 50rpx;
  height: 50rpx;
  border: 5rpx solid #e5e5e5;
  border-top-color: #007aff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 30rpx;
}

.loading-text {
  font-size: 30rpx;
  color: #666;
}

.guide {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 40rpx;
  background-color: #fff;
  border-radius: 16rpx;
  margin: 0 40rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
}

.guide-icon {
  margin-bottom: 40rpx;
}

.guide-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.guide-desc {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 50rpx;
  max-width: 500rpx;
}

.open-btn {
  width: 300rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 30rpx;
  background-color: #007aff;
  color: #fff;
  border-radius: 40rpx;
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  text-align: center;
}

.error-text {
  font-size: 32rpx;
  color: #f00;
  margin: 30rpx 0 10rpx 0;
}

.error-desc {
  font-size: 26rpx;
  color: #888;
  margin-bottom: 40rpx;
  max-width: 500rpx;
}

.retry-btn {
  background-color: #007aff;
  color: white;
  padding: 0 40rpx;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
