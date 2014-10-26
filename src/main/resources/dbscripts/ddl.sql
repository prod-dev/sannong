-- add by william
DROP TABLE `sannong`.`answers`;

ALTER TABLE `sannong`.`users` 
CHANGE COLUMN `mail_box` `mailbox` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `updateTime` `update_time` DATETIME NULL DEFAULT NULL ;

ALTER TABLE `sannong`.`applications` 
ADD COLUMN `questionnaire_answer` VARCHAR(45) NULL AFTER `application_date`;

ALTER TABLE `sannong`.`users` 
CHANGE COLUMN `enabled` `enabled` CHAR(1) NOT NULL DEFAULT '1' ;

ALTER TABLE `sannong`.`authorities` 
ADD COLUMN `authorities_id` BIGINT NOT NULL AUTO_INCREMENT FIRST,
ADD PRIMARY KEY (`authorities_id`);

ALTER TABLE `sannong`.`users` 
ADD COLUMN `create_time` DATETIME NULL AFTER `update_time`;

-- Add provinces table by Bright Huang 2014-10-23
DROP TABLE IF EXISTS `provinces`;
CREATE TABLE `provinces` (
  `province_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `province_index` bigint(20) NOT NULL,
  `province_name` varchar(45) NOT NULL,
  `province_code` varchar(45) NOT NULL,
  `country_code`  varchar(45) NOT NULL,
  PRIMARY KEY (`province_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Add cities table by Bright Huang 2014-10-23
DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities` (
  `city_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `city_index` bigint(20) NOT NULL,
  `city_name` varchar(45) NOT NULL,
  `city_code` varchar(45) NOT NULL,
  `province_index`  bigint(20) NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Add districts table by Bright Huang 2014-10-23
DROP TABLE IF EXISTS `districts`;
CREATE TABLE `districts` (
  `district_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `district_index` bigint(20) NOT NULL,
  `district_name` varchar(45) NOT NULL,
  `district_code` varchar(45) NOT NULL,
  `city_index`  bigint(20)  NOT NULL,
  PRIMARY KEY (`district_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;