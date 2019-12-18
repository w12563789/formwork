/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : 127.0.0.1:3306
 Source Schema         : demo

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 13/12/2019 18:05:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for demo_auth_group
-- ----------------------------
DROP TABLE IF EXISTS `demo_auth_group`;
CREATE TABLE `demo_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of demo_auth_group
-- ----------------------------
BEGIN;
INSERT INTO `demo_auth_group` VALUES (1, '超级管理员', 1, '1,2,3,4,5');
COMMIT;

-- ----------------------------
-- Table structure for demo_auth_group_access
-- ----------------------------
DROP TABLE IF EXISTS `demo_auth_group_access`;
CREATE TABLE `demo_auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of demo_auth_group_access
-- ----------------------------
BEGIN;
INSERT INTO `demo_auth_group_access` VALUES (1, 1);
COMMIT;

-- ----------------------------
-- Table structure for demo_auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `demo_auth_rule`;
CREATE TABLE `demo_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `condition` char(100) NOT NULL DEFAULT '',
  `type` tinyint(1) NOT NULL COMMENT '类型(1:菜单,2:按钮)',
  `pid` int(8) NOT NULL DEFAULT '0' COMMENT '父节点id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of demo_auth_rule
-- ----------------------------
BEGIN;
INSERT INTO `demo_auth_rule` VALUES (1, '权限管理1级', '权限管理', 1, 'system', 1, 0);
INSERT INTO `demo_auth_rule` VALUES (2, '权限管理2级', '权限管理', 1, 'Auth/index', 1, 1);
INSERT INTO `demo_auth_rule` VALUES (3, '权限管理-修改按钮', '修改', 1, 'Auth/edit', 2, 2);
INSERT INTO `demo_auth_rule` VALUES (4, '权限管理-删除按钮', '删除', 1, 'Auth/del', 2, 2);
INSERT INTO `demo_auth_rule` VALUES (5, '权限管理-新增权限', '新增权限', 1, 'Auth/add', 2, 2);
COMMIT;

-- ----------------------------
-- Table structure for demo_user
-- ----------------------------
DROP TABLE IF EXISTS `demo_user`;
CREATE TABLE `demo_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(12) NOT NULL COMMENT '姓名',
  `user_name` varchar(50) NOT NULL COMMENT '用户名',
  `user_pwd` varchar(255) NOT NULL COMMENT '密码',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `type` tinyint(1) NOT NULL COMMENT '用户类型(1:管理员,2:普通用户)',
  `e_mail` varchar(255) DEFAULT NULL COMMENT '邮件',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of demo_user
-- ----------------------------
BEGIN;
INSERT INTO `demo_user` VALUES (1, '管理员', 'admin', 'Njk4ZDUxYTE5ZDhhMTIxY2U1ODE0OTlkN2I3MDE2Njg=', '2019-12-11 18:17:37', 1, '359702319@163.com');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
