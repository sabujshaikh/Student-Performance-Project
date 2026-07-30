import React, { useRef } from 'react';
import { StudentProfile, Role } from '../types';
import { Download, GraduationCap, Award, Calendar, CheckCircle, AlertTriangle, BookOpen, Clock, Lightbulb } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface StudentPortalProps {
  student: StudentProfile;
  allStudents: StudentProfile[];
  onSelectStudent: (s: StudentProfile) => void;
  currentUserRole?: Role;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  student,
  allStudents,
  onSelectStudent,
  currentUserRole
}) => {
  const transcriptRef = useRef<HTMLDivElement>(null);
  const isStudent = currentUserRole === 'student';

  if (!student) {
    return (
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-3 my-8">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
        <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
          Loading student academic profile...
        </div>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!transcriptRef.current) return;
    try {
      const canvas = await html2canvas(transcriptRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`WUB_Academic_Transcript_${student.student_id}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector dropdown for viewing different students */}
      <div data-html2canvas-ignore="true" className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xs uppercase text-slate-400 tracking-wider">
            {isStudent ? 'My Student Profile:' : 'Active Student View:'}
          </span>
          {isStudent ? (
            <span className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold text-xs text-slate-900 dark:text-slate-100">
              {student.student_id} - {student.student_name} ({student.performance_band})
            </span>
          ) : (
            <select
              value={student.student_id}
              onChange={(e) => {
                const selected = allStudents.find(s => s.student_id === e.target.value);
                if (selected) onSelectStudent(selected);
              }}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 shadow-sm"
            >
              {allStudents.map(s => (
                <option key={s.student_id} value={s.student_id}>
                  {s.student_id} - {s.student_name} ({s.performance_band})
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 transition"
        >
          <Download className="w-4 h-4 text-slate-950" />
          <span>Download Official Transcript PDF</span>
        </button>
      </div>

      {/* Official Academic Transcript Document Container */}
      <div
        ref={transcriptRef}
        className="p-8 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 space-y-6 print:p-0 print:border-none print:shadow-none"
      >
        {/* University Official Header */}
        <div className="border-b-2 border-emerald-700 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://www.clipartmax.com/png/small/272-2722209_world-university-of-bangladesh.png"
              alt="World University of Bangladesh Logo"
              className="w-16 h-16 object-contain rounded-xl p-1 bg-white border border-slate-200 shadow-sm shrink-0"
            />
            <div>
              <h1 className="text-xl font-extrabold text-emerald-900 tracking-tight uppercase">
                World University of Bangladesh
              </h1>
              <p className="text-xs font-bold text-slate-700">Department of Computer Science & Engineering</p>
              <p className="text-[11px] text-slate-500">Official Academic Progress Report & ML Performance Transcript</p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-600">
            <div className="font-bold text-slate-800">Date: {new Date().toLocaleDateString()}</div>
            <div>Course: CSE 06124160</div>
            <div className="font-semibold text-emerald-700">Batch-66D</div>
          </div>
        </div>

        {/* Student Profile Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Student Name</span>
            <span className="font-bold text-slate-900 text-sm">{student.student_name}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Student Roll / ID</span>
            <span className="font-bold text-emerald-800 text-sm">{student.student_id}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Current CGPA</span>
            <span className="font-extrabold text-teal-700 text-sm">{student.cgpa} / 4.00</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Academic Risk Status</span>
            <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-extrabold ${
              student.risk_level === 'High Risk' ? 'bg-rose-100 text-rose-700' :
              student.risk_level === 'Moderate Risk' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {student.risk_level}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Parental Education</span>
            <span className="font-semibold">{student.parental_education_level}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Weekly Study Hours</span>
            <span className="font-semibold">{student.hours_studied} Hours / Week</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Class Attendance</span>
            <span className={`font-bold ${student.attendance >= 85 ? 'text-emerald-700' : 'text-rose-700'}`}>
              {student.attendance}%
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] font-bold uppercase">Access to Resources</span>
            <span className="font-semibold">{student.access_to_resources}</span>
          </div>
        </div>

        {/* Term Marks Table */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b pb-1">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Semester 6 Course Marks & Grade Breakdown</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-900 text-white font-bold">
                  <th className="p-2.5 rounded-tl-lg">Subject Code</th>
                  <th className="p-2.5">Subject Title</th>
                  <th className="p-2.5 text-center">Credits</th>
                  <th className="p-2.5 text-center">Marks Score</th>
                  <th className="p-2.5 text-center">Letter Grade</th>
                  <th className="p-2.5 text-center rounded-tr-lg">Grade Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {(student.subject_marks || []).map((sub, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-2.5 font-bold text-emerald-900">{sub.subject_code}</td>
                    <td className="p-2.5 font-medium">{sub.subject_name}</td>
                    <td className="p-2.5 text-center">{sub.credits}</td>
                    <td className="p-2.5 text-center font-bold">{sub.marks}%</td>
                    <td className="p-2.5 text-center font-extrabold text-emerald-700">{sub.grade}</td>
                    <td className="p-2.5 text-center font-bold">{typeof sub.gpa === 'number' ? sub.gpa.toFixed(2) : sub.gpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Semester GPA History & Prediction Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Historical Semester GPA Trend */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Historical Semester GPA Progress</span>
            </h4>
            <div className="space-y-2">
              {(student.semester_history || []).map((sem, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">{sem.semester}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-500">Att: {sem.attendance}%</span>
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      GPA {typeof sem.gpa === 'number' ? sem.gpa.toFixed(2) : sem.gpa}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Machine Learning Prediction & Action Recommendations */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-700" />
              <span>ML Predictive Analytics & Academic Action Plan</span>
            </h4>

            <div className="p-3 rounded-lg bg-white border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Predicted Exam Outcome</div>
                <div className="text-lg font-black text-emerald-900">{student.exam_score}% ({student.performance_band})</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-500">Model Confidence</div>
                <div className="text-sm font-bold text-teal-700">89.4% (Random Forest)</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="font-bold text-emerald-900 text-[11px]">Recommended Improvements:</div>
              <ul className="list-disc list-inside space-y-1 pl-1">
                {student.attendance < 85 && (
                  <li>Increase attendance from <strong>{student.attendance}%</strong> to 85%+ to reduce risk.</li>
                )}
                {student.hours_studied < 20 && (
                  <li>Add 3-5 hours of weekly study for higher grade stability.</li>
                )}
                {student.tutoring_sessions < 2 && (
                  <li>Join weekly CSE department lab tutoring sessions.</li>
                )}
                <li>Maintain consistent project submission deadlines.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Signature Block for PDF Transcript */}
        <div className="pt-8 flex items-end justify-between text-xs text-slate-600 border-t border-slate-200">
          <div>
            <p className="font-bold text-slate-900">Md Tanzim Hossain</p>
            <p className="text-[11px]">Lecturer, Department of CSE</p>
            <p className="text-[11px] text-slate-500">World University of Bangladesh</p>
          </div>
          <div className="text-right">
            <div className="border-b border-slate-400 w-36 mb-1 ml-auto" />
            <p className="font-bold text-slate-800">Head of Department Signature</p>
            <p className="text-[10px] text-slate-400">Computer Science & Engineering</p>
          </div>
        </div>
      </div>
    </div>
  );
};
