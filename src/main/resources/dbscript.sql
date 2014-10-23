CREATE DATABASE  IF NOT EXISTS `sannong` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sannong`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: sannong
-- ------------------------------------------------------
-- Server version	5.1.72-community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `answer_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `application_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `questionnaire_id` bigint(20) DEFAULT NULL,
  `anwser_content` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`answer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `application_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `applicant_id` bigint(20) DEFAULT NULL,
  `auditor_id` bigint(20) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `questionnaire_id` bigint(20) DEFAULT NULL,
  `application_date` datetime DEFAULT NULL,
  PRIMARY KEY (`application_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `project_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(45) DEFAULT NULL,
  `project_desc` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questionnaires`
--

DROP TABLE IF EXISTS `questionnaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questionnaires` (
  `questionnaire_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `questionnaire_category` bigint(20) DEFAULT NULL,
  `question_id` bigint(20) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`questionnaire_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `question_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `option1` varchar(45) DEFAULT NULL,
  `option2` varchar(45) DEFAULT NULL,
  `option3` varchar(45) DEFAULT NULL,
  `option4` varchar(45) DEFAULT NULL,
  `questionContent` varchar(500) DEFAULT NULL,
  `application_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `sms`
--

DROP TABLE IF EXISTS `sms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms` (
  `sms_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `sms_validation_code` varchar(45) DEFAULT NULL,
  `send_time` datetime DEFAULT NULL,
  `cellphone` varchar(45) DEFAULT NULL,
  `sms_content` varchar(45) DEFAULT NULL,
  `sms_status`  bigint(20) DEFAULT NULL,
  PRIMARY KEY (`sms_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `cellphone` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `mail_box` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `company_address` varchar(45) DEFAULT NULL,
  `desk_phone` varchar(45) DEFAULT NULL,
  `job_title` varchar(45) DEFAULT NULL,
  `salt` varchar(45) DEFAULT NULL,
  `enabled` char(1) NOT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

LOCK TABLES `users` WRITE;
INSERT INTO `users`(user_name, cellphone, username, password, mail_box, company, company_address, job_title, enabled) VALUES ('user', '13510730468', 'user', '47a733d60998c719cf3526ae7d106d13', 'sannong.dev@outlook.com', 'company1', 'company_address1', 'CEO', 1);
INSERT INTO `users`(user_name, cellphone, username, password, mail_box, company, company_address, job_title, enabled) VALUES ('admin', '18617071085', 'admin', 'ceb4f32325eda6142bd65215f4c0f371', 'prod.dev@outlook.com', 'company2', 'company_address2', 'Developer', 1);
INSERT INTO `users`(user_name, cellphone, username, password, mail_box, company, company_address, job_title, enabled) VALUES ('user', '13510730468', '13510730468', '47a733d60998c719cf3526ae7d106d13', 'sannong.dev@outlook.com', 'company3', 'company_address3', 'CEO', 1);
INSERT INTO `users`(user_name, cellphone, username, password, mail_box, company, company_address, job_title, enabled) VALUES ('admin', '18617071085', '18617071085', 'ceb4f32325eda6142bd65215f4c0f371', 'prod.dev@outlook.com', 'company4', 'company_address4', 'Developer', 1);
UNLOCK TABLES;

-- Dump completed on 2014-10-20 14:54:15

DROP TABLE IF EXISTS `authorities`;
create table authorities (
  username varchar(50) not null,
  authority varchar(50) not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `authorities` WRITE;
INSERT INTO `authorities` VALUES ('user','ROLE_USER');
INSERT INTO `authorities` VALUES ('admin','ROLE_ADMIN');
INSERT INTO `authorities` VALUES ('13510730468','ROLE_USER');
INSERT INTO `authorities` VALUES ('18617071085','ROLE_ADMIN');
UNLOCK TABLES;


DROP TABLE IF EXISTS `persistent_logins`;
create table persistent_logins (
  username varchar(64) not null,
  series varchar(64) primary key,
  token varchar(64) not null,
  last_used timestamp not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8;