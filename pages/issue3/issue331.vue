<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <view class="header-content">
        <text class="page-title">长安厂资料</text>
        <text class="page-subtitle"></text>
      </view>
      <view class="header-decoration">
        <view class="decoration-line"></view>
      </view>
    </view>

    <!-- 文件部分 - 修改为一行一个文件 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">文档</text>
        <text class="section-desc">点击查看详情</text>
      </view>
      
      <!-- 将file-grid改为file-list，使用flex垂直布局 -->
      <view class="file-list">
        <view
          v-for="(file, index) in fileList"
          :key="index"
          class="file-card"
          :class="'file-' + (index % 4)"
          @tap="viewFile(file)"
        >
          <view class="file-icon-container">
            <text class="file-icon">{{ getFileIcon(file.type) }}</text>
          </view>
          <view class="file-info">
            <text class="file-name">{{ file.name }}</text>
            <text class="file-type">{{ file.type.toUpperCase() }}</text>
          </view>
          <view class="view-btn">
            <text class="btn-text">查看</text>
            <text class="btn-arrow">→</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 图片部分 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">图片</text>
        <text class="section-desc">点击查看</text>
      </view>
      
      <view class="image-grid">
        <view
          v-for="(img, index) in imgList"
          :key="index"
          class="image-card"
          :class="'image-' + (index % 5)"
          @tap="previewImage(index)"
        >
          <image
            :src="img"
            class="media-thumbnail"
            mode="aspectFill"
          />
          <view class="image-overlay">
            <text class="overlay-text">点击查看</text>
            <text class="overlay-icon">🔍</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部装饰 -->
    <view class="bottom-decoration">
      <view class="decoration-dots">
        <view class="dot"></view>
        <view class="dot"></view>
        <view class="dot"></view>
      </view>
    </view>
  </view>
</template>

