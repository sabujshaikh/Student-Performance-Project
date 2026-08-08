import React from 'react';
import { X, GraduationCap, FileCode2, Users, Download, Sparkles, BookOpen, Layers } from 'lucide-react';

interface ProjectInfoModalProps {
  onClose: () => void;
}

export const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({ onClose }) => {
  const teamMembers = [
    { name: 'Sabuj Shaikh', roll: 'Roll No. 4070', role: 'Data Engineer / Team Lead', task: 'MySQL Star Schema design, Python ETL pipeline' },
    { name: 'Md Nazim Uddin', roll: 'Roll No. 4069', role: 'Machine Learning Engineer', task: 'Scikit-learn models (DT, RF, LR), feature importance' },
    { name: 'Wafa Ahmed', roll: 'Roll No. 4072', role: 'Backend / Integration Developer', task: 'Flask REST API, auth & routing' },
    { name: 'Nadia Akter Luna', roll: 'Roll No. 4073', role: 'Frontend / Visualisation Developer', task: 'Dashboard UI (Bootstrap/Tailwind, Chart.js, Plotly)' }
  ];

  const deliverables = [
    { filename: 'schema.sql', desc: 'MySQL Star Schema DDL Script (`wub_student_dw`)' },
    { filename: 'warehouse_queries.sql', desc: 'Star Schema Multi-Dimensional Analytical Queries' },
    { filename: 'etl_pipeline.py', desc: 'Python Pandas Data Cleaning & Transformation Pipeline' },
    { filename: 'train_models.py', desc: 'Scikit-Learn ML Training & Model Evaluation Script' },
    { filename: 'app.py', desc: 'Flask REST API Backend Source Code' },
    { filename: 'DOCUMENTATION.md', desc: 'Complete System Architecture & API Documentation' },
    { filename: 'requirements.txt', desc: 'Python Environment Dependencies File' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <img
              src="https://www.clipartmax.com/png/small/272-2722209_world-university-of-bangladesh.png"
              alt="World University of Bangladesh Logo"
              className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-slate-200 shadow-sm shrink-0"
            />
            <div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                World University of Bangladesh • Dept of CSE
              </h3>
              <p className="text-xs text-slate-500">
                Student Performance Analytics & Prediction System Proposal Details
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abstract Section */}
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600">
            Project Proposal Abstract
          </h4>
          <p className="leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            This project combines data warehousing with data mining to predict student academic outcomes early. A MySQL-based star schema data warehouse consolidates 6,607 student records across 20 attributes into a central fact table linked to dimension tables. On top of this warehouse, three supervised machine learning algorithms — Decision Tree, Random Forest, and Logistic Regression — are trained and compared to predict exam scores and surface risk factors.
          </p>
        </div>
      </div>
    </div>
  );
};
