/**
 * 通用文档预览工具函数
 * 整合所有预览功能，提供统一的接口
 */

import { openDocumentFromUrl } from './openDoc.js';

/**
 * 预览文档 - 通用接口
 * @param {string|object} file - 文件URL或文件对象
 * @param {string} title - 文档标题
 */
export function previewDocument(file, title = '') {
  try {
    openDocumentFromUrl(file, title);
  } catch (error) {
    console.error('预览文档失败:', error);
    uni.showToast({
      title: '预览失败',
      icon: 'none'
    });
  }
}

/**
 * 预览PDF文档
 * @param {string} url - PDF文档URL
 * @param {string} title - 文档标题
 */
export function previewPDF(url, title = 'PDF文档') {
  previewDocument({
    url: url,
    name: title,
    type: 'pdf'
  });
}

/**
 * 预览Word文档
 * @param {string} url - Word文档URL
 * @param {string} title - 文档标题
 */
export function previewWord(url, title = 'Word文档') {
  previewDocument({
    url: url,
    name: title,
    type: 'docx'
  });
}

/**
 * 预览Excel文档
 * @param {string} url - Excel文档URL
 * @param {string} title - 文档标题
 */
export function previewExcel(url, title = 'Excel文档') {
  previewDocument({
    url: url,
    name: title,
    type: 'xlsx'
  });
}

/**
 * 预览PowerPoint文档
 * @param {string} url - PowerPoint文档URL
 * @param {string} title - 文档标题
 */
export function previewPowerPoint(url, title = 'PowerPoint文档') {
  previewDocument({
    url: url,
    name: title,
    type: 'pptx'
  });
}

/**
 * 预览图片
 * @param {string} url - 图片URL
 * @param {string} title - 图片标题
 */
export function previewImage(url, title = '图片') {
  previewDocument({
    url: url,
    name: title,
    type: 'jpg'
  });
}

/**
 * 批量预览文档
 * @param {array} documents - 文档列表
 * @param {number} index - 当前预览的文档索引
 */
export function previewDocumentList(documents, index = 0) {
  if (!documents || documents.length === 0) {
    uni.showToast({
      title: '没有可预览的文档',
      icon: 'none'
    });
    return;
  }

  const currentDoc = documents[index];
  if (!currentDoc) {
    uni.showToast({
      title: '文档不存在',
      icon: 'none'
    });
    return;
  }

  previewDocument(currentDoc);
}

/**
 * 检查文档是否支持预览
 * @param {string} url - 文档URL
 * @param {string} type - 文档类型
 * @returns {boolean} 是否支持预览
 */
export function isDocumentSupported(url, type = '') {
  if (!url) return false;
  
  const ext = type || url.split('?')[0].split('.').pop() || '';
  const supportedFormats = [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp',
    'txt', 'rtf'
  ];
  
  return supportedFormats.includes(ext.toLowerCase());
}

/**
 * 获取文档类型图标
 * @param {string} type - 文档类型
 * @returns {string} 图标名称
 */
export function getDocumentIcon(type) {
  const iconMap = {
    'pdf': '📄',
    'doc': '📝',
    'docx': '📝',
    'xls': '📊',
    'xlsx': '📊',
    'ppt': '📽️',
    'pptx': '📽️',
    'jpg': '🖼️',
    'jpeg': '🖼️',
    'png': '🖼️',
    'gif': '🖼️',
    'txt': '📄',
    'rtf': '📄'
  };
  
  return iconMap[type.toLowerCase()] || '📄';
}

/**
 * 获取文档类型颜色
 * @param {string} type - 文档类型
 * @returns {string} 颜色值
 */
export function getDocumentColor(type) {
  const colorMap = {
    'pdf': '#FF6B6B',
    'doc': '#4ECDC4',
    'docx': '#4ECDC4',
    'xls': '#45B7D1',
    'xlsx': '#45B7D1',
    'ppt': '#96CEB4',
    'pptx': '#96CEB4',
    'jpg': '#FFEAA7',
    'jpeg': '#FFEAA7',
    'png': '#FFEAA7',
    'gif': '#FFEAA7',
    'txt': '#DDA0DD',
    'rtf': '#DDA0DD'
  };
  
  return colorMap[type.toLowerCase()] || '#95A5A6';
}
















