const express = require('express');
const axios = require('axios');
const router = express.Router();

// 设置响应头以支持中文
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// 阿里云DashScope配置
const DASHSCOPE_CONFIG = {
  apiKey: 'sk-c99a267c10224a0a85954153f2879fc2',
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

// 测试路由
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'AI路由工作正常'
  });
});

// 常见问题接口
router.get('/faq', (req, res) => {
  const faqList = [
    {
      question: '什么是"洞见历史"研学项目？',
      answer: '"洞见历史"是一个跨学科项目式学习项目，旨在通过历史文化的深度探索，培养学生的批判性思维和创新能力。'
    },
    {
      question: '教育4.0时代有什么特点？',
      answer: '教育4.0时代强调个性化学习、跨学科整合、技术融合和终身学习，注重培养学生的创新思维和实践能力。'
    }
  ];
  
  res.json({
    success: true,
    data: faqList
  });
});

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

    console.log('收到AI问答请求:', Buffer.from(question, 'utf8').toString('utf8'));
    
    // 调用阿里云通义千问API
    const result = await callQwenAPI(question, conversationHistory);
    
    // 记录问答日志
    console.log('AI回答:', Buffer.from(result.answer, 'utf8').toString('utf8'));
    
    // 确保中文正确编码
    const responseData = {
      success: true,
      data: {
        question: question,
        answer: result.answer,
        timestamp: new Date().toISOString(),
        usage: result.usage
      }
    };
    
    res.json(responseData);
    
  } catch (error) {
    console.error('AI问答处理失败:', error);
    res.status(500).json({
      success: false,
      error: 'AI问答服务暂时不可用，请稍后再试'
    });
  }
});

module.exports = router;
