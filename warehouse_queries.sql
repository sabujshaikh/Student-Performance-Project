-- =============================================================================
-- World University of Bangladesh - CSE Department
-- Star Schema Data Warehouse Analytical Queries
-- =============================================================================

-- Query 1: Average Exam Score & GPA by Attendance Band
SELECT 
  CASE 
    WHEN Attendance_Percentage >= 90 THEN '90-100% (High Attendance)'
    WHEN Attendance_Percentage >= 75 THEN '75-89% (Moderate Attendance)'
    ELSE '<75% (Low Attendance)'
  END AS Attendance_Band,
  COUNT(*) AS Student_Count,
  ROUND(AVG(Exam_Score), 2) AS Avg_Exam_Score,
  ROUND(AVG(GPA), 2) AS Avg_GPA,
  SUM(CASE WHEN Performance_Band = 'At-Risk' THEN 1 ELSE 0 END) AS At_Risk_Count
FROM FactStudentPerformance
GROUP BY Attendance_Band
ORDER BY Avg_Exam_Score DESC;

-- Query 2: Performance Comparison by Parental Education Level & Involvement
SELECT 
  fam.Parental_Education_Level,
  fam.Parental_Involvement,
  COUNT(f.Fact_ID) AS Total_Students,
  ROUND(AVG(f.Exam_Score), 2) AS Avg_Exam_Score,
  ROUND(AVG(f.GPA), 2) AS Avg_GPA,
  ROUND(AVG(f.Hours_Studied), 1) AS Avg_Hours_Studied
FROM FactStudentPerformance f
JOIN DimFamilyBackground fam ON f.Family_Key = fam.Family_Key
GROUP BY fam.Parental_Education_Level, fam.Parental_Involvement
ORDER BY Avg_Exam_Score DESC;

-- Query 3: At-Risk Student Breakdown by School Type and Teacher Quality
SELECT 
  res.School_Type,
  res.Teacher_Quality,
  COUNT(f.Fact_ID) AS Total_Students,
  SUM(CASE WHEN f.Performance_Band = 'At-Risk' THEN 1 ELSE 0 END) AS At_Risk_Students,
  ROUND((SUM(CASE WHEN f.Performance_Band = 'At-Risk' THEN 1 ELSE 0 END) / COUNT(f.Fact_ID)) * 100, 2) AS At_Risk_Percentage
FROM FactStudentPerformance f
JOIN DimSchoolResources res ON f.Resource_Key = res.Resource_Key
GROUP BY res.School_Type, res.Teacher_Quality
ORDER BY At_Risk_Percentage DESC;

-- Query 4: Impact of Motivation Level and Tutoring Sessions on High Performance
SELECT 
  beh.Motivation_Level,
  res.Tutoring_Sessions,
  COUNT(f.Fact_ID) AS Student_Count,
  ROUND(AVG(f.Exam_Score), 2) AS Avg_Exam_Score,
  SUM(CASE WHEN f.Performance_Band = 'High-Performing' THEN 1 ELSE 0 END) AS High_Performers
FROM FactStudentPerformance f
JOIN DimBehavior beh ON f.Behavior_Key = beh.Behavior_Key
JOIN DimSchoolResources res ON f.Resource_Key = res.Resource_Key
GROUP BY beh.Motivation_Level, res.Tutoring_Sessions
ORDER BY Avg_Exam_Score DESC;

-- Query 5: Overall Performance Band Distribution
SELECT 
  Performance_Band,
  COUNT(*) AS Student_Count,
  ROUND((COUNT(*) / (SELECT COUNT(*) FROM FactStudentPerformance)) * 100, 2) AS Percentage,
  ROUND(AVG(Exam_Score), 2) AS Avg_Exam_Score,
  ROUND(AVG(Attendance_Percentage), 2) AS Avg_Attendance
FROM FactStudentPerformance
GROUP BY Performance_Band
ORDER BY Avg_Exam_Score DESC;
