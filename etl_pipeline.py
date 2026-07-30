"""
World University of Bangladesh - CSE Department
ETL Pipeline for Student Performance Analytics & Data Warehouse System
Reads raw StudentPerformanceFactors.csv, cleans data, creates derived performance metrics,
creates MySQL / SQLite Star Schema Data Warehouse database based on schema.sql,
and populates DimStudent, DimFamilyBackground, DimSchoolResources, DimBehavior, and FactStudentPerformance tables.
"""

import os
import json
import sqlite3
import pandas as pd
import numpy as np

CSV_PATH = os.path.join(os.path.dirname(__file__), 'data', 'StudentPerformanceFactors.csv')
DB_PATH = os.path.join(os.path.dirname(__file__), 'data', 'wub_student_dw.db')
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), 'schema.sql')
OUTPUT_JSON = os.path.join(os.path.dirname(__file__), 'data', 'warehouse.json')

def get_db_connection():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_database_schema(conn):
    cursor = conn.cursor()
    # Create SQLite Star Schema tables
    cursor.executescript("""
    DROP VIEW IF EXISTS vw_student_performance_summary;
    DROP TABLE IF EXISTS FactStudentPerformance;
    DROP TABLE IF EXISTS DimStudent;
    DROP TABLE IF EXISTS DimFamilyBackground;
    DROP TABLE IF EXISTS DimSchoolResources;
    DROP TABLE IF EXISTS DimBehavior;

    CREATE TABLE DimStudent (
        Student_Key INTEGER PRIMARY KEY AUTOINCREMENT,
        Student_ID TEXT NOT NULL UNIQUE,
        Student_Name TEXT NOT NULL,
        Gender TEXT NOT NULL DEFAULT 'Female',
        Distance_from_Home TEXT NOT NULL DEFAULT 'Moderate',
        Learning_Disabilities TEXT NOT NULL DEFAULT 'No',
        Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE DimFamilyBackground (
        Family_Key INTEGER PRIMARY KEY AUTOINCREMENT,
        Parental_Involvement TEXT NOT NULL DEFAULT 'Medium',
        Parental_Education_Level TEXT NOT NULL DEFAULT 'High School',
        Family_Income TEXT NOT NULL DEFAULT 'Medium'
    );

    CREATE TABLE DimSchoolResources (
        Resource_Key INTEGER PRIMARY KEY AUTOINCREMENT,
        Access_to_Resources TEXT NOT NULL DEFAULT 'Medium',
        Tutoring_Sessions INTEGER NOT NULL DEFAULT 0,
        School_Type TEXT NOT NULL DEFAULT 'Public',
        Teacher_Quality TEXT NOT NULL DEFAULT 'Medium'
    );

    CREATE TABLE DimBehavior (
        Behavior_Key INTEGER PRIMARY KEY AUTOINCREMENT,
        Motivation_Level TEXT NOT NULL DEFAULT 'Medium',
        Extracurricular_Activities TEXT NOT NULL DEFAULT 'No',
        Internet_Access TEXT NOT NULL DEFAULT 'Yes',
        Peer_Influence TEXT NOT NULL DEFAULT 'Neutral',
        Physical_Activity INTEGER NOT NULL DEFAULT 3,
        Sleep_Hours INTEGER NOT NULL DEFAULT 7
    );

    CREATE TABLE FactStudentPerformance (
        Fact_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Student_Key INTEGER NOT NULL,
        Family_Key INTEGER NOT NULL,
        Resource_Key INTEGER NOT NULL,
        Behavior_Key INTEGER NOT NULL,
        Hours_Studied INTEGER NOT NULL,
        Attendance_Percentage REAL NOT NULL,
        Previous_Scores REAL NOT NULL,
        Exam_Score REAL NOT NULL,
        GPA REAL NOT NULL,
        Performance_Band TEXT NOT NULL,
        Risk_Level TEXT NOT NULL,
        Semester TEXT NOT NULL DEFAULT 'Semester 6',
        Loaded_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (Student_Key) REFERENCES DimStudent (Student_Key),
        FOREIGN KEY (Family_Key) REFERENCES DimFamilyBackground (Family_Key),
        FOREIGN KEY (Resource_Key) REFERENCES DimSchoolResources (Resource_Key),
        FOREIGN KEY (Behavior_Key) REFERENCES DimBehavior (Behavior_Key)
    );

    CREATE VIEW vw_student_performance_summary AS
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
    """)
    conn.commit()

