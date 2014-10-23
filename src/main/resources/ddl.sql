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
