SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `sannong` DEFAULT CHARACTER SET utf8 ;
USE `sannong` ;

-- -----------------------------------------------------
-- Table `sannong`.`provinces`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sannong`.`provinces` (
  `province_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `province_index` BIGINT(20) NOT NULL,
  `province_name` VARCHAR(45) NOT NULL,
  `province_code` VARCHAR(45) NOT NULL,
  `country_code` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`province_id`),
  UNIQUE INDEX `province_index_UNIQUE` (`province_index` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sannong`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sannong`.`cities` (
  `city_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `city_index` BIGINT(20) NOT NULL,
  `city_name` VARCHAR(45) NOT NULL,
  `city_code` VARCHAR(45) NOT NULL,
  `province_index` BIGINT(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE INDEX `city_index_UNIQUE` (`city_index` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 345
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sannong`.`districts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sannong`.`districts` (
  `district_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `district_index` BIGINT(20) NOT NULL,
  `district_name` VARCHAR(45) NOT NULL,
  `district_code` VARCHAR(45) NOT NULL,
  `city_index` BIGINT(20) NOT NULL,
  PRIMARY KEY (`district_id`),
  UNIQUE INDEX `district_index_UNIQUE` (`district_index` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3124
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sannong`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sannong`.`users` (
  `user_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `cellphone` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `mailbox` VARCHAR(45) NULL DEFAULT NULL,
  `company` VARCHAR(45) NULL DEFAULT NULL,
  `company_province` BIGINT(20) NULL DEFAULT NULL,
  `company_city` BIGINT(20) NULL DEFAULT NULL,
  `company_district` BIGINT(20) NULL DEFAULT NULL,
  `company_address` VARCHAR(45) NULL DEFAULT NULL,
  `desk_phone` VARCHAR(45) NULL DEFAULT NULL,
  `job_title` VARCHAR(45) NULL DEFAULT NULL,
  `salt` VARCHAR(45) NULL DEFAULT NULL,
  `enabled` CHAR(1) NOT NULL DEFAULT '1',
  `update_time` DATETIME NULL DEFAULT NULL,
  `create_time` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `cellphone_UNIQUE` (`cellphone` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  INDEX `fk_company_province_idx` (`company_province` ASC),
  INDEX `fk_company_city_idx` (`company_city` ASC),
  INDEX `fk_company_district_idx` (`company_district` ASC),
  CONSTRAINT `fk_company_province`
    FOREIGN KEY (`company_province`)
    REFERENCES `sannong`.`provinces` (`province_index`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_company_city`
    FOREIGN KEY (`company_city`)
    REFERENCES `sannong`.`cities` (`city_index`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_company_district`
    FOREIGN KEY (`company_district`)
    REFERENCES `sannong`.`districts` (`district_index`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 209
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sannong`.`applications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sannong`.`applications` (
  `application_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NOT NULL,
  `project_id` BIGINT(20) NOT NULL DEFAULT 1,
  `application_date` DATETIME NOT NULL,
  PRIMARY KEY (`application_id`, `user_id`, `project_id`),
  INDEX `fk_applicant_id_idx` (`user_id` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `sannong`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sannong`.`answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sannong`.`answers` (
  `answer_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `questionnaire1_answers` VARCHAR(200) NULL DEFAULT NULL,
  `questionnaire2_answers` VARCHAR(200) NULL DEFAULT NULL,
  `questionnaire3_answers` VARCHAR(200) NULL DEFAULT NULL,
  `questionnaire4_answers` VARCHAR(200) NULL DEFAULT NULL,
  `questionnaire5_answers` VARCHAR(200) NULL DEFAULT NULL,
  `answer_status` INT(11) NULL DEFAULT NULL COMMENT '11:questionnaire1 submit\n20:questionnaire2 save\n21:questionnaire2 submit\n30:questionnaire3 save\n31:questionnaire3 submit\n40:questionnaire4 save\n41:questionnaire4 submit\n50:questionnaire5 save' /* comment truncated */ /*51:questionnaire5 submit*/,
  `username` VARCHAR(45) NOT NULL,
  `application_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `application_id_UNIQUE` (`application_id` ASC),
  CONSTRAINT `fk_application_id`
    FOREIGN KEY (`application_id`)
    REFERENCES `sannong`.`applications` (`application_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sannong`.`authorities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sannong`.`authorities` (
  `authorities_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `authority` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`authorities_id`),
  INDEX `fk_username_idx` (`username` ASC),
  CONSTRAINT `fk_username`
    FOREIGN KEY (`username`)
    REFERENCES `sannong`.`users` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 37
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sannong`.`persistent_logins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sannong`.`persistent_logins` (
  `username` VARCHAR(64) NOT NULL,
  `series` VARCHAR(64) NOT NULL,
  `token` VARCHAR(64) NOT NULL,
  `last_used` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`series`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sannong`.`questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sannong`.`questions` (
  `question_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `option1` VARCHAR(45) NULL DEFAULT NULL,
  `option2` VARCHAR(45) NULL DEFAULT NULL,
  `option3` VARCHAR(45) NULL DEFAULT NULL,
  `option4` VARCHAR(45) NULL DEFAULT NULL,
  `option5` VARCHAR(45) NULL DEFAULT NULL,
  `question_content` VARCHAR(500) NULL DEFAULT NULL,
  `questionnaire_number` BIGINT NULL,
  PRIMARY KEY (`question_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 57
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `sannong`.`sms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sannong`.`sms` (
  `sms_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NOT NULL,
  `sms_validation_code` VARCHAR(45) NOT NULL,
  `send_time` DATETIME NOT NULL,
  `cellphone` VARCHAR(45) NOT NULL,
  `sms_content` VARCHAR(160) NOT NULL,
  `sms_status` BIGINT(20) NOT NULL,
  PRIMARY KEY (`sms_id`),
  INDEX `fk_user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_sms_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `sannong`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Added by Bright 2014-11-7
ALTER TABLE `sannong`.`sms`
CHANGE COLUMN `user_id` `user_id` BIGINT(20) NULL ;

-- Added by William 2014-11-11
ALTER TABLE `sannong`.`questions` 
ADD COLUMN `is_single` CHAR NULL COMMENT '1:single choice\n0:multiple choice' AFTER `questionnaire_number`;

-- Added by William 2014-11-17
CREATE TABLE `sannong`.`comments` (
  `comments_id` BIGINT NOT NULL AUTO_INCREMENT,
  `questionnaire_number` BIGINT NOT NULL,
  `content` VARCHAR(4000) NOT NULL,
  `application_id` BIGINT NOT NULL,
  `create_time` DATETIME NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`comments_id`),
  INDEX `fk_comments_application_id_idx` (`application_id` ASC),
  INDEX `fk_comments_username_idx` (`username` ASC),
  CONSTRAINT `fk_comments_application_id`
    FOREIGN KEY (`application_id`)
    REFERENCES `sannong`.`applications` (`application_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
ALTER TABLE `sannong`.`comments` 
ADD CONSTRAINT `fk_comments_username`
  FOREIGN KEY (`username`)
  REFERENCES `sannong`.`users` (`username`)
  ON DELETE NO ACTION;

ALTER TABLE `sannong`.`users`
CHANGE COLUMN `company` `company` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `company_province` `company_province` BIGINT(20) NOT NULL ,
CHANGE COLUMN `company_city` `company_city` BIGINT(20) NOT NULL ,
CHANGE COLUMN `company_district` `company_district` BIGINT(20) NOT NULL ,
CHANGE COLUMN `company_address` `company_address` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `job_title` `job_title` VARCHAR(45) NOT NULL ;

ALTER TABLE `sannong`.`comments`
DROP COLUMN `questionnaire_number`;

