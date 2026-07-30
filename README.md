<div align="center">

<img src="https://via.placeholder.com/180x180.png?text=WUB+CSE+Logo" alt="Project Logo" width="180" height="180" />

# 🎓 Student Performance Analytics & Prediction System

**An enterprise-grade Educational Data Mining (EDM) platform integrating Data Warehousing, Machine Learning, and Modern Web Technologies to predict student outcomes and enable early intervention.**

<br>

<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
<img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-Learn">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
<img src="https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">

<br>
<img src="https://img.shields.io/github/last-commit/sabujshaikh/Student-Performance-Project?style=flat-square&color=blue" alt="Last Commit">
<img src="https://img.shields.io/github/repo-size/sabujshaikh/Student-Performance-Project?style=flat-square&color=orange" alt="Repo Size">
<img src="https://img.shields.io/github/stars/sabujshaikh/Student-Performance-Project?style=flat-square&color=yellow" alt="Stars">
<img src="https://img.shields.io/github/forks/sabujshaikh/Student-Performance-Project?style=flat-square&color=green" alt="Forks">
<img src="https://img.shields.io/github/issues/sabujshaikh/Student-Performance-Project?style=flat-square&color=red" alt="Issues">
<img src="https://img.shields.io/github/license/sabujshaikh/Student-Performance-Project?style=flat-square&color=blueviolet" alt="License">
<img src="https://img.shields.io/badge/Visitors-0-brightgreen?style=flat-square" alt="Visitors">

<br>
<hr style="width: 50%; border: 1px solid #333;">

</div>

## 📑 Table of Contents

