<!-- 脚本与文档 -->
<template>
  <view class="container">
    <!-- 内容滚动区域 -->
    <scroll-view class="content" scroll-y>
      <!-- 文件列表 -->
      <view class="file-list">
        <view 
          v-for="(file, index) in fileList" 
          :key="file.id"
          class="file-item"
          @tap="previewFile(file)"
        >
          <!-- 文件图标 -->
          <view class="file-icon" :style="{ backgroundColor: getIconColor(file.type) }">
            <text class="iconfont">{{ getFileIcon(file.type) }}</text>
          </view>

          <!-- 文件信息 - 增加灵活空间分配 -->
          <view class="file-info">
            <text class="file-name">{{ file.name }}</text>
          </view>

          <!-- 查看按钮 - 固定宽度避免挤压文字 -->
          <view class="view-btn-container">
            <view class="view-btn" @tap.stop="viewFile(file)">
              <text class="view-text">查看</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { openDocumentFromUrl } from '../../utils/openDoc.js'
export default {
  name: 'FileListWithNavigation',
  data() {
    return {
      // 文件列表
      fileList: [
        { 
          id: 1,
          name: '文稿 婚俗文化 陈欣语 陈敏.docx', 
          type: 'docx', 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%86%85%E5%AE%B9%E5%88%9B%E4%BD%9C%E5%B7%A5%E5%9D%8A/%E8%84%9A%E6%9C%AC%E4%B8%8E%E6%96%87%E7%A8%BF/%E6%96%87%E7%A8%BF%20%E5%A9%9A%E4%BF%97%E6%96%87%E5%8C%96%20%E9%99%88%E6%AC%A3%E8%AF%AD%20%E9%99%88%E6%95%8F.docx',
          targetPage: '/pages/issue1/issue1311'
        },
        { 
          id: 2,
          name: '文稿 家书 韦欣怡 洪美灵.docx', 
          type: 'docx', 
          targetPage: '/pages/issue1/issue1312'
        },
		{
		  id: 3,
		  name: '文稿 抗战老兵的瓷杯 黄思睿 杨仙蝶.docx', 
		  type: 'docx', 
		  targetPage: '/pages/issue1/issue1313'
		},
		{
		  id: 4,
		  name: '文稿 抗日精神 汪娅楠 潘映桦.docx', 
		  type: 'docx', 
		  targetPage: '/pages/issue1/issue1314'
		},
		{
		  id: 5,
		  name: '文稿 生活用品彰显抗日精神 宋宛桐 刘琳潇.docx', 
		  type: 'docx', 
		  targetPage: '/pages/issue1/issue1315'
		},
        { 
          id: 6,
          name: '文稿 70年代票证生活', 
          type: 'jpg', 
          targetPage: '/pages/issue1/issue1316'
        },
        { 
          id: 7,
          name: '脚本 70年代票证生活 梁恒瑞 张玉林', 
          type: 'xlsx', 
          targetPage: '/pages/issue1/issue1317'
        },
		{
		  id: 8,
		  name: '脚本 丰子恺胜利之夜 冉钰琪 马明波', 
		  type: 'xlsx', 
		  targetPage: '/pages/issue1/issue1318'
		},
		{
		  id: 9,
		  name: '脚本 人民生活变迁 徐启翔 刘琳潇', 
		  type: 'xlsx', 
		  targetPage: '/pages/issue1/issue1319'
		},
		{
		  id: 10,
		  name: '脚本 军旗的大体演变 毛荣轩 徐佳妮.xlsx', 
		  type: 'xlsx', 
		  targetPage: '/pages/issue1/issue13110'
		},
		{
		  id: 11,
		  name: '脚本 坦克 敖啸笑 马明波', 
		  type: 'docx', 
		  targetPage: '/pages/issue1/issue13111'
		},
		{
		  id: 12,
		  name: '脚本 婚俗文化 陈欣语 陈敏', 
		  type: 'xlsx', 
		  targetPage: '/pages/issue1/issue13112'
		},
		{
		  id: 13,
		  name: '脚本 家书 韦欣怡 洪美灵', 
		  type: 'xlsx', 
		  targetPage: '/pages/issue1/issue13113'
		},
		{
		  id: 14,
		  name: '脚本 抗战老兵的瓷杯 黄思睿 杨仙蝶', 
		  type: 'pdf', 
		  targetPage: '/pages/issue1/issue13114'
		},
		{
		  id: 15,
		  name: '脚本 抗日精神 汪娅楠 潘映桦', 
		  type: 'xlsx', 
		  targetPage: '/pages/issue1/issue13115'
		},
		{
		  id: 16,
		  name: '脚本 死字旗 彭诗涵 于佳琪', 
		  type: 'docx', 
		  targetPage: '/pages/issue1/issue13115'
		},
		{
		  id: 17,
		  name: '脚本 汉阳造兵工厂 茆隽鸣 杨银', 
		  type: 'xlsx', 
		  targetPage: '/pages/issue1/issue13117'
		},
		{
		  id: 18,
		  name: '脚本 生活用品彰显抗日精神 宋宛桐 刘琳潇', 
		  type: 'xlsx', 
		  targetPage: '/pages/issue1/issue13118'
		}
      ]
    }
  },
  onLoad() {
    console.log('当前页面路径:', this.$mp.page.route)
  },
  methods: {
    // 根据文件类型返回对应图标
    getFileIcon(type) {
      if (type === 'docx') return '📄';
      if (type === 'pdf') return '📄';
	  if (type === 'jpg') return '🖼';
      if (type === 'xlsx') return '📊';
      return '📁';
    },
    
    // 根据文件类型返回对应图标背景色
    getIconColor(type) {
      const colors = {
		docx: '#8dd4d4',
		pdf: '#ff90bb',
		xlsx: '#efcaef',
        default: '#e3f2fd'
      };
      return colors[type] || colors.default;
    },

    // 预览文件（点击文件项时触发）
    previewFile(file) {
      if (file.type === 'pdf') {
        uni.showToast({ 
          title: '准备预览PDF文件', 
          icon: 'none' 
        });
      } else {
        uni.showModal({
          title: '提示',
          content: '微信暂不支持直接预览该格式，建议点击查看按钮跳转查看',
          showCancel: false
        });
      }
    },

    // 查看文件（改为在线预览）
    viewFile(file) {
      if (file.url) {
        openDocumentFromUrl({ url: file.url, type: file.type })
      } else if (file.targetPage) {
        // 根据targetPage动态获取URL
        const urlMapping = this.getFileUrlByTargetPage(file.targetPage)
        if (urlMapping) {
          openDocumentFromUrl({ url: urlMapping.url, type: urlMapping.type })
        } else {
          // 如果找不到URL映射，则跳转到目标页面
          uni.navigateTo({
            url: file.targetPage,
            fail: (err) => {
              console.error('跳转失败:', err)
              uni.showToast({ title: '页面不存在', icon: 'none' })
            }
          })
        }
      } else {
        uni.showToast({ title: '暂无在线预览', icon: 'none' })
      }
    },
    
    // 根据targetPage获取文件URL映射
    getFileUrlByTargetPage(targetPage) {
      const urlMappings = {
        '/pages/issue1/issue1311': { 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%86%85%E5%AE%B9%E5%88%9B%E4%BD%9C%E5%B7%A5%E5%9D%8A/%E8%84%9A%E6%9C%AC%E4%B8%8E%E6%96%87%E7%A8%BF/%E6%96%87%E7%A8%BF%20%E5%A9%9A%E4%BF%97%E6%96%87%E5%8C%96%20%E9%99%88%E6%AC%A3%E8%AF%AD%20%E9%99%88%E6%95%8F.docx',
          type: 'docx'
        },
        '/pages/issue1/issue1312': { 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%86%85%E5%AE%B9%E5%88%9B%E4%BD%9C%E5%B7%A5%E5%9D%8A/%E8%84%9A%E6%9C%AC%E4%B8%8E%E6%96%87%E7%A8%BF/%E6%96%87%E7%A8%BF%20%E5%AE%B6%E4%B9%A6%20%E9%9F%A6%E6%AC%A3%E6%80%A1%20%E6%B4%AA%E7%BE%8E%E7%81%B5.docx',
          type: 'docx'
        },
        '/pages/issue1/issue1313': { 
          url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E5%86%85%E5%AE%B9%E5%88%9B%E4%BD%9C%E5%B7%A5%E5%9D%8A/%E8%84%9A%E6%9C%AC%E4%B8%8E%E6%96%87%E7%A8%BF/%E6%96%87%E7%A8%BF%20%E6%8A%97%E6%88%98%E8%80%81%E5%85%B5%E7%9A%84%E7%93%B7%E6%9D%AF%20%E9%BB%84%E6%80%9D%E7%9D%BF%20%E6%9D%A8%E4%BB%99%E8%9D%B6.docx',
          type: 'docx'
        }
        // 可以继续添加更多映射
      }
      return urlMappings[targetPage] || null
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 内容区域 - 适配微信小程序滚动 */
.content {
  padding: 20rpx;
  height: 100vh;
  box-sizing: border-box; /* 确保padding不影响整体高度 */
}

.file-list {
  margin: 0;
}

/* 文件项样式 - 优化弹性布局 */
.file-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 24rpx 20rpx;
  margin-bottom: 16rpx;
  border: 1px solid #e0f2fe;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box; /* 确保内容不超出容器 */
}

.file-item:active {
  background-color: #f0f9ff;
  transform: translateY(1px);
}

/* 文件图标 - 固定尺寸不挤压其他元素 */
.file-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 8rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
  flex-shrink: 0; /* 防止图标被压缩 */
}

.iconfont {
  font-size: 38rpx;
  color: #1e88e5;
}

/* 文件信息 - 优先分配空间 */
.file-info {
  flex: 1; /* 占据剩余空间 */
  overflow: hidden;
  margin-right: 20rpx; /* 与按钮保持距离 */
}

.file-name {
  font-size: 30rpx; /* 适当缩小字体，避免过长 */
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4; /* 优化行高 */
}

/* 查看按钮容器 - 固定宽度，不挤压文字 */
.view-btn-container {
  width: 120rpx; /* 固定宽度，确保按钮不压缩文字 */
  flex-shrink: 0; /* 禁止收缩 */
}

/* 查看按钮样式 */
.view-btn {
  background-color: #e0f2fe;
  color: #0284c7;
  padding: 12rpx 0; /* 水平内边距改为0，由容器控制宽度 */
  border-radius: 8rpx;
  font-size: 26rpx;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center; /* 文字居中 */
  width: 100%; /* 占满容器宽度 */
}

.view-btn:active {
  background-color: #bae6fd;
  color: #0369a1;
}
</style>
