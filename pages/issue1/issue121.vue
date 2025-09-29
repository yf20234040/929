<!-- 成果展示橱窗-汇报会进展 -->
<template>
  <view class="container">
    <!-- 顶部标签栏 -->
    <view class="tabs">
      <view 
        class="tab-item" 
        :class="{ active: currentTab === 0 }"
        @tap="switchTab(0)"
      >
        <text class="tab-text">媒体记录</text>
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentTab === 1 }"
        @tap="switchTab(1)"
      >
        <text class="tab-text">文件列表</text>
      </view>
    </view>
    
    <!-- 内容区域 -->
    <view class="content">
      <!-- 媒体画廊区域 - 自定义组标题和媒体项 -->
      <view v-if="currentTab === 0" class="media-content">
        <scroll-view class="media-scroll" scroll-y>
          <!-- 循环渲染自定义组 -->
          <view v-for="(group, groupIndex) in customMediaGroups" :key="groupIndex" class="media-group">
            <!-- 自定义组标题 -->
            <view class="group-title">
              <text>{{ group.title }}</text>
              <!-- 可选的组描述 -->
              <text class="group-desc" v-if="group.description">{{ group.description }}</text>
            </view>
            
            <!-- 媒体项网格 -->
            <view class="thumbnail-grid">
              <view 
                class="media-item" 
                v-for="(item, index) in group.mediaItems" 
                :key="index"
                @tap="enterDetailMode(groupIndex, index)"
                @longpress="showActionSheet(groupIndex, index)"
              >
                <!-- 图片缩略图 -->
                <image 
                  v-if="item.type === 'image'"
                  :src="item.url" 
                  class="media-thumbnail"
                  mode="aspectFill"
                  @error="handleImageError(item)"
                ></image>
                
                <!-- 视频缩略图 -->
                <view v-if="item.type === 'video'" class="video-thumbnail-container">
                  <image 
                    :src="item.coverUrl || getDefaultVideoCover()" 
                    class="media-thumbnail"
                    mode="aspectFill"
                  ></image>
                  <view class="video-play-icon">
                    <view class="play-triangle"></view>
                  </view>
                </view>
                
                <!-- 媒体类型标记 -->
                <view class="media-type-tag" :class="item.type">
                  {{ item.type === 'image' ? '图片' : '视频' }}
                </view>
                
                <!-- 自定义媒体标题（可选） -->
                <view class="media-title" v-if="item.title">
                  <text>{{ item.title }}</text>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        
        <!-- 详情浏览模式 -->
        <view class="detail-view" v-if="isDetailMode">
          <!-- 图片详情 -->
          <view v-if="currentMedia.type === 'image'" class="image-detail">
            <image 
              :src="currentMedia.url" 
              class="detail-image"
              mode="widthFix"
              @longpress="showActionSheet(currentGroupIndex, currentItemIndex)"
              @tap="exitDetailMode"
            ></image>
            <!-- 显示图片标题 -->
            <view class="detail-title" v-if="currentMedia.title">
              <text>{{ currentMedia.title }}</text>
            </view>
          </view>
          
          <!-- 视频详情 -->
          <view v-if="currentMedia.type === 'video'" class="video-detail">
            <video
              :src="currentMedia.url"
              class="detail-video"
              :controls="true"
              :autoplay="true"
              @longpress="showActionSheet(currentGroupIndex, currentItemIndex)"
              @tap="toggleVideoControls"
            ></video>
            <view class="video-tip" v-if="!showVideoControls">点击显示控制栏</view>
            <!-- 显示视频标题 -->
            <view class="detail-title" v-if="currentMedia.title">
              <text>{{ currentMedia.title }}</text>
            </view>
          </view>
          
          <!-- 左右切换指示器 -->
          <view class="nav-indicator left" @tap="prevMedia" v-if="hasPrevMedia">
            <view class="arrow"></view>
          </view>
          <view class="nav-indicator right" @tap="nextMedia" v-if="hasNextMedia">
            <view class="arrow"></view>
          </view>
          
          <!-- 页码指示器 -->
          <view class="page-indicator">
            <text>{{ currentPosition }} / {{ totalMediaCount }}</text>
          </view>
          
          <!-- 返回按钮 -->
          <view class="back-btn" @tap="exitDetailMode">
            <image 
              src="/static/最小化.png" 
              mode="widthFix" 
              class="back-img"
              alt="返回按钮"
            ></image>
          </view>
        </view>
      </view>
      
      <!-- 文件列表区域 -->
      <view v-if="currentTab === 1" class="file-content">
        <scroll-view class="file-scroll" scroll-y>
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

              <!-- 文件信息 -->
              <view class="file-info">
                <text class="file-name">{{ file.name }}</text>
              </view>

              <!-- 查看按钮 -->
              <view class="view-btn-container">
                <view class="view-btn" @tap.stop="viewFile(file)">
                  <text class="view-text">查看</text>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import { openDocumentFromUrl } from '../../utils/openDoc.js'
