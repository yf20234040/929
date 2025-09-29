/**
 * 文档预览配置文件
 * 定义所有可预览的文档信息
 */

export const documentList = {
  // 评价体系相关文档
  evaluation: [
    {
      id: 'recruitment',
      name: '"洞见历史"研学项目第二期成员招募',
      type: 'pdf',
      url: 'https://llzmlxb.xyz/documents/recruitment.pdf',
      size: '2.3MB',
      description: '第二期成员招募方案和申请流程'
    },
    {
      id: 'student-version',
      name: '中学生版',
      type: 'pdf',
      url: 'https://llzmlxb.xyz/documents/student-version.pdf',
      size: '1.8MB',
      description: '中学生版评价体系说明'
    },
    {
      id: 'parent-version',
      name: '家长版',
      type: 'pdf',
      url: 'https://llzmlxb.xyz/documents/parent-version.pdf',
      size: '1.5MB',
      description: '家长版评价体系说明'
    },
    {
      id: 'evaluation-form',
      name: '评价表',
      type: 'pdf',
      url: 'https://llzmlxb.xyz/documents/evaluation-form.pdf',
      size: '0.8MB',
      description: '项目评价表格'
    }
  ],
  
  // 媒体报道相关文档
  media: [
    {
      id: 'certificate-application',
      name: '"洞见历史"研学活动荣誉证书申请表',
      type: 'pdf',
      url: 'https://llzmlxb.xyz/documents/certificate-application.pdf',
      size: '1.2MB',
      description: '荣誉证书申请表'
    },
    {
      id: 'media-report',
      name: '媒体与报道',
      type: 'pdf',
      url: 'https://llzmlxb.xyz/documents/media-report.pdf',
      size: '3.1MB',
      description: '媒体相关报道和宣传材料'
    }
  ],
  
  // 项目文档
  project: [
    {
      id: 'project-plan',
      name: '项目计划书',
      type: 'pdf',
      url: 'https://llzmlxb.xyz/documents/project-plan.pdf',
      size: '2.5MB',
      description: '项目整体计划和实施方案'
    },
    {
      id: 'research-report',
      name: '研究报告',
      type: 'pdf',
      url: 'https://llzmlxb.xyz/documents/research-report.pdf',
      size: '4.2MB',
      description: '项目研究成果报告'
    },
    {
      id: 'summary-report',
      name: '总结报告',
      type: 'docx',
      url: 'https://llzmlxb.xyz/documents/summary-report.docx',
      size: '1.8MB',
      description: '项目总结和经验分享'
    }
  ],
  
  // 培训材料
  training: [
    {
      id: 'training-guide',
      name: '培训指南',
      type: 'pdf',
      url: 'https://llzmlxb.xyz/documents/training-guide.pdf',
      size: '2.1MB',
      description: '成员培训指南和流程'
    },
    {
      id: 'skill-handbook',
      name: '技能手册',
      type: 'pdf',
      url: 'https://llzmlxb.xyz/documents/skill-handbook.pdf',
      size: '3.5MB',
      description: '专业技能培训手册'
    }
  ]
};

/**
 * 根据ID获取文档信息
 * @param {string} category - 文档分类
 * @param {string} docId - 文档ID
 * @returns {object|null} 文档信息
 */
export function getDocumentById(category, docId) {
  if (documentList[category]) {
    return documentList[category].find(doc => doc.id === docId) || null;
  }
  return null;
}

/**
 * 根据分类获取文档列表
 * @param {string} category - 文档分类
 * @returns {array} 文档列表
 */
export function getDocumentsByCategory(category) {
  return documentList[category] || [];
}

/**
 * 获取所有文档
 * @returns {array} 所有文档列表
 */
export function getAllDocuments() {
  const allDocs = [];
  Object.keys(documentList).forEach(category => {
    documentList[category].forEach(doc => {
      allDocs.push({
        ...doc,
        category
      });
    });
  });
  return allDocs;
}

/**
 * 搜索文档
 * @param {string} keyword - 搜索关键词
 * @returns {array} 匹配的文档列表
 */
export function searchDocuments(keyword) {
  const results = [];
  const lowerKeyword = keyword.toLowerCase();
  
  Object.keys(documentList).forEach(category => {
    documentList[category].forEach(doc => {
      if (doc.name.toLowerCase().includes(lowerKeyword) || 
          doc.description.toLowerCase().includes(lowerKeyword)) {
        results.push({
          ...doc,
          category
        });
      }
    });
  });
  
  return results;
}
















