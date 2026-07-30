# 🎓 Student Performance Prediction & Analytics System

---

## 📌 Table of Contents

* [About the Project](https://www.google.com/search?q=%23-about-the-project)
* [Key Features](https://www.google.com/search?q=%23-key-features)
* [Technology Stack](https://www.google.com/search?q=%23-technology-stack)
* [System Architecture](https://www.google.com/search?q=%23-system-architecture)
* [Folder Structure](https://www.google.com/search?q=%23-folder-structure)
* [Installation Guide](https://www.google.com/search?q=%23-installation-guide)
* [Configuration](https://www.google.com/search?q=%23-configuration)
* [Usage](https://www.google.com/search?q=%23-usage)
* [Screenshots](https://www.google.com/search?q=%23-screenshots)
* [API Documentation](https://www.google.com/search?q=%23-api-documentation)
* [Database Schema](https://www.google.com/search?q=%23-database-schema)
* [Machine Learning Section](https://www.google.com/search?q=%23-machine-learning-section)
* [Security Features](https://www.google.com/search?q=%23-security-features)
* [Performance Optimizations](https://www.google.com/search?q=%23-performance-optimizations)
* [Project Workflow](https://www.google.com/search?q=%23-project-workflow)
* [Roadmap](https://www.google.com/search?q=%23-roadmap)
* [Contributing Guide](https://www.google.com/search?q=%23-contributing-guide)
* [Testing](https://www.google.com/search?q=%23-testing)
* [Deployment](https://www.google.com/search?q=%23-deployment)
* [FAQ](https://www.google.com/search?q=%23-faq)
* [Troubleshooting](https://www.google.com/search?q=%23-troubleshooting)
* [License](https://www.google.com/search?q=%23-license)
* [Acknowledgements](https://www.google.com/search?q=%23-acknowledgements)
* [Contact](https://www.google.com/search?q=%23-contact)
* [Support](https://www.google.com/search?q=%23-support)

---

## 🎯 About the Project

### Why This Project Exists

In modern academic institutions, predicting student outcomes early allows educators to intervene proactively, reduce dropout rates, and tailor educational paths. The **Student Performance Prediction & Analytics System** was engineered to provide a unified, full-stack intelligence platform that bridges raw educational data and predictive machine learning.

### Problem Statement

Educational institutions often struggle with fragmented data silos where academic scores, study behaviors, and attendance patterns are recorded separately. This separation delays identification of at-risk students who require academic support.

### Motivation

The system was motivated by the need for an integrated web ecosystem combining a high-performance modern user interface (React + Vite) with a robust machine learning inference backend (Flask + Scikit-Learn) backed by an optimized embedded relational engine (SQLite).

### Target Users

* **Students:** To track their individual academic trajectory, evaluate predicted performance metrics, and view performance dashboards.
* **Faculty & Administrators:** To monitor class performance, execute warehouse analytic queries, benchmark models, and evaluate student success factors.

### Objectives

1. Provide real-time inference using pre-trained regression and classification models (`student_model.pkl`).
2. Implement a dual-portal architecture separating student and teacher roles.
3. Integrate an embedded data warehouse environment (`wub_student_dw.db`) for deep SQL analytics.

---

## ✨ Key Features

---

## 🛠️ Technology Stack

| Layer | Technologies & Tools |
| --- | --- |
| **Frontend** | React, Vite, TypeScript/JavaScript, Tailwind CSS, HTML5 |
| **Backend** | Python, Flask, RESTful API Architecture |
| **Machine Learning** | Scikit-Learn, Joblib, Pandas, NumPy |
| **Database & Warehouse** | SQLite (`wub_student_dw.db`), SQL, JSON data stores |
| **Development & DevOps** | Git, GitHub Desktop, Node.js, npm, Python venv |

---

## 🏗️ System Architecture

```text
 ┌──────────────┐     HTTP / REST     ┌──────────────┐     Internal API     ┌──────────────┐
 │     User     │ ──────────────────> │ React Client │ ──────────────────> │ Flask Server │
 └──────────────┘                     └──────────────┘                      └──────────────┘
                                                                                   │
                                                                       ┌───────────┴───────────┐
                                                                       ▼                       ▼
                                                              ┌─────────────────┐     ┌─────────────────┐
                                                              │ ML Engine (PKL) │     │ SQLite Warehouse│
                                                              └─────────────────┘     └─────────────────┘

```

---

## 📁 Folder Structure

```text
Student_Performance_Project/
│
├── assets/                  # UI branding assets and design elements
├── data/                    # Datasets, ML models, and warehouse files
│   ├── StudentPerformanceFactors.csv
│   ├── student_model.pkl    # Trained Machine Learning Model
│   ├── model_evaluation.json
│   └── wub_student_dw.db    # Embedded SQLite Data Warehouse
│
├── src/                     # React Frontend Application
│   ├── backend/             # Client-side utility engines and mock handlers
│   ├── components/          # Modular views (Dashboards, Portals, Studios)
│   ├── App.tsx              # Main routing and root layout
│   └── main.tsx             # Application entry point
│
├── app.py                   # Flask Backend API Server
├── etl_pipeline.py          # Data Extraction & Transformation Pipeline
├── train_models.py          # Model Training Script
├── schema.sql               # Database Schema Definitions
└── requirements.txt         # Python Package Dependencies

```

---

## ⚙️ Installation Guide

Follow these step-by-step commands to set up the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/sabujshaikh/Student-Performance-Project.git
cd Student-Performance-Project

# 2. Set up Python Virtual Environment
python -m venv venv

# 3. Activate Virtual Environment
# On Windows:
venv\Scripts\activate
# On Linux / macOS:
source venv/bin/activate

# 4. Install Backend Dependencies
pip install -r requirements.txt

# 5. Install Frontend Dependencies
npm install

```

---

## 🔧 Configuration

The application operates out-of-the-box with embedded configurations:

* **Database:** Uses local SQLite (`data/wub_student_dw.db`). No external XAMPP or MySQL server configuration is required[cite: 1].
* **Environment Variables:** Optional custom port settings can be adjusted directly in `app.py`.
* **Model Parameters:** Pre-trained binary weights are stored securely in `data/student_model.pkl`.

---

## 🚀 Usage

To launch the full system locally, execute the backend and frontend servers in separate terminal windows:

1. **Start the Flask Backend API:**
```bash
python app.py

```


2. **Start the React Frontend Development Server:**
```bash
npm run dev

```


3. Open your browser and navigate to `http://localhost:3000` (or the port provided by Vite).

---

## 🖼️ Screenshots

| Login Portal | Student Dashboard |
| --- | --- |
| *[Login Interface Placeholder]* | *[Student Portal View Placeholder]* |
| **Faculty Analytics Studio** | **Model Benchmark View** |
| *[Data Warehouse Studio Placeholder]* | *[Evaluation Metrics Placeholder]* |

---

## 🔌 API Documentation

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `GET` | `/api/health` | None | Verifies server and database health status |
| `POST` | `/api/predict` | Optional | Submits student factors for real-time ML score prediction |
| `GET` | `/api/warehouse/query` | Session | Executes analytical queries against SQLite data warehouse |
| `GET` | `/api/evaluation` | None | Retrieves model precision, recall, and evaluation metrics |

---

## 🗄️ Database Schema

The platform relies on an optimized relational schema implemented in SQLite (`wub_student_dw.db`):

* **`students`**: Stores core profile data, credentials, and demographic markers.
* **`performance_factors`**: Records attendance rates, study hours, previous grades, and extracurricular involvement.
* **`analytics_warehouse`**: Aggregated dimensional data designed for rapid querying and reporting.

---

## 🤖 Machine Learning Section

* **Dataset:** `StudentPerformanceFactors.csv` containing multi-variable student behavioral and academic indicators.
* **Training Pipeline:** Managed via `train_models.py`, executing data cleansing, feature scaling, and model fitting.
* **Model Artifact:** Serialized using Joblib into `data/student_model.pkl` for instantaneous runtime inference.
* **Evaluation:** Tracked via `model_evaluation.json` measuring regression accuracy and classification error metrics.

---

## 🛡️ Security Features

* **Input Validation:** Strict payload sanitation on both frontend forms and Flask backend routes.
* **Password Security:** Secure cryptographic hashing for user authentication.
* **CORS Management:** Controlled cross-origin resource sharing configuration between Vite and Flask.
* **Session Protection:** Secure state management across student and teacher portal sessions.

---

## ⚡ Performance Optimizations

* **Embedded Relational Storage:** SQLite eliminates network latency associated with external database daemons.
* **Client-Side Bundling:** Vite powers lightning-fast HMR and optimized production asset bundling.
* **Lightweight Inference:** Pre-compiled `.pkl` artifacts enable sub-millisecond model scoring.

---

## 🔄 Project Workflow

1. **Data Ingestion:** Raw metrics pass through `etl_pipeline.py` for normalization.
2. **Model Training:** Scripted execution via `train_models.py` updates prediction weights.
3. **Request Lifecycle:** User input captured via React UI $\rightarrow$ Sent to Flask REST API $\rightarrow$ Evaluated by ML model / Queried from SQLite $\rightarrow$ Rendered on dashboard.

---

## 🗺️ Roadmap

* [x] Establish dual-portal React frontend architecture
* [x] Integrate Flask backend with Scikit-Learn inference engine
* [x] Implement SQLite data warehouse and query studio
* [ ] Add export capabilities for PDF performance reports
* [ ] Implement role-based JWT authentication layers

---

## 🤝 Contributing Guide

Contributions are always welcome! Please follow these steps:

1. Fork the repository (`https://github.com/sabujshaikh/Student-Performance-Project/fork`)
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🧪 Testing

* **Unit Testing:** Validates modular utility functions and endpoint responses.
* **Integration Testing:** Ensures seamless communication between React components and Flask APIs.
* **Manual Testing:** Conducted across portal workflows and data studio query execution.

---

## 🚢 Deployment

The project can be deployed seamlessly across modern hosting providers:

* **Backend:** Deployable on Render, Railway, or AWS EC2 via Gunicorn.
* **Frontend:** Deployable on Vercel, Netlify, or GitHub Pages.
* **Containerization:** Compatible with custom Docker configurations.

---

## ❓ FAQ

**Q: Do I need XAMPP or MySQL installed to run this project?**

A: No, the application utilizes an embedded SQLite database (`wub_student_dw.db`), requiring no external database server[cite: 1].

**Q: Can I train the model with custom datasets?**

A: Yes, replacing `StudentPerformanceFactors.csv` and running `python train_models.py` will regenerate the model artifact.

---

## 🛠️ Troubleshooting

* **`ModuleNotFoundError`:** Ensure your virtual environment is active and run `pip install -r requirements.txt`.
* **Port Conflict:** If port `5000` is occupied, update the port parameter inside `app.py`.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

* World University of Bangladesh (WUB) academic framework inspiration.
* Open-source libraries including React, Flask, Scikit-Learn, and Tailwind CSS.

---

## 👤 Contact

**Sabuj Rai**

*Senior Electrician & Network Support Engineer Aspirant | B.Sc. in CSE, WUB*

---

## 💡 Support

If you find this project helpful, please give it a ⭐ **Star** on GitHub!

---
