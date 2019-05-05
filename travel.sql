/*
 Navicat MySQL Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : travel

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 30/04/2019 23:18:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `user_id` int(10) unsigned zerofill NOT NULL,
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `c_date` varchar(255) NOT NULL,
  `content` text,
  `likes` int(10) unsigned DEFAULT '0',
  `good_id` int(10) unsigned zerofill DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `good` (`good_id`),
  KEY `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES (0000000036, 0000000004, '2019-03-28 0:13:12', '值得一玩', 0, 0000000001, 'qqq', 'http://localhost:8081/upload/avatar/1553682098531_Snip20181115_3.png');
INSERT INTO `comment` VALUES (0000000038, 0000000008, '2019-03-30 18:41:16', 'dsafdsf', 0, 0000000002, 'bbb', 'http://localhost:8081/upload/avatar/1553697720035_Snip20181115_3.png');
INSERT INTO `comment` VALUES (0000000038, 0000000009, '2019-03-31 16:2:51', '真好玩', 0, 0000000008, 'bbb', 'http://localhost:8081/upload/avatar/1553697720035_Snip20181115_3.png');
INSERT INTO `comment` VALUES (0000000038, 0000000010, '2019-03-31 16:11:37', 'zhenhaowan ', 0, 0000000008, 'bbb', 'http://localhost:8081/upload/avatar/1553697720035_Snip20181115_3.png');
COMMIT;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `c_date` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `price_in` float NOT NULL,
  `price_out` float NOT NULL,
  `price_offer` float NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `cover` varchar(255) NOT NULL,
  `whos` varchar(255) NOT NULL,
  `sold` int(255) unsigned DEFAULT '0',
  `date1` varchar(255) DEFAULT NULL,
  `date2` varchar(255) DEFAULT NULL,
  `addr` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `adduser` (`whos`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
BEGIN;
INSERT INTO `goods` VALUES (0000000001, '海南', '2019-04-29 17:26:32', 2000, 1999, 3999, 3899, 'abcdefg', 'http://localhost:8081/upload/cover-img/1556529990677_Snip20181115_1.png', 'bbb', 0, NULL, NULL, '海南省', '自驾游');
INSERT INTO `goods` VALUES (0000000004, '自然风光', '2019-04-29 17:25:59', 1233, 12345, 34242, 24355, '旅游就是旅行游览活动。泛指为旅客提供休闲设施与服务的产业。是一种复杂的社会现象，涉及政治、经济、文化、历史、地理、法律等各个社会领域。旅游也是一种休闲娱乐活动，具有异地性', 'http://localhost:8081/upload/cover-img/1556529957380_b.png', 'bbb', 0, '2019-03-10T16:00:00.000Z', '2019-03-26T16:00:00.000Z', NULL, '自驾游');
INSERT INTO `goods` VALUES (0000000005, '云南丽江七日游', '2019-03-31 15:59:48', 123, 23424, 23111, 42342, '旅游就是旅行游览活动。泛指为旅客提供休闲设施与服务的产业。是一种复杂的社会现象，涉及政治、经济、文化、历史、地理、法律等各个社会领域。旅游也是一种休闲娱乐活动，具有异地性', 'http://localhost:8081/upload/cover-img/1554019171437_20190324_184056.jpg', 'bbb', 0, '2019-03-19T16:00:00.000Z', '2019-03-17T16:00:00.000Z', '山西省', '国内游');
INSERT INTO `goods` VALUES (0000000006, '苏州园林', '2019-03-31 16:0:23', 123, 23424, 23111, 42342, '旅游就是旅行游览活动。泛指为旅客提供休闲设施与服务的产业。是一种复杂的社会现象，涉及政治、经济、文化、历史、地理、法律等各个社会领域。旅游也是一种休闲娱乐活动，具有异地性', 'http://localhost:8081/upload/cover-img/1554019207115_58455daa4ba7d.jpg', 'bbb', 0, '2019-03-14T16:00:00.000Z', '2019-03-18T16:00:00.000Z', '河北省', '境外游');
INSERT INTO `goods` VALUES (0000000007, '苏州园林2', '2019-03-31 16:0:40', 123, 23424, 23111, 42342, '旅游就是旅行游览活动。泛指为旅客提供休闲设施与服务的产业。是一种复杂的社会现象，涉及政治、经济、文化、历史、地理、法律等各个社会领域。旅游也是一种休闲娱乐活动，具有异地性', 'http://localhost:8081/upload/cover-img/1554019237902_01185220-3965.jpg', 'bbb', 0, '2019-03-14T16:00:00.000Z', '2019-03-18T16:00:00.000Z', '河北省', '国内游');
INSERT INTO `goods` VALUES (0000000008, '杭州hjhjkhajkh', '2019-03-31 16:13:3', 1232, 23424, 23111, 42342, '旅游就是旅行游览活动。泛指为旅客提供休闲设施与服务的产业。是一种复杂的社会现象，涉及政治、经济、文化、历史、地理、法律等各个社会领域。旅游也是一种休闲娱乐活动，具有异地性', 'http://localhost:8081/upload/cover-img/1554019253359_58455daa4ba7d.jpg', 'bbb', 0, '2019-03-14T16:00:00.000Z', '2019-03-18T16:00:00.000Z', '泰国', '境外游');
INSERT INTO `goods` VALUES (0000000009, '大自然', '2019-03-31 16:13:40', 123, 1233, 3242, 4523, '旅游就是旅行游览活动。泛指为旅客提供休闲设施与服务的产业。是一种复杂的社会现象，涉及政治、经济、文化、历史、地理、法律等各个社会领域。旅游也是一种休闲娱乐活动，具有异地性', 'http://localhost:8081/upload/cover-img/1554020006666_20190324_184056.jpg', 'bbb', 0, '2019-03-13T16:00:00.000Z', '2019-03-12T16:00:00.000Z', '河北省', '自驾游');
INSERT INTO `goods` VALUES (0000000010, 'hhhhhhh', '2019-03-31 16:20:33', 123, 1231, 324234, 213, '旅游就是旅行游览活动。泛指为旅客提供休闲设施与服务的产业。是一种复杂的社会现象，涉及政治、经济、文化、历史、地理、法律等各个社会领域。旅游也是一种休闲娱乐活动，具有异地性', 'http://localhost:8081/upload/cover-img/1554020419772_01185220-3965.jpg', 'bbb', 0, '2019-03-06T16:00:00.000Z', '2019-03-10T16:00:00.000Z', '重庆市', '自驾游');
INSERT INTO `goods` VALUES (0000000011, 'test 分类', '2019-04-29 16:56:43', 12, 1234, 1234, 1212, 'test fenlei ', 'http://localhost:8081/upload/cover-img/1556528179883_c.jpg', 'bbb', 0, '2019-04-29T16:00:00.000Z', '2019-05-01T16:00:00.000Z', '山西省', '自驾游');
COMMIT;

-- ----------------------------
-- Table structure for order_list
-- ----------------------------
DROP TABLE IF EXISTS `order_list`;
CREATE TABLE `order_list` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned zerofill NOT NULL,
  `price` float NOT NULL,
  `state` int(1) DEFAULT '0',
  `c_date` varchar(255) NOT NULL,
  `pay_date` varchar(255) DEFAULT NULL,
  `good_id` int(10) unsigned zerofill NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `addr` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `c_user` (`user_id`),
  KEY `b_good` (`good_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_list
-- ----------------------------
BEGIN;
INSERT INTO `order_list` VALUES (0000000011, 0000000043, 3244, 2, '2019-03-31 15:9:55', '2019-03-31 15:25:53', 0000000003, NULL, NULL);
INSERT INTO `order_list` VALUES (0000000012, 0000000043, 3244, 2, '2019-03-31 15:19:38', '2019-03-31 15:33:7', 0000000003, NULL, NULL);
INSERT INTO `order_list` VALUES (0000000015, 0000000043, 3244, 2, '2019-03-31 15:55:45', '2019-03-31 15:55:50', 0000000003, NULL, NULL);
INSERT INTO `order_list` VALUES (0000000016, 0000000038, 42342, 2, '2019-03-31 16:11:42', '2019-03-31 16:11:47', 0000000008, NULL, NULL);
INSERT INTO `order_list` VALUES (0000000017, 0000000044, 4523, 2, '2019-03-31 16:14:28', '2019-03-31 16:14:54', 0000000009, NULL, NULL);
INSERT INTO `order_list` VALUES (0000000022, 0000000045, 4523, 2, '2019-03-31 16:18:39', '2019-03-31 16:19:18', 0000000009, NULL, NULL);
INSERT INTO `order_list` VALUES (0000000024, 0000000045, 4523, 2, '2019-03-31 16:18:54', '2019-03-31 16:18:57', 0000000009, NULL, NULL);
INSERT INTO `order_list` VALUES (0000000028, 0000000038, 3899, 2, '2019-04-29 18:32:21', '2019-04-29 18:32:25', 0000000001, NULL, NULL);
INSERT INTO `order_list` VALUES (0000000030, 0000000038, 213, 2, '2019-04-29 18:47:56', '2019-04-29 18:48:1', 0000000010, NULL, NULL);
INSERT INTO `order_list` VALUES (0000000031, 0000000038, 213, 3, '2019-04-29 18:52:21', '2019-04-29 19:6:41', 0000000010, '自行处理', '宝山区南京路12号3号楼201室 ');
INSERT INTO `order_list` VALUES (0000000034, 0000000038, 213, 2, '2019-04-29 19:14:44', '2019-04-29 19:15:7', 0000000010, '自行处理', '宝山区南京路12号3号楼201室 ');
INSERT INTO `order_list` VALUES (0000000035, 0000000038, 3899, 2, '2019-04-29 19:18:23', '2019-04-29 19:18:29', 0000000001, '自行处理', '宝山区南京路12号3号楼201室 ');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `c_date` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `role` int(1) NOT NULL DEFAULT '0',
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `addr` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`,`name`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (0000000036, 'qqq', '2019-03-27 18:21:38', '12345678@qq.com', '男', '123456789', 1, 'c7909d22e12265bc78d411e4672b18ae', 'http://localhost:8081/upload/avatar/1553682098531_Snip20181115_3.png', '虹口区西康南路125弄34号201室 ');
INSERT INTO `user` VALUES (0000000038, 'bbb', '2019-03-27 22:42:0', '1234@qq.com', '女', '1234567', 1, 'c7909d22e12265bc78d411e4672b18ae', 'http://localhost:8081/upload/avatar/1553697720035_Snip20181115_3.png', '宝山区南京路12号3号楼201室 ');
INSERT INTO `user` VALUES (0000000039, '6487264', '2019-03-29 13:49:36', '1234532@qq.com', '女', '1234567785', 0, 'c7909d22e12265bc78d411e4672b18ae', '', '中华人民共和国民政部政策研究中心北京河沿大街147号 \n');
INSERT INTO `user` VALUES (0000000040, '131212121', '2019-03-29 14:4:24', '12212121@qq.com', '男', '112324324', 0, '144406823e5982f95d11dc57b5ec6483', '', '江苏省扬州市宝应县泰山东村102栋204室 \n');
INSERT INTO `user` VALUES (0000000041, '123123', '2019-03-29 14:5:42', '12@odsa.com', '女', '123321123', 0, 'f2988ffebab92e2d2e1d86a553e5bba6', '', '473004河南省南阳市中州路42号 周旺财 \n');
INSERT INTO `user` VALUES (0000000042, '1231', '2019-03-29 14:43:47', '123131@qq.com', '女', '242423532', 0, 'c7909d22e12265bc78d411e4672b18ae', '', '中国四川省江油市川西北矿区采气一队 \n');
INSERT INTO `user` VALUES (0000000043, 'name', '2019-03-31 15:2:56', '123@qq.com', '男', '123455', 0, 'c7909d22e12265bc78d411e4672b18ae', '', '江苏省吴江市平望镇联北村七组 \n');
INSERT INTO `user` VALUES (0000000044, 'hhhh', '2019-03-31 16:14:12', '321@qq.com', '男', '123321', 0, 'c7909d22e12265bc78d411e4672b18ae', '', '434000湖北省荆州市红苑大酒店 周旺财 \n');
INSERT INTO `user` VALUES (0000000045, '1122332e', '2019-03-31 16:18:34', '112233@qq.com', '男', '12', 1, 'c7909d22e12265bc78d411e4672b18ae', '', '434000湖北省荆州市红苑大酒店 周旺财 \n');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
