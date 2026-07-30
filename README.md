# Student Performance Analytics and Prediction System
### World University of Bangladesh - Department of Computer Science & Engineering

An end-to-end Data Warehouse (Star Schema) and Data Mining solution for student academic performance analytics and risk prediction.

## Features
- **Star Schema Data Warehouse**: MySQL database design with FactTable (`FactStudentPerformance`) and 4 Dimensions (`DimStudent`, `DimFamilyBackground`, `DimSchoolResources`, `DimBehavior`).
- **Python ETL Pipeline**: Cleans 6,607 student records, imputes missing values, encodes categorical attributes, and derives GPA & Performance Bands.
- **Machine Learning Engine**: Trains and compares Decision Tree (84.2%), Random Forest (89.4% - Best Model), and Logistic Regression (79.8%).
- **Interactive Web Dashboard**:
  - **Student Portal**: Academic transcript, GPA/CGPA trends, subject marks, attendance, risk status, downloadable PDF report.
  - **Teacher Management Portal**: Search, update marks/attendance, side-by-side student comparison, class analytics.
  - **Live Prediction Engine**: Real-time slider inputs with instant ML prediction, risk confidence, and personalized improvement suggestions.
  - **Model Benchmark Suite**: Accuracy, Precision, Recall, F1 comparison, 3x3 Confusion Matrices, Feature Importance ranking.
  - **Data Warehouse Studio**: Interactive SQL Query inspector and visual ETL log runner.

## Quick Setup
1. **Node.js Web App**:
   ```bash
   npm install
   npm run dev
   ```
2. **Python Flask Backend**:
   ```bash
   pip install -r requirements.txt
   python etl_pipeline.py
   python train_models.py
   python app.py
   ```

Developed by Batch-66D: Sabuj Shaikh, Md Nazim Uddin, Wafa Ahmed, Nadia Akter Luna.
Supervised by Lecturer Md Tanzim Hossain, Department of CSE, World University of Bangladesh.
