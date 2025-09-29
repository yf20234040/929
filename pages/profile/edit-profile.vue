<template>
  <view class="container" :class="{ 'care-mode': careMode }">
    <!-- 顶部导航栏 -->
    <view class="custom-navbar" :style="{paddingTop: statusBarHeight}">
      <view class="nav-left" @click="goBack">
        <text class="nav-back">←</text>
      </view>
      <view class="nav-center">
        <text class="nav-title">编辑资料</text>
      </view>
      <view class="nav-right">
        <text class="nav-save" @click="saveProfile"></text>
      </view>
    </view>
    
    <!-- 内容区域 -->
    <scroll-view class="content" scroll-y="true" :style="{paddingBottom: safeAreaBottom}">
      <!-- 头像区域 -->
      <view class="avatar-section">
        <view class="avatar-container">
          <view class="avatar">
            <image 
              v-if="formData.avatarUrl" 
              :src="formData.avatarUrl" 
              class="avatar-image"
              mode="aspectFill"
              @error="handleAvatarError"
            />
            <text v-else class="avatar-text">{{ formData.nickName ? formData.nickName.charAt(0) : (formData.name ? formData.name.charAt(0) : '👤') }}</text>
          </view>
          <view class="avatar-edit" @click="changeAvatar">
            <text class="edit-icon">📷</text>
          </view>
        </view>
		</br>
        <text class="avatar-tip">点击更换头像</text>
      </view>
      
      <!-- 基本信息表单 -->
      <view class="form-section">
        <view class="form-title">基本信息</view>
        
        <!-- 昵称 -->
        <view class="form-item">
          <view class="form-label">
            <text class="label-icon">👤</text>
            <text class="label-text">昵称</text>
          </view>
          <input 
            class="form-input" 
            v-model="formData.nickName" 
            placeholder="请输入您的昵称"
            maxlength="20"
          />
        </view>
        
        <!-- 真实姓名 -->
        <view class="form-item">
          <view class="form-label">
            <text class="label-icon">📝</text>
            <text class="label-text">真实姓名</text>
          </view>
          <input 
            class="form-input" 
            v-model="formData.name" 
            placeholder="请输入您的真实姓名"
            maxlength="20"
          />
        </view>
        
        <!-- 年龄 -->
        <view class="form-item">
          <view class="form-label">
            <text class="label-icon">🎂</text>
            <text class="label-text">年龄</text>
          </view>
          <input 
            class="form-input" 
            v-model="formData.age" 
            placeholder="请输入您的年龄"
            type="number"
            maxlength="3"
          />
        </view>
        
        <!-- 性别 -->
        <view class="form-item">
          <view class="form-label">
            <text class="label-icon">⚧</text>
            <text class="label-text">性别</text>
          </view>
          <view class="gender-selector">
            <view 
              class="gender-option" 
              :class="{ active: formData.gender === '男' }"
              @click="selectGender('男')"
            >
              <text class="gender-icon">♂</text>
              <text class="gender-text">男</text>
            </view>
            <view 
              class="gender-option" 
              :class="{ active: formData.gender === '女' }"
              @click="selectGender('女')"
            >
              <text class="gender-icon">♀</text>
              <text class="gender-text">女</text>
            </view>
          </view>
        </view>
        
        <!-- 用户类型 -->
        <view class="form-item">
          <view class="form-label">
            <text class="label-icon">🏷️</text>
            <text class="label-text">身份标签</text>
          </view>
          <view class="user-type-selector">
            <view 
              class="user-type-option" 
              :class="{ active: formData.userType === '学生' }"
              @click="selectUserType('学生')"
            >
              <text class="user-type-icon">🎓</text>
              <text class="user-type-text">学生</text>
            </view>
            <view 
              class="user-type-option" 
              :class="{ active: formData.userType === '老师' }"
              @click="selectUserType('老师')"
            >
              <text class="user-type-icon">👨‍🏫</text>
              <text class="user-type-text">老师</text>
            </view>
          </view>
        </view>
        
        <!-- 手机号（只读） -->
        <view class="form-item readonly">
          <view class="form-label">
            <text class="label-icon">📱</text>
            <text class="label-text">手机号</text>
          </view>
          <view class="form-value">{{ userInfo.phone || '未绑定' }}</view>
        </view>
      </view>
      
      <!-- 其他设置 -->
      <view class="form-section">
        <view class="form-title">其他设置</view>
        
        <!-- 个性签名 -->
        <view class="form-item">
          <view class="form-label">
            <text class="label-icon">💬</text>
            <text class="label-text">个性签名</text>
          </view>
          <textarea 
            class="form-textarea" 
            v-model="formData.signature" 
            placeholder="介绍一下自己吧..."
            maxlength="100"
          />
          <view class="char-count">{{ formData.signature.length }}/100</view>
        </view>
      </view>
      
      <!-- 底部保存按钮 -->
      <view class="save-section">
        <button class="save-btn" @click="saveProfile" :disabled="saving">
          {{ saving ? '保存中...' : '保存修改' }}
        </button>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import careModeMixin from '@/mixins/careMode.js'