- [🎯 About the Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🛠 Technology Stack](#-technology-stack)
- [🏗 System Architecture](#-system-architecture)
- [📂 Folder Structure](#-folder-structure)
- [🚀 Installation Guide](#-installation-guide)
- [⚙️ Configuration](#️-configuration)
- [💻 Usage](#-usage)
- [📸 Screenshots](#-screenshots)
- [🔌 API Documentation](#-api-documentation)
- [🗄 Database Schema](#-database-schema)
- [🧠 Machine Learning Section](#-machine-learning-section)
- [🛡 Security Features](#-security-features)
- [⚡ Performance Optimizations](#-performance-optimizations)
- [🔄 Project Workflow](#-project-workflow)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contributing Guide](#-contributing-guide)
- [🧪 Testing](#-testing)
- [☁️ Deployment](#️-deployment)
- [❓ FAQ](#-faq)
- [🛠 Troubleshooting](#-troubleshooting)
- [📄 License](#-license)
- [🙏 Acknowledgements](#-acknowledgements)
- [📫 Contact](#-contact)
- [💖 Support](#-support)

---

## 🎯 About the Project

**Why this project exists?**  
Academic institutions generate massive amounts of student data (attendance, study habits, socio-economic background), but this data rarely supports systematic early intervention. Instructors identify at-risk students too late—usually after final grades are fixed.

**Problem Statement:**  
Scattered data prevents actionable insights. Manual cross-referencing of spreadsheets is slow, inconsistent, and inefficient.

**Motivation:**  
To bridge the gap between raw educational data and actionable pedagogical interventions by building an integrated Data Warehouse and Machine Learning pipeline.

**Target Users:**  
- 👨‍🏫 **Teachers & Administrators:** To search, monitor, and compare student performance.
- 🧑‍🎓 **Students:** To view personalized analytics and AI-driven improvement suggestions.

**Objectives:**  
1. Design a normalized-to-dimensional data pipeline (Star Schema) for academic reporting.
2. Evaluate and compare Decision Tree, Random Forest, and Logistic Regression algorithms.
3. Deliver a usable, interactive analytics dashboard for non-technical educators.

---

## ✨ Key Features

<table>
  <tr>
    <td width="33%" align="center" style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
      <h3>📊 Data Warehousing</h3>
      <p>Complete Star Schema implementation with Fact and Dimension tables for fast, multi-dimensional analytical querying.</p>
    </td>
    <td width="33%" align="center" style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
      <h3>🤖 AI Predictions</h3>
      <p>Ensemble Machine Learning models predict "At-Risk", "Average", and "High-Performing" bands with confidence scores.</p>
    </td>
    <td width="33%" align="center" style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
      <h3>🔐 Secure RBAC</h3>
      <p>Role-Based Access Control ensuring students only see their data while teachers have global analytics access.</p>
    </td>
  </tr>
  <tr>
    <td width="33%" align="center" style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
      <h3>📈 Interactive UI</h3>
      <p>Premium Glassmorphism design with dynamic charts via Chart.js and Plotly.</p>
    </td>
    <td width="33%" align="center" style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
      <h3>🧩 ETL Pipeline</h3>
      <p>Automated Extract, Transform, Load pipeline handling missing values and feature engineering seamlessly.</p>
    </td>
    <td width="33%" align="center" style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
      <h3>💡 Smart Insights</h3>
      <p>Feature importance analysis provides personalized, actionable suggestions to struggling students.</p>
    </td>
  </tr>
</table>

---

## 🛠 Technology Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?logo=bootstrap&logoColor=white) ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chart.js&logoColor=white) ![Plotly](https://img.shields.io/badge/Plotly-3F4F75?logo=plotly&logoColor=white) |
| **Backend** | ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white) |
| **ML & Data** | ![Scikit-learn](https://img.shields.io/badge/Scikit_Learn-F7931E?logo=scikit-learn&logoColor=white) ![Pandas](https://img.shields.io/badge/Pandas-150458?logo=pandas&logoColor=white) ![NumPy](https://img.shields.io/badge/NumPy-013243?logo=numpy&logoColor=white) |
| **Tools** | ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?logo=visual-studio-code&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white) |

---

## 🏗 System Architecture

<div align="center">

*(Placeholder for high-resolution architecture diagram)*

<img src="https://via.placeholder.com/800x400.png?text=System+Architecture+Diagram" alt="Architecture Diagram" />

</div>

```text
[ User Browser ]
       │
       ▼
[ Frontend (Bootstrap 5, Glassmorphism UI) ]
       │  (HTTP/REST)
       ▼
[ Flask Backend (Routes, Session, Security) ]
       │
       ├──► [ MySQL Data Warehouse ] (Star Schema Query)
       │
       └──► [ ML Pipeline (Scikit-learn) ] (Prediction & Feature Analysis)
               │
               ▼
       [ Analytics & JSON Response ]
```

---

## 📂 Folder Structure

```text
Student_Performance_Project/
│
├── app.py                      # Flask backend main entry point
├── config.py                   # DB & App configurations
├── requirements.txt            # Python dependencies
├── setup_auth.py               # Script to generate hashed users
├── StudentPerformanceFactors.csv # Source dataset
│
├── database/
│   └── schema.sql              # MySQL Star Schema & Auth tables
│
├── etl/
│   └── data_pipeline.py        # ETL: Extract, Clean, Transform, Load
│
├── ml/
│   ├── train_models.py         # Train DT, RF, LR & Evaluate
│   └── predict.py              # Prediction logic & Feature importance
│
├── routes/
│   ├── auth.py                 # Authentication APIs
│   ├── student.py              # Student role APIs
│   ├── teacher.py              # Teacher role APIs
│   └── analytics.py            # Dashboard & Analytics APIs
│
├── templates/                  # Jinja2 HTML Templates
│   ├── base.html
│   ├── login.html
│   ├── student_dashboard.html
│   └── teacher_dashboard.html
│
├── static/
│   ├── css/style.css           # Glassmorphism & Premium UI
│   └── js/main.js              # Chart.js & API logic
│
└── README.md
```

---

## 🚀 Installation Guide

Follow these steps to set up the project locally.

**1. Clone the Repository**
```bash
git clone https://github.com/sabujshaikh/Student-Performance-Project.git
cd Student-Performance-Project
```

**2. Create Virtual Environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

**3. Install Dependencies**
```bash
pip install -r requirements.txt
```

**4. Database Setup**
- Open MySQL Workbench or CLI.
- Run the `database/schema.sql` script to create the database, star schema, and auth tables.

**5. Environment Variables / Configuration**
- Update `config.py` with your MySQL credentials:
```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'your_password',
    'database': 'student_performance_db'
}
```

**6. Run the Pipeline (ETL -> ML -> Auth)**
```bash
# Run ETL to populate Data Warehouse
python etl/data_pipeline.py

# Train Machine Learning Models
python ml/train_models.py

# Generate default Users (Teacher & Student)
python setup_auth.py
```

**7. Run Server**
```bash
python app.py
```
Visit `http://127.0.0.1:5000` in your browser.

---

## ⚙️ Configuration

| File | Purpose |
|------|---------|
| `config.py` | Contains Flask `SECRET_KEY` and MySQL `DB_CONFIG` dictionary. Modify this to match your local database credentials. |
| `database/schema.sql` | Defines the Star Schema. Truncates existing tables if re-run. |
| `requirements.txt` | Pins exact versions of Python libraries for reproducibility. |

---

## 💻 Usage

Once the server is running, log in using the default credentials:

- **Teacher:** `teacher1` / `teacher123`
- **Student:** `student1` / `student123`

**Teacher Flow:**  
After logging in, teachers are presented with global KPIs, ML model accuracy comparisons, and a search bar to query individual student performance and AI predictions.

**Student Flow:**  
Students land on a personalized dashboard displaying their attendance, past scores, AI-predicted performance band, and personalized improvement suggestions based on feature importance.

---

## 📸 Screenshots

<div align="center">

*(Place your high-quality screenshots here)*

<img src="https://via.placeholder.com/400x250.png?text=Login+Page" alt="Login" width="45%" /> &nbsp;
<img src="https://via.placeholder.com/400x250.png?text=Student+Dashboard" alt="Student Dashboard" width="45%" />

<br><br>

<img src="https://via.placeholder.com/400x250.png?text=Teacher+Analytics" alt="Teacher Analytics" width="45%" /> &nbsp;
<img src="https://via.placeholder.com/400x250.png?text=AI+Prediction+Card" alt="Prediction Card" width="45%" />

</div>

---

## 🔌 API Documentation

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| `POST` | `/login` | Authenticates user and creates session | Public |
| `GET` | `/logout` | Clears session | Authenticated |
| `GET` | `/dashboard` | Renders role-specific dashboard | Authenticated |
| `GET` | `/api/kpis` | Returns total students, avg score, band distribution | Teacher |
| `GET` | `/api/search_student?q={id}` | Fetches specific student data and metrics | Teacher |

**Example Response (`/api/kpis`):**
```json
{
  "total_students": 1000,
  "avg_score": 76.5,
  "bands": [
    {"Performance_Band": "High-Performing", "count": 400},
    {"Performance_Band": "Average", "count": 450},
    {"Performance_Band": "At-Risk", "count": 150}
  ]
}
```

---

## 🗄 Database Schema

This project utilizes a **Star Schema** for optimized analytical queries.

<div align="center">
<img src="https://via.placeholder.com/600x300.png?text=ER+Diagram+Placeholder" alt="ER Diagram" />
</div>

- **Fact Table:** `FactStudentPerformance` (Stores metrics like Exam_Score, Performance_Band).
- **Dimension Tables:** `DimStudent`, `DimFamilyBackground`, `DimSchoolResources`, `DimBehavior`.
- **Auth Table:** `Users` (Stores hashed passwords and roles).

---

## 🧠 Machine Learning Section

- **Dataset:** Student Performance Factors (6,607 records, 20 attributes).
- **Preprocessing:** Label Encoding for categoricals, median imputation for numerics.
- **Data Leakage Prevention:** `Exam_Score` is strictly excluded from features (`X`) as it is the source of the target variable (`y`).
- **Algorithms:** Decision Tree, Random Forest, Logistic Regression.
- **Evaluation Metrics:** Accuracy, Precision, Recall, F1-Score, Confusion Matrix.
- **Prediction Flow:** Input data -> Encoding -> Best Model Prediction -> Probability Extraction -> Feature Importance Mapping -> Suggestion Generation.

---

## 🛡 Security Features

- 🔑 **Password Hashing:** Uses Werkzeug's PBKDF2 with SHA-256.
- 🛑 **SQL Injection Protection:** Parameterized queries used exclusively in MySQL connector.
- 🚷 **Role-Based Access Control (RBAC):** Flask sessions enforce strict teacher vs. student routing.
- 🛡 **XSS & CSRF Protection:** Security headers (`X-Content-Type-Options`, `X-Frame-Options`) applied globally.
- 🔒 **Session Management:** Secure session handling with secret keys.

---

## ⚡ Performance Optimizations

- **Star Schema Design:** Eliminates complex joins, speeding up dashboard KPI queries.
- **Stratified Sampling:** Used in ML train/test split to maintain class distribution balance.
- **Model Caching:** Trained ML models are serialized using `joblib`, reducing prediction latency.
- **Vectorized Operations:** Pandas/NumPy used for ETL transformations, avoiding slow Python loops.

---

## 🔄 Project Workflow

1. **Development Flow:** Git branching -> Code -> Test locally -> PR.
2. **Request Lifecycle:** User Request -> Flask Route -> Session Check -> DB/ML Query -> JSON/Template Render.
3. **Prediction Lifecycle:** User Input -> Data Encoding -> Model Inference -> Confidence Calculation -> Suggestion Engine -> UI Display.

---

## 🗺 Roadmap

- [x] Core Data Warehouse & ETL Implementation
- [x] Machine Learning Model Training & Comparison
- [x] Flask Backend & Authentication
- [x] Glassmorphism Frontend UI
- [ ] Power BI Integration for Advanced BI Reporting
- [ ] Docker containerization
- [ ] Automated Unit Testing (pytest)
- [ ] LLM-based natural language student feedback generation

---

## 🤝 Contributing Guide

Contributions make the open-source community an amazing place to learn and create. Any contributions you make are **greatly appreciated**.

1. **Fork** the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

*Please ensure your code adheres to PEP 8 standards.*

---

## 🧪 Testing

Currently, testing is performed manually via UI interaction and API verification. Future implementations will include:
- **Unit Testing:** `pytest` for ML prediction and ETL functions.
- **Integration Testing:** Database connection and schema validation scripts.
- **Manual Testing Command:** `python app.py` -> Verify endpoints via Postman/Browser.

---

## ☁️ Deployment

To deploy this application in a production environment:

- **Render / Railway:** Connect GitHub repo, set build command `pip install -r requirements.txt`, and start command `python app.py`. Add MySQL as an add-on.
- **Docker:** *(Planned)* Create a `Dockerfile` using `python:3.10-slim` base image.
- **VPS (AWS EC2 / DigitalOcean):** Use Gunicorn to serve the Flask app behind an Nginx reverse proxy.

---

## ❓ FAQ

**Q: I'm getting a MySQL connection error. What should I do?**  
A: Verify that your MySQL server is running and that the credentials in `config.py` are correct.

**Q: The ML model accuracy is 100%. Why?**  
A: This was a known issue due to Data Leakage (passing `Exam_Score` as a feature). It has been fixed in the latest commit by removing `Exam_Score` from the feature set.

---

## 🛠 Troubleshooting

- **`ModuleNotFoundError`**: Ensure you have activated your virtual environment and installed `requirements.txt`.
- **`Access denied for user`**: Check your MySQL credentials in `config.py`.
- **`FileNotFoundError: models/student_performance_model.pkl`**: Run `python ml/train_models.py` first to generate the model.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- [Kaggle Dataset: Student Performance Factors](https://www.kaggle.com/datasets)
- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- World University of Bangladesh - Department of CSE

---

## 📫 Contact

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/GitHub-sabujshaikh-181717?style=for-the-badge&logo=github" /><br>
      <a href="https://github.com/sabujshaikh">sabujshaikh</a>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Email-Send_Mail-D14836?style=for-the-badge&logo=gmail&logoColor=white" /><br>
      <a href="mailto:your.email@example.com">your.email@example.com</a>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" /><br>
      <a href="https://linkedin.com/in/yourprofile">yourprofile</a>
    </td>
  </tr>
</table>

</div>

---

## 💖 Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

<div align="center">
<a href="https://github.com/sabujshaikh/Student-Performance-Project">
  <img src="https://img.shields.io/badge/Give_a_Star-⭐-yellow?style=for-the-badge" alt="Star Repo">
</a>
<a href="https://github.com/sabujshaikh/Student-Performance-Project/fork">
  <img src="https://img.shields.io/badge/Fork_Project-🍴-blue?style=for-the-badge" alt="Fork Repo">
</a>
</div>

<br>

<div align="center">
  <hr style="width: 50%; border: 1px solid #333;">
  
  Made with ❤️ by **Sabuj Shaikh**
  
  © 2026 All Rights Reserved
</div>
