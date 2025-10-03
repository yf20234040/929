<template>
  <view class="container" :class="{ 'care-mode': careMode }">
    <!-- 导航栏 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-left" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">历小包AI助手</text>
      <view class="nav-right"></view><!-- 留空美化布局 -->
    </view>
    
    <!-- 渐变背景装饰 -->
    <view class="bg-decoration">
      <view class="circle circle-1"></view>
      <view class="circle circle-2"></view>
      <view class="circle circle-3"></view>
    </view>
	
    <!-- 聊天界面 -->
    <view class="chat-container">
      <!-- 消息列表 -->
      <scroll-view class="message-list" scroll-y :scroll-top="scrollTop">
        <!-- 欢迎消息 -->
        <view class="message-item assistant" v-if="messages.length === 0">
          <view class="message-avatar">
            <image class="avatar-image" src="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/logo.jpg" mode="aspectFill" />
          </view>
          <view class="message-content">
            <text class="message-text">你好，有什么我能帮你的吗</text>
          </view>
        </view>
		
        <!-- 对话消息 -->
        <view class="message-item" v-for="(message, index) in messages" :key="index" :class="message.role">
          <view class="message-avatar">
            <image v-if="message.role === 'assistant'" class="avatar-image" src="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/logo.jpg" mode="aspectFill" />
            <view v-else class="avatar-text">👤</view>
          </view>
          <view class="message-content">
            <!-- 文件消息 -->
            <view v-if="message.type === 'file'" class="file-item">
              <text class="file-icon">📎</text>
              <text class="file-name">{{ message.fileName }}</text>
              <button class="file-download" @click="downloadFile(message.content)">下载</button>
            </view>
            <!-- 文本消息 -->
            <rich-text v-if="message.type !== 'image' && message.type !== 'file'" class="message-text" :nodes="formatMessage(message.content)"></rich-text>
          </view>
        </view>
        
        <!-- 等待AI输出时的加载动画 -->
        <view class="message-item assistant" v-if="isLoading">
          <view class="message-avatar">
            <image class="avatar-image" src="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/logo.jpg" mode="aspectFill" />
          </view>
          <view class="message-content">
            <view class="typing-indicator">
              <view class="typing-dot"></view>
              <view class="typing-dot"></view>
              <view class="typing-dot"></view>
            </view>
          </view>
        </view>
      </scroll-view>
     
      <!-- 输入区域 -->
      <view class="input-area">
        <view class="input-wrapper">
          <!-- 文件上传按钮 -->
          <view class="upload-buttons">
            <button class="upload-btn" @click="chooseFile" :disabled="isLoading">
              <text class="upload-icon">📎</text>
            </button>
          </view>
          
          <input 
            class="message-input" 
            v-model="inputMessage" 
            placeholder="请输入你的问题"
            :disabled="isLoading"
            @confirm="sendMessage"
          />
          <button class="send-button" @click="sendMessage" :class="{ 
            disabled: (!inputMessage.trim() && !isUploading) || isLoading,
            sendingding: isLoading 
          }">
            <text v-if="!isLoading">发送</text>
            <text v-else>发送中...</text>
          </button>
        </view>
      </view>
    </view>
    
    <!-- 全局悬浮刷新按钮 -->
    <view 
      class="global-refresh-btn" 
      @click="handleRefresh"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      :style="{ 
        left: btnX + 'px', 
        bottom: btnY + 'px' 
      }"
    >
      <image class="refresh-icon-img" src="https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E5%88%B7%E6%96%B0.png" mode="widthFix"></image>
    </view>
	
  </view>
</template>

<script>
import config from '@/utils/config.js';
import careModeMixin from '@/mixins/careMode.js';