export default {
  mixins: [careModeMixin],
  data() {
    return {
      statusBarHeight: '40px',
      safeAreaBottom: '40rpx',
      userInfo: {},
      formData: {
        nickName: '',
        name: '',
        age: '',
        gender: '',
        userType: '',
        signature: '',
        avatarUrl: ''
      },
      saving: false
    }
  },
  onLoad() {
    const sys = uni.getSystemInfoSync();
    this.statusBarHeight = sys.statusBarHeight ? sys.statusBarHeight + 'px' : '40px';
    
    // 获取安全区域底部高度
    if (sys.safeAreaInsets) {
      this.safeAreaBottom = (sys.safeAreaInsets.bottom || 0) + 40 + 'rpx';
    }
    
    this.loadUserInfo();
  },
  methods: {
    // 加载用户信息
    loadUserInfo() {
      const userInfo = uni.getStorageSync('userInfo');
      this.userInfo = userInfo || {};
      
      // 填充表单数据
      this.formData = {
        nickName: this.userInfo.nickName || '',
        name: this.userInfo.name || '',
        age: this.userInfo.age || '',
        gender: this.userInfo.gender || '',
        userType: this.userInfo.userType || '',
        signature: this.userInfo.signature || '',
        avatarUrl: this.userInfo.avatarUrl || ''
      };
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    
    // 更换头像
    changeAvatar() {
      uni.showActionSheet({
        itemList: ['拍照', '从相册选择'],
        success: (res) => {
          if (res.tapIndex === 0) {
            this.takePhoto();
          } else if (res.tapIndex === 1) {
            this.chooseImage();
          }
        }
      });
    },
    
    // 拍照
    takePhoto() {
      uni.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: (res) => {
          this.uploadAvatar(res.tempFilePaths[0]);
        },
        fail: (err) => {
          console.error('拍照失败:', err);
          uni.showToast({
            title: '拍照失败',
            icon: 'error'
          });
        }
      });
    },
    
    // 从相册选择
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        success: (res) => {
          this.uploadAvatar(res.tempFilePaths[0]);
        },
        fail: (err) => {
          console.error('选择图片失败:', err);
          uni.showToast({
            title: '选择图片失败',
            icon: 'error'
          });
        }
      });
    },
    
    // 上传头像
    uploadAvatar(imagePath) {
      uni.showLoading({
        title: '处理中...'
      });
      
      // 模拟上传过程
      setTimeout(() => {
        // 保存头像路径到表单数据
        this.formData.avatarUrl = imagePath;
        
        uni.hideLoading();
        uni.showToast({
          title: '头像已选择',
          icon: 'success'
        });
      }, 500);
    },
    
    // 处理头像加载错误
    handleAvatarError() {
      console.log('头像加载失败，使用默认头像');
      this.formData.avatarUrl = '';
    },
    
    
    // 选择性别
    selectGender(gender) {
      this.formData.gender = gender;
    },
    
    // 选择用户类型
    selectUserType(userType) {
      this.formData.userType = userType;
    },
    
    // 保存资料
    saveProfile() {
      if (this.saving) return;
      
      // 验证必填项
      if (!this.formData.nickName.trim()) {
        uni.showToast({ title: '请输入昵称', icon: 'none' });
        return;
      }
      
      // 验证年龄
      if (this.formData.age && (isNaN(this.formData.age) || this.formData.age < 1 || this.formData.age > 120)) {
        uni.showToast({ title: '请输入有效年龄', icon: 'none' });
        return;
      }
      
      this.saving = true;
      
      // 更新用户信息
      const updatedUserInfo = {
        ...this.userInfo,
        nickName: this.formData.nickName.trim(),
        name: this.formData.name.trim(),
        age: this.formData.age,
        gender: this.formData.gender,
        userType: this.formData.userType,
        signature: this.formData.signature.trim(),
        avatarUrl: this.formData.avatarUrl
      };
      
      // 保存到本地存储
      uni.setStorageSync('userInfo', updatedUserInfo);
      
      // 显示成功提示
      uni.showToast({ 
        title: '保存成功', 
        icon: 'success',
        duration: 1500
      });
      
      // 延迟返回，让用户看到成功提示
      setTimeout(() => {
        this.saving = false;
        uni.navigateBack();
      }, 1500);
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f9fa;
}

