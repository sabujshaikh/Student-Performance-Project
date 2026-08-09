<div align="center">

  <img src="https://www.clipartmax.com/png/small/272-2722209_world-university-of-bangladesh.png" alt="World University of Bangladesh Logo" width="120" height="120" />

  # 🎓 Student Performance Analytics & ML Risk Predictor
  ### Enterprise Star Schema Data Warehouse & Machine Learning Platform

  <p align="center">
    <strong>Department of Computer Science & Engineering • World University of Bangladesh</strong><br>
    <em>Course: Data Warehouse and Data Mining LAB (CSE 06124160) | Batch-66D</em>
  </p>

  <p align="center">
    <a href="https://github.com/sabujshaikh/Student-Performance-Project">
      <img src="https://readme-typing-svg.herokuapp.com?font=Plus+Jakarta+Sans&weight=700&size=20&duration=3000&pause=1000&color=4F46E5&center=true&vCenter=true&width=650&lines=End-to-End+Star+Schema+Data+Warehouse;89.4%25+Accuracy+Random+Forest+ML+Classifier;Role-Based+Student+%26+Teacher+Portals;Automated+ETL+Pipeline+%26+Live+SQL+Studio" alt="Typing Banner" />
    </a>
  </p>

  <!-- Badges -->
  <p align="center">
    <a href="https://github.com/sabujshaikh/Student-Performance-Project/stargazers"><img src="https://img.shields.io/github/stars/sabujshaikh/Student-Performance-Project?style=for-the-badge&color=amber&logo=github" alt="Stars"></a>
    <a href="https://github.com/sabujshaikh/Student-Performance-Project/network/members"><img src="https://img.shields.io/github/forks/sabujshaikh/Student-Performance-Project?style=for-the-badge&color=indigo&logo=github" alt="Forks"></a>
    <a href="https://github.com/sabujshaikh/Student-Performance-Project/issues"><img src="https://img.shields.io/github/issues/sabujshaikh/Student-Performance-Project?style=for-the-badge&color=rose&logo=github" alt="Issues"></a>
    <a href="https://github.com/sabujshaikh/Student-Performance-Project/blob/main/LICENSE"><img src="https://img.shields.io/github/license/sabujshaikh/Student-Performance-Project?style=for-the-badge&color=emerald&logo=open-source-initiative" alt="License"></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Python-3.10%2B-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
    <img src="https://img.shields.io/badge/Flask-2.3%2B-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask">
    <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Scikit--Learn-1.2%2B-F7931E?style=flat-square&logo=scikitlearn&logoColor=white" alt="Scikit-Learn">
    <img src="https://img.shields.io/badge/MySQL-Star_Schema-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL">
    <img src="https://img.shields.io/badge/SQLite-Warehouse-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite">
  </p>

  <p align="center">
    <a href="#-about-the-project"><strong>Explore System</strong></a> •
    <a href="#-key-features"><strong>Features</strong></a> •
    <a href="#-machine-learning-benchmark"><strong>ML Models</strong></a> •
    <a href="#-data-warehouse-star-schema"><strong>Data Warehouse</strong></a> •
    <a href="#-rest-api-documentation"><strong>API Docs</strong></a> •
    <a href="#-quick-start--installation"><strong>Installation</strong></a>
  </p>

</div>

---

## 📋 Table of Contents

