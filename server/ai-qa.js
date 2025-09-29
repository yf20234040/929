/**
 * AI问答后端API处理
 * 集成阿里云DashScope通义千问API
 */

const express = require('express');
const axios = require('axios');

const router = express.Router();

// 阿里云DashScope配置
const DASHSCOPE_CONFIG = {
  apiKey: process.env.DASHSCOPE_API_KEY || 'sk-your-api-key-here', // 从环境变量获取API Key
  baseUrl: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
  model: 'qwen-turbo'
};

// 系统提示词
const SYSTEM_PROMPT = `你是历小包AI助手，专门为"洞见历史"研学项目提供智能问答服务。

你的主要职责：
1. 回答关于"洞见历史"研学项目的相关问题
2. 提供教育4.0时代的学习指导
3. 协助学生进行跨学科项目式学习
4. 解答历史、文化、教育等相关问题

回答要求：
- 语言简洁明了，适合学生理解
- 结合项目实际内容，提供具体建议
- 鼓励学生思考和探索
- 保持积极正面的教育态度

请用中文回答用户的问题。`;

// 调用通义千问API
async function callQwenAPI(userMessage, conversationHistory = []) {
  try {
    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];

    const response = await axios.post(DASHSCOPE_CONFIG.baseUrl, {
      model: DASHSCOPE_CONFIG.model,
      input: {
        messages: messages
      },
      parameters: {
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 0.8
      }
    }, {
      headers: {
        'Authorization': `Bearer ${DASHSCOPE_CONFIG.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    if (response.data && response.data.output && response.data.output.text) {
      return {
        success: true,
        answer: response.data.output.text,
        usage: response.data.usage
      };
    } else {
      throw new Error('API响应格式异常');
    }
  } catch (error) {
    console.error('调用通义千问API失败:', error.message);
    
    // 返回模拟回答（用于测试）
    return {
      success: false,
      answer: '抱歉，AI服务暂时不可用。请稍后再试，或者联系我们的技术支持团队。',
      error: error.message
    };
  }
}

// 问答接口
router.post('/ask', async (req, res) => {
  try {
    const { question, conversationHistory = [] } = req.body;
    
    if (!question || question.trim() === '') {
      return res.status(400).json({
        success: false,
        error: '问题不能为空'
      });
    }

    console.log('收到AI问答请求:', question);
    
    // 调用AI API
    const result = await callQwenAPI(question, conversationHistory);
    
    // 记录问答日志
    console.log('AI回答:', result.answer);
    
    res.json({
      success: true,
      data: {
        question: question,
        answer: result.answer,
        timestamp: new Date().toISOString(),
        usage: result.usage
      }
    });
    
  } catch (error) {
    console.error('AI问答处理失败:', error);
    res.status(500).json({
      success: false,
      error: 'AI问答服务暂时不可用，请稍后再试'
    });
  }
});

// 获取AI状态
router.get('/status', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'available',
      model: DASHSCOPE_CONFIG.model,
      timestamp: new Date().toISOString()
    }
  });
});

// 获取常见问题
router.get('/faq', (req, res) => {
  const faq = [
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
  ];
  
  res.json({
    success: true,
    data: faq
  });
});

module.exports = router;
