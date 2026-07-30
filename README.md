<!-- 
================================================================
  README.md - Student Performance Analytics & Prediction System
  World University of Bangladesh | Dept. of CSE | Batch-66D
================================================================
-->

<h1 align="center">
  <br>
  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/06/World_University_of_Bangladesh_logo.png/200px-World_University_of_Bangladesh_logo.png" alt="WUB Logo" width="120">
  <br>
  Student Performance Analytics & Prediction System
  <br>
  <sub><sup>Data Warehouse + Data Mining · End-to-End Analytics Pipeline</sup></sub>
  <br>
</h1>

<p align="center">
  <strong>
    🎓 World University of Bangladesh &nbsp;|&nbsp; Department of Computer Science &amp; Engineering
  </strong>
  <br>
  <em>Batch-66D · Course: Data Warehouse and Data Mining LAB (CSE 06124160)</em>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-quick-setup">Quick Setup</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-team">Team</a>
</p>

<hr>

<!-- ============================================================ -->
<!--  BADGES / STATUS
<!-- ============================================================ -->

<p align="center">
  <img src="https://img.shields.io/badge/status-production--ready-brightgreen?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/python-3.9+-blue?style=flat-square&logo=python" alt="Python">
  <img src="https://img.shields.io/badge/node-18+-green?style=flat-square&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/mysql-8.0-orange?style=flat-square&logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome">
</p>

<hr>

<!-- ============================================================ -->
<!--  DESCRIPTION
<!-- ============================================================ -->

## 📖 Overview

> **An end-to-end Data Warehouse (Star Schema) and Data Mining solution for student academic performance analytics and risk prediction.**

Academic institutions collect vast amounts of student data — attendance, study habits, assessment scores, socio-economic background — yet this data remains scattered across disconnected systems. This project bridges that gap by building a **complete analytics pipeline** that consolidates raw records into a query‑friendly star‑schema warehouse and layers **three machine learning models** on top to predict at‑risk students before final grades are locked.

The system delivers a **dual‑portal web application** (Student + Teacher) with real‑time prediction, interactive dashboards, and a model benchmarking suite — all powered by a Python Flask backend and a modern React/TypeScript frontend.

---

## ✨ Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>📊 Data Warehouse</h3>
      <ul>
        <li>✅ <strong>Star Schema</strong> – 1 Fact Table + 4 Dimension Tables</li>
        <li>✅ <strong>ETL Pipeline</strong> – Cleans 6,607 student records</li>
        <li>✅ Handles missing values &amp; encodes categorical attributes</li>
        <li>✅ Derives GPA &amp; Performance Bands (High/Average/At‑Risk)</li>
        <li>✅ MySQL database with full referential integrity</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🧠 Machine Learning</h3>
      <ul>
        <li>✅ <strong>3 Classifiers</strong> – Decision Tree, Random Forest, Logistic Regression</li>
        <li>✅ Model comparison: Accuracy, Precision, Recall, F1‑Score</li>
        <li>✅ <strong>Best Model:</strong> Random Forest — <code>89.4%</code> Accuracy</li>
        <li>✅ Feature Importance ranking</li>
        <li>✅ 3×3 Confusion Matrices for each model</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>👨‍🎓 Student Portal</h3>
      <ul>
        <li>✅ Academic transcript with GPA/CGPA trends</li>
        <li>✅ Subject‑wise marks &amp; attendance view</li>
        <li>✅ Real‑time <strong>risk status</strong> with confidence score</li>
        <li>✅ Personalized improvement suggestions</li>
        <li>✅ Downloadable PDF report</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>👨‍🏫 Teacher Management Portal</h3>
      <ul>
        <li>✅ Search &amp; view any student’s full academic record</li>
        <li>✅ Update marks / attendance</li>
        <li>✅ Side‑by‑side student comparison</li>
        <li>✅ Class‑level analytics &amp; performance distribution</li>
        <li>✅ Generate class reports</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🎯 Live Prediction Engine</h3>
      <ul>
        <li>✅ Slider‑based inputs for study hours, attendance, etc.</li>
        <li>✅ Instant ML prediction with risk confidence</li>
        <li>✅ Personalized <strong>improvement suggestions</strong></li>
        <li>✅ Probability distribution across all three bands</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>📈 Dashboard &amp; Analytics</h3>
      <ul>
        <li>✅ KPI cards (Avg GPA, At‑Risk Count, etc.)</li>
        <li>✅ GPA trend charts (Plotly)</li>
        <li>✅ Performance band distribution (Chart.js)</li>
        <li>✅ Feature Importance bar chart</li>
        <li>✅ Model comparison benchmark suite</li>
        <li>✅ Interactive SQL query inspector</li>
        <li>✅ Visual ETL log runner</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-learn">
  <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" alt="Pandas">
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" alt="Chart.js">
  <img src="https://img.shields.io/badge/Plotly-3F4F75?style=for-the-badge&logo=plotly&logoColor=white" alt="Plotly">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
</p>

| Layer           | Technologies |
|-----------------|--------------|
| **Backend**     | Python 3.9+, Flask, SQLAlchemy, Flask-Login |
| **Database**    | MySQL 8.0 (Star Schema) |
| **Machine Learning** | Scikit-learn, Pandas, NumPy, Joblib |
| **Frontend**    | React 18, TypeScript, Vite, Chart.js, Plotly |
| **Styling**     | Bootstrap 5, CSS3, Glassmorphism |
| **DevOps**      | Git, GitHub, pip, npm |

---

## 🏗️ Architecture
