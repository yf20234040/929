require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  database: {
    host: 8080,
    user: 'root',
    password: '123456',
    name: 'lxb'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d'
  },
  aliyunSms: {
    accessKeyId: process.env.ALIYUN_SMS_KEY,
    accessKeySecret: process.env.ALIYUN_SMS_SECRET,
    signName: process.env.ALIYUN_SMS_SIGN,
    templates: {
      register: process.env.ALIYUN_SMS_TEMPLATE_REGISTER,
      resetPassword: process.env.ALIYUN_SMS_TEMPLATE_RESET
    }
  },
  oss: {
    region: process.env.OSS_REGION,
    bucket: process.env.OSS_BUCKET,
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET
  },
  verificationCode: {
    length: 6,
    expiresIn: 5 * 60,
    interval: 60
  }
};