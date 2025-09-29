<template>
  <view class="wechat-login-container">
    <!-- 授权获取手机号按钮 -->
    <button 
      open-type="getPhoneNumber" 
      @getphonenumber="handleGetPhoneNumber"
      class="login-btn"
      :loading="loading"
      :disabled="loading"
    >
      {{ loading ? '登录中...' : '立即登录' }}
    </button>
  </view>
</template>

<script>
export default {
  name: 'WechatLogin',
  data() {
    return {
      loading: false
    }
  },
  methods: {
    // 获取手机号按钮回调
    async handleGetPhoneNumber(e) {
      if (this.loading) return;
      this.loading = true;

      try {
        // 检查授权结果
        if (e.detail.errMsg !== 'getPhoneNumber:ok') {
          uni.showToast({ title: '获取手机号失败，请重试', icon: 'none' });
          return;
        }

        if (!e.detail.code) {
          uni.showToast({ title: '获取手机号失败，请重试', icon: 'none' });
          return;
        }

        uni.showLoading({ title: '登录中...', mask: true });

        try {
          // 尝试调用后端接口获取手机号
          const phoneResult = await this.getPhoneNumberFromServer(e.detail.code);

          if (!phoneResult.success) {
            throw new Error(phoneResult.message || '获取手机号失败');
          }

          // 构建用户信息
          const userInfo = {
            nickName: phoneResult.phoneNumber || '访客用户',
            phone: phoneResult.phoneNumber,
            avatarUrl: '',
            loginType: 'wechatPhone',
            timestamp: Date.now()
          };

          // 保存登录信息到本地
          this.saveLoginInfo(userInfo, e.detail.code);

          uni.hideLoading();
          uni.showToast({ title: '登录成功', icon: 'success', duration: 1500 });

          this.$emit('login-success', userInfo);
          this.navigateToProfile();

        } catch (apiError) {
          console.error('API登录失败，尝试备用方案:', apiError);
          
          // 备用方案：直接使用访客模式登录
          const userInfo = {
            nickName: '访客用户',
            phone: '',
            avatarUrl: '',
            loginType: 'guest',
            timestamp: Date.now()
          };

          // 保存登录信息到本地
          this.saveLoginInfo(userInfo, e.detail.code);

          uni.hideLoading();
          uni.showToast({ 
            title: '登录成功（访客模式）', 
            icon: 'success', 
            duration: 2000 
          });

          this.$emit('login-success', userInfo);
          this.navigateToProfile();
        }

      } catch (error) {
        uni.hideLoading();
        uni.showToast({ title: error.message || '登录失败，请重试', icon: 'none' });
        this.$emit('login-error', error);
      } finally {
        this.loading = false;
      }
    },

    // 调用后端接口获取手机号
    async getPhoneNumberFromServer(code) {
      try {
        const response = await this.callBackendAPI(code);

        if (response.success) {
          return {
            success: true,
            phoneNumber: response.phoneNumber,
            message: '获取手机号成功'
          };
        } else {
          throw new Error(response.message || '获取手机号失败');
        }
      } catch (error) {
        console.error('获取手机号失败:', error);
        throw new Error('网络请求失败');
      }
    },

    // 调用后端 API
    async callBackendAPI(code) {
      try {
        console.log('开始调用登录API，code:', code);
        
        // 使用阿里云服务器地址
        const response = await uni.request({
          url: 'https://llzmlxb.xyz/api/auth/get-phone-number',
          method: 'POST',
          data: { code },
          header: { 'Content-Type': 'application/json' },
          timeout: 10000
        });

        console.log('API响应:', response);
        console.log('API响应数据:', response.data);

        if (response && response.statusCode === 200) {
          if (response.data && response.data.code === 0) {
            return {
              success: true,
              phoneNumber: response.data.data.userInfo.phoneNumber,
              message: response.data.message
            };
          } else {
            const errorMsg = response.data?.message || '获取手机号失败';
            console.error('API返回错误:', errorMsg, response);
            throw new Error(errorMsg);
          }
        } else {
          const errorMsg = response?.errMsg || '网络请求失败';
          console.error('API请求失败:', errorMsg, response);
          throw new Error(errorMsg);
        }
      } catch (error) {
        console.error('API调用失败:', error);
        // 如果是网络错误，提供更友好的提示
        if (error.errMsg && error.errMsg.includes('timeout')) {
          throw new Error('网络超时，请检查网络连接');
        } else if (error.errMsg && error.errMsg.includes('fail')) {
          throw new Error('网络请求失败，请检查网络连接');
        }
        throw error;
      }
    },

    // 保存登录信息
    saveLoginInfo(userInfo, code) {
      try {
        uni.removeStorageSync('userInfo');
        uni.removeStorageSync('wechatPhoneCode');
        uni.removeStorageSync('loginType');
        uni.removeStorageSync('isLoggedIn');

        uni.setStorageSync('userInfo', userInfo);
        uni.setStorageSync('wechatPhoneCode', code);
        uni.setStorageSync('loginType', 'wechatPhone');
        uni.setStorageSync('isLoggedIn', true);
      } catch (error) {
        console.error('保存登录信息失败:', error);
      }
    },

    // 跳转个人中心
    navigateToProfile() {
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/index/index?tab=4' });
      }, 1500);
    }
  }
}
</script>

<style scoped>
.wechat-login-container {
  padding: 0;
  width: 100%;
}

.login-btn {
  width: 100%;
  height: 100rpx;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  border-radius: 50rpx;
  font-size: 32rpx;
  font-weight: bold;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 8rpx 20rpx rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.login-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.login-btn:active::before {
  left: 100%;
}

.login-btn::after {
  border: none;
}

.login-btn:disabled {
  background: #ccc;
  box-shadow: none;
  opacity: 0.6;
}

.login-btn:active {
  transform: scale(0.98);
  box-shadow: 0 4rpx 12rpx rgba(102, 126, 234, 0.4);
}
</style>

