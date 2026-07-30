import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { Search, Filter, Edit3, Save, Users, AlertTriangle, ArrowUpDown, Check, X, Columns, Award } from 'lucide-react';

interface TeacherPortalProps {
  students: StudentProfile[];
  onUpdateStudent: (id: string, updatedMarks: { subject_code: string; marks: number }[], attendance: number) => void;
  onSelectStudentForView: (student: StudentProfile) => void;
  setActiveTab: (tab: string) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  students,
  onUpdateStudent,
  onSelectStudentForView,
  setActiveTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bandFilter, setBandFilter] = useState<string>('ALL');
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  // Editable Form State
  const [editAttendance, setEditAttendance] = useState<number>(85);
  const [editMarks, setEditMarks] = useState<{ [subjectCode: string]: number }>({});

  // Side-by-Side Comparison State
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.student_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBand = bandFilter === 'ALL' || s.performance_band === bandFilter;
    return matchesSearch && matchesBand;
  });

  const handleStartEdit = (student: StudentProfile) => {
    setEditingStudentId(student.student_id);
    setEditAttendance(student.attendance);
    const marksObj: { [key: string]: number } = {};
    student.subject_marks.forEach(sub => {
      marksObj[sub.subject_code] = sub.marks;
    });
    setEditMarks(marksObj);
  };

  const handleSaveEdit = (studentId: string) => {
    const markArray = Object.keys(editMarks).map(code => ({
      subject_code: code,
      marks: editMarks[code]
    }));
    onUpdateStudent(studentId, markArray, editAttendance);
    setEditingStudentId(null);
  };

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(item => item !== id));
    } else {
      if (selectedForCompare.length < 4) {
        setSelectedForCompare([...selectedForCompare, id]);
      } else {
        alert("Maximum 4 students can be compared simultaneously.");
      }
    }
  };

  const comparedStudentObjects = students.filter(s => selectedForCompare.includes(s.student_id));

  return (
    <div className="space-y-6">
      {/* Teacher Action Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-900 to-[#0d1b3e] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-indigo-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Faculty Record Console & Grade Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Teacher Management & Student Record Console
          </h2>
          <p className="text-xs text-indigo-200 mt-1">
            Search, update attendance & term marks, and perform multi-student side-by-side comparative analytics.
          </p>
        </div>

        {selectedForCompare.length > 0 && (
          <button
            onClick={() => setShowCompareModal(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 transition flex items-center gap-2"
          >
            <Columns className="w-4 h-4 text-slate-950" />
            <span>Compare Selected ({selectedForCompare.length})</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search student by Name or ID (e.g. Sabuj, STU-1001)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={bandFilter}
            onChange={(e) => setBandFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 shadow-sm"
          >
            <option value="ALL">All Bands ({students.length})</option>
            <option value="At-Risk">At-Risk Only</option>
            <option value="Average">Average Only</option>
            <option value="High-Performing">High-Performing Only</option>
          </select>
        </div>
      </div>

      {/* Student List & Editor Table */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
              <th className="p-3">Compare</th>
              <th className="p-3">Student ID & Name</th>
              <th className="p-3 text-center">Attendance</th>
              <th className="p-3 text-center">Exam Score</th>
              <th className="p-3 text-center">GPA</th>
              <th className="p-3 text-center">Performance Band</th>
              <th className="p-3 text-center">Risk Level</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700/80 text-slate-800 dark:text-slate-200">
            {filteredStudents.map(student => {
              const isEditing = editingStudentId === student.student_id;
              const isSelected = selectedForCompare.includes(student.student_id);

              return (
                <React.Fragment key={student.student_id}>
                  <tr className={`hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition ${
                    isEditing ? 'bg-amber-500/10' : ''
                  }`}>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCompare(student.student_id)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="p-3 font-bold">
                      <div className="text-slate-900 dark:text-slate-100">{student.student_name}</div>
                      <div className="text-[10px] text-slate-500">{student.student_id} • Batch-66D</div>
                    </td>

                    <td className="p-3 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editAttendance}
                          onChange={(e) => setEditAttendance(Number(e.target.value))}
                          className="w-16 px-2 py-1 text-center rounded border border-amber-400 font-bold bg-white dark:bg-slate-900"
                        />
                      ) : (
                        <span className={`font-extrabold ${student.attendance >= 85 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {student.attendance}%
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-center font-bold text-slate-900 dark:text-slate-100">
                      {student.exam_score}%
                    </td>

                    <td className="p-3 text-center font-black text-indigo-600 dark:text-indigo-400">
                      {student.gpa.toFixed(2)}
                    </td>

                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        student.performance_band === 'At-Risk' ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20' :
                        student.performance_band === 'Average' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' :
                        'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                      }`}>
                        {student.performance_band}
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      <span className={`text-[11px] font-bold ${
                        student.risk_level === 'High Risk' ? 'text-rose-600' : 'text-emerald-600'
                      }`}>
                        {student.risk_level}
                      </span>
                    </td>

                    <td className="p-3 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSaveEdit(student.student_id)}
                            className="p-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center gap-1"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => setEditingStudentId(null)}
                            className="p-1.5 rounded-lg bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartEdit(student)}
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-500/10 transition"
                            title="Edit Marks & Attendance"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              onSelectStudentForView(student);
                              setActiveTab('student');
                            }}
                            className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-black hover:bg-indigo-100 transition text-[11px]"
                          >
                            View Transcript
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* Inline Subject Marks Editor Drawer when in edit mode */}
                  {isEditing && (
                    <tr className="bg-amber-500/5">
                      <td colSpan={8} className="p-4 border-b border-amber-300/30">
                        <div className="space-y-3">
                          <div className="text-xs font-bold text-amber-800 dark:text-amber-400">
                            Updating Subject Term Marks for {student.student_name}:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {student.subject_marks.map(sub => (
                              <div key={sub.subject_code} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                                <div className="font-bold text-slate-700 dark:text-slate-300 truncate">{sub.subject_name}</div>
                                <div className="text-[10px] text-slate-500">{sub.subject_code}</div>
                                <div className="mt-1.5 flex items-center justify-between">
                                  <span className="text-[11px] font-medium">Marks (0-100):</span>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={editMarks[sub.subject_code] ?? sub.marks}
                                    onChange={(e) => setEditMarks({
                                      ...editMarks,
                                      [sub.subject_code]: Number(e.target.value)
                                    })}
                                    className="w-16 px-2 py-1 text-center font-bold rounded border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Side-by-Side Student Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-5xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Columns className="w-5 h-5 text-teal-600" />
                <span>Side-by-Side Multi-Student Academic Comparison</span>
              </h3>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {comparedStudentObjects.map(student => (
                <div key={student.student_id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="border-b pb-2">
                    <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{student.student_name}</div>
                    <div className="text-xs text-emerald-600 font-bold">{student.student_id}</div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Attendance:</span>
                      <strong className={student.attendance >= 85 ? 'text-emerald-600' : 'text-rose-600'}>
                        {student.attendance}%
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Hours Studied:</span>
                      <strong>{student.hours_studied} hrs/wk</strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Previous Scores:</span>
                      <strong>{student.previous_scores}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Exam Score:</span>
                      <strong className="text-slate-900 dark:text-slate-100">{student.exam_score}%</strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">GPA:</span>
                      <strong className="text-teal-600">{student.gpa.toFixed(2)}</strong>
                    </div>

                    <div className="pt-2 border-t">
                      <span className="text-[10px] text-slate-500 block">Performance Band:</span>
                      <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-bold ${
                        student.performance_band === 'At-Risk' ? 'bg-rose-500/10 text-rose-600' :
                        student.performance_band === 'Average' ? 'bg-blue-500/10 text-blue-600' :
                        'bg-emerald-500/10 text-emerald-600'
                      }`}>
                        {student.performance_band}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
