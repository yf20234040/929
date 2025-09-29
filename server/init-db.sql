-- 历小包数据库初始化脚本

-- 创建用户表
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL COMMENT '微信openid',
  `unionid` varchar(100) DEFAULT NULL COMMENT '微信unionid',
  `nickname` varchar(50) DEFAULT NULL COMMENT '用户昵称',
  `avatar` varchar(500) DEFAULT NULL COMMENT '头像URL',
  `gender` tinyint(1) DEFAULT '0' COMMENT '性别：0未知，1男，2女',
  `country` varchar(50) DEFAULT NULL COMMENT '国家',
  `province` varchar(50) DEFAULT NULL COMMENT '省份',
  `city` varchar(50) DEFAULT NULL COMMENT '城市',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 创建登录日志表
CREATE TABLE IF NOT EXISTS `login_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `ip` varchar(50) DEFAULT NULL COMMENT '登录IP',
  `device` varchar(100) DEFAULT NULL COMMENT '设备信息',
  `platform` varchar(50) DEFAULT NULL COMMENT '平台信息',
  `login_time` datetime NOT NULL COMMENT '登录时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='登录日志表';

-- 创建用户授权表
CREATE TABLE IF NOT EXISTS `user_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `auth_type` varchar(20) NOT NULL COMMENT '授权类型：wechat, phone等',
  `auth_key` varchar(100) NOT NULL COMMENT '授权标识',
  `auth_value` varchar(500) DEFAULT NULL COMMENT '授权值',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_type_key` (`auth_type`,`auth_key`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户授权表';