export default {
  data() {
    return {
      // 标签页控制
      currentTab: 0,
      
      // 自定义媒体组 - 可自由配置每组标题和媒体项
      customMediaGroups: [
        {
          title: "汇报会现场照片",
          description: "",
          mediaItems: [
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_20231028_225607.jpg",
			  type: "image",
			  title: "汇报会开幕"
			},
            { 
			  url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0315%E8%A3%81%E5%89%AA.JPG',
              type: "image",
              title: "观众席"
            },
            { 
			  url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0317.JPG',
              type: "image",
              title: "观众席"
            },
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0403.JPG",
			  type: "image",
			  title: "观众席"
			},
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0416.JPG",
			  type: "image",
			  title: "观众席"
			},
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0416.JPG",
			  type: "image",
			  title: "观众席"
			},
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0428.JPG",
			  type: "image",
			  title: "观众席"
			},
			{
				url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0430.JPG",
			  type: "image",
			  title: "观众席"
			},
            
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0549.JPG", 
			  type: "image",
			  title: "优秀学生"
			},
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0560.png", 
			  type: "image",
			  title: "优秀学生"
			},
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0552.JPG",
			  type: "image",
			  title: "优秀学生"
			},
			{
			  url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0326.JPG',
			  type: "image",
			  title: "学生代表"
			},
			{
			  url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0328.JPG', 
			  type: "image",
			  title: "学生代表"
			},
			{
				url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0566.png",
			  type: "image",
			  title: "学生代表"
			},
			{
				url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0554.JPG",
			  type: "image",
			  title: "学生代表"
			},
			{
				url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0452.JPG",
			  type: "image",
			  title: "教师代表"
			},
			{
				url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0482.JPG",
			  type: "image",
			  title: "教师代表"
			},
			{
				url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0452.JPG",
			  type: "image",
			  title: "教师代表"
			},
			{
				url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0505.JPG",
			  type: "image",
			  title: "教师代表"
			},
			{
				url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0528.JPG",
			  type: "image",
			  title: "教师代表"
			},
			{
				url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0600%20%E6%AD%A3.JPG",
			  type: "image",
			  title: "教师代表"
			},
          ]
        },
        {
          title: "教育项目介绍",
          description: "教育4.0时代相关材料",
          mediaItems: [
            { 
              url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0346.JPG", 
              type: "image",
              title: "项目缘起"
            },
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0353.png", 
			  type: "image",
			  title: "教育发展阶段对比"
			},
			{
				url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0442.JPG",
			  type: "image",
			  title: "教育4.0时代解读"
			}
          ]
        },
        {
          title: "项目海报",
          mediaItems: [
            { 
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/%E6%B5%B7%E6%8A%A5.png",
              type: "image",
              title: "海报.png"
            }
          ]
        },
        {
          title: "活动视频记录",
          mediaItems: [
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/%E6%B1%87%E6%8A%A5%E4%BC%9A%E5%BC%80%E5%9C%BA.MP4",
			  type: "video",
			  title: "汇报会开场.MP4",
			  coverurl: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0403.JPG"
			},
            { 
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/%E6%88%90%E6%9E%9C%E8%A7%86%E9%A2%91%E5%90%88%E9%9B%86%E7%8E%B0%E5%9C%BA%E6%92%AD%E6%94%BE.MP4",
              type: "video",
              title: "成果视频合集",
			  coverurl: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0442.JPG"
            },
			{
			  url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/%E6%9D%A5%E5%AE%BE%E8%A7%82%E4%BC%97%E8%A7%82%E7%9C%8B%E9%A1%B9%E7%9B%AE%E6%88%90%E6%9E%9C%E8%A7%86%E9%A2%91.MP4",
			  type: "video",
			  title: "来宾观众观阅项目成果",
			  coverurl: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/IMG_0416.JPG"
			},
            { 
              url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/%E7%8E%8B%E4%B8%BD%E8%90%8D%E4%B9%A6%E8%AE%B0%E5%8F%91%E8%A8%80.MP4", 
              type: "video",
              title: "王丽萍书记发言",
			  coverurl: ""
            }
          ]
        }
      ],
      
      // 媒体浏览状态管理
      isDetailMode: false,
      currentGroupIndex: 0,
      currentItemIndex: 0,
      showVideoControls: true,
      
      // 文件列表
      fileList: [
        { 
          id: 1,
          name: '“洞见历史”项目制学习汇报会议程', 
          type: 'pdf', 
          targetPage: '/pages/issue1/issue1561'
        },
        { 
          id: 2,
          name: '汇报会10.28分工名单', 
          type: 'xlsx', 
          targetPage: '/pages/issue1/issue1562'
        },
        { 
          id: 3,
          name: '路线指示牌', 
          type: 'docx', 
          targetPage: '/pages/issue1/issue1563'
        }
      ]
    };
  },
  
  computed: {
    // 当前显示的媒体
    currentMedia() {
      const group = this.customMediaGroups[this.currentGroupIndex];
      return group ? group.mediaItems[this.currentItemIndex] : {};
    },
    
    // 计算总媒体数量
    totalMediaCount() {
      return this.customMediaGroups.reduce((total, group) => {
        return total + group.mediaItems.length;
      }, 0);
    },
    
    // 计算当前位置
    currentPosition() {
      let position = 0;
      // 累加前面组的媒体数量
      for (let i = 0; i < this.currentGroupIndex; i++) {
        position += this.customMediaGroups[i].mediaItems.length;
      }
      // 加上当前组内的位置
      return position + this.currentItemIndex + 1;
    },
    
    // 是否有上一个媒体
    hasPrevMedia() {
      return this.currentPosition > 1;
    },
    
    // 是否有下一个媒体
    hasNextMedia() {
      return this.currentPosition < this.totalMediaCount;
    }
  },
  
  methods: {
    // 切换标签页
    switchTab(index) {
      this.currentTab = index;
    },
    
    // 进入详情模式
    enterDetailMode(groupIndex, itemIndex) {
      this.currentGroupIndex = groupIndex;
      this.currentItemIndex = itemIndex;
      this.isDetailMode = true;
      uni.hideNavigationBarLoading();
    },
    
    // 退出详情模式
    exitDetailMode() {
      this.isDetailMode = false;
      uni.showNavigationBarLoading();
    },
    
    // 获取默认视频封面
    getDefaultVideoCover() {
      // 使用第一张图片作为默认视频封面
      return this.customMediaGroups[0]?.mediaItems[0]?.url;
    },
    
    // 上一个媒体
    prevMedia() {
      if (this.currentItemIndex > 0) {
        // 当前组内还有上一个
        this.currentItemIndex--;
      } else if (this.currentGroupIndex > 0) {
        // 切换到上一组的最后一个
        this.currentGroupIndex--;
        const prevGroup = this.customMediaGroups[this.currentGroupIndex];
        this.currentItemIndex = prevGroup.mediaItems.length - 1;
      }
      this.resetVideoState();
    },
    
    // 下一个媒体
    nextMedia() {
      const currentGroup = this.customMediaGroups[this.currentGroupIndex];
      if (this.currentItemIndex < currentGroup.mediaItems.length - 1) {
        // 当前组内还有下一个
        this.currentItemIndex++;
      } else if (this.currentGroupIndex < this.customMediaGroups.length - 1) {
        // 切换到下一组的第一个
        this.currentGroupIndex++;
        this.currentItemIndex = 0;
      }
      this.resetVideoState();
    },
    
    // 重置视频状态
    resetVideoState() {
      if (this.currentMedia.type === 'video') {
        this.showVideoControls = true;
      }
    },
    
    // 切换视频控制栏显示
    toggleVideoControls() {
      this.showVideoControls = !this.showVideoControls;
    },
    
    // 图片加载错误处理
    handleImageError(item) {
      console.log('图片加载失败:', item.url);
      // 可以设置备用图片
      // item.url = '/static/default-image.png';
    },
    
    // 显示操作菜单
    showActionSheet(groupIndex, itemIndex) {
      const item = this.customMediaGroups[groupIndex].mediaItems[itemIndex];
      const itemList = ['保存到相册'];
      
      if (item.type === 'video') {
        itemList.push('发送给朋友');
      }
      
      uni.showActionSheet({
        itemList: itemList,
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              this.downloadMedia(item);
              break;
            case 1:
              this.shareMedia(item);
              break;
          }
        },
        fail: (res) => {
          console.log(res.errMsg);
        }
      });
    },
    
    // 下载媒体
    downloadMedia(item) {
      uni.showLoading({
        title: item.type === 'image' ? '图片保存中...' : '视频保存中...',
        mask: true
      });
      
      uni.downloadFile({
        url: item.url,
        success: (res) => {
          if (res.statusCode === 200) {
            if (item.type === 'image') {
              this.saveImageToPhotosAlbum(res.tempFilePath);
            } else {
              this.saveVideoToPhotosAlbum(res.tempFilePath);
            }
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '下载失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('下载失败:', err);
          uni.showToast({
            title: '下载失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 保存图片到相册
    saveImageToPhotosAlbum(filePath) {
      uni.saveImageToPhotosAlbum({
        filePath: filePath,
        success: () => {
          uni.hideLoading();
          uni.showToast({
            title: '图片已保存',
            icon: 'success'
          });
        },
        fail: (err) => {
          this.handleSaveError(err);
        }
      });
    },
    
    // 保存视频到相册
    saveVideoToPhotosAlbum(filePath) {
      uni.saveVideoToPhotosAlbum({
        filePath: filePath,
        success: () => {
          uni.hideLoading();
          uni.showToast({
            title: '视频已保存',
            icon: 'success'
          });
        },
        fail: (err) => {
          this.handleSaveError(err);
        }
      });
    },
    
    // 处理保存失败
    handleSaveError(err) {
      uni.hideLoading();
      console.error('保存失败:', err);
      
      if (err.errMsg.includes('auth deny') || err.errMsg.includes('permission denied')) {
        uni.showModal({
          title: '权限不足',
          content: '请在设置中开启保存到相册的权限',
          confirmText: '去设置',
          success: (res) => {
            if (res.confirm) {
              uni.openSetting();
            }
          }
        });
      } else {
        uni.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    },
    
    // 分享媒体
    shareMedia(item) {
      uni.showToast({
        title: '分享功能已触发',
        icon: 'success'
      });
    },
    
    // 文件列表方法
    getFileIcon(type) {
      if (type === 'docx') return '📄';
      if (type === 'pdf') return '📄';
      if (type === 'xlsx') return '📄';
      return '📁';
    },
    
    getIconColor(type) {
      const colors = {
        docx: '#8dd4d4',
        pdf: '#ff90bb',
        xlsx: '#ffff7f',
        default: '#e3f2fd'
      };
      return colors[type] || colors.default;
    },

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

    viewFile(file) {
      // 优先处理在线预览
      if (file.url) {
        openDocumentFromUrl({ url: file.url, type: file.type })
        return
      }
      
      // 处理targetPage映射到在线预览
      if (file.targetPage) {
        const mapping = {
          '/pages/issue1/issue1561': { 
            url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/%E2%80%9C%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E2%80%9D%E9%A1%B9%E7%9B%AE%E5%88%B6%E5%AD%A6%E4%B9%A0%E6%B1%87%E6%8A%A5%E4%BC%9A%E8%AE%AE%E7%A8%8B.pdf', 
            type: 'pdf' 
          },
          '/pages/issue1/issue1562': { 
            url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/%E6%B1%87%E6%8A%A5%E4%BC%9A10.28%E5%88%86%E5%B7%A5%E5%90%8D%E5%8D%95.xlsx', 
            type: 'xlsx' 
          },
          '/pages/issue1/issue1563': { 
            url: 'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%80%E6%9C%9F/%E6%B4%BB%E5%8A%A8%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E6%B1%87%E6%8A%A5%E4%BC%9A/%E8%B7%AF%E7%BA%BF%E6%8C%87%E7%A4%BA%E7%89%8C.docx', 
            type: 'docx' 
          }
        }
        const target = mapping[file.targetPage]
        if (target && target.url) {
          openDocumentFromUrl(target)
          return
        }
        
        // 如果映射中没有找到，尝试跳转到页面
        uni.navigateTo({
          url: file.targetPage,
          fail: (err) => {
            console.error('跳转失败:', err)
            uni.showToast({ title: '页面不存在', icon: 'none' })
          }
        })
        return
      }
      
      // 如果既没有url也没有targetPage
      uni.showToast({ title: '暂无在线预览，请稍后', icon: 'none' })
    }
  },
  
  onShareAppMessage() {
    if (this.currentTab === 0) {
      return {
        title: this.currentMedia.title || (this.currentMedia.type === 'image' ? '分享图片' : '分享视频'),
        path: '/pages/media-gallery/media-gallery',
        imageUrl: this.currentMedia.type === 'image' 
          ? this.currentMedia.url 
          : (this.currentMedia.coverUrl || this.getDefaultVideoCover())
      };
    } else {
      return {
        title: '分享文件列表',
        path: '/pages/media-gallery/media-gallery'
      };
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.container {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 标签栏样式 */
.tabs {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
}

.tab-item {
  flex: 1;
  padding: 28rpx 0;
  text-align: center;
  position: relative;
}

.tab-item.active {
  color: #0284c7;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 4rpx;
  background-color: #0284c7;
  border-radius: 2rpx;
}

.tab-text {
  font-size: 32rpx;
  font-weight: 500;
}

/* 内容区域 */
.content {
  flex: 1;
  overflow: hidden;
}

/* 媒体内容区域 */
.media-content {
  height: 100%;
  background-color: #ffffff;
}

.media-scroll {
  height: 100%;
  padding: 16rpx 0;
}

/* 媒体组容器 */
.media-group {
  margin-bottom: 40rpx;
  padding: 0 16rpx;
}

/* 组标题样式 */
.group-title {
  padding: 10rpx 0 20rpx;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20rpx;
}

.group-title text {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a1a1a;
}

/* 组描述 */
.group-desc {
  font-size: 24rpx;
  color: #666;
  margin-left: 16rpx;
  font-weight: normal;
}

/* 缩略图网格布局 */
.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}

.media-item {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 比例 */
  overflow: hidden;
  border-radius: 12rpx;
  background-color: #f9f9f9;
}

.media-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.media-item:active .media-thumbnail {
  transform: scale(0.95);
}

/* 视频缩略图容器 */
.video-thumbnail-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 视频播放图标 */
.video-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64rpx;
  height: 64rpx;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 16rpx 0 16rpx 28rpx;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.9);
  margin-left: 5rpx;
}

/* 媒体类型标记 */
.media-type-tag {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  padding: 5rpx 10rpx;
  font-size: 20rpx;
  color: white;
  border-radius: 6rpx;
  z-index: 10;
}

.media-type-tag.image {
  background-color: rgba(41, 128, 185, 0.8);
}

.media-type-tag.video {
  background-color: rgba(231, 76, 60, 0.8);
}

/* 媒体标题 */
.media-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10rpx;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 24rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  z-index: 10;
}

/* 详情浏览模式 */
.detail-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 详情标题 */
.detail-title {
  position: absolute;
  top: 30rpx;
  left: 50%;
  transform: translateX(-50%);
  padding: 10rpx 20rpx;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 30rpx;
  border-radius: 8rpx;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 图片详情 */
.image-detail {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx;
  box-sizing: border-box;
  position: relative;
}

.detail-image {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.3s ease;
}

/* 视频详情 */
.video-detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.detail-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-tip {
  position: absolute;
  bottom: 80rpx;
  color: rgba(255, 255, 255, 0.7);
  font-size: 24rpx;
  padding: 10rpx 20rpx;
  background-color: rgba(166, 166, 166, 0.3);
  border-radius: 30rpx;
  animation: fadeInOut 2s infinite;
}

/* 导航指示器 */
.nav-indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 80rpx;
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10rpx;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.nav-indicator:active {
  opacity: 1;
}

.nav-indicator.left {
  left: 20rpx;
}

.nav-indicator.right {
  right: 20rpx;
}

.arrow {
  width: 0;
  height: 0;
  border-style: solid;
}

.nav-indicator.left .arrow {
  border-width: 20rpx 25rpx 20rpx 0;
  border-color: transparent rgba(255, 255, 255, 0.8) transparent transparent;
}

.nav-indicator.right .arrow {
  border-width: 20rpx 0 20rpx 25rpx;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.8);
}

/* 页码指示器 */
.page-indicator {
  position: absolute;
  bottom: 30rpx;
  left: 50%;
  transform: translateX(-50%);
  padding: 8rpx 16rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 26rpx;
  border-radius: 20rpx;
}

/* 返回按钮 */
.back-btn {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
  z-index: 20;
}

.back-btn:active {
  background-color: rgba(0, 0, 0, 0.7);
}

.back-img {
  width: 30rpx;
  height: auto;
}

/* 动画效果 */
@keyframes fadeInOut {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* 适配不同屏幕 */
@media (orientation: landscape) {
  .thumbnail-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* 文件列表样式 */
.file-content {
  height: 100%;
  background-color: #ffffff;
}

.file-scroll {
  height: 100%;
  padding: 20rpx;
  box-sizing: border-box;
}

.file-list {
  margin: 0;
}

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
  box-sizing: border-box;
}

.file-item:active {
  background-color: #f0f9ff;
  transform: translateY(1px);
}

.file-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 8rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.iconfont {
  font-size: 38rpx;
  color: #1e88e5;
}

.file-info {
  flex: 1;
  overflow: hidden;
  margin-right: 20rpx;
}

.file-name {
  font-size: 30rpx;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}

.view-btn-container {
  width: 120rpx;
  flex-shrink: 0;
}

.view-btn {
  background-color: #e0f2fe;
  color: #0284c7;
  padding: 12rpx 0;
  border-radius: 8rpx;
  font-size: 26rpx;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center;
  width: 100%;
}

.view-btn:active {
  background-color: #bae6fd;
  color: #0369a1;
}
</style>