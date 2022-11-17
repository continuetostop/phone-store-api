-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: iphone
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `description` varchar(256) NOT NULL,
  `image` varchar(256) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Iphone','',NULL,'2022-11-16 11:10:54','2022-11-16 11:10:54');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `numberPhone` varchar(256) NOT NULL,
  `address` varchar(256) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_products`
--

DROP TABLE IF EXISTS `group_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `specific` varchar(255) NOT NULL,
  `services` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `group_products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_products`
--

LOCK TABLES `group_products` WRITE;
/*!40000 ALTER TABLE `group_products` DISABLE KEYS */;
INSERT INTO `group_products` VALUES (1,'iphone 14','','',NULL,'2022-11-16 11:13:04','2022-11-16 11:23:43',1),(2,'iPhone 14 Pro Max','','',NULL,'2022-11-16 13:11:56','2022-11-16 13:11:56',1),(3,'iPhone 14 Pro ','','','','2022-11-16 15:46:37','2022-11-16 15:46:37',1),(4,'iPhone 14 Plus ','','','','2022-11-16 15:58:56','2022-11-16 15:58:56',1),(5,'iPhone 13 Pro Max','','','','2022-11-16 23:33:08','2022-11-16 23:33:08',1),(6,'iPhone 13 Pro','','','','2022-11-16 23:48:36','2022-11-16 23:48:36',1),(7,'iPhone 13 mini','','','','2022-11-17 00:15:10','2022-11-17 00:15:10',1),(8,'iPhone 12','','','','2022-11-17 00:27:58','2022-11-17 00:27:58',1),(9,'iPhone 11','','','','2022-11-17 00:34:46','2022-11-17 00:34:46',1),(10,'iPhone SE (2022)','','','','2022-11-17 00:46:03','2022-11-17 00:46:03',1);
/*!40000 ALTER TABLE `group_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `unit` varchar(256) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `groupProductId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `groupProductId` (`groupProductId`),
  CONSTRAINT `options_ibfk_1` FOREIGN KEY (`groupProductId`) REFERENCES `group_products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` VALUES (1,'storage','GB','2022-11-16 11:13:04','2022-11-16 11:13:04',1),(2,'color','','2022-11-16 11:13:04','2022-11-16 11:13:04',1),(3,'storage','GB','2022-11-16 13:11:56','2022-11-16 13:11:56',2),(4,'color','','2022-11-16 13:11:56','2022-11-16 13:11:56',2),(5,'storage','GB','2022-11-16 15:46:37','2022-11-16 15:46:37',3),(6,'color','','2022-11-16 15:46:37','2022-11-16 15:46:37',3),(7,'storage','GB','2022-11-16 15:58:56','2022-11-16 15:58:56',4),(8,'color','','2022-11-16 15:58:56','2022-11-16 15:58:56',4),(9,'storage','GB','2022-11-16 23:33:08','2022-11-16 23:33:08',5),(10,'color','','2022-11-16 23:33:08','2022-11-16 23:33:08',5),(11,'storage','GB','2022-11-16 23:48:36','2022-11-16 23:48:36',6),(12,'color','','2022-11-16 23:48:36','2022-11-16 23:48:36',6),(13,'storage','GB','2022-11-17 00:15:10','2022-11-17 00:15:10',7),(14,'color','','2022-11-17 00:15:10','2022-11-17 00:15:10',7),(15,'storage','GB','2022-11-17 00:27:58','2022-11-17 00:27:58',8),(16,'color','','2022-11-17 00:27:58','2022-11-17 00:27:58',8),(17,'storage','GB','2022-11-17 00:34:46','2022-11-17 00:34:46',9),(18,'color','','2022-11-17 00:34:46','2022-11-17 00:34:46',9),(19,'storage','GB','2022-11-17 00:46:03','2022-11-17 00:46:03',10),(20,'color','','2022-11-17 00:46:03','2022-11-17 00:46:03',10);
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `nameProduct` varchar(255) NOT NULL,
  `price` bigint NOT NULL,
  `qty` bigint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `orderId` int NOT NULL,
  `productDetailId` int NOT NULL,
  PRIMARY KEY (`orderId`,`productDetailId`),
  KEY `productDetailId` (`productDetailId`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`productDetailId`) REFERENCES `product_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status_order`
--

DROP TABLE IF EXISTS `order_status_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status_order` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `orderId` int NOT NULL,
  `statusOrderId` bigint NOT NULL,
  PRIMARY KEY (`orderId`,`statusOrderId`),
  KEY `statusOrderId` (`statusOrderId`),
  CONSTRAINT `order_status_order_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_status_order_ibfk_2` FOREIGN KEY (`statusOrderId`) REFERENCES `status_orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status_order`
--

LOCK TABLES `order_status_order` WRITE;
/*!40000 ALTER TABLE `order_status_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_status_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` bigint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `customerId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_detail_option`
--

DROP TABLE IF EXISTS `product_detail_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_detail_option` (
  `value` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productDetailId` int NOT NULL,
  `optionId` int NOT NULL,
  PRIMARY KEY (`productDetailId`,`optionId`),
  KEY `optionId` (`optionId`),
  CONSTRAINT `product_detail_option_ibfk_1` FOREIGN KEY (`productDetailId`) REFERENCES `product_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_detail_option_ibfk_2` FOREIGN KEY (`optionId`) REFERENCES `options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail_option`
--

LOCK TABLES `product_detail_option` WRITE;
/*!40000 ALTER TABLE `product_detail_option` DISABLE KEYS */;
INSERT INTO `product_detail_option` VALUES ('128','2022-11-16 11:13:04','2022-11-16 11:13:04',1,1),('blue','2022-11-16 11:13:04','2022-11-16 11:13:04',1,2),('128','2022-11-16 12:50:08','2022-11-16 12:50:08',2,1),('Midnight','2022-11-16 12:50:08','2022-11-16 12:50:08',2,2),('128','2022-11-16 12:53:04','2022-11-16 12:53:04',3,1),('Starlight','2022-11-16 12:53:04','2022-11-16 12:53:04',3,2),('128','2022-11-16 12:54:48','2022-11-16 12:54:48',4,1),('Purple','2022-11-16 12:54:48','2022-11-16 12:54:48',4,2),('128','2022-11-16 12:55:36','2022-11-16 12:55:36',5,1),('red','2022-11-16 12:55:36','2022-11-16 12:55:36',5,2),('256','2022-11-16 12:56:31','2022-11-16 12:56:31',6,1),('red','2022-11-16 12:56:31','2022-11-16 12:56:31',6,2),('256','2022-11-16 12:57:11','2022-11-16 12:57:11',7,1),('Purple','2022-11-16 12:57:11','2022-11-16 12:57:11',7,2),('256','2022-11-16 12:57:59','2022-11-16 12:57:59',8,1),('Blue','2022-11-16 12:57:59','2022-11-16 12:57:59',8,2),('256','2022-11-16 12:59:01','2022-11-16 12:59:01',9,1),('Starlight','2022-11-16 12:59:01','2022-11-16 12:59:01',9,2),('256','2022-11-16 12:59:34','2022-11-16 12:59:34',10,1),('Midnight','2022-11-16 12:59:34','2022-11-16 12:59:34',10,2),('512','2022-11-16 13:00:14','2022-11-16 13:00:14',11,1),('Midnight','2022-11-16 13:00:14','2022-11-16 13:00:14',11,2),('512','2022-11-16 13:00:34','2022-11-16 13:00:34',12,1),('Starlight','2022-11-16 13:00:34','2022-11-16 13:00:34',12,2),('512','2022-11-16 13:01:06','2022-11-16 13:01:06',13,1),('Blue','2022-11-16 13:01:06','2022-11-16 13:01:06',13,2),('512','2022-11-16 13:01:28','2022-11-16 13:01:28',14,1),('Purple','2022-11-16 13:01:28','2022-11-16 13:01:28',14,2),('512','2022-11-16 13:01:47','2022-11-16 13:01:47',15,1),('Red','2022-11-16 13:01:47','2022-11-16 13:01:47',15,2),('128','2022-11-16 13:11:56','2022-11-16 13:11:56',16,3),('Gold','2022-11-16 13:11:56','2022-11-16 13:11:56',16,4),('128','2022-11-16 13:19:31','2022-11-16 13:19:31',17,3),('Silver','2022-11-16 13:19:31','2022-11-16 13:19:31',17,4),('128','2022-11-16 13:22:54','2022-11-16 13:22:54',18,3),('Deep Purple','2022-11-16 13:22:54','2022-11-16 13:22:54',18,4),('128','2022-11-16 13:29:49','2022-11-16 13:29:49',19,3),('Space Black','2022-11-16 13:29:49','2022-11-16 13:29:49',19,4),('256','2022-11-16 13:32:33','2022-11-16 13:32:33',20,3),('Deep Purple','2022-11-16 13:32:33','2022-11-16 13:32:33',20,4),('256','2022-11-16 13:33:19','2022-11-16 13:33:19',21,3),('Space Black','2022-11-16 13:33:19','2022-11-16 13:33:19',21,4),('256','2022-11-16 13:34:08','2022-11-16 13:34:08',22,3),('Silver','2022-11-16 13:34:08','2022-11-16 13:34:08',22,4),('256','2022-11-16 13:35:48','2022-11-16 13:35:48',23,3),('Gold','2022-11-16 13:35:48','2022-11-16 13:35:48',23,4),('512','2022-11-16 13:40:04','2022-11-16 13:40:04',24,3),('Deep Purple','2022-11-16 13:40:04','2022-11-16 13:40:04',24,4),('512','2022-11-16 13:40:37','2022-11-16 13:40:37',25,3),('Space Black','2022-11-16 13:40:37','2022-11-16 13:40:37',25,4),('512','2022-11-16 13:42:25','2022-11-16 13:42:25',26,3),('Silver','2022-11-16 13:42:25','2022-11-16 13:42:25',26,4),('512','2022-11-16 13:42:47','2022-11-16 13:42:47',27,3),('Gold','2022-11-16 13:42:47','2022-11-16 13:42:47',27,4),('1024','2022-11-16 14:01:52','2022-11-16 14:01:52',28,3),('Deep Purple','2022-11-16 14:01:52','2022-11-16 14:01:52',28,4),('1024','2022-11-16 14:02:30','2022-11-16 14:02:30',29,3),('Space Black','2022-11-16 14:02:30','2022-11-16 14:02:30',29,4),('1024','2022-11-16 14:03:21','2022-11-16 14:03:21',30,3),('Silver','2022-11-16 14:03:21','2022-11-16 14:03:21',30,4),('1024','2022-11-16 14:03:40','2022-11-16 14:03:40',31,3),('Gold','2022-11-16 14:03:40','2022-11-16 14:03:40',31,4),('128','2022-11-16 15:46:37','2022-11-16 15:46:37',32,5),('Deep Purple','2022-11-16 15:46:37','2022-11-16 15:46:37',32,6),('128','2022-11-16 15:48:04','2022-11-16 15:48:04',33,5),('Space Black','2022-11-16 15:48:04','2022-11-16 15:48:04',33,6),('128','2022-11-16 15:48:56','2022-11-16 15:48:56',34,5),('Silver','2022-11-16 15:48:56','2022-11-16 15:48:56',34,6),('128','2022-11-16 15:49:24','2022-11-16 15:49:24',35,5),('Gold','2022-11-16 15:49:24','2022-11-16 15:49:24',35,6),('256','2022-11-16 15:50:33','2022-11-16 15:50:33',36,5),('Deep Purple','2022-11-16 15:50:33','2022-11-16 15:50:33',36,6),('256','2022-11-16 15:51:28','2022-11-16 15:51:28',37,5),('Space Black','2022-11-16 15:51:28','2022-11-16 15:51:28',37,6),('256','2022-11-16 15:52:07','2022-11-16 15:52:07',38,5),('Silver','2022-11-16 15:52:07','2022-11-16 15:52:07',38,6),('256','2022-11-16 15:52:31','2022-11-16 15:52:31',39,5),('Gold','2022-11-16 15:52:31','2022-11-16 15:52:31',39,6),('512','2022-11-16 15:53:43','2022-11-16 15:53:43',40,5),('Deep Purple','2022-11-16 15:53:43','2022-11-16 15:53:43',40,6),('512','2022-11-16 15:54:18','2022-11-16 15:54:18',41,5),('Space Black','2022-11-16 15:54:18','2022-11-16 15:54:18',41,6),('512','2022-11-16 15:54:48','2022-11-16 15:54:48',42,5),('Silver','2022-11-16 15:54:48','2022-11-16 15:54:48',42,6),('512','2022-11-16 15:55:14','2022-11-16 15:55:14',43,5),('Gold','2022-11-16 15:55:14','2022-11-16 15:55:14',43,6),('1024','2022-11-16 15:56:08','2022-11-16 15:56:08',44,5),('Deep Purple','2022-11-16 15:56:08','2022-11-16 15:56:08',44,6),('1024','2022-11-16 15:56:33','2022-11-16 15:56:33',45,5),('Space Black','2022-11-16 15:56:33','2022-11-16 15:56:33',45,6),('1024','2022-11-16 15:57:06','2022-11-16 15:57:06',46,5),('Silver','2022-11-16 15:57:06','2022-11-16 15:57:06',46,6),('1024','2022-11-16 15:57:26','2022-11-16 15:57:26',47,5),('gold','2022-11-16 15:57:26','2022-11-16 15:57:26',47,6),('128','2022-11-16 15:58:56','2022-11-16 15:58:56',48,7),('Midnight','2022-11-16 15:58:56','2022-11-16 15:58:56',48,8),('128','2022-11-16 16:00:28','2022-11-16 16:00:28',49,7),('Starlight','2022-11-16 16:00:28','2022-11-16 16:00:28',49,8),('128','2022-11-16 16:01:07','2022-11-16 16:01:07',50,7),('Blue','2022-11-16 16:01:07','2022-11-16 16:01:07',50,8),('128','2022-11-16 16:01:40','2022-11-16 16:01:40',51,7),('Purple','2022-11-16 16:01:40','2022-11-16 16:01:40',51,8),('128','2022-11-16 16:02:17','2022-11-16 16:02:17',52,7),('red','2022-11-16 16:02:17','2022-11-16 16:02:17',52,8),('256','2022-11-16 16:04:32','2022-11-16 16:04:32',53,7),('Midnight','2022-11-16 16:04:32','2022-11-16 16:04:32',53,8),('256','2022-11-16 16:04:52','2022-11-16 16:04:52',54,7),('Starlight','2022-11-16 16:04:52','2022-11-16 16:04:52',54,8),('256','2022-11-16 16:05:19','2022-11-16 16:05:19',55,7),('Blue','2022-11-16 16:05:19','2022-11-16 16:05:19',55,8),('256','2022-11-16 16:05:40','2022-11-16 16:05:40',56,7),('Purple','2022-11-16 16:05:40','2022-11-16 16:05:40',56,8),('256','2022-11-16 16:06:11','2022-11-16 16:06:11',57,7),('red','2022-11-16 16:06:11','2022-11-16 16:06:11',57,8),('512','2022-11-16 16:07:13','2022-11-16 16:07:13',58,7),('Midnight','2022-11-16 16:07:13','2022-11-16 16:07:13',58,8),('512','2022-11-16 16:07:37','2022-11-16 16:07:37',59,7),('Starlight','2022-11-16 16:07:37','2022-11-16 16:07:37',59,8),('512','2022-11-16 16:07:52','2022-11-16 16:07:52',60,7),('Blue','2022-11-16 16:07:52','2022-11-16 16:07:52',60,8),('512','2022-11-16 16:08:10','2022-11-16 16:08:10',61,7),('Purple','2022-11-16 16:08:10','2022-11-16 16:08:10',61,8),('512','2022-11-16 16:08:24','2022-11-16 16:08:24',62,7),('red','2022-11-16 16:08:24','2022-11-16 16:08:24',62,8),('128','2022-11-16 23:33:08','2022-11-16 23:33:08',63,9),('Alpine Green','2022-11-16 23:33:08','2022-11-16 23:33:08',63,10),('128','2022-11-16 23:34:38','2022-11-16 23:34:38',64,9),('Sierra Blue','2022-11-16 23:34:38','2022-11-16 23:34:38',64,10),('128','2022-11-16 23:35:53','2022-11-16 23:35:53',65,9),('Graphite','2022-11-16 23:35:53','2022-11-16 23:35:53',65,10),('128','2022-11-16 23:36:21','2022-11-16 23:36:21',66,9),('Silver','2022-11-16 23:36:21','2022-11-16 23:36:21',66,10),('128','2022-11-16 23:36:21','2022-11-16 23:36:21',67,9),('Silver','2022-11-16 23:36:21','2022-11-16 23:36:21',67,10),('128','2022-11-16 23:37:31','2022-11-16 23:37:31',68,9),('Gold','2022-11-16 23:37:31','2022-11-16 23:37:31',68,10),('256','2022-11-16 23:38:14','2022-11-16 23:38:14',69,9),('Alpine Green','2022-11-16 23:38:14','2022-11-16 23:38:14',69,10),('256','2022-11-16 23:38:48','2022-11-16 23:38:48',70,9),('Sierra Blue','2022-11-16 23:38:48','2022-11-16 23:38:48',70,10),('256','2022-11-16 23:39:16','2022-11-16 23:39:16',71,9),('Graphite','2022-11-16 23:39:16','2022-11-16 23:39:16',71,10),('256','2022-11-16 23:39:48','2022-11-16 23:39:48',72,9),('Silver','2022-11-16 23:39:48','2022-11-16 23:39:48',72,10),('256','2022-11-16 23:40:10','2022-11-16 23:40:10',73,9),('Gold','2022-11-16 23:40:10','2022-11-16 23:40:10',73,10),('512','2022-11-16 23:41:17','2022-11-16 23:41:17',74,9),('Gold','2022-11-16 23:41:17','2022-11-16 23:41:17',74,10),('512','2022-11-16 23:41:32','2022-11-16 23:41:32',75,9),('Silver','2022-11-16 23:41:32','2022-11-16 23:41:32',75,10),('512','2022-11-16 23:43:12','2022-11-16 23:43:12',76,9),('Graphite','2022-11-16 23:43:12','2022-11-16 23:43:12',76,10),('512','2022-11-16 23:43:36','2022-11-16 23:43:36',77,9),('Sierra Blue','2022-11-16 23:43:36','2022-11-16 23:43:36',77,10),('512','2022-11-16 23:44:00','2022-11-16 23:44:00',78,9),('Alpine Green','2022-11-16 23:44:00','2022-11-16 23:44:00',78,10),('1024','2022-11-16 23:44:42','2022-11-16 23:44:42',79,9),('Alpine Green','2022-11-16 23:44:42','2022-11-16 23:44:42',79,10),('1024','2022-11-16 23:45:06','2022-11-16 23:45:06',80,9),('Sierra Blue','2022-11-16 23:45:06','2022-11-16 23:45:06',80,10),('1024','2022-11-16 23:45:34','2022-11-16 23:45:34',81,9),('Graphite','2022-11-16 23:45:34','2022-11-16 23:45:34',81,10),('1024','2022-11-16 23:46:06','2022-11-16 23:46:06',82,9),('Silver','2022-11-16 23:46:06','2022-11-16 23:46:06',82,10),('1024','2022-11-16 23:46:26','2022-11-16 23:46:26',83,9),('Gold','2022-11-16 23:46:26','2022-11-16 23:46:26',83,10),('128','2022-11-16 23:48:36','2022-11-16 23:48:36',84,11),('Alpine Green','2022-11-16 23:48:36','2022-11-16 23:48:36',84,12),('128','2022-11-16 23:49:42','2022-11-16 23:49:42',85,11),('Sierra Blue','2022-11-16 23:49:42','2022-11-16 23:49:42',85,12),('128','2022-11-16 23:50:10','2022-11-16 23:50:10',86,11),('Graphite','2022-11-16 23:50:10','2022-11-16 23:50:10',86,12),('128','2022-11-16 23:50:40','2022-11-16 23:50:40',87,11),('Silver','2022-11-16 23:50:40','2022-11-16 23:50:40',87,12),('128','2022-11-16 23:51:09','2022-11-16 23:51:09',88,11),('Gold','2022-11-16 23:51:09','2022-11-16 23:51:09',88,12),('256','2022-11-16 23:52:52','2022-11-16 23:52:52',89,11),('Alpine Green','2022-11-16 23:52:52','2022-11-16 23:52:52',89,12),('256','2022-11-16 23:53:32','2022-11-16 23:53:32',90,11),('Sierra Blue','2022-11-16 23:53:32','2022-11-16 23:53:32',90,12),('256','2022-11-16 23:54:08','2022-11-16 23:54:08',91,11),('Graphite','2022-11-16 23:54:08','2022-11-16 23:54:08',91,12),('256','2022-11-16 23:54:22','2022-11-16 23:54:22',92,11),('Silver','2022-11-16 23:54:22','2022-11-16 23:54:22',92,12),('256','2022-11-16 23:54:38','2022-11-16 23:54:38',93,11),('Gold','2022-11-16 23:54:38','2022-11-16 23:54:38',93,12),('256','2022-11-16 23:55:07','2022-11-16 23:55:07',94,11),('Alpine Green','2022-11-16 23:55:07','2022-11-16 23:55:07',94,12),('256','2022-11-16 23:55:38','2022-11-16 23:55:38',95,11),('Sierra Blue','2022-11-16 23:55:38','2022-11-16 23:55:38',95,12),('512','2022-11-17 00:01:33','2022-11-17 00:01:33',96,11),('Alpine Green','2022-11-17 00:01:33','2022-11-17 00:01:33',96,12),('512','2022-11-17 00:01:51','2022-11-17 00:01:51',97,11),('Sierra Blue','2022-11-17 00:01:51','2022-11-17 00:01:51',97,12),('512','2022-11-17 00:02:07','2022-11-17 00:02:07',98,11),('Graphite','2022-11-17 00:02:07','2022-11-17 00:02:07',98,12),('512','2022-11-17 00:02:23','2022-11-17 00:02:23',99,11),('Silver','2022-11-17 00:02:23','2022-11-17 00:02:23',99,12),('512','2022-11-17 00:02:39','2022-11-17 00:02:39',100,11),('Gold','2022-11-17 00:02:39','2022-11-17 00:02:39',100,12),('128','2022-11-17 00:15:10','2022-11-17 00:15:10',101,13),('Alpine Green','2022-11-17 00:15:10','2022-11-17 00:15:10',101,14),('128','2022-11-17 00:16:12','2022-11-17 00:16:12',102,13),('Midnight','2022-11-17 00:16:12','2022-11-17 00:16:12',102,14),('128','2022-11-17 00:16:28','2022-11-17 00:16:28',103,13),('Starlight','2022-11-17 00:16:28','2022-11-17 00:16:28',103,14),('128','2022-11-17 00:16:46','2022-11-17 00:16:46',104,13),('Blue','2022-11-17 00:16:46','2022-11-17 00:16:46',104,14),('128','2022-11-17 00:17:00','2022-11-17 00:17:00',105,13),('red','2022-11-17 00:17:00','2022-11-17 00:17:00',105,14),('128','2022-11-17 00:17:14','2022-11-17 00:17:14',106,13),('Pink','2022-11-17 00:17:14','2022-11-17 00:17:14',106,14),('256','2022-11-17 00:17:50','2022-11-17 00:17:50',107,13),('Alpine Green','2022-11-17 00:17:50','2022-11-17 00:17:50',107,14),('256','2022-11-17 00:18:18','2022-11-17 00:18:18',108,13),('Midnight','2022-11-17 00:18:18','2022-11-17 00:18:18',108,14),('256','2022-11-17 00:18:35','2022-11-17 00:18:35',109,13),('Starlight','2022-11-17 00:18:35','2022-11-17 00:18:35',109,14),('256','2022-11-17 00:18:52','2022-11-17 00:18:52',110,13),('Blue','2022-11-17 00:18:52','2022-11-17 00:18:52',110,14),('256','2022-11-17 00:19:06','2022-11-17 00:19:06',111,13),('Red','2022-11-17 00:19:06','2022-11-17 00:19:06',111,14),('256','2022-11-17 00:19:20','2022-11-17 00:19:20',112,13),('Pink','2022-11-17 00:19:20','2022-11-17 00:19:20',112,14),('512','2022-11-17 00:19:54','2022-11-17 00:19:54',113,13),('Alpine Green','2022-11-17 00:19:54','2022-11-17 00:19:54',113,14),('512','2022-11-17 00:20:16','2022-11-17 00:20:16',114,13),('Midnight','2022-11-17 00:20:16','2022-11-17 00:20:16',114,14),('512','2022-11-17 00:20:31','2022-11-17 00:20:31',115,13),('Starlight','2022-11-17 00:20:31','2022-11-17 00:20:31',115,14),('512','2022-11-17 00:20:48','2022-11-17 00:20:48',116,13),('Blue','2022-11-17 00:20:48','2022-11-17 00:20:48',116,14),('512','2022-11-17 00:21:03','2022-11-17 00:21:03',117,13),('Red','2022-11-17 00:21:03','2022-11-17 00:21:03',117,14),('512','2022-11-17 00:21:35','2022-11-17 00:21:35',118,13),('Pink','2022-11-17 00:21:35','2022-11-17 00:21:35',118,14),('128','2022-11-17 00:27:58','2022-11-17 00:27:58',119,15),('White','2022-11-17 00:27:58','2022-11-17 00:27:58',119,16),('64','2022-11-17 00:28:56','2022-11-17 00:28:56',120,15),('Black','2022-11-17 00:28:56','2022-11-17 00:28:56',120,16),('64','2022-11-17 00:29:28','2022-11-17 00:29:28',121,15),('Blue','2022-11-17 00:29:28','2022-11-17 00:29:28',121,16),('64','2022-11-17 00:29:52','2022-11-17 00:29:52',122,15),('Green','2022-11-17 00:29:52','2022-11-17 00:29:52',122,16),('64','2022-11-17 00:30:22','2022-11-17 00:30:22',123,15),('Purple','2022-11-17 00:30:22','2022-11-17 00:30:22',123,16),('64','2022-11-17 00:30:36','2022-11-17 00:30:36',124,15),('Red','2022-11-17 00:30:36','2022-11-17 00:30:36',124,16),('128','2022-11-17 00:31:14','2022-11-17 00:31:14',125,15),('White','2022-11-17 00:31:14','2022-11-17 00:31:14',125,16),('128','2022-11-17 00:31:30','2022-11-17 00:31:30',126,15),('Black','2022-11-17 00:31:30','2022-11-17 00:31:30',126,16),('128','2022-11-17 00:31:45','2022-11-17 00:31:45',127,15),('Blue','2022-11-17 00:31:45','2022-11-17 00:31:45',127,16),('128','2022-11-17 00:31:59','2022-11-17 00:31:59',128,15),('Green','2022-11-17 00:31:59','2022-11-17 00:31:59',128,16),('128','2022-11-17 00:32:14','2022-11-17 00:32:14',129,15),('Purple','2022-11-17 00:32:14','2022-11-17 00:32:14',129,16),('128','2022-11-17 00:32:27','2022-11-17 00:32:27',130,15),('Red','2022-11-17 00:32:27','2022-11-17 00:32:27',130,16),('64','2022-11-17 00:34:46','2022-11-17 00:34:46',131,17),('White','2022-11-17 00:34:46','2022-11-17 00:34:46',131,18),('64','2022-11-17 00:35:48','2022-11-17 00:35:48',132,17),('Black','2022-11-17 00:35:48','2022-11-17 00:35:48',132,18),('64','2022-11-17 00:36:23','2022-11-17 00:36:23',133,17),('Green','2022-11-17 00:36:23','2022-11-17 00:36:23',133,18),('64','2022-11-17 00:36:40','2022-11-17 00:36:40',134,17),('Purple','2022-11-17 00:36:40','2022-11-17 00:36:40',134,18),('64','2022-11-17 00:36:54','2022-11-17 00:36:54',135,17),('Red','2022-11-17 00:36:54','2022-11-17 00:36:54',135,18),('64','2022-11-17 00:37:11','2022-11-17 00:37:11',136,17),('Yellow','2022-11-17 00:37:11','2022-11-17 00:37:11',136,18),('128','2022-11-17 00:43:06','2022-11-17 00:43:06',137,17),('White','2022-11-17 00:43:06','2022-11-17 00:43:06',137,18),('128','2022-11-17 00:43:33','2022-11-17 00:43:33',138,17),('Black','2022-11-17 00:43:33','2022-11-17 00:43:33',138,18),('128','2022-11-17 00:44:04','2022-11-17 00:44:04',139,17),('Green','2022-11-17 00:44:04','2022-11-17 00:44:04',139,18),('128','2022-11-17 00:44:24','2022-11-17 00:44:24',140,17),('Purple','2022-11-17 00:44:24','2022-11-17 00:44:24',140,18),('128','2022-11-17 00:44:38','2022-11-17 00:44:38',141,17),('Red','2022-11-17 00:44:38','2022-11-17 00:44:38',141,18),('128','2022-11-17 00:44:51','2022-11-17 00:44:51',142,17),('Yellow','2022-11-17 00:44:51','2022-11-17 00:44:51',142,18),('64','2022-11-17 00:46:03','2022-11-17 00:46:03',143,19),('Midnight','2022-11-17 00:46:03','2022-11-17 00:46:03',143,20),('64','2022-11-17 00:50:51','2022-11-17 00:50:51',144,19),('Starlight','2022-11-17 00:50:51','2022-11-17 00:50:51',144,20),('64','2022-11-17 00:51:05','2022-11-17 00:51:05',145,19),('Red','2022-11-17 00:51:05','2022-11-17 00:51:05',145,20),('128','2022-11-17 00:51:37','2022-11-17 00:51:37',146,19),('Midnight','2022-11-17 00:51:37','2022-11-17 00:51:37',146,20),('128','2022-11-17 00:51:52','2022-11-17 00:51:52',147,19),('Starlight','2022-11-17 00:51:52','2022-11-17 00:51:52',147,20),('128','2022-11-17 00:52:12','2022-11-17 00:52:12',148,19),('Red','2022-11-17 00:52:12','2022-11-17 00:52:12',148,20),('256','2022-11-17 00:52:56','2022-11-17 00:52:56',149,19),('Midnight','2022-11-17 00:52:56','2022-11-17 00:52:56',149,20),('256','2022-11-17 00:53:30','2022-11-17 00:53:30',150,19),('Starlight','2022-11-17 00:53:30','2022-11-17 00:53:30',150,20),('256','2022-11-17 00:53:43','2022-11-17 00:53:43',151,19),('Red','2022-11-17 00:53:43','2022-11-17 00:53:43',151,20);
/*!40000 ALTER TABLE `product_detail_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_details`
--

DROP TABLE IF EXISTS `product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `groupProductId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `groupProductId` (`groupProductId`),
  CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`groupProductId`) REFERENCES `group_products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES (1,'21350000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/09/iPhone14-ShopDunk-blue.png','2022-11-16 11:13:04','2022-11-16 11:13:04',1),(2,'21350000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-Midnight.png','2022-11-16 12:50:08','2022-11-16 12:50:08',1),(3,'21750000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-Starnight.png','2022-11-16 12:53:04','2022-11-16 12:53:04',1),(4,'21750000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-purple.png','2022-11-16 12:54:48','2022-11-16 12:54:48',1),(5,'20950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-do.png','2022-11-16 12:55:36','2022-11-16 12:55:36',1),(6,'23450000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-do.png','2022-11-16 12:56:31','2022-11-16 12:56:31',1),(7,'23750000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-purple.png','2022-11-16 12:57:11','2022-11-16 12:57:11',1),(8,'23350000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-blue.png','2022-11-16 12:57:59','2022-11-16 12:57:59',1),(9,'23750000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-Starnight.png','2022-11-16 12:59:01','2022-11-16 12:59:01',1),(10,'23750000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-Midnight.png','2022-11-16 12:59:34','2022-11-16 12:59:34',1),(11,'28950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-Midnight.png','2022-11-16 13:00:14','2022-11-16 13:00:14',1),(12,'28950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-Starnight.png','2022-11-16 13:00:34','2022-11-16 13:00:34',1),(13,'28950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-blue.png','2022-11-16 13:01:06','2022-11-16 13:01:06',1),(14,'28950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-purple.png','2022-11-16 13:01:28','2022-11-16 13:01:28',1),(15,'28950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14-ShopDunk-do.png','2022-11-16 13:01:47','2022-11-16 13:01:47',1),(16,'32850000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/09/iphone-14-promax-vang-650x650-1.png','2022-11-16 13:11:56','2022-11-16 13:11:56',2),(17,'33950000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-trang2-650x650-1.png','2022-11-16 13:19:31','2022-11-16 13:19:31',2),(18,'36950000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-pro-max-tim-650x650-1.png','2022-11-16 13:22:54','2022-11-16 13:22:54',2),(19,'33450000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-den-650x650-1.png','2022-11-16 13:29:49','2022-11-16 13:29:49',2),(20,'40950000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-pro-max-tim-650x650-1.png','2022-11-16 13:32:33','2022-11-16 13:32:33',2),(21,'35950000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-den-650x650-1.png','2022-11-16 13:33:19','2022-11-16 13:33:19',2),(22,'36450000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-trang2-650x650-1.png','2022-11-16 13:34:08','2022-11-16 13:34:08',2),(23,'36450000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-vang-650x650-1.png','2022-11-16 13:35:48','2022-11-16 13:35:48',2),(24,'45950000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-pro-max-tim-650x650-1.png','2022-11-16 13:40:04','2022-11-16 13:40:04',2),(25,'42950000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-den-650x650-1.png','2022-11-16 13:40:37','2022-11-16 13:40:37',2),(26,'43750000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-trang2-650x650-1.png','2022-11-16 13:42:25','2022-11-16 13:42:25',2),(27,'42750000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-vang-650x650-1.png','2022-11-16 13:42:47','2022-11-16 13:42:47',2),(28,'49950000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/09/iphone-14-pro-max-tim-650x650-1.png','2022-11-16 14:01:52','2022-11-16 14:01:52',2),(29,'45750000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-den-650x650-1.png','2022-11-16 14:02:30','2022-11-16 14:02:30',2),(30,'45950000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-trang2-650x650-1.png','2022-11-16 14:03:21','2022-11-16 14:03:21',2),(31,'45950000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-14-promax-vang-650x650-1.png','2022-11-16 14:03:40','2022-11-16 14:03:40',2),(32,'30950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-deeppurple.png','2022-11-16 15:46:37','2022-11-16 15:46:37',3),(33,'28750000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-space-black.png','2022-11-16 15:48:04','2022-11-16 15:48:04',3),(34,'29250000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-Silver.png','2022-11-16 15:48:56','2022-11-16 15:48:56',3),(35,'28750000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-gold.png','2022-11-16 15:49:24','2022-11-16 15:49:24',3),(36,'33950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-deeppurple.png','2022-11-16 15:50:33','2022-11-16 15:50:33',3),(37,'31250000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-space-black.png','2022-11-16 15:51:28','2022-11-16 15:51:28',3),(38,'31550000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-Silver.png','2022-11-16 15:52:07','2022-11-16 15:52:07',3),(39,'31550000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-gold.png','2022-11-16 15:52:31','2022-11-16 15:52:31',3),(40,'36450000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-deeppurple.png','2022-11-16 15:53:43','2022-11-16 15:53:43',3),(41,'35950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-space-black.png','2022-11-16 15:54:18','2022-11-16 15:54:18',3),(42,'36450000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-Silver.png','2022-11-16 15:54:48','2022-11-16 15:54:48',3),(43,'36450000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-gold.png','2022-11-16 15:55:14','2022-11-16 15:55:14',3),(44,'42950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-deeppurple.png','2022-11-16 15:56:08','2022-11-16 15:56:08',3),(45,'41950000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-space-black.png','2022-11-16 15:56:33','2022-11-16 15:56:33',3),(46,'42450000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-Silver.png','2022-11-16 15:57:06','2022-11-16 15:57:06',3),(47,'42450000','https://shopdunk.com/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-gold.png','2022-11-16 15:57:26','2022-11-16 15:57:26',3),(48,'24750000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/09/14_plus_midninght.png','2022-11-16 15:58:56','2022-11-16 15:58:56',4),(49,'24950000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_star.png','2022-11-16 16:00:28','2022-11-16 16:00:28',4),(50,'24750000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_ShopDunk_Blue.png','2022-11-16 16:01:07','2022-11-16 16:01:07',4),(51,'24750000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_Tim.png','2022-11-16 16:01:40','2022-11-16 16:01:40',4),(52,'23950000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_red.png','2022-11-16 16:02:17','2022-11-16 16:02:17',4),(53,'26550000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/09/14_plus_midninght.png','2022-11-16 16:04:32','2022-11-16 16:04:32',4),(54,'26550000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_star.png','2022-11-16 16:04:52','2022-11-16 16:04:52',4),(55,'26950000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_ShopDunk_Blue.png','2022-11-16 16:05:19','2022-11-16 16:05:19',4),(56,'26950000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_Tim.png','2022-11-16 16:05:40','2022-11-16 16:05:40',4),(57,'26950000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_red.png','2022-11-16 16:06:11','2022-11-16 16:06:11',4),(58,'31950000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/09/14_plus_midninght.png','2022-11-16 16:07:13','2022-11-16 16:07:13',4),(59,'31950000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_star.png','2022-11-16 16:07:37','2022-11-16 16:07:37',4),(60,'31950000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_ShopDunk_Blue.png','2022-11-16 16:07:52','2022-11-16 16:07:52',4),(61,'31950000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_Tim.png','2022-11-16 16:08:10','2022-11-16 16:08:10',4),(62,'31950000','https://shopdunk.com/wp-content/uploads/2022/09/14_plus_red.png','2022-11-16 16:08:23','2022-11-16 16:08:24',4),(63,'26990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-max-thumbtz-650x650-1.png','2022-11-16 23:33:08','2022-11-16 23:33:08',5),(64,'27750000','https://shopdunk.com/wp-content/uploads/2022/09/iphone-13-pro-max-blue-650x650-1.png','2022-11-16 23:34:38','2022-11-16 23:34:38',5),(65,'27450000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-max-grey-650x650-1.png','2022-11-16 23:35:53','2022-11-16 23:35:53',5),(66,'27450000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-max-silver-650x650-1.png','2022-11-16 23:36:21','2022-11-16 23:36:21',5),(67,'27450000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-max-silver-650x650-1.png','2022-11-16 23:36:21','2022-11-16 23:36:21',5),(68,'27550000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-max-gold-650x650-2.png','2022-11-16 23:37:31','2022-11-16 23:37:31',5),(69,'29550000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2021/09/iPhone_13_Pro_Max_Alpine_Green.jpg','2022-11-16 23:38:14','2022-11-16 23:38:14',5),(70,'29550000','https://shopdunk.com/wp-content/uploads/2021/09/mau-xanh-1-1.png','2022-11-16 23:38:48','2022-11-16 23:38:48',5),(71,'29350000','https://shopdunk.com/wp-content/uploads/2021/09/mau-den-1-1-1.png','2022-11-16 23:39:16','2022-11-16 23:39:16',5),(72,'29350000','https://shopdunk.com/wp-content/uploads/2021/09/mau-trang-1-1.png','2022-11-16 23:39:48','2022-11-16 23:39:48',5),(73,'29550000','https://shopdunk.com/wp-content/uploads/2021/09/mau-vang-1-1.png','2022-11-16 23:40:10','2022-11-16 23:40:10',5),(74,'33850000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2021/09/mau-vang-1-1.png','2022-11-16 23:41:17','2022-11-16 23:41:17',5),(75,'33850000','https://shopdunk.com/wp-content/uploads/2021/09/mau-trang-1-1.png','2022-11-16 23:41:32','2022-11-16 23:41:32',5),(76,'33850000','https://shopdunk.com/wp-content/uploads/2021/09/mau-den-1-1-1.png','2022-11-16 23:43:12','2022-11-16 23:43:12',5),(77,'33850000','https://shopdunk.com/wp-content/uploads/2021/09/mau-xanh-1-1.png','2022-11-16 23:43:36','2022-11-16 23:43:36',5),(78,'33850000','https://shopdunk.com/wp-content/uploads/2021/09/iPhone_13_Pro_Max_Alpine_Green.jpg','2022-11-16 23:44:00','2022-11-16 23:44:00',5),(79,'37950000','https://shopdunk.com/wp-content/uploads/2021/09/iPhone_13_Pro_Max_Alpine_Green.jpg','2022-11-16 23:44:42','2022-11-16 23:44:42',5),(80,'37950000','https://shopdunk.com/wp-content/uploads/2021/09/mau-xanh-1-1.png','2022-11-16 23:45:06','2022-11-16 23:45:06',5),(81,'37950000','https://shopdunk.com/wp-content/uploads/2021/09/mau-den-1-1-1.png','2022-11-16 23:45:34','2022-11-16 23:45:34',5),(82,'37950000','https://shopdunk.com/wp-content/uploads/2021/09/mau-trang-1-1.png','2022-11-16 23:46:06','2022-11-16 23:46:06',5),(83,'37950000','https://shopdunk.com/wp-content/uploads/2021/09/mau-vang-1-1.png','2022-11-16 23:46:26','2022-11-16 23:46:26',5),(84,'23990000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/08/iphone-13-pro-thumbtz-650x650-1.png','2022-11-16 23:48:36','2022-11-16 23:48:36',6),(85,'23990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-blue-650x650-1.png','2022-11-16 23:49:42','2022-11-16 23:49:42',6),(86,'23990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-grey-650x650-1.png','2022-11-16 23:50:10','2022-11-16 23:50:10',6),(87,'23990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-silver-650x650-1.png','2022-11-16 23:50:40','2022-11-16 23:50:40',6),(88,'23990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-gold-650x650-1.png','2022-11-16 23:51:09','2022-11-16 23:51:09',6),(89,'26490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-thumbtz-650x650-1.png','2022-11-16 23:52:52','2022-11-16 23:52:52',6),(90,'26490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-blue-650x650-1.png','2022-11-16 23:53:32','2022-11-16 23:53:32',6),(91,'26490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-grey-650x650-1.png','2022-11-16 23:54:08','2022-11-16 23:54:08',6),(92,'26490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-silver-650x650-1.png','2022-11-16 23:54:22','2022-11-16 23:54:22',6),(93,'26490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-gold-650x650-1.png','2022-11-16 23:54:38','2022-11-16 23:54:38',6),(94,'31790000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/08/iphone-13-pro-thumbtz-650x650-1.png','2022-11-16 23:55:07','2022-11-16 23:55:07',6),(95,'31790000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-blue-650x650-1.png','2022-11-16 23:55:38','2022-11-16 23:55:38',6),(96,'31790000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-thumbtz-650x650-1.png','2022-11-17 00:01:33','2022-11-17 00:01:33',6),(97,'31790000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-blue-650x650-1.png','2022-11-17 00:01:50','2022-11-17 00:01:51',6),(98,'31790000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-grey-650x650-1.png','2022-11-17 00:02:07','2022-11-17 00:02:07',6),(99,'31790000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-silver-650x650-1.png','2022-11-17 00:02:23','2022-11-17 00:02:23',6),(100,'31790000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-pro-gold-650x650-1.png','2022-11-17 00:02:39','2022-11-17 00:02:39',6),(101,'17490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-green-thumbtz-650x650-2.png','2022-11-17 00:15:10','2022-11-17 00:15:10',7),(102,'17490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-black-650x650-2.png','2022-11-17 00:16:12','2022-11-17 00:16:12',7),(103,'17490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-white-650x650-2.png','2022-11-17 00:16:28','2022-11-17 00:16:28',7),(104,'17490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-blue-650x650-1-1.png','2022-11-17 00:16:46','2022-11-17 00:16:46',7),(105,'17490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-red-650x650-2.png','2022-11-17 00:17:00','2022-11-17 00:17:00',7),(106,'17490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-pink-650x650-2.png','2022-11-17 00:17:14','2022-11-17 00:17:14',7),(107,'19990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-green-thumbtz-650x650-2.png','2022-11-17 00:17:50','2022-11-17 00:17:50',7),(108,'19990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-black-650x650-2.png','2022-11-17 00:18:18','2022-11-17 00:18:18',7),(109,'19990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-white-650x650-2.png','2022-11-17 00:18:35','2022-11-17 00:18:35',7),(110,'19990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-blue-650x650-1-1.png','2022-11-17 00:18:52','2022-11-17 00:18:52',7),(111,'19990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-red-650x650-2.png','2022-11-17 00:19:05','2022-11-17 00:19:05',7),(112,'19990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-pink-650x650-2.png','2022-11-17 00:19:20','2022-11-17 00:19:20',7),(113,'21990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-green-thumbtz-650x650-2.png','2022-11-17 00:19:54','2022-11-17 00:19:54',7),(114,'21990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-black-650x650-2.png','2022-11-17 00:20:16','2022-11-17 00:20:16',7),(115,'21990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-white-650x650-2.png','2022-11-17 00:20:31','2022-11-17 00:20:31',7),(116,'21990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-blue-650x650-1-1.png','2022-11-17 00:20:48','2022-11-17 00:20:48',7),(117,'21990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-red-650x650-2.png','2022-11-17 00:21:03','2022-11-17 00:21:03',7),(118,'21990000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-13-mini-pink-650x650-2.png','2022-11-17 00:21:35','2022-11-17 00:21:35',7),(119,'15950000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-white-1-650x650-1.png','2022-11-17 00:27:58','2022-11-17 00:27:58',8),(120,'15950000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-black-1-650x650-1.png','2022-11-17 00:28:56','2022-11-17 00:28:56',8),(121,'15950000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-blue-1-650x650-1.png','2022-11-17 00:29:28','2022-11-17 00:29:28',8),(122,'15950000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-green-1-1-650x650-1.png','2022-11-17 00:29:52','2022-11-17 00:29:52',8),(123,'15950000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-purple-1-650x650-1.png','2022-11-17 00:30:22','2022-11-17 00:30:22',8),(124,'15950000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-red-1-650x650-1.png','2022-11-17 00:30:36','2022-11-17 00:30:36',8),(125,'17590000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-white-1-650x650-1.png','2022-11-17 00:31:14','2022-11-17 00:31:14',8),(126,'17590000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-black-1-650x650-1.png','2022-11-17 00:31:29','2022-11-17 00:31:30',8),(127,'17590000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-blue-1-650x650-1.png','2022-11-17 00:31:45','2022-11-17 00:31:45',8),(128,'17590000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-green-1-1-650x650-1.png','2022-11-17 00:31:59','2022-11-17 00:31:59',8),(129,'17590000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-purple-1-650x650-1.png','2022-11-17 00:32:14','2022-11-17 00:32:14',8),(130,'17590000','https://shopdunk.com/wp-content/uploads/2021/05/iphone-12-red-1-650x650-1.png','2022-11-17 00:32:27','2022-11-17 00:32:27',8),(131,'10950000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-white-1-650x650-1.png','2022-11-17 00:34:46','2022-11-17 00:34:46',9),(132,'10750000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-black-1-650x650-1.png','2022-11-17 00:35:48','2022-11-17 00:35:48',9),(133,'11490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-green-1-650x650-2.png','2022-11-17 00:36:23','2022-11-17 00:36:23',9),(134,'11490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-purple-1-650x650-1.png','2022-11-17 00:36:40','2022-11-17 00:36:40',9),(135,'11490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-red-1-650x650-1.png','2022-11-17 00:36:54','2022-11-17 00:36:54',9),(136,'11490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-yellow-1-650x650-1.png','2022-11-17 00:37:11','2022-11-17 00:37:11',9),(137,'12650000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-white-1-650x650-1.png','2022-11-17 00:43:06','2022-11-17 00:43:06',9),(138,'12450000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-black-1-650x650-1.png','2022-11-17 00:43:33','2022-11-17 00:43:33',9),(139,'13490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-green-1-650x650-2.png','2022-11-17 00:44:04','2022-11-17 00:44:04',9),(140,'13490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-purple-1-650x650-1.png','2022-11-17 00:44:24','2022-11-17 00:44:24',9),(141,'13490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-red-1-650x650-1.png','2022-11-17 00:44:38','2022-11-17 00:44:38',9),(142,'13490000','https://shopdunk.com/wp-content/uploads/2022/08/iphone-11-yellow-1-650x650-1.png','2022-11-17 00:44:51','2022-11-17 00:44:51',9),(143,'9990000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/03/iPhone_SE_Midnight_PDP_Images_Position-1A_Midnight_Color__VN.jpg','2022-11-17 00:46:03','2022-11-17 00:46:03',10),(144,'9990000','https://shopdunk.com/wp-content/uploads/2022/03/iPhone_SE_Starlight_PDP_Images_Position-1A_Starlight_Color__VN.jpg','2022-11-17 00:50:51','2022-11-17 00:50:51',10),(145,'9990000','https://shopdunk.com/wp-content/uploads/2022/03/iPhone_SE_PRODUCTRED_PDP_Images_Position-1A_PRODUCTRED_Color__VN.jpg','2022-11-17 00:51:05','2022-11-17 00:51:05',10),(146,'11990000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/03/iPhone_SE_Midnight_PDP_Images_Position-1A_Midnight_Color__VN.jpg','2022-11-17 00:51:37','2022-11-17 00:51:37',10),(147,'11990000','https://shopdunk.com/wp-content/uploads/2022/03/iPhone_SE_Starlight_PDP_Images_Position-1A_Starlight_Color__VN.jpg','2022-11-17 00:51:52','2022-11-17 00:51:52',10),(148,'11990000','https://shopdunk.com/wp-content/uploads/2022/03/iPhone_SE_PRODUCTRED_PDP_Images_Position-1A_PRODUCTRED_Color__VN.jpg','2022-11-17 00:52:12','2022-11-17 00:52:12',10),(149,'14990000','https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8396c51/wp-content/uploads/2022/03/iPhone_SE_Midnight_PDP_Images_Position-1A_Midnight_Color__VN.jpg','2022-11-17 00:52:56','2022-11-17 00:52:56',10),(150,'14990000','https://shopdunk.com/wp-content/uploads/2022/03/iPhone_SE_Starlight_PDP_Images_Position-1A_Starlight_Color__VN.jpg','2022-11-17 00:53:30','2022-11-17 00:53:30',10),(151,'14990000','https://shopdunk.com/wp-content/uploads/2022/03/iPhone_SE_PRODUCTRED_PDP_Images_Position-1A_PRODUCTRED_Color__VN.jpg','2022-11-17 00:53:43','2022-11-17 00:53:43',10);
/*!40000 ALTER TABLE `product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','2022-11-16 06:31:00','2022-11-16 06:31:00'),(2,'moderator','2022-11-16 06:31:00','2022-11-16 06:31:00'),(3,'user','2022-11-16 06:31:00','2022-11-16 06:31:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_orders`
--

DROP TABLE IF EXISTS `status_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `orderStatusName` varchar(64) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_orders`
--

LOCK TABLES `status_orders` WRITE;
/*!40000 ALTER TABLE `status_orders` DISABLE KEYS */;
INSERT INTO `status_orders` VALUES (1,'spendding',NULL,'2022-11-16 06:31:00','2022-11-16 06:31:00'),(2,'confirm',NULL,'2022-11-16 06:31:00','2022-11-16 06:31:00');
/*!40000 ALTER TABLE `status_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('2022-11-16 11:08:51','2022-11-16 11:08:51',1,1);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'levanphuc','phuc@gmail.com','$2a$08$dxIhgh5/7GaPPgaQqvY5weOh6HGvnb5YdKZMi.8KxonQzD5XSve4K','2022-11-16 11:08:51','2022-11-16 11:08:51');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-17  7:57:54
