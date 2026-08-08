import React from 'react';
import { StarSchemaAnalytics, StudentProfile, User } from '../types';
import { Users, AlertTriangle, Award, CheckCircle2, TrendingUp, Sparkles, ArrowUpRight, BookOpen, Layers } from 'lucide-react';

interface DashboardViewProps {
  currentUser?: User | null;
  analytics: StarSchemaAnalytics;
  students: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
  setActiveTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  analytics,
  students,
  onSelectStudent,
  setActiveTab
}) => {
  const isStudent = currentUser?.role === 'student';
  const currentStudentId = currentUser ? String(currentUser.id).trim().toLowerCase() : '';
  const studentMatch = isStudent
    ? (students.find(s => String(s.student_id).trim().toLowerCase() === currentStudentId) || students[0])
    : null;

  const displayStudents = isStudent
    ? (studentMatch ? [studentMatch] : [])
    : students;

  const atRiskStudents = displayStudents.filter(s => s.performance_band === 'At-Risk');

  const summary = (isStudent && studentMatch)
    ? {
        total_students: 1,
        at_risk_count: studentMatch.performance_band === 'At-Risk' ? 1 : 0,
        average_count: studentMatch.performance_band === 'Average' ? 1 : 0,
        high_performing_count: studentMatch.performance_band === 'High-Performing' ? 1 : 0,
        avg_exam_score: studentMatch.exam_score,
        avg_attendance: studentMatch.attendance,
        avg_gpa: studentMatch.cgpa || studentMatch.gpa,
      }
    : analytics.overall_summary;

  return (
    <div className="space-y-6">
      {/* Top Banner & Welcome Card (Bento Hero Header) */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-900 to-[#0d1b3e] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>World University of Bangladesh • Dept. of CSE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: '#7c86ff' }}>
              {isStudent && studentMatch
                ? `Academic Performance Analytics: ${studentMatch.student_name}`
                : 'Student Performance Dashboard & ML Risk Predictor'}
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm leading-relaxed font-normal">
              {isStudent && studentMatch
                ? `Personalized academic dashboard evaluating performance data for Student ID ${studentMatch.student_id} across ML risk predictor models and CSE department benchmarks.`
                : 'Integrated Data Warehouse (Star Schema) & Machine Learning Platform evaluating 6,607 student records across Random Forest (89.4% Accuracy), Decision Tree, and Logistic Regression algorithms.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('prediction')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 transition flex items-center gap-2"
            >
              <span>Run Live ML Predictor</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Bento Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {isStudent ? 'Your Profile ID' : 'Cohort Size'}
            </p>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-black text-indigo-950 dark:text-indigo-100">
              {isStudent && studentMatch ? studentMatch.student_id : summary.total_students.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              {isStudent && studentMatch ? studentMatch.student_name : '6,607 records in Star Schema'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">
              {isStudent ? 'Your Risk Status' : 'At-Risk Count'}
            </p>
            <div className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-rose-50 dark:bg-rose-950/50 text-rose-600">
              {isStudent && studentMatch ? studentMatch.risk_level : 'High Priority'}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-black text-rose-600">
              {isStudent && studentMatch ? studentMatch.performance_band : summary.at_risk_count.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              {isStudent && studentMatch
                ? `Attendance: ${studentMatch.attendance}%`
                : `${((summary.at_risk_count / summary.total_students) * 100).toFixed(1)}% of total cohort`}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {isStudent ? 'Your Exam Score' : 'Avg Exam Score'}
            </p>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-indigo-950 dark:text-indigo-100">
              {summary.avg_exam_score}%
            </p>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">CGPA: {summary.avg_gpa} / 4.00</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {isStudent ? 'Your Attendance' : 'Attendance Rate'}
            </p>
            <div className="w-8 h-8 rounded-full border-[3px] border-indigo-100 border-t-indigo-600 flex items-center justify-center text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
              {summary.avg_attendance}%
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-indigo-950 dark:text-indigo-100">
              {summary.avg_attendance}%
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Key predictor variable</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Best Model</p>
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-600 dark:text-amber-300">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-amber-500">
              89.4%
            </p>
            <p className="text-[11px] text-slate-500 font-bold mt-1">Random Forest Classifier</p>
          </div>
        </div>
      </div>

      {/* Featured Machine Learning Bento Box */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-900 to-[#0d1b3e] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-indigo-500/30">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-indigo-200">
              Machine Learning Predictive Insight
            </h3>
            <p className="text-2xl sm:text-3xl font-black">
              Random Forest Academic Scoring Engine
            </p>
            <p className="text-xs text-indigo-200 max-w-xl leading-relaxed">
              Based on 20 student factors, attendance rate (&gt;32.5% feature weight) and weekly study hours remain the strongest deterministic indicators for transitioning students from 'At-Risk' to 'High-Performing'.
            </p>

            <div className="pt-2 max-w-md space-y-1.5">
              <div className="text-xs font-bold flex justify-between text-indigo-100">
                <span>Model Classification Accuracy</span>
                <span className="text-amber-300 font-extrabold">89.4%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-amber-400 rounded-full w-[89.4%]" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-44 h-36 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 flex flex-col items-center justify-center text-center shrink-0">
            <div className="text-[10px] uppercase font-extrabold text-indigo-200 mb-1">Top Classifier</div>
            <div className="text-sm font-black text-white">Random Forest</div>
            <div className="mt-2 text-[10px] px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black">
              F1-Score: 0.892
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytical Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Band Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                {isStudent ? 'Your Academic Band Status' : 'Cohort Performance Band Breakdown'}
              </h3>
              <p className="text-xs text-slate-500">
                {isStudent ? `Evaluation status for student ID ${studentMatch?.student_id}` : 'Multidimensional distribution from FactStudentPerformance table'}
              </p>
            </div>
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Star Schema Fact Table
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300">
              <div className="text-[10px] font-bold uppercase tracking-wider">High-Performing</div>
              <div className="text-3xl font-black mt-1">{summary.high_performing_count.toLocaleString()}</div>
              <p className="text-[11px] font-medium mt-1">Exam Score &ge; 80% (GPA 4.00)</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-900 dark:text-blue-300">
              <div className="text-[10px] font-bold uppercase tracking-wider">Average</div>
              <div className="text-3xl font-black mt-1">{summary.average_count.toLocaleString()}</div>
              <p className="text-[11px] font-medium mt-1">Exam Score 60% - 79%</p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-300">
              <div className="text-[10px] font-bold uppercase tracking-wider">At-Risk</div>
              <div className="text-3xl font-black mt-1">{summary.at_risk_count.toLocaleString()}</div>
              <p className="text-[11px] font-medium mt-1">Exam Score &lt; 60% or Att &lt; 75%</p>
            </div>
          </div>

          {/* Attendance Band Multi-dimensional Query Card */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/80">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
              Attendance Band vs Academic Performance
            </h4>
            <div className="space-y-2.5">
              {analytics.attendance_bands.map((item, idx) => {
                const isCurrentStudentBand = isStudent && studentMatch && (
                  (studentMatch.attendance >= 90 && item.band.includes('90')) ||
                  (studentMatch.attendance >= 75 && studentMatch.attendance < 90 && item.band.includes('75')) ||
                  (studentMatch.attendance < 75 && item.band.includes('Below 75'))
                );
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 transition ${
                      isCurrentStudentBand
                        ? 'bg-amber-400/10 border-amber-400/40 font-bold ring-1 ring-amber-400/30'
                        : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-700/50'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100 min-w-[200px] flex items-center gap-2">
                      <span>{item.band}</span>
                      {isCurrentStudentBand && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black uppercase">
                          Your Band
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-5 text-xs text-slate-600 dark:text-slate-400">
                      {!isStudent && <span>Students: <strong className="text-slate-900 dark:text-slate-100">{item.count.toLocaleString()}</strong></span>}
                      <span>Avg Score: <strong className="text-emerald-600 font-bold">{item.avg_score}%</strong></span>
                      <span>Avg GPA: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{item.avg_gpa}</strong></span>
                      <span className="text-rose-600 font-bold">At-Risk: <strong>{item.at_risk}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* At-Risk Student Action Needed Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <span>{isStudent ? 'Your Academic Alerts' : 'At-Risk Student Alerts'}</span>
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-extrabold border border-rose-500/20">
                {atRiskStudents.length} Flagged
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              {isStudent
                ? 'Academic status evaluation for your enrolled CSE courses.'
                : 'Students identified by ML classifier as requiring immediate academic counseling or attendance intervention.'}
            </p>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {atRiskStudents.length > 0 ? (
                atRiskStudents.map(student => (
                  <div
                    key={student.student_id}
                    onClick={() => {
                      onSelectStudent(student);
                      setActiveTab('student');
                    }}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-rose-500/20 hover:border-rose-500 transition cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                        {student.student_name} ({student.student_id})
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Att: <span className="text-rose-600 font-bold">{student.attendance}%</span> • Exam: <span className="text-rose-600 font-bold">{student.exam_score}%</span>
                      </div>
                    </div>
                    <button className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                      View &rarr;
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>No academic risk alerts. Your performance is in good standing ({studentMatch?.performance_band})!</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setActiveTab(isStudent ? 'student' : 'teacher')}
            className="mt-4 w-full py-2.5 rounded-xl bg-[#0d1b3e] hover:bg-slate-900 text-white font-bold text-xs shadow-md transition text-center"
          >
            {isStudent ? 'View My Official Academic Transcript' : 'Manage All Students in Teacher Console'}
          </button>
        </div>
      </div>

      {/* Personalized Recommendation Bento Footer */}
      <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/60 p-4 flex items-center gap-4 text-amber-900 dark:text-amber-200">
        <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shrink-0 text-slate-950 font-black shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
            System Recommendation & Data Mining Action
          </p>
          <p className="text-xs text-amber-800 dark:text-amber-200 mt-0.5">
            {isStudent
              ? `Keep your lecture attendance above 85% and complete all lab reports to maintain a High-Performing academic classification.`
              : 'To improve overall department pass rate by 4.2%, schedule targeted tutoring sessions for students with attendance under 80% before the Semester 6 final examinations.'}
          </p>
        </div>
      </div>
    </div>
  );
};

function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Layers {...props} />;
}

