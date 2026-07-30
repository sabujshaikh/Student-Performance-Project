import React, { useState, useEffect } from 'react';
import { User, StudentProfile, StarSchemaAnalytics, BenchmarkData, PredictionInput, PredictionResult } from './types';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { StudentPortal } from './components/StudentPortal';
import { TeacherPortal } from './components/TeacherPortal';
import { PredictionEngine } from './components/PredictionEngine';
import { DataWarehouseStudio } from './components/DataWarehouseStudio';
import { ProjectInfoModal } from './components/ProjectInfoModal';
import { ShieldAlert, Users, Database } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('student');
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Current User Session (Null by default for strict route guarding)
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Application Data States
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [analytics, setAnalytics] = useState<StarSchemaAnalytics | null>(null);
  const [benchmark, setBenchmark] = useState<BenchmarkData | null>(null);

  // Apply Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch Data when authenticated
  useEffect(() => {
    if (!currentUser) return;

    fetch('/api/students')
      .then(res => res.json())
      .then(data => {
        if (data.data && Array.isArray(data.data)) {
          setStudents(data.data);
          const currentIdStr = String(currentUser.id).trim().toLowerCase();
          const matched = data.data.find((s: StudentProfile) => String(s.student_id).trim().toLowerCase() === currentIdStr);
          setSelectedStudent(matched || data.data[0] || null);
        }
      })
      .catch(err => console.error('Error fetching students:', err));

    fetch('/api/warehouse/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err => console.error('Error fetching analytics:', err));

    fetch('/api/prediction/benchmark')
      .then(res => res.json())
      .then(data => setBenchmark(data))
      .catch(err => console.error('Error fetching benchmark:', err));
  }, [currentUser]);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'teacher') {
      setActiveTab('teacher');
    } else {
      setActiveTab('student');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('login');
  };

  // Update Student Marks & Attendance via MySQL REST API
  const handleUpdateStudentMarks = async (
    id: string,
    updatedMarks: { subject_code: string; marks: number }[],
    attendance: number
  ) => {
    try {
      const res = await fetch(`/api/students/${id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_marks: updatedMarks, attendance })
      });
      const data = await res.json();
      if (res.ok && data.student) {
        setStudents(prev => prev.map(s => s.student_id === id ? { ...s, ...data.student } : s));
        if (selectedStudent?.student_id === id) {
          setSelectedStudent(prev => prev ? { ...prev, ...data.student } : null);
        }
        alert('Student record updated directly in MySQL Star Schema Fact table!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Execute Scikit-Learn Prediction via Python Flask REST API
  const handleExecutePredict = async (input: PredictionInput): Promise<PredictionResult> => {
    const res = await fetch('/api/prediction/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    const data = await res.json();
    return data.prediction;
  };

  // Execute Star Schema SQL Query via MySQL/SQLite REST API
  const handleExecuteSql = async (query: string) => {
    const res = await fetch('/api/warehouse/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    return await res.json();
  };

  // Run ETL Pipeline via Python REST API
  const handleRunEtl = async () => {
    const res = await fetch('/api/etl/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return await res.json();
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* Universal Header */}
      <Header
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        onOpenInfo={() => setShowInfoModal(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Body Container with Strict Route Guards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!currentUser ? (
          /* STRICT ROUTE GUARD: Unauthenticated users MUST see ONLY the Login View */
          <LoginView onLoginSuccess={handleLoginSuccess} />
        ) : (
          /* Authenticated User Views */
          <>
            {activeTab === 'dashboard' && analytics && (
              <DashboardView
                currentUser={currentUser}
                analytics={analytics}
                students={
                  currentUser.role === 'student'
                    ? students.filter(s => String(s.student_id).trim().toLowerCase() === String(currentUser.id).trim().toLowerCase())
                    : students
                }
                onSelectStudent={(s) => {
                  if (currentUser.role === 'teacher') {
                    setSelectedStudent(s);
                  }
                }}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'student' && (
              <StudentPortal
                student={
                  (currentUser.role === 'student'
                    ? (students.find(s => String(s.student_id).trim().toLowerCase() === String(currentUser.id).trim().toLowerCase()) || selectedStudent)
                    : selectedStudent) || students[0]
                }
                allStudents={
                  currentUser.role === 'student'
                    ? students.filter(s => String(s.student_id).trim().toLowerCase() === String(currentUser.id).trim().toLowerCase())
                    : students
                }
                onSelectStudent={(s) => {
                  if (currentUser.role === 'teacher') {
                    setSelectedStudent(s);
                  }
                }}
                currentUserRole={currentUser.role}
              />
            )}

            {activeTab === 'teacher' && (
              currentUser.role === 'teacher' ? (
                <TeacherPortal
                  students={students}
                  onUpdateStudent={handleUpdateStudentMarks}
                  onSelectStudentForView={(s) => setSelectedStudent(s)}
                  setActiveTab={setActiveTab}
                />
              ) : (
                /* Permission Guard for Student attempting to view Teacher Portal */
                <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-4 max-w-lg mx-auto my-12">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Access Denied: Faculty Privileges Required
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    The Teacher Management & Student Record Console is restricted to faculty members (Md Tanzim Hossain).
                  </p>
                  <button
                    onClick={() => setActiveTab('student')}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition"
                  >
                    Return to Student Portal
                  </button>
                </div>
              )
            )}

            {activeTab === 'prediction' && (
              <PredictionEngine onPredict={handleExecutePredict} />
            )}

            {activeTab === 'warehouse' && (
              currentUser.role === 'teacher' ? (
                <DataWarehouseStudio
                  onExecuteSql={handleExecuteSql}
                  onRunEtl={handleRunEtl}
                />
              ) : (
                /* Permission Guard for Student attempting to view Data Warehouse Studio */
                <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-4 max-w-lg mx-auto my-12">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Faculty Access Required
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Custom Star Schema SQL Studio & ETL Pipeline controls require Teacher privileges.
                  </p>
                  <button
                    onClick={() => setActiveTab('student')}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition"
                  >
                    Return to Student Portal
                  </button>
                </div>
              )
            )}
          </>
        )}
      </main>

      {/* Project Info & Proposal Modal */}
      {showInfoModal && (
        <ProjectInfoModal onClose={() => setShowInfoModal(false)} />
      )}
    </div>
  );
}
