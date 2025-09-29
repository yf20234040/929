<template>
	<view class="content" :class="{ 'care-mode': careMode }">
		<!-- 装饰元素 -->
		<view class="decor-element decor-1"></view>
		<view class="decor-element decor-2"></view>
		<view class="decor-element decor-3"></view>
		
		<image class="logo" src="/static/logo.jpg"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
    <!-- 多巴胺风格加载长条 -->
    <view class="progress-bar">
      <view class="progress-fill" :style="{ 
        width: progressWidth,
        background: currentGradient 
      }"></view>
    </view>
	</view>
</template>

<script>
	import careModeMixin from '@/mixins/careMode.js'
	
	export default {
		mixins: [careModeMixin],
		data() {
			return {
				title: '你好',
        progressWidth: '0%', // 加载长条初始宽度为0
        // 多巴胺色彩方案
        gradients: [
          'linear-gradient(90deg, #FF3366, #FF6699)',
          'linear-gradient(90deg, #3366FF, #66CCFF)',
          'linear-gradient(90deg, #FFCC00, #FFDD55)',
          'linear-gradient(90deg, #66CC99, #99EEBB)',
          'linear-gradient(90deg, #9966FF, #BB88FF)'
        ],
        currentGradientIndex: 0,
        currentGradient: 'linear-gradient(90deg, #FF3366, #FF6699)'
			}
		},
		onLoad() {
      // 启动进度条动画
      this.startProgressAnimation();
      
      // 启动色彩切换动画
      this.startColorAnimation();

      // 添加3秒定时器，跳转到首页体验功能
      setTimeout(() => {
        uni.redirectTo({
          url: '/pages/index/index'
        })
      }, 3000)
		},
		methods: {
      startProgressAnimation() {
        let width = 0;
        const interval = setInterval(() => {
          width += 1; // 每30ms增加1%
          this.progressWidth = `${width}%`;

          if (width >= 100) {
            clearInterval(interval);
          }
        }, 30); // 3000ms / 100 = 30ms
      },
      
      startColorAnimation() {
        // 每0.5秒切换一次进度条颜色
        setInterval(() => {
          this.currentGradientIndex = (this.currentGradientIndex + 1) % this.gradients.length;
          this.currentGradient = this.gradients[this.currentGradientIndex];
        }, 500);
      }
		}
	}
</script>

<style>
/* 多巴胺风格装饰元素 */
.decor-element {
  position: absolute;
  border-radius: 50%;
  filter: blur(80rpx);
  z-index: 0;
}

.decor-1 {
  width: 500rpx;
  height: 500rpx;
  background: rgba(255, 51, 102, 0.2);
  top: 15%;
  left: -150rpx;
}

.decor-2 {
  width: 400rpx;
  height: 400rpx;
  background: rgba(51, 102, 255, 0.2);
  bottom: 25%;
  right: -100rpx;
}

.decor-3 {
  width: 300rpx;
  height: 300rpx;
  background: rgba(255, 204, 0, 0.2);
  top: 65%;
  left: 30%;
}

/* 进度条样式 */
.progress-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8rpx;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 1000;
  box-shadow: 0 -1rpx 5rpx rgba(0, 0, 0, 0.05);
}

.progress-fill {
  height: 100%;
  transition: width 0.03s linear; /* 平滑过渡效果 */
  box-shadow: 0 0 15rpx currentColor;
}

/* 内容样式 */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  padding: 0 40rpx; /* 添加左右内边距，防止内容超出屏幕 */
}

.logo {
  /* 调整图片大小，使其更适合各种屏幕 */
  width: 80vw;
  max-width: 500rpx;
  height: auto; /* 保持宽高比 */
  margin: 0 auto 80rpx; /* 居中并增加底部间距 */
  z-index: 10;
  /* 增强发光效果 */
  filter: drop-shadow(0 0 25rpx rgba(255, 51, 102, 0.25));
  transition: transform 3s ease;
  animation: pulse 3s infinite;
}

/* 呼吸动画 */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.text-area {
  display: flex;
  justify-content: center;
  z-index: 10;
  margin-bottom: 120rpx; /* 增加与底部的距离 */
}

.title {
  font-size: 48rpx;
  font-weight: 700;
  background: linear-gradient(90deg, #FF3366, #3366FF, #FFCC00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% auto;
  animation: gradientShift 5s ease infinite;
  text-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
