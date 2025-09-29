/**
 * 数据库模块
 * 提供用户数据的存储和查询功能
 * 
 */

const mysql = require('mysql2/promise');
const config = require('../config');

// 创建数据库连接池
const pool = mysql.createPool({
  host: config.database.host || 'localhost',
  user: config.database.user || 'root',
  password: config.database.password || '',
  database: config.database.name || 'lxb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('数据库连接成功');
    connection.release();
    return true;
  } catch (error) {
    console.error('数据库连接失败:', error);
    return false;
  }
}

// 用户相关操作
const userDb = {
  // 根据openid查找用户
  async findByOpenid(openid) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE openid = ?',
        [openid]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('查询用户失败:', error);
      return null;
    }
  },
  
  // 创建新用户
  async createUser(userData) {
    try {
      const { openid, unionid, nickname, avatar, gender, country, province, city } = userData;
      
      const [result] = await pool.execute(
        'INSERT INTO users (openid, unionid, nickname, avatar, gender, country, province, city, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [openid, unionid || null, nickname || null, avatar || null, gender || 0, country || null, province || null, city || null]
      );
      
      if (result.insertId) {
        return {
          id: result.insertId,
          openid,
          nickname,
          avatar
        };
      }
      return null;
    } catch (error) {
      console.error('创建用户失败:', error);
      return null;
    }
  },
  
  // 更新用户信息
  async updateUser(id, userData) {
    try {
      const { nickname, avatar, gender, country, province, city } = userData;
      
      const [result] = await pool.execute(
        'UPDATE users SET nickname = ?, avatar = ?, gender = ?, country = ?, province = ?, city = ?, updated_at = NOW() WHERE id = ?',
        [nickname, avatar, gender, country, province, city, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('更新用户失败:', error);
      return false;
    }
  },
  
  // 记录登录信息
  async recordLogin(userId, loginData) {
    try {
      const { ip, device, platform } = loginData;
      
      await pool.execute(
        'INSERT INTO login_logs (user_id, ip, device, platform, login_time) VALUES (?, ?, ?, ?, NOW())',
        [userId, ip || null, device || null, platform || null]
      );
      
      return true;
    } catch (error) {
      console.error('记录登录信息失败:', error);
      return false;
    }
  }
};

module.exports = {
  pool,
  testConnection,
  userDb
};