export default {
  mixins: [careModeMixin],
  data() {
    return {
      statusBarHeight: 0,
      inputMessage: '',
      messages: [],
      isLoading: false,
      isUploading: false, // 新增：上传状态
      scrollTop: 0,
      faqList: [
        {
          question: '什么是"洞见历史"研学项目？',
          answer: '"洞见历史"是一个跨学科项目式学习项目，旨在通过历史文化的深度探索，培养学生的批判性思维和创新能力。'
        },
        {
          question: '教育4.0时代有什么特点？',
          answer: '教育4.0时代强调个性化学习、跨学科整合、技术融合和终身学习，注重培养学生的创新思维和实践能力。'
        },
        {
          question: '如何参与项目学习？',
          answer: '您可以通过小程序浏览项目内容，参与在线讨论，提交学习成果，并与团队成员协作完成项目任务。'
        },
        {
          question: '项目有哪些学习资源？',
          answer: '项目提供丰富的学习资源，包括历史文献、多媒体资料、专家讲座、实践案例等，支持多种学习方式。'
        }
      ],
      // 拖动相关状态
      btnX: 15,          
      btnY: 250, 
      startX: 0,         
      startY: 0,   
      windowWidth: 375, 
      windowHeight: 667, 
      isDragging: false 
    }
  },
  onLoad() {
    const sys = uni.getSystemInfoSync();
    this.statusBarHeight = sys.statusBarHeight || 0;
    this.loadFaqList();
    this.loadMessagesFromStorage(); // 加载本地存储的对话记录
    
    // 初始化窗口宽高和按钮位置
    this.windowWidth = sys.windowWidth;
    this.windowHeight = sys.windowHeight;
    this.btnX = 30 / 2; // 转换rpx为px
    this.btnY = 500 / 2;
  },
  onUnload() {
    // 页面卸载时保存对话记录
    this.saveMessagesToStorage();
  },
  onHide() {
    // 页面隐藏时保存对话记录
    this.saveMessagesToStorage();
  },
  methods: {
    // 从本地存储加载对话记录
    loadMessagesFromStorage() {
      try {
        const storedMessages = uni.getStorageSync('chatHistory');
        if (storedMessages) {
          this.messages = JSON.parse(storedMessages);
          this.scrollToBottom();
        }
      } catch (e) {
        console.error('加载对话记录失败:', e);
      }
    },
    
    // 保存对话记录到本地存储
    saveMessagesToStorage() {
      try {
        // 只保存必要的字段，避免存储过大
        const messagesToSave = this.messages.map(msg => ({
          role: msg.role,
          type: msg.type || 'text',
          content: msg.content,
          fileName: msg.fileName,
          timestamp: msg.timestamp
        }));
        uni.setStorageSync('chatHistory', JSON.stringify(messagesToSave));
      } catch (e) {
        console.error('保存对话记录失败:', e);
      }
    },
    
    // 格式化消息内容，处理Markdown
    formatMessage(content) {
      if (!content) return '';
      
      let formatted = content
        // 处理标题 - 移除#符号并转换为样式
        .replace(/^#{1,6}\s+(.*)$/gm, (match, title) => {
          const level = match.match(/^#+/)[0].length;
          const fontSize = Math.max(28, 40 - level * 4);
          return `<div style="font-size: ${fontSize}rpx; font-weight: bold; margin: 20rpx 0 10rpx 0; color: #333; line-height: 1.4;">${title}</div>`;
        })
        // 处理粗体
        .replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold;">$1</span>')
        // 处理斜体
        .replace(/\*(.*?)\*/g, '<span style="font-style: italic;">$1</span>')
        // 处理无序列表
        .replace(/^[\s]*[-*+]\s+(.*)$/gm, '<div style="margin: 12rpx 0; padding-left: 30rpx; position: relative; line-height: 1.8;"><span style="position: absolute; left: 0; color: #666; background: #fff;">•</span>$1</div>')
        // 处理数字列表
        .replace(/^[\s]*(\d+)\.\s+(.*)$/gm, '<div style="margin: 12rpx 0; padding-left: 30rpx; position: relative; line-height: 1.8;"><span style="position: absolute; left: 0; color: #666; background: #fff; padding-right: 4rpx;">$1.</span>$2</div>')
        // 处理换行
        .replace(/\n/g, '<br/>')
        // 清理多余的#符号
        .replace(/#{2,}/g, '')
        // 清理行首的#符号
        .replace(/^#+\s*/gm, '');
      
      return formatted;
    },
    
    // 返回逻辑
    goBack() {
      console.log('返回按钮被点击');
      // 离开页面时保存对话
      this.saveMessagesToStorage();
      
      try {
        // 先尝试返回上一页
        const pages = getCurrentPages();
        console.log('当前页面栈长度:', pages.length);
        console.log('当前页面:', pages[pages.length - 1].route);
        
        if (pages.length > 1) {
          console.log('尝试返回上一页');
          uni.navigateBack({
            delta: 1,
            animationType: 'slide-out-right',
            animationDuration: 300,
            success: () => {
              console.log('返回成功');
            },
            fail: (err) => {
              console.error('返回失败:', err);
              // 备用方案：跳转到首页
              uni.switchTab({
                url: '/pages/index/index'
              });
            }
          });
        } else {
          console.log('没有上一页，跳转到首页');
          // 如果没有上一页，跳转到首页
          uni.switchTab({
            url: '/pages/index/index',
            success: () => {
              console.log('跳转首页成功');
            },
            fail: (err) => {
              console.error('跳转首页失败:', err);
            }
          });
        }
      } catch (error) {
        console.error('返回失败:', error);
        // 备用方案：跳转到首页
        uni.switchTab({
          url: '/pages/index/index'
        });
      }
    },
    
    
    // 发送消息
    async sendMessage() {
      if ((!this.inputMessage.trim() && !this.isUploading) || this.isLoading) return;
      
      const userMessage = this.inputMessage.trim();
      this.inputMessage = '';
      
      // 添加用户消息
      this.messages.push({
        role: 'user',
        type: 'text',
        content: userMessage,
        timestamp: new Date().toISOString()
      });
      
      this.scrollToBottom();
      this.isLoading = true;
      
      try {
        // 构建对话历史
        const conversationHistory = this.messages
          .filter(msg => msg.role !== 'system')
          .map(msg => ({
            role: msg.role,
            content: msg.content
          }));
        
        // 调用AI API
        const response = await uni.request({
          url: `https://llzmlxb.xyz/api/ai/ask`,
          method: 'POST',
          data: {
            question: userMessage,
            conversationHistory: conversationHistory
          },
          timeout: 30000
        });
        
        if (response.data && response.data.success) {
          // 添加AI回复
          this.messages.push({
            role: 'assistant',
            type: 'text',
            content: response.data.data.answer,
            timestamp: new Date().toISOString()
          });
        } else {
          throw new Error(response.data?.error || 'AI服务暂时不可用');
        }
        
      } catch (error) {
        console.error('AI问答失败:', error);
        this.messages.push({
          role: 'assistant',
          type: 'text',
          content: '抱歉，AI服务暂时不可用，请稍后再试。',
          timestamp: new Date().toISOString()
        });
      } finally {
        this.isLoading = false;
        this.scrollToBottom();
        // 保存对话记录
        this.saveMessagesToStorage();
      }
    },
    
    // 选择文件
    chooseFile() {
      if (this.isLoading || this.isUploading) return;
      
      uni.chooseMessageFile({
        count: 1,
        type: 'file',
        success: async (res) => {
          this.isUploading = true;
          try {
            // 添加文件消息
            this.messages.push({
              role: 'user',
              type: 'file',
              content: res.tempFiles[0].path,
              fileName: res.tempFiles[0].name,
              fileSize: res.tempFiles[0].size,
              timestamp: new Date().toISOString()
            });
            
            this.scrollToBottom();
            // 保存对话记录
            this.saveMessagesToStorage();
            
            // 模拟AI回复
            setTimeout(() => {
              this.messages.push({
                role: 'assistant',
                type: 'text',
                content: `我已收到你发送的文件《${res.tempFiles[0].name}》，需要我帮你解析文件内容吗？`,
                timestamp: new Date().toISOString()
              });
              this.scrollToBottom();
              // 保存对话记录
              this.saveMessagesToStorage();
            }, 1000);
          } catch (error) {
            console.error('文件上传失败:', error);
            uni.showToast({
              title: '文件上传失败',
              icon: 'none'
            });
          } finally {
            this.isUploading = false;
          }
        }
      });
    },
    
    // 下载文件
    downloadFile(filePath) {
      uni.saveFile({
        tempFilePath: filePath,
        success: function (res) {
          const savedFilePath = res.savedFilePath;
          uni.showToast({
            title: '文件已保存: ' + savedFilePath,
            icon: 'none'
          });
        }
      });
    },
    
    // 点击常见问题
    askQuestion(question) {
      this.inputMessage = question;
      this.sendMessage();
    },
    
    // 加载常见问题列表
    async loadFaqList() {
      try {
        const response = await uni.request({
          url: `http://8.137.115.16:3000/api/ai/faq`,
          method: 'GET'
        });
        
        if (response.data && response.data.success) {
          this.faqList = response.data.data;
        }
      } catch (error) {
        console.error('加载常见问题失败:', error);
      }
    },
    
    // 滚动到底部
    scrollToBottom() {
      this.$nextTick(() => {
        this.scrollTop = 99999;
      });
    },
    
    // 格式化时间
    formatTime(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      
      if (diff < 60000) { // 1分钟内
        return '刚刚';
      } else if (diff < 3600000) { // 1小时内
        return Math.floor(diff / 60000) + '分钟前';
      } else if (diff < 86400000) { // 1天内
        return Math.floor(diff / 3600000) + '小时前';
      } else {
        return date.toLocaleDateString();
      }
    },
    
    // 全局刷新按钮逻辑
    async handleRefresh() {
     // 如果处于拖动状态，不执行刷新（避免误触）
       if (this.isDragging) return;
     
       try {
         // 1. 清空现有对话
         this.messages = [];
         // 2. 重新加载FAQ列表
         await this.loadFaqList();
         // 3. 滚动到底部
         this.scrollToBottom();
         // 4. 清除本地存储
         uni.removeStorageSync('chatHistory');
       } catch (error) {
         console.error('刷新失败:', error);
         // 仅在出错时显示提示，成功时不显示
         uni.showToast({
           title: '刷新失败，请重试',
           icon: 'none',
           duration: 1500
         });
       }
    },
    
    // 触摸开始：记录初始位置
    handleTouchStart(e) {
      const touch = e.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
      this.isDragging = false;
    },
    
    // 触摸移动：更新按钮位置
    handleTouchMove(e) {
      const touch = e.touches[0];
      const currentX = touch.clientX;
      const currentY = touch.clientY;

      // 计算偏移量
      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      // 判断是否触发拖动（偏移量超过5px视为拖动）
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        this.isDragging = true;

        // 计算新位置
        let newBtnX = this.btnX + deltaX;
        let newBtnY = this.btnY - deltaY; // Y轴反向

        // 按钮尺寸（rpx转换为px）
        const btnWidth = this.careMode ? 110 / 2 : 80 / 2;
        const btnHeight = this.careMode ? 110 / 2 : 80 / 2;
        
        // 限制边界
        newBtnX = Math.max(10, Math.min(newBtnX, this.windowWidth - btnWidth - 10));
        newBtnY = Math.max(10, Math.min(newBtnY, this.windowHeight - btnHeight - 10));

        // 更新位置
        this.btnX = newBtnX;
        this.btnY = newBtnY;

        // 更新起始位置
        this.startX = currentX;
        this.startY = currentY;
      }
    },
    
    // 触摸结束：添加边缘吸附效果
    handleTouchEnd() {
      // 边缘吸附效果
      const halfWidth = this.windowWidth / 2;
      const btnWidth = this.careMode ? 110 / 2 : 80 / 2;
      
      if (this.btnX > halfWidth) {
        // 吸附到右侧
        this.btnX = this.windowWidth - btnWidth - 10;
      } else {
        // 吸附到左侧
        this.btnX = 10;
      }
    }
  }
};
</script>

<style scoped>
/* 基础容器 */
.container {
  min-height: 100vh;
  background: #fff;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 导航栏 */
.nav-bar {
  position: fixed; /* 固定定位 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 999; /* 确保在最上层 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background: linear-gradient(90deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
  min-height: 120rpx;
  box-sizing: border-box;
}

.nav-left, .nav-right {
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



.back-icon {
  font-size: 36rpx;
  color: #ffffff;
  font-weight: bold;
  padding: 20rpx;
  border-radius: 8rpx;
  transition: background-color 0.2s ease;
  display: block;
  text-align: center;
  line-height: 1;
}

.nav-left:active .back-icon {
  background-color: rgba(0, 0, 0, 0.1);
}

.nav-title {
  font-size: 45rpx;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  flex: 1;
  line-height: 1.2;
  padding: 0 20rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-icon {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
}

.circle {
  position: fixed; /* 固定定位 */
  border-radius: 50%;
  background: rgba(17, 68, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200rpx;
  height: 200rpx;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 350rpx;
  height: 350rpx;
  top: 40%;
  right: 5%;
  animation-delay: 2s;
}

.circle-3 {
  width: 100rpx;
  height: 100rpx;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}


/* 聊天容器 */
.chat-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
  /* 导航栏高度约120rpx + 状态栏高度） */
    padding-top: calc(var(--status-bar-height, 0rpx) + 120rpx);
/*高度为全屏减去导航栏，确保底部与输入框衔接 */
    height: 100vh;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 4rpx 12rpx rgba(255, 107, 139, 0.3);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 6rpx 16rpx rgba(255, 107, 139, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 4rpx 12rpx rgba(255, 107, 139, 0.3);
  }
}


/* 消息列表 */
.message-list {
  flex: 1;
  padding: 20rpx 20rpx 150rpx; 
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* 消息项 */
.message-item {
  display: flex;
  gap: 20rpx;
  align-items: flex-start;
  margin-bottom: 40rpx;
  animation: slideIn 0.3s ease-out;
  width: 100%;
  box-sizing: border-box;
}

.message-item.user {
  flex-direction: row-reverse;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 头像 背景*/
.message-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.message-item.user .message-avatar {
  background: #ffffff;
}

.message-item.assistant .message-avatar {
  background: #ffaaff;
}
/* 渐变用户头像 */
.avatar-text {
    font-size: 45rpx;
    font-weight: bold;
    background: linear-gradient(135deg, #aaaaff, #fecfef);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    /* 兼容微信小程序 */
    display: inline-block;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

/* 图片消息样式 */
.message-image {
  max-width: 100%;
  border-radius: 16rpx;
  margin: 8rpx 0;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

/* 文件消息样式 */
.file-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 12rpx;
  width: 100%;
  box-sizing: border-box;
}

.file-icon {
  font-size: 36rpx;
  color: #666;
}

.file-name {
  flex: 1;
  font-size: 26rpx;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-download {
  padding: 8rpx 16rpx;
  background: linear-gradient(135deg, #ff6b8b, #ff8e8e);
  color: white;
  border-radius: 8rpx;
  font-size: 24rpx;
  border: none;
  height: auto;
  line-height: 1;
}

.file-download::after {
  border: none;
}

/* AI消息内容 */
.message-item.assistant .message-content {
  background: #f0f8ff;
  color: #333;
  border-bottom-left-radius: 6rpx;
}
.message-content {
  max-width: calc(100% - 240rpx);
  padding: 20rpx 24rpx;
  border-radius: 20rpx;
  position: relative;
  line-height: 1.6;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  opacity: 0.8;
}
/* 用户消息内容 */
.message-item.user .message-content {
    background:#ffd8ff;
    color: #333; /* 文本颜色 */
    border-bottom-right-radius: 6rpx; /* 右下角圆角 */
    max-width: calc(100% - 240rpx); /* 最大宽度（默认与AI消息一致） */
    padding: 20rpx 24rpx; /* 内边距 */
    line-height: 1.6; /* 行高 */
	opacity: 0.8;
}

/* 整体文字文本 */
.message-text {
  font-size: 28rpx;
  line-height: 1.6;
  display: block;
  width: 100%;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}

/* rich-text样式 */
.message-text h1,
.message-text h2,
.message-text h3,
.message-text h4,
.message-text h5,
.message-text h6 {
  margin: 0;
  padding: 0;
  font-weight: bold;
  line-height: 1.4;
}

.message-text strong {
  font-weight: bold;
}

.message-text em {
  font-style: italic;
}

.message-text div {
  margin: 8rpx 0;
  line-height: 1.6;
}

.message-text span {
  display: inline;
}

/* 输入区域 */
.input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.input-wrapper {
  display: flex;
  gap: 16rpx;
  align-items: center;
  background: #f5f5f5;
  border-radius: 25rpx;
  padding: 8rpx;
}

/* 上传按钮样式 */
.upload-buttons {
  display: flex;
  gap: 8rpx;
  padding-left: 8rpx;
}

.upload-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.upload-btn::after {
  border: none;
}

.upload-icon {
  font-size: 32rpx;
  color: #666;
}

.upload-btn:disabled {
  opacity: 0.5;
}

.message-input {
  flex: 1;
  height: 80rpx;
  background: transparent;
  border: none;
  padding: 0 24rpx;
  font-size: 28rpx;
  color: #333;
}

.message-input:focus {
  outline: none;
}

.send-button {
  height: 80rpx;
  padding: 0 24rpx;
  background: linear-gradient(135deg, #ff6b8b, #ff8e8e);
  color: #fff;
  border-radius: 20rpx;
  font-size: 28rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 139, 0.3);
  font-weight: 500;
}

.send-button::after {
  border: none;
}

/* 正常状态 - 有内容且未发送 */
.send-button:not(.disabled):not(.sending) {
  background: linear-gradient(90deg, #a8edea 0%, #fed6e3 100%);
  box-shadow: 0 4rpx 12rpx rgba(227, 222, 255, 0.3);
  opacity: 1;
}

/* 发送中状态 */
.send-button.sending {
  background: linear-gradient(90deg, #a8edea 0%, #fed6e3 100%);
  box-shadow: 0 4rpx 12rpx rgba(255, 167, 38, 0.3);
  opacity: 0.8;
  animation: pulse 1.5s ease-in-out infinite;
}

/* 禁用状态 - 无内容或发送中 */
.send-button.disabled {
  background: #e0e0e0;
  color: #999;
  box-shadow: none;
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button:active:not(.disabled) {
  transform: scale(0.95);
}

/* 发送中动画 */
@keyframes pulse {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
  opacity: 0.8;
    transform: scale(1);
  }
}

/* 打字指示器 */
.typing-indicator {
  display: flex;
  gap: 8rpx;
  align-items: center;
}

.typing-dot {
  width: 12rpx;
  height: 12rpx;
  background: #999;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% { 
    transform: scale(0.8); 
    opacity: 0.5; 
  }
  40% { 
    transform: scale(1); 
    opacity: 1; 
  }
}

/* 响应式调整 */
@media (max-width: 375px) {
  .chat-container {
    padding: 15rpx;
  }
  
  .message-list {
    padding: 30rpx 15rpx;
  }
  
  .input-area {
    padding: 15rpx;
  }
}

/* 关怀模式下的AI标识 */
.container.care-mode .ai-label-text {
  font-size: 34rpx;
}

.container.care-mode .ai-label {
  padding: 16rpx 32rpx;
  margin: 24rpx 30rpx;
}

/* 全局悬浮刷新按钮 */
.global-refresh-btn {
  position: fixed;
  z-index: 9999;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: linear-gradient(90deg, #a8edea 0%, #fed6e3 100%);
  opacity: 0.8;
  box-shadow: 0 6rpx 16rpx rgba(113, 113, 113, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  touch-action: none; /* 优化拖动体验 */
}

.global-refresh-btn .refresh-icon-img {
  width: 60rpx;
  height: 60rpx;
  object-fit: contain;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  filter: drop-shadow(0 0 0 #ffffff);
}

.global-refresh-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 8rpx 20rpx rgba(255, 167, 190, 0.6);
}

.global-refresh-btn:hover .refresh-icon-img {
  opacity: 1;
}

.global-refresh-btn:active {
  transform: scale(0.95);
  box-shadow: 0 4rpx 12rpx rgba(255, 167, 190, 0.3);
}
</style>
