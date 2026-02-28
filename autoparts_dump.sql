-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: autoparts
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'c9a360c2-14b4-11f1-91c7-564e99541117:1-80';

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',3,'add_permission'),(6,'Can change permission',3,'change_permission'),(7,'Can delete permission',3,'delete_permission'),(8,'Can view permission',3,'view_permission'),(9,'Can add group',2,'add_group'),(10,'Can change group',2,'change_group'),(11,'Can delete group',2,'delete_group'),(12,'Can view group',2,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add brand',8,'add_brand'),(26,'Can change brand',8,'change_brand'),(27,'Can delete brand',8,'delete_brand'),(28,'Can view brand',8,'view_brand'),(29,'Can add category',9,'add_category'),(30,'Can change category',9,'change_category'),(31,'Can delete category',9,'delete_category'),(32,'Can view category',9,'view_category'),(33,'Can add provider',10,'add_provider'),(34,'Can change provider',10,'change_provider'),(35,'Can delete provider',10,'delete_provider'),(36,'Can view provider',10,'view_provider'),(37,'Can add auto part',7,'add_autopart'),(38,'Can change auto part',7,'change_autopart'),(39,'Can delete auto part',7,'delete_autopart'),(40,'Can view auto part',7,'view_autopart');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autoparts_autopart`
--

DROP TABLE IF EXISTS `autoparts_autopart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autoparts_autopart` (
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `stock` int NOT NULL,
  `min_stock` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `storage_location` varchar(100) NOT NULL,
  `brand_id` bigint NOT NULL,
  `category_id` bigint NOT NULL,
  `provider_id` bigint NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `autoparts_autopart_name_brand_id_8c5df772_uniq` (`name`,`brand_id`),
  KEY `autoparts_autopart_brand_id_b2a39179_fk_autoparts_brand_id` (`brand_id`),
  KEY `autoparts_autopart_category_id_6009ff9e_fk_autoparts_category_id` (`category_id`),
  KEY `autoparts_autopart_provider_id_0da1e7fe_fk_autoparts_provider_id` (`provider_id`),
  CONSTRAINT `autoparts_autopart_brand_id_b2a39179_fk_autoparts_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `autoparts_brand` (`id`),
  CONSTRAINT `autoparts_autopart_category_id_6009ff9e_fk_autoparts_category_id` FOREIGN KEY (`category_id`) REFERENCES `autoparts_category` (`id`),
  CONSTRAINT `autoparts_autopart_provider_id_0da1e7fe_fk_autoparts_provider_id` FOREIGN KEY (`provider_id`) REFERENCES `autoparts_provider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autoparts_autopart`
--

LOCK TABLES `autoparts_autopart` WRITE;
/*!40000 ALTER TABLE `autoparts_autopart` DISABLE KEYS */;
INSERT INTO `autoparts_autopart` VALUES ('APA-001','Filtro de Aceite','Filtro de aceite para motores de gasolina.',50,140,15.99,'AD-12-03',1,1,1),('APA-002','Pastillas de Freno','Juego de pastillas de freno para vehículos compactos.',30,5,45.50,'BB-12-03',2,3,2),('APA-003','Amortiguadores','Amortiguadores para suspensión trasera.',20,5,120.00,'CC-12-03',3,4,3),('APA-004','Bujías','Juego de bujías para motores de 4 cilindros.',100,120,8.75,'DD-12-03',4,5,4),('APA-005','Correa de Distribución','Correa de distribución para motores de 6 cilindros.',15,3,75.00,'EE-12-03',5,1,5),('APA-006','Radiador','Radiador para sistemas de enfriamiento de vehículos.',10,2,200.00,'FF-12-03',1,1,1),('APA-007','Caja de Cambios','Caja de cambios manual para vehículos de pasajeros.',5,1,500.00,'GG-12-03',2,2,2),('APA-008','Disco de Freno','Disco de freno ventilado para vehículos deportivos.',25,5,80.00,'HH-12-03',3,3,3),('APA-009','Alternador','Alternador para sistemas eléctricos de vehículos.',8,2,150.00,'II-12-03',4,5,4),('APA-010','Amortiguadores Delanteros','Amortiguadores delanteros para suspensión de vehículos.',18,4,110.00,'JJ-12-03',5,4,5),('APA-011','Filtro de Aire','Filtro de aire para motores diésel.',40,8,20.00,'KK-12-03',1,1,1),('APA-012','Embrague','Kit de embrague para vehículos de transmisión manual.',12,3,250.00,'LL-12-03',2,2,2),('APA-013','Pastillas de Freno Traseras','Juego de pastillas de freno traseras para vehículos compactos.',35,5,40.00,'MM-12-03',3,3,3),('APA-014','Bomba de Agua','Bomba de agua para sistemas de enfriamiento de vehículos.',10,2,90.00,'NN-12-03',4,1,4),('APA-015','Suspensión Neumática','Sistema de suspensión neumática para vehículos de lujo.',5,1,800.00,'OO-12-03',5,4,5),('APA-016','Batería de Vehículo','Batería de 12V para sistemas eléctricos de vehículos.',22,5,120.00,'PP-12-03',1,5,1),('APA-017','Inyector de Combustible','Inyector de combustible para motores de gasolina.',16,3,85.00,'QQ-12-03',2,1,2),('APA-018','Cilindro Maestro de Freno','Cilindro maestro de freno para sistemas hidráulicos.',9,2,110.00,'RR-12-03',3,3,3),('APA-019','Bujes de Suspensión','Bujes de goma para suspensión delantera.',28,6,35.00,'SS-12-03',4,4,4),('APA-020','Regulador de Voltaje','Regulador de voltaje para alternadores de vehículos.',11,2,65.00,'TT-12-03',5,5,5),('APA-021','Correa de Serpentín','Correa de serpentín para transmisión de potencia.',33,7,28.00,'UU-12-03',1,1,1),('APA-022','Válvula Solenoide','Válvula solenoide para sistemas de transmisión.',14,3,95.00,'VV-12-03',2,2,2),('APA-023','Pastilla de Freno Cerámica','Pastillas de freno de cerámica de alta durabilidad.',42,8,55.00,'WW-12-03',3,3,3),('APA-024','Rótula de Suspensión','Rótula de suspensión para dirección de vehículos.',19,4,75.00,'XX-12-03',4,4,4),('APA-025','Motor de Arranque','Motor de arranque para encendido de vehículos.',6,1,180.00,'YY-12-03',5,5,5),('APA-026','Termostato','Termostato para control de temperatura de refrigerante.',27,5,32.00,'ZZ-12-03',1,1,1),('APA-027','Convertidor Torque','Convertidor de torque para transmisiones automáticas.',3,1,450.00,'AB-12-03',2,2,2),('APA-028','Tubo de Escape','Tubo de escape para sistemas de combustión de vehículos.',13,2,140.00,'AC-12-03',3,1,3),('APA-029','Amortiguador de Vibraciones','Amortiguador de vibraciones para motor y transmisión.',21,4,65.00,'AE-12-03',4,4,4),('APA-030','Sensor de Oxígeno','Sensor de oxígeno para control de emisiones de vehículos.',31,6,55.00,'AF-12-03',5,5,5);
/*!40000 ALTER TABLE `autoparts_autopart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autoparts_brand`
--

DROP TABLE IF EXISTS `autoparts_brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autoparts_brand` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autoparts_brand`
--

LOCK TABLES `autoparts_brand` WRITE;
/*!40000 ALTER TABLE `autoparts_brand` DISABLE KEYS */;
INSERT INTO `autoparts_brand` VALUES (1,'Toyota'),(2,'Ford'),(3,'Honda'),(4,'Chevrolet'),(5,'Nissan');
/*!40000 ALTER TABLE `autoparts_brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autoparts_category`
--

DROP TABLE IF EXISTS `autoparts_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autoparts_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autoparts_category`
--

LOCK TABLES `autoparts_category` WRITE;
/*!40000 ALTER TABLE `autoparts_category` DISABLE KEYS */;
INSERT INTO `autoparts_category` VALUES (1,'Motor'),(2,'Transmision'),(3,'Frenos'),(4,'Suspension'),(5,'Electricos');
/*!40000 ALTER TABLE `autoparts_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autoparts_provider`
--

DROP TABLE IF EXISTS `autoparts_provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autoparts_provider` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autoparts_provider`
--

LOCK TABLES `autoparts_provider` WRITE;
/*!40000 ALTER TABLE `autoparts_provider` DISABLE KEYS */;
INSERT INTO `autoparts_provider` VALUES (1,'Proveedor A'),(2,'Proveedor B'),(3,'Proveedor C'),(4,'Proveedor D'),(5,'Proveedor E');
/*!40000 ALTER TABLE `autoparts_provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(2,'auth','group'),(3,'auth','permission'),(4,'auth','user'),(7,'autoparts','autopart'),(8,'autoparts','brand'),(9,'autoparts','category'),(10,'autoparts','provider'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-02-28 15:15:59.131821'),(2,'auth','0001_initial','2026-02-28 15:15:59.920847'),(3,'admin','0001_initial','2026-02-28 15:16:00.149000'),(4,'admin','0002_logentry_remove_auto_add','2026-02-28 15:16:00.170347'),(5,'admin','0003_logentry_add_action_flag_choices','2026-02-28 15:16:00.183996'),(6,'contenttypes','0002_remove_content_type_name','2026-02-28 15:16:00.318406'),(7,'auth','0002_alter_permission_name_max_length','2026-02-28 15:16:00.404193'),(8,'auth','0003_alter_user_email_max_length','2026-02-28 15:16:00.436243'),(9,'auth','0004_alter_user_username_opts','2026-02-28 15:16:00.446106'),(10,'auth','0005_alter_user_last_login_null','2026-02-28 15:16:00.528915'),(11,'auth','0006_require_contenttypes_0002','2026-02-28 15:16:00.533897'),(12,'auth','0007_alter_validators_add_error_messages','2026-02-28 15:16:00.554793'),(13,'auth','0008_alter_user_username_max_length','2026-02-28 15:16:00.648471'),(14,'auth','0009_alter_user_last_name_max_length','2026-02-28 15:16:00.728411'),(15,'auth','0010_alter_group_name_max_length','2026-02-28 15:16:00.758435'),(16,'auth','0011_update_proxy_permissions','2026-02-28 15:16:00.770667'),(17,'auth','0012_alter_user_first_name_max_length','2026-02-28 15:16:00.856199'),(18,'autoparts','0001_initial','2026-02-28 15:16:01.222194'),(19,'sessions','0001_initial','2026-02-28 15:16:01.284532');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'autoparts'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-28 12:21:34
