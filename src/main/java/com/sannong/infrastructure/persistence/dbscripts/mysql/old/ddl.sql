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

-- Add column province, city, and district for table users.
ALTER TABLE `sannong`.`users`
ADD COLUMN `company_province` bigint(20) NULL AFTER `company`,
ADD COLUMN `company_city` bigint(20) NULL AFTER `company_province`,
ADD COLUMN `company_district` bigint(20) NULL AFTER `company_city`;

-- Add column option5, question_number and change question_content by Bright
ALTER TABLE `sannong`.`questions`
CHANGE COLUMN `questionContent` `question_content` VARCHAR(500) NULL DEFAULT NULL ;
ALTER TABLE `sannong`.`questions`
ADD COLUMN `option5` VARCHAR(45) NULL AFTER `option4`;
ALTER TABLE `sannong`.`questions`
ADD COLUMN `question_number` bigint(20) NULL AFTER `question_id`;

-- Drop column questionnaire_answer in applications add by william 2014-10-31
ALTER TABLE `sannong`.`applications` 
DROP COLUMN `questionnaire_answer`;

ALTER TABLE `sannong`.`questions` 
ADD COLUMN `questionnaire_number` CHAR NULL AFTER `application_id`;

CREATE TABLE `sannong`.`answers` (
  `answer_id` BIGINT NOT NULL AUTO_INCREMENT,
  `questionnaire1_answers` VARCHAR(200) NULL,
  `questionnaire2_answers` VARCHAR(200) NULL,
  `questionnaire3_answers` VARCHAR(200) NULL,
  `questionnaire4_answers` VARCHAR(200) NULL,
  `questionnaire5_answers` VARCHAR(200) NULL,
  `username` VARCHAR(45) NULL,
  `application_id` BIGINT NULL,
  `answer_status` CHAR NULL COMMENT '11:questionnaire1 submit\n20:questionnaire2 save\n21:questionnaire2 submit\n30:questionnaire3 save\n31:questionnaire3 submit\n40:questionnaire4 save\n41:questionnaire4 submit\n50:questionnaire5 save\n51:questionnaire5 submit',
  PRIMARY KEY (`answer_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `application_id_UNIQUE` (`application_id` ASC));
  
-- add by william 2014-11-1  
ALTER TABLE `sannong`.`answers` 
CHANGE COLUMN `answer_status` `answer_status` INT NULL DEFAULT NULL COMMENT '11:questionnaire1 submit\n20:questionnaire2 save\n21:questionnaire2 submit\n30:questionnaire3 save\n31:questionnaire3 submit\n40:questionnaire4 save\n41:questionnaire4 submit\n50:questionnaire5 save\n51:questionnaire5 submit' ;

-- add by william 2014-11-3
ALTER TABLE `sannong`.`sms` 
CHANGE COLUMN `sms_content` `sms_content` VARCHAR(160) NULL DEFAULT NULL ;