<script>
import { openDocumentFromUrl } from '../../utils/openDoc.js'
export default {
  data() {
    return {
      // 文件列表
      fileList: [
        { name: "-11-红岩英雄余祖胜", type: "doc", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-11-%E7%BA%A2%E5%B2%A9%E8%8B%B1%E9%9B%84%E4%BD%99%E7%A5%96%E8%83%9C.doc" },
        { name: "-12-解放初期的长安和江陵——迅速复产 抗美援朝作贡献", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-12-%E8%A7%A3%E6%94%BE%E5%88%9D%E6%9C%9F%E7%9A%84%E9%95%BF%E5%AE%89%E5%92%8C%E6%B1%9F%E9%99%B5%E2%80%94%E2%80%94%E8%BF%85%E9%80%9F%E5%A4%8D%E4%BA%A7%20%E6%8A%97%E7%BE%8E%E6%8F%B4%E6%9C%9D%E4%BD%9C%E8%B4%A1%E7%8C%AE.doc"},
        { name: "-16-金陵制造局工运纪事.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-16-%E9%87%91%E9%99%B5%E5%88%B6%E9%80%A0%E5%B1%80%E5%B7%A5%E8%BF%90%E7%BA%AA%E4%BA%8B.doc"},
		{ name: "-19-历经艰险的西迁之路.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-19-%E5%8E%86%E7%BB%8F%E8%89%B0%E9%99%A9%E7%9A%84%E8%A5%BF%E8%BF%81%E4%B9%8B%E8%B7%AF.doc"},
		{ name: "-23-西迁重庆之艰难路.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-23-%E8%A5%BF%E8%BF%81%E9%87%8D%E5%BA%86%E4%B9%8B%E8%89%B0%E9%9A%BE%E8%B7%AF.doc"},
		{ name: "-25-长安、江陵的两次军转民历程.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-25-%E9%95%BF%E5%AE%89%E3%80%81%E6%B1%9F%E9%99%B5%E7%9A%84%E4%B8%A4%E6%AC%A1%E5%86%9B%E8%BD%AC%E6%B0%91%E5%8E%86%E7%A8%8B.doc"},
		{ name: "-27-重庆解放前夜—第21兵工厂的护厂斗争.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-27-%E9%87%8D%E5%BA%86%E8%A7%A3%E6%94%BE%E5%89%8D%E5%A4%9C%E2%80%94%E7%AC%AC21%E5%85%B5%E5%B7%A5%E5%8E%82%E7%9A%84%E6%8A%A4%E5%8E%82%E6%96%97%E4%BA%89.doc"},
		{ name: "-30-百年长安的涅磐之路.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-30-%E7%99%BE%E5%B9%B4%E9%95%BF%E5%AE%89%E7%9A%84%E6%B6%85%E7%A3%90%E4%B9%8B%E8%B7%AF.doc"},
		{ name: "-32-天威传奇-张洪成.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-32-%E5%A4%A9%E5%A8%81%E4%BC%A0%E5%A5%87-%E5%BC%A0%E6%B4%AA%E6%88%90.doc"},
		{ name: "-33-时光溯回循来路，奋楫扬帆谱新篇——解码百年长安的红色基因.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-33-%E6%97%B6%E5%85%89%E6%BA%AF%E5%9B%9E%E5%BE%AA%E6%9D%A5%E8%B7%AF%EF%BC%8C%E5%A5%8B%E6%A5%AB%E6%89%AC%E5%B8%86%E8%B0%B1%E6%96%B0%E7%AF%87%E2%80%94%E2%80%94%E8%A7%A3%E7%A0%81%E7%99%BE%E5%B9%B4%E9%95%BF%E5%AE%89%E7%9A%84%E7%BA%A2%E8%89%B2%E5%9F%BA%E5%9B%A0.doc"},
		{ name: "-5-半月恢复生产的奇迹.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-5-%E5%8D%8A%E6%9C%88%E6%81%A2%E5%A4%8D%E7%94%9F%E4%BA%A7%E7%9A%84%E5%A5%87%E8%BF%B9.doc"},
		{ name: "-6-创造犀利的武器 争取国防的安宁——郭沫若为长安写厂歌.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-6-%E5%88%9B%E9%80%A0%E7%8A%80%E5%88%A9%E7%9A%84%E6%AD%A6%E5%99%A8%20%E4%BA%89%E5%8F%96%E5%9B%BD%E9%98%B2%E7%9A%84%E5%AE%89%E5%AE%81%E2%80%94%E2%80%94%E9%83%AD%E6%B2%AB%E8%8B%A5%E4%B8%BA%E9%95%BF%E5%AE%89%E5%86%99%E5%8E%82%E6%AD%8C.doc"},
		{ name: "-9-红岩英烈苟悦彬.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/-9-%E7%BA%A2%E5%B2%A9%E8%8B%B1%E7%83%88%E8%8B%9F%E6%82%A6%E5%BD%AC.doc"},
		{ name: "1-赵绍璠：我从“军大”毕业就分配到了朝鲜前线【纪念抗美援朝70周年8】.docx", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/1-%E8%B5%B5%E7%BB%8D%E7%92%A0%EF%BC%9A%E6%88%91%E4%BB%8E%E2%80%9C%E5%86%9B%E5%A4%A7%E2%80%9D%E6%AF%95%E4%B8%9A%E5%B0%B1%E5%88%86%E9%85%8D%E5%88%B0%E4%BA%86%E6%9C%9D%E9%B2%9C%E5%89%8D%E7%BA%BF%E3%80%90%E7%BA%AA%E5%BF%B5%E6%8A%97%E7%BE%8E%E6%8F%B4%E6%9C%9D70%E5%91%A8%E5%B9%B48%E3%80%91.docx"},
		{ name: "12.长安望江-17-老厂长李承干的故事.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/12.%E9%95%BF%E5%AE%89%E6%9C%9B%E6%B1%9F-17-%E8%80%81%E5%8E%82%E9%95%BF%E6%9D%8E%E6%89%BF%E5%B9%B2%E7%9A%84%E6%95%85%E4%BA%8B.doc"},
		{ name: "16.长安望江-24-俞濯之升任厂长.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/16.%E9%95%BF%E5%AE%89%E6%9C%9B%E6%B1%9F-24-%E4%BF%9E%E6%BF%AF%E4%B9%8B%E5%8D%87%E4%BB%BB%E5%8E%82%E9%95%BF.doc"},
		{ name: "2-21兵工厂加紧生产 支援抗日前线.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/2-21%E5%85%B5%E5%B7%A5%E5%8E%82%E5%8A%A0%E7%B4%A7%E7%94%9F%E4%BA%A7%20%E6%94%AF%E6%8F%B4%E6%8A%97%E6%97%A5%E5%89%8D%E7%BA%BF.doc"},
		{ name: "20-日机疯狂轰炸下的21厂.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/20-%E6%97%A5%E6%9C%BA%E7%96%AF%E7%8B%82%E8%BD%B0%E7%82%B8%E4%B8%8B%E7%9A%8421%E5%8E%82.doc"},
		{ name: "20.长安望江-29-护厂英雄  21兵工厂第一任工会主席吴坤山的故事.docx", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/20.%E9%95%BF%E5%AE%89%E6%9C%9B%E6%B1%9F-29-%E6%8A%A4%E5%8E%82%E8%8B%B1%E9%9B%84%20%2021%E5%85%B5%E5%B7%A5%E5%8E%82%E7%AC%AC%E4%B8%80%E4%BB%BB%E5%B7%A5%E4%BC%9A%E4%B8%BB%E5%B8%AD%E5%90%B4%E5%9D%A4%E5%B1%B1%E7%9A%84%E6%95%85%E4%BA%8B.docx"},
		{ name: "3-21厂的文体活动.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/3-21%E5%8E%82%E7%9A%84%E6%96%87%E4%BD%93%E6%B4%BB%E5%8A%A8.doc"},
		{ name: "李承干与第21兵工厂.docx", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/%E6%9D%8E%E6%89%BF%E5%B9%B2%E4%B8%8E%E7%AC%AC21%E5%85%B5%E5%B7%A5%E5%8E%82.docx"},
		{ name: "第21兵工厂的护厂斗争.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/%E7%AC%AC21%E5%85%B5%E5%B7%A5%E5%8E%82%E7%9A%84%E6%8A%A4%E5%8E%82%E6%96%97%E4%BA%89.doc"},
		{ name: "第二十一工厂.docx", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%B8%80%E5%B7%A5%E5%8E%82.docx"},
		{ name: "郭沫若为长安写厂歌.doc", type:"doc", url:"https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/%E9%83%AD%E6%B2%AB%E8%8B%A5%E4%B8%BA%E9%95%BF%E5%AE%89%E5%86%99%E5%8E%82%E6%AD%8C.doc"}
	  ],
      // 图片列表
      imgList: [
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/21%E5%85%B5%E5%B7%A5%E5%8E%82%E5%8E%82%E6%AD%8C.jpg',
		'https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E6%9C%9F/%E6%B4%9E%E8%A7%81%E5%8E%86%E5%8F%B2%E7%AC%AC%E4%B8%89%E6%9C%9F/%E9%95%BF%E5%AE%89%E5%8E%82%E8%B5%84%E6%96%99/%E6%8A%97%E6%88%9821%E5%85%B5%E5%B7%A5%E5%8E%82%E4%BA%A7%E9%87%8F.jpg'
	  ]
    };
  },
  methods: {
    getFileIcon(type) {
      if (type === 'doc') return '📄';
      
      return '📁';
    },

    viewFile(file) {
      openDocumentFromUrl({ url: file.url, type: file.type })
    },
    
    previewImage(index) {
      uni.previewImage({
        current: this.imgList[index],
        urls: this.imgList
      });
    }
  }
};
</script>

<style scoped>
/* 基础样式 - 浅色系简约风格 */
.container {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
}

/* 页面标题样式 */
.page-header {
  margin-bottom: 60rpx;
  position: relative;
}

.header-content {
  text-align: center;
  margin-bottom: 30rpx;
}

.page-title {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  color: #333333;
  margin-bottom: 16rpx;
}

.page-subtitle {
  display: block;
  font-size: 28rpx;
  color: #6b7280;
  font-weight: 400;
}

.header-decoration {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20rpx;
}

.decoration-circle {
  width: 12rpx;
  height: 12rpx;
  background: #4f46e5;
  border-radius: 50%;
}

.decoration-line {
  width: 60rpx;
  height: 2rpx;
  background: linear-gradient(90deg, transparent, #4f46e5, transparent);
  border-radius: 2rpx;
}

/* 区块容器样式 */
.section-container {
  margin-bottom: 60rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.05);
}

.section-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.section-title {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 12rpx;
}

.section-desc {
  display: block;
  font-size: 24rpx;
  color: #6b7280;
}

/* 文件列表样式 - 改为一行一个文件 */
.file-list {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  gap: 16rpx; /* 每个文件卡片之间的间距 */
}

.file-card {
  background: #ffffff;
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20rpx;
  border: 1rpx solid #f1f5f9;
  width: 100%; /* 占满容器宽度 */
}

.file-card:hover {
  transform: translateY(-3rpx);
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.08);
  border-color: #e2e8f0;
}

.file-0 { border-left: 4rpx solid #ef4444; }
.file-1 { border-left: 4rpx solid #06b6d4; }
.file-2 { border-left: 4rpx solid #3b82f6; }
.file-3 { border-left: 4rpx solid #10b981; }

.file-icon-container {
  width: 60rpx;
  height: 60rpx;
  background-color: #f1f5f9;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.file-0 .file-icon-container { background-color: #fee2e2; }
.file-1 .file-icon-container { background-color: #cffafe; }
.file-2 .file-icon-container { background-color: #dbeafe; }
.file-3 .file-icon-container { background-color: #dcfce7; }

.file-icon {
  font-size: 28rpx;
  color: #4b5563;
}

.file-0 .file-icon { color: #dc2626; }
.file-1 .file-icon { color: #0891b2; }
.file-2 .file-icon { color: #2563eb; }
.file-3 .file-icon { color: #059669; }

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  font-size: 26rpx;
  font-weight: 500;
  color: #333333;
  margin-bottom: 8rpx;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-type {
  font-size: 22rpx;
  color: #6b7280;
  background: #f8fafc;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background-color: #f1f5f9;
  padding: 12rpx 20rpx;
  border-radius: 8rpx;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background-color: #e2e8f0;
}

.btn-text {
  color: #4b5563;
  font-size: 24rpx;
  font-weight: 500;
}

.btn-arrow {
  color: #6b7280;
  font-size: 20rpx;
  transition: transform 0.3s ease;
}

.file-card:hover .btn-arrow {
  transform: translateX(4rpx);
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
  gap: 20rpx;
}

.image-card {
  position: relative;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #ffffff;
  border: 1rpx solid #f1f5f9;
  width: 100%;
  max-width: 600rpx;
}

.image-card:hover {
  transform: translateY(-3rpx) scale(1.01);
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.08);
  border-color: #e2e8f0;
}

.image-0 { border: 2rpx solid #ef4444; }
.image-1 { border: 2rpx solid #06b6d4; }
.image-2 { border: 2rpx solid #3b82f6; }
.image-3 { border: 2rpx solid #10b981; }
.image-4 { border: 2rpx solid #f59e0b; }

.media-thumbnail {
  width: 100%;
  height: 200rpx;
  display: block;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

.overlay-text {
  color: #ffffff;
  font-size: 22rpx;
  margin-bottom: 8rpx;
  font-weight: 500;
}

.overlay-icon {
  font-size: 28rpx;
  color: #ffffff;
}

.bottom-decoration {
  margin-top: 60rpx;
  display: flex;
  justify-content: center;
  padding-bottom: 30rpx;
}

.decoration-dots {
  display: flex;
  gap: 16rpx;
}

.dot {
  width: 10rpx;
  height: 10rpx;
  background: #94a3b8;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@media (max-width: 750rpx) {
  .container {
    padding: 30rpx 20rpx;
  }
  
  .page-title {
    font-size: 40rpx;
  }
  
  .section-title {
    font-size: 32rpx;
  }
  
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .section-container {
    padding: 24rpx;
  }
}
</style>