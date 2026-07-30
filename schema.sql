-- =============================================================================
-- World University of Bangladesh (WUB)
-- Department of Computer Science & Engineering
-- Course: Data Warehouse and Data Mining LAB (CSE 06124160)
-- Project: Student Performance Analytics and Prediction System
-- Database Schema: MySQL Star Schema Data Warehouse
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `wub_student_dw` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `wub_student_dw`;

-- -----------------------------------------------------------------------------
-- 1. Dimension Table: DimStudent
-- Stores student demographic and personal attributes
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `FactStudentPerformance`;
DROP TABLE IF EXISTS `DimStudent`;

CREATE TABLE `DimStudent` (
  `Student_Key` INT NOT NULL AUTO_INCREMENT,
  `Student_ID` VARCHAR(20) NOT NULL,
  `Student_Name` VARCHAR(100) NOT NULL,
  `Gender` VARCHAR(10) NOT NULL DEFAULT 'Female',
  `Distance_from_Home` VARCHAR(20) NOT NULL DEFAULT 'Moderate',
  `Learning_Disabilities` VARCHAR(10) NOT NULL DEFAULT 'No',
  `Created_At` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Student_Key`),
  UNIQUE KEY `uk_student_id` (`Student_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------------------------
-- 2. Dimension Table: DimFamilyBackground
-- Stores socio-economic and family contextual background
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `DimFamilyBackground`;

CREATE TABLE `DimFamilyBackground` (
  `Family_Key` INT NOT NULL AUTO_INCREMENT,
  `Parental_Involvement` VARCHAR(20) NOT NULL DEFAULT 'Medium',
  `Parental_Education_Level` VARCHAR(30) NOT NULL DEFAULT 'High School',
  `Family_Income` VARCHAR(20) NOT NULL DEFAULT 'Medium',
  PRIMARY KEY (`Family_Key`),
  INDEX `idx_family_composite` (`Parental_Involvement`, `Parental_Education_Level`, `Family_Income`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------------------------
-- 3. Dimension Table: DimSchoolResources
-- Stores school quality, tutoring, and resource accessibility metrics
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `DimSchoolResources`;

CREATE TABLE `DimSchoolResources` (
  `Resource_Key` INT NOT NULL AUTO_INCREMENT,
  `Access_to_Resources` VARCHAR(20) NOT NULL DEFAULT 'Medium',
  `Tutoring_Sessions` INT NOT NULL DEFAULT 0,
  `School_Type` VARCHAR(20) NOT NULL DEFAULT 'Public',
  `Teacher_Quality` VARCHAR(20) NOT NULL DEFAULT 'Medium',
  PRIMARY KEY (`Resource_Key`),
  INDEX `idx_resource_composite` (`Access_to_Resources`, `Tutoring_Sessions`, `School_Type`, `Teacher_Quality`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------------------------
-- 4. Dimension Table: DimBehavior
-- Stores student behavioral attributes, motivation, and study habits
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS `DimBehavior`;

CREATE TABLE `DimBehavior` (
  `Behavior_Key` INT NOT NULL AUTO_INCREMENT,
  `Motivation_Level` VARCHAR(20) NOT NULL DEFAULT 'Medium',
  `Extracurricular_Activities` VARCHAR(10) NOT NULL DEFAULT 'No',
  `Internet_Access` VARCHAR(10) NOT NULL DEFAULT 'Yes',
  `Peer_Influence` VARCHAR(20) NOT NULL DEFAULT 'Neutral',
  `Physical_Activity` INT NOT NULL DEFAULT 3,
  `Sleep_Hours` INT NOT NULL DEFAULT 7,
  PRIMARY KEY (`Behavior_Key`),
  INDEX `idx_behavior_composite` (`Motivation_Level`, `Peer_Influence`, `Internet_Access`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------------------------
-- 5. Fact Table: FactStudentPerformance
-- Central fact table linking dimensional keys to academic performance measures
-- -----------------------------------------------------------------------------
CREATE TABLE `FactStudentPerformance` (
  `Fact_ID` INT NOT NULL AUTO_INCREMENT,
  `Student_Key` INT NOT NULL,
  `Family_Key` INT NOT NULL,
  `Resource_Key` INT NOT NULL,
  `Behavior_Key` INT NOT NULL,
  `Hours_Studied` INT NOT NULL,
  `Attendance_Percentage` DECIMAL(5,2) NOT NULL,
  `Previous_Scores` DECIMAL(5,2) NOT NULL,
  `Exam_Score` DECIMAL(5,2) NOT NULL,
  `GPA` DECIMAL(3,2) NOT NULL,
  `Performance_Band` VARCHAR(20) NOT NULL, -- 'At-Risk', 'Average', 'High-Performing'
  `Risk_Level` VARCHAR(20) NOT NULL, -- 'High Risk', 'Moderate Risk', 'Low Risk'
  `Semester` VARCHAR(20) NOT NULL DEFAULT 'Semester 6',
  `Loaded_At` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Fact_ID`),
  CONSTRAINT `fk_fact_student` FOREIGN KEY (`Student_Key`) REFERENCES `DimStudent` (`Student_Key`) ON DELETE CASCADE,
  CONSTRAINT `fk_fact_family` FOREIGN KEY (`Family_Key`) REFERENCES `DimFamilyBackground` (`Family_Key`) ON DELETE CASCADE,
  CONSTRAINT `fk_fact_resources` FOREIGN KEY (`Resource_Key`) REFERENCES `DimSchoolResources` (`Resource_Key`) ON DELETE CASCADE,
  CONSTRAINT `fk_fact_behavior` FOREIGN KEY (`Behavior_Key`) REFERENCES `DimBehavior` (`Behavior_Key`) ON DELETE CASCADE,
  INDEX `idx_fact_scores` (`Exam_Score`, `GPA`, `Performance_Band`),
  INDEX `idx_fact_risk` (`Risk_Level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------------------------
-- Useful Analytical Views
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW `vw_student_performance_summary` AS
SELECT 
  s.Student_ID,
  s.Student_Name,
  s.Gender,
  f.Hours_Studied,
  f.Attendance_Percentage,
  f.Previous_Scores,
  f.Exam_Score,
  f.GPA,
  f.Performance_Band,
  f.Risk_Level,
  fam.Parental_Involvement,
  fam.Parental_Education_Level,
  res.Access_to_Resources,
  res.School_Type,
  res.Teacher_Quality,
  beh.Motivation_Level,
  beh.Peer_Influence
FROM FactStudentPerformance f
JOIN DimStudent s ON f.Student_Key = s.Student_Key
JOIN DimFamilyBackground fam ON f.Family_Key = fam.Family_Key
JOIN DimSchoolResources res ON f.Resource_Key = res.Resource_Key
JOIN DimBehavior beh ON f.Behavior_Key = beh.Behavior_Key;
