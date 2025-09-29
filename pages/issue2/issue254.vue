<template>
  <view class="container">
    <scroll-view class="content" scroll-y>
      <view class="file-list">

        <!-- 循环渲染文件 -->
        <view
          v-for="(file, index) in fileList"
          :key="index"
          class="file-item"
          @tap="viewFile(file)"
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
          <view class="view-btn"><text>查看</text></view>
        </view>

      </view>
    </scroll-view>
  </view>
</template>

<script>
import { openDocumentFromUrl } from '../../utils/openDoc.js'
export default {
  data() {
    return {
      fileList: [
        // 在这里添加多个文件对象，url 你替换成真实的
        { name: "启动会稿子.docx", type: "docx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/%E5%90%AF%E5%8A%A8%E4%BC%9A%E7%A8%BF%E5%AD%90.docx" },
        { name: "启动会讲解.pptx", type: "pptx", url: "https://llzm-lixiaobao.oss-cn-beijing.aliyuncs.com/%E4%BA%8C%E6%9C%9F/%E7%AC%AC%E4%BA%8C%E6%9C%9F/%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E4%BB%AA%E5%BC%8F/%E5%90%AF%E5%8A%A8%E4%BC%9A%E8%AE%B2%E8%A7%A3.pptx" }
    ];
  },
  methods: {
    getFileIcon(type) {
      if (type === 'docx') return '📄';
      if (type === 'pptx') return '📊';
      if (type === 'pdf') return '📖';
      return '📁';
    },
    getIconColor(type) {
      const colors = {
        docx: '#e3f2fd',
        pptx: '#fff3e0',
        pdf: '#ffebee',
        default: '#e3f2fd'
      };
      return colors[type] || colors.default;
    },
    viewFile(file) {
      openDocumentFromUrl({ url: file.url, type: file.type })
    }
  }
};
</script>