.custom-navbar {
  height: 88rpx;
  background: linear-gradient(135deg, #aaaaff 0%, #aaaaff 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40rpx;
  color: white;
}
.nav-left{
 display: flex;
 align-items: center;
 justify-content: center;
 width: 60rpx;
 height: 60rpx;
 border-radius: 50%;
 background: rgba(255, 255, 255, 0.2);
 backdrop-filter: blur(10rpx);
 margin-right: 20rpx;	
}
.nav-right {
  width: 80rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-back {
  font-size: 40rpx;
  font-weight: bold;
  color: white;
}

.nav-title {
  font-size: 45rpx;
  font-weight: bold;
  color: white;
}

.nav-save {
  font-size: 28rpx;
  color: white;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 30rpx 40rpx;
  box-sizing: border-box;
  height: calc(100vh - 88rpx - 40px);
}

/* 头像区域 */
.avatar-section {
  background: white;
  border-radius: 20rpx;
  padding:10%;
  margin-bottom: 20rpx;
  text-align: center;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 20rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  background: linear-gradient(135deg, #9797e2 0%,  #aaaaff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.avatar-text {
  font-size: 60rpx;
  color: white;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40rpx;
  height: 40rpx;
  border-radius: 20rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4rpx solid white;
}

.edit-icon {
  font-size: 45rpx;
  padding-bottom: 50%;
  color: white;
}

.avatar-tip {
  font-size: 34rpx;
  color: #666;
}

/* 表单区域 */
.form-section {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #f5f5f5;
}

.form-item {
  margin-bottom: 30rpx;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-label {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.label-icon {
  font-size: 32rpx;
  margin-right: 15rpx;
}

.label-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.form-input {
  width: 100%;
  height: 80rpx;
  padding: 0 20rpx;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  font-size: 28rpx;
  color: #333;
  background: #f8f9fa;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #aaaaff;
  background: white;
}

.form-value {
  font-size: 28rpx;
  color: #666;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
}

/* 性别选择器 */
.gender-selector {
  display: flex;
  gap: 20rpx;
}

.gender-option {
  flex: 1;
  height: 80rpx;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.gender-option.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #7878b4 100%);
  color: white;
}

.gender-icon {
  font-size: 32rpx;
  margin-right: 10rpx;
}

.gender-text {
  font-size: 28rpx;
  font-weight: 500;
}

/* 用户类型选择器 */
.user-type-selector {
  display: flex;
  gap: 20rpx;
}

.user-type-option {
  flex: 1;
  height: 80rpx;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.user-type-option.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #7878b4 100%);
  color: white;
}

.user-type-icon {
  font-size: 32rpx;
  margin-right: 10rpx;
}

.user-type-text {
  font-size: 28rpx;
  font-weight: 500;
}

/* 文本域 */
.form-textarea {
  width: 100%;
  min-height: 120rpx;
  padding: 20rpx;
  border: 2rpx solid #e9ecef;
  border-radius: 12rpx;
  font-size: 28rpx;
  color: #333;
  background: #f8f9fa;
  box-sizing: border-box;
  line-height: 1.5;
}

.form-textarea:focus {
  border-color: #667eea;
  background: white;
}

.char-count {
  font-size: 22rpx;
  color: #999;
  text-align: right;
  margin-top: 10rpx;
}

/* 只读样式 */
.form-item.readonly .form-value {
  color: #999;
}

/* 保存按钮区域 */
.save-section {
  margin-top: 60rpx;
  margin-bottom: 40rpx;
  padding: 0 0 40rpx 0;
}

.save-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #667eea 0%, #7878b4 100%);
  color: white;
  border: none;
  border-radius: 44rpx;
  font-size: 32rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.save-btn:active {
  transform: translateY(2rpx);
  box-shadow: 0 4rpx 12rpx rgba(102, 126, 234, 0.3);
}

.save-btn:disabled {
  opacity: 0.6;
  background: #ccc;
  box-shadow: none;
}
</style>
