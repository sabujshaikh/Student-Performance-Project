# Student Performance Analytics and Prediction System
## Using Data Warehouse (Star Schema) and Data Mining

### World University of Bangladesh (WUB)
**Department of Computer Science & Engineering**
- **Course**: Data Warehouse and Data Mining LAB (CSE 06124160)
- **Submission Date**: 19 July 2026

---

## Team Members & Responsibilities (Batch-66D)

| Name | Roll No | Role | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Sabuj Shaikh** | 4070 | Data Engineer / Team Lead | MySQL Star Schema design, Python ETL pipeline, project coordination |
| **Md Nazim Uddin** | 4069 | Machine Learning Engineer | Scikit-learn ML models (DT, RF, LR), model comparison, feature importance |
| **Wafa Ahmed** | 4072 | Backend / Integration Developer | Flask REST API, authentication, database connection & routing |
| **Nadia Akter Luna** | 4073 | Frontend / Visualisation Developer | Dashboard UI (Bootstrap 5 / Tailwind, Chart.js, Plotly), prediction forms |

**Supervisor**: Md Tanzim Hossain (Lecturer, Dept of CSE, World University of Bangladesh)

---

## System Architecture

```
[ Raw CSV Dataset: StudentPerformanceFactors.csv (6,607 records) ]
                                 │
                                 ▼
                    [ Python ETL Pipeline ]
       (Clean Missing Values, Categorical Encoding, Derive GPA & Bands)
                                 │
                                 ▼
           [ MySQL Star Schema Data Warehouse: wub_student_dw ]
   ┌──────────────────────┬──────────────────────┬──────────────────────┐
   │     DimStudent       │ DimFamilyBackground  │ DimSchoolResources   │
   ├──────────────────────┼──────────────────────┼──────────────────────┤
   │     DimBehavior      │             FactStudentPerformance          │
   └──────────────────────┴──────────────────────┴──────────────────────┘
                                 │
                                 ▼
               [ Machine Learning Engine (Scikit-Learn) ]
       ├── Random Forest Classifier (Accuracy: 89.4% - Best Model)
       ├── Decision Tree Classifier (Accuracy: 84.2%)
       └── Logistic Regression (Accuracy: 79.8%)
                                 │
                                 ▼
                   [ Flask / Express REST API ]
     (/api/auth, /api/students, /api/prediction, /api/warehouse, /api/analytics)
                                 │
                                 ▼
             [ Web Dashboard Presentation Layer ]
  (Student Portal, Teacher Management, Live Prediction, Chart.js & Plotly)
```

---

## Data Warehouse Design (Star Schema)

### Fact Table: `FactStudentPerformance`
- `Fact_ID`: Primary Key
- `Student_Key`: Foreign Key -> `DimStudent`
- `Family_Key`: Foreign Key -> `DimFamilyBackground`
- `Resource_Key`: Foreign Key -> `DimSchoolResources`
- `Behavior_Key`: Foreign Key -> `DimBehavior`
- Measures: `Hours_Studied`, `Attendance_Percentage`, `Previous_Scores`, `Exam_Score`, `GPA`, `Performance_Band`, `Risk_Level`

### Dimension Tables
1. `DimStudent`: `Student_Key`, `Student_ID`, `Student_Name`, `Gender`, `Distance_from_Home`, `Learning_Disabilities`
2. `DimFamilyBackground`: `Family_Key`, `Parental_Involvement`, `Parental_Education_Level`, `Family_Income`
3. `DimSchoolResources`: `Resource_Key`, `Access_to_Resources`, `Tutoring_Sessions`, `School_Type`, `Teacher_Quality`
4. `DimBehavior`: `Behavior_Key`, `Motivation_Level`, `Extracurricular_Activities`, `Internet_Access`, `Peer_Influence`, `Physical_Activity`, `Sleep_Hours`

---

## Machine Learning Pipeline & Benchmark

| Algorithm | Accuracy | Precision | Recall | F1-Score | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Random Forest Classifier** | **89.4%** | **0.887** | **0.892** | **0.889** | **Selected Best Model** |
| **Decision Tree Classifier** | 84.2% | 0.835 | 0.838 | 0.836 | Benchmark |
| **Logistic Regression** | 79.8% | 0.789 | 0.792 | 0.790 | Linear Baseline |

### Feature Importance Ranking
1. **Attendance Percentage**: 32.5%
2. **Hours Studied**: 24.5%
3. **Previous Exam Scores**: 18.5%
4. **Access to Resources**: 8.2%
5. **Tutoring Sessions**: 6.4%
6. **Parental Involvement**: 4.8%
7. **Motivation Level**: 3.1%
8. **Teacher Quality**: 2.0%

---

## REST API Documentation

### Authentication
- `POST /api/auth/login`: Authenticate Student or Teacher with Role-Based Access Control

### Student & Teacher
- `GET /api/students`: Fetch all student records with filters
- `GET /api/students/:id`: Fetch individual student academic transcript and live prediction
- `POST /api/students/:id/update`: Update student marks or attendance

### Machine Learning & Prediction
- `POST /api/prediction/predict`: Predict student exam score, performance band, risk level, confidence, and personalized improvement plan
- `GET /api/prediction/benchmark`: Retrieve model comparison metrics, confusion matrices, and feature importance

### Data Warehouse & Analytics
- `GET /api/warehouse/analytics`: Execute star schema dimensional aggregation queries
- `POST /api/etl/run`: Trigger ETL pipeline execution and view transformation logs

---

## Quick Start Guide

### Running with Python & Flask
```bash
pip install -r requirements.txt
python etl_pipeline.py
python train_models.py
python app.py
```

### Running with Node.js Full-Stack Applet
```bash
npm install
npm run dev
```

---

## License & University Declaration
Developed as a semester project for the Data Warehouse and Data Mining Lab at **World University of Bangladesh**, Department of Computer Science & Engineering.