def clean_and_transform():
    print("Starting ETL Pipeline Execution...")
    if not os.path.exists(CSV_PATH):
        print(f"Error: Dataset {CSV_PATH} not found.")
        return None

    df = pd.read_csv(CSV_PATH)
    initial_count = len(df)
    print(f"Loaded {initial_count} records from StudentPerformanceFactors.csv.")

    # 1. Cleaning & Imputation
    df['Parental_Education_Level'] = df['Parental_Education_Level'].fillna('High School')
    df['Teacher_Quality'] = df['Teacher_Quality'].fillna('Medium')
    df['Distance_from_Home'] = df['Distance_from_Home'].fillna('Moderate')
    df['Attendance'] = df['Attendance'].fillna(df['Attendance'].median())
    df['Hours_Studied'] = df['Hours_Studied'].fillna(df['Hours_Studied'].median())
    df['Previous_Scores'] = df['Previous_Scores'].fillna(df['Previous_Scores'].median())
    df['Exam_Score'] = df['Exam_Score'].fillna(df['Exam_Score'].median())
    df['Tutoring_Sessions'] = df['Tutoring_Sessions'].fillna(0)

    # 2. Derived Performance Metrics
    def calc_band(score):
        if score < 60: return 'At-Risk'
        elif score < 80: return 'Average'
        else: return 'High-Performing'

    def calc_risk(score, attendance):
        if score < 60 or attendance < 75: return 'High Risk'
        elif score < 75 or attendance < 85: return 'Moderate Risk'
        else: return 'Low Risk'

    def calc_gpa(score):
        if score >= 80: return 4.0
        elif score >= 75: return 3.75
        elif score >= 70: return 3.5
        elif score >= 65: return 3.25
        elif score >= 60: return 3.0
        elif score >= 55: return 2.75
        elif score >= 50: return 2.5
        else: return 2.0

    df['Performance_Band'] = df['Exam_Score'].apply(calc_band)
    df['Risk_Level'] = df.apply(lambda row: calc_risk(row['Exam_Score'], row['Attendance']), axis=1)
    df['GPA'] = df['Exam_Score'].apply(calc_gpa)

    # 3. Populate Database
    conn = get_db_connection()
    init_database_schema(conn)
    cursor = conn.cursor()

    dim_student = []
    dim_family = []
    dim_resources = []
    dim_behavior = []
    fact_performance = []

    for idx, row in df.iterrows():
        if idx == 0:
            stu_id = "4070"
            stu_name = "Sabuj Shaikh"
        elif idx == 1:
            stu_id = "4069"
            stu_name = "Md Nazim Uddin"
        else:
            stu_id = f"STU-{1001 + idx}"
            stu_name = row.get('Student_Name', f"Student {1001 + idx}")

        # Database Inserts
        cursor.execute("""
            INSERT INTO DimStudent (Student_ID, Student_Name, Gender, Distance_from_Home, Learning_Disabilities)
            VALUES (?, ?, ?, ?, ?)
        """, (
            stu_id,
            stu_name,
            str(row.get('Gender', 'Female')),
            str(row.get('Distance_from_Home', 'Moderate')),
            str(row.get('Learning_Disabilities', 'No'))
        ))
        s_key = cursor.lastrowid

        cursor.execute("""
            INSERT INTO DimFamilyBackground (Parental_Involvement, Parental_Education_Level, Family_Income)
            VALUES (?, ?, ?)
        """, (
            str(row.get('Parental_Involvement', 'Medium')),
            str(row.get('Parental_Education_Level', 'High School')),
            str(row.get('Family_Income', 'Medium'))
        ))
        f_key = cursor.lastrowid

        cursor.execute("""
            INSERT INTO DimSchoolResources (Access_to_Resources, Tutoring_Sessions, School_Type, Teacher_Quality)
            VALUES (?, ?, ?, ?)
        """, (
            str(row.get('Access_to_Resources', 'Medium')),
            int(row.get('Tutoring_Sessions', 0)),
            str(row.get('School_Type', 'Public')),
            str(row.get('Teacher_Quality', 'Medium'))
        ))
        r_key = cursor.lastrowid

        cursor.execute("""
            INSERT INTO DimBehavior (Motivation_Level, Extracurricular_Activities, Internet_Access, Peer_Influence, Physical_Activity, Sleep_Hours)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            str(row.get('Motivation_Level', 'Medium')),
            str(row.get('Extracurricular_Activities', 'No')),
            str(row.get('Internet_Access', 'Yes')),
            str(row.get('Peer_Influence', 'Neutral')),
            int(row.get('Physical_Activity', 3)),
            int(row.get('Sleep_Hours', 7))
        ))
        b_key = cursor.lastrowid

        cursor.execute("""
            INSERT INTO FactStudentPerformance 
            (Student_Key, Family_Key, Resource_Key, Behavior_Key, Hours_Studied, Attendance_Percentage, Previous_Scores, Exam_Score, GPA, Performance_Band, Risk_Level)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            s_key, f_key, r_key, b_key,
            int(row['Hours_Studied']),
            float(row['Attendance']),
            float(row['Previous_Scores']),
            float(row['Exam_Score']),
            float(row['GPA']),
            str(row['Performance_Band']),
            str(row['Risk_Level'])
        ))

        # JSON cache backup
        dim_student.append({
            "Student_Key": s_key, "Student_ID": stu_id, "Student_Name": stu_name,
            "Gender": str(row.get('Gender', 'Female'))
        })
        dim_family.append({"Family_Key": f_key, "Parental_Education_Level": str(row.get('Parental_Education_Level', 'High School'))})
        dim_resources.append({"Resource_Key": r_key, "Access_to_Resources": str(row.get('Access_to_Resources', 'Medium'))})
        dim_behavior.append({"Behavior_Key": b_key, "Motivation_Level": str(row.get('Motivation_Level', 'Medium'))})
        fact_performance.append({
            "Fact_ID": s_key, "Student_Key": s_key, "Hours_Studied": int(row['Hours_Studied']),
            "Attendance_Percentage": float(row['Attendance']), "Previous_Scores": float(row['Previous_Scores']),
            "Exam_Score": float(row['Exam_Score']), "GPA": float(row['GPA']),
            "Performance_Band": row['Performance_Band'], "Risk_Level": row['Risk_Level']
        })

    conn.commit()
    conn.close()

    warehouse = {
        "metadata": {
            "total_records": len(df),
            "status": "SUCCESS",
            "at_risk_count": int((df['Performance_Band'] == 'At-Risk').sum()),
            "average_count": int((df['Performance_Band'] == 'Average').sum()),
            "high_performing_count": int((df['Performance_Band'] == 'High-Performing').sum()),
            "avg_exam_score": float(round(df['Exam_Score'].mean(), 2)),
            "avg_attendance": float(round(df['Attendance'].mean(), 2))
        },
        "DimStudent": dim_student,
        "DimFamilyBackground": dim_family,
        "DimSchoolResources": dim_resources,
        "DimBehavior": dim_behavior,
        "FactStudentPerformance": fact_performance
    }

    with open(OUTPUT_JSON, 'w') as f:
        json.dump(warehouse, f, indent=2)

    print(f"ETL Execution complete! Database {DB_PATH} populated with {initial_count} records.")
    return warehouse

if __name__ == '__main__':
    clean_and_transform()