- [📌 About the Project](#-about-the-project)
  - [Problem Statement](#problem-statement)
  - [Solution & Objectives](#solution--objectives)
- [🌐 Live Demo & Credentials](#-live-demo--credentials)
- [✨ Key Features](#-key-features)
- [💻 Technology Stack](#-technology-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [⚡ Quick Start & Installation](#-quick-start--installation)
- [📡 REST API Documentation](#-rest-api-documentation)
- [🗄️ Data Warehouse (Star Schema)](#️-data-warehouse-star-schema)
- [🤖 Machine Learning & Benchmark](#-machine-learning--benchmark)
- [👥 Authors & Project Team](#-authors--project-team)
- [📄 License & Declaration](#-license--declaration)

---

## 📌 About the Project

### Problem Statement
Higher education institutions often struggle to identify at-risk students before final examinations. Traditional academic monitoring relies on end-of-term evaluations, which frequently arrive too late for effective intervention, counseling, or tutoring. Furthermore, academic data is usually scattered across disconnected registration systems, LMS platforms, and manual attendance logs.

### Solution & Objectives
The **Student Performance Analytics & ML Risk Predictor** is an enterprise-grade academic intelligence solution built for the Department of Computer Science & Engineering at **World University of Bangladesh (WUB)**. This platform combines:

1. **Multidimensional Data Warehousing**: A robust Star Schema data warehouse (MySQL/SQLite) storing 6,607 comprehensive student records.
2. **Predictive Machine Learning Engine**: A highly accurate ML pipeline utilizing Scikit-Learn to predict student risk levels with **89.4% accuracy**.
3. **Role-Based Interactive Portals**: Tailored dashboards for **Students** (personalized transcripts & GPA trends) and **Faculty** (cohort analytics, risk flags, and grade management).
4. **Automated ETL Pipeline**: A fully automated Python-based pipeline for data extraction, cleaning, imputation, and loading into the warehouse.

---

## 🌐 Live Demo & Credentials

> 🔗 **Live Application**: [WUB Student Performance Portal](https://wubstudent.vercel.app)  
> 📁 **GitHub Repository**: [sabujshaikh/Student-Performance-Project](https://github.com/sabujshaikh/Student-Performance-Project)

### Role-Based Testing Credentials

| Portal View | Username / ID | Password | Access Level & Permissions |
| :--- | :--- | :--- | :--- |
| **Teacher Portal** | `teacher` | `password` | **Full Faculty Access**: Cohort Analytics, Grade Editor, SQL Studio, Risk Alerts |
| **Student Portal** | `4070` | *(any)* | **Student View (Sabuj Shaikh)**: Personalized Transcript, GPA History, PDF Download |
| **Student Portal** | `4069` | *(any)* | **Student View (Md Nazim Uddin)**: Personalized Transcript, GPA History, PDF Download |

---

## ✨ Key Features

- **⭐ Star Schema Data Warehouse**: Centralized `FactStudentPerformance` table surrounded by 4 dimension tables enabling sub-second OLAP queries.
- **🤖 Scikit-Learn ML Predictor**: Powered by a Random Forest Classifier achieving 89.4% accuracy to categorize students into High, Moderate, or Low Risk.
- **🎓 Personalized Student Portal**: Strict role-based isolation showing individual GPA history, attendance, and subject-wise breakdowns.
- **📄 PDF Transcript Generation**: Built-in `html2canvas` & `jsPDF` engine to generate downloadable, university-branded official transcripts.
- **👩‍🏫 Teacher Management Console**: Intuitive interface for searching students, modifying grades, and comparing student performance side-by-side.
- **🗄️ Interactive SQL Studio**: A live, browser-based SQL terminal to query the data warehouse and monitor ETL logs.

---

## 💻 Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19.0, TypeScript 5.8, Vite 6.2, Tailwind CSS v4 |
| **Data Visualization** | Chart.js 4.5, React-ChartJS-2 5.3 |
| **Backend API** | Python Flask 2.3, Node.js (Express) |
| **Machine Learning** | Scikit-Learn 1.2, Pandas 2.0, NumPy 1.24 |
| **Database** | MySQL 8.0, SQLite 3 (Star Schema) |

---

## 🏗️ System Architecture

### Data Pipeline
```mermaid
graph TD
    A[Raw Dataset] -->|Extract| B[Python ETL Pipeline]
    B -->|Clean & Transform| C[Derived Metrics & Encoding]
    C -->|Load| D[(Star Schema Data Warehouse)]
    D -->|OLAP Views| E[Flask REST API]
    E -->|JSON Response| F[React 19 Presentation Layer]
