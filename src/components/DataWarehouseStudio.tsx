import React, { useState } from 'react';
import { ETLLogEntry } from '../types';
import { Database, Play, Code2, Layers, RefreshCw, Terminal, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

interface DataWarehouseStudioProps {
  onExecuteSql: (query: string) => Promise<{ columns: string[]; rows: any[][] }>;
  onRunEtl: () => Promise<{ records_processed: number; logs: ETLLogEntry[] }>;
}

export const DataWarehouseStudio: React.FC<DataWarehouseStudioProps> = ({
  onExecuteSql,
  onRunEtl
}) => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState<number>(0);
  const [customSql, setCustomSql] = useState<string>(`-- Query 1: Average Exam Score & GPA by Attendance Band
SELECT 
  CASE 
    WHEN Attendance_Percentage >= 90 THEN '90-100% (High Attendance)'
    WHEN Attendance_Percentage >= 75 THEN '75-89% (Moderate Attendance)'
    ELSE '<75% (Low Attendance)'
  END AS Attendance_Band,
  COUNT(*) AS Student_Count,
  ROUND(AVG(Exam_Score), 2) AS Avg_Exam_Score,
  ROUND(AVG(GPA), 2) AS Avg_GPA
FROM FactStudentPerformance
GROUP BY Attendance_Band
ORDER BY Avg_Exam_Score DESC;`);

  const [queryResult, setQueryResult] = useState<{ columns: string[]; rows: any[][] } | null>(null);
  const [executingSql, setExecutingSql] = useState(false);

  // ETL Pipeline State
  const [etlRunning, setEtlRunning] = useState(false);
  const [etlLogs, setEtlLogs] = useState<ETLLogEntry[]>([
    { step: 'Initial Warehouse Load', timestamp: new Date().toLocaleTimeString(), status: 'SUCCESS', details: 'Loaded 6,607 student records into MySQL Star Schema tables' }
  ]);

  const prebuiltQueries = [
    {
      title: 'Query 1: Attendance Band vs Performance',
      sql: `-- Query 1: Average Exam Score & GPA by Attendance Band
SELECT 
  CASE 
    WHEN Attendance_Percentage >= 90 THEN '90-100% (High Attendance)'
    WHEN Attendance_Percentage >= 75 THEN '75-89% (Moderate Attendance)'
    ELSE '<75% (Low Attendance)'
  END AS Attendance_Band,
  COUNT(*) AS Student_Count,
  ROUND(AVG(Exam_Score), 2) AS Avg_Exam_Score,
  ROUND(AVG(GPA), 2) AS Avg_GPA
FROM FactStudentPerformance
GROUP BY Attendance_Band
ORDER BY Avg_Exam_Score DESC;`
    },
    {
      title: 'Query 2: Parental Education & Involvement Impact',
      sql: `-- Query 2: Performance Comparison by Parental Education Level & Involvement
SELECT 
  fam.Parental_Education_Level,
  fam.Parental_Involvement,
  COUNT(f.Fact_ID) AS Total_Students,
  ROUND(AVG(f.Exam_Score), 2) AS Avg_Exam_Score,
  ROUND(AVG(f.GPA), 2) AS Avg_GPA
FROM FactStudentPerformance f
JOIN DimFamilyBackground fam ON f.Family_Key = fam.Family_Key
GROUP BY fam.Parental_Education_Level, fam.Parental_Involvement
ORDER BY Avg_Exam_Score DESC;`
    },
    {
      title: 'Query 3: Teacher Quality & School Type At-Risk Rates',
      sql: `-- Query 3: At-Risk Student Breakdown by School Type and Teacher Quality
SELECT 
  res.School_Type,
  res.Teacher_Quality,
  COUNT(f.Fact_ID) AS Total_Students,
  SUM(CASE WHEN f.Performance_Band = 'At-Risk' THEN 1 ELSE 0 END) AS At_Risk_Students
FROM FactStudentPerformance f
JOIN DimSchoolResources res ON f.Resource_Key = res.Resource_Key
GROUP BY res.School_Type, res.Teacher_Quality;`
    }
  ];

  const handleRunSql = async () => {
    setExecutingSql(true);
    try {
      const res = await onExecuteSql(customSql);
      setQueryResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setExecutingSql(false);
    }
  };

  const handleTriggerEtl = async () => {
    setEtlRunning(true);
    try {
      const res = await onRunEtl();
      setEtlLogs(res.logs);
    } catch (err) {
      console.error(err);
    } finally {
      setEtlRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-900 to-[#0d1b3e] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-indigo-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>MySQL Star Schema & Python ETL Studio</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Data Warehouse & ETL Pipeline Console
          </h2>
          <p className="text-xs text-indigo-200 mt-1">
            Explore dimensional tables, run custom Star Schema SQL analytical queries, and execute ETL pipeline reloads.
          </p>
        </div>

        <button
          onClick={handleTriggerEtl}
          disabled={etlRunning}
          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 transition flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 text-slate-950 ${etlRunning ? 'animate-spin' : ''}`} />
          <span>{etlRunning ? 'Running ETL...' : 'Rerun Python ETL Pipeline'}</span>
        </button>
      </div>

      {/* Visual Star Schema ERD Architecture */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          <span>Star Schema Data Warehouse Architecture (`wub_student_dw`)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2 text-xs">
          {/* Central Fact Table */}
          <div className="md:col-span-1 p-3 rounded-xl bg-emerald-600 text-white shadow-md space-y-1">
            <div className="font-extrabold text-xs uppercase border-b border-emerald-400 pb-1">
              FactStudentPerformance
            </div>
            <p className="text-[10px] text-emerald-100">Fact_ID (PK)</p>
            <p className="text-[10px] text-emerald-100">Student_Key (FK)</p>
            <p className="text-[10px] text-emerald-100">Family_Key (FK)</p>
            <p className="text-[10px] text-emerald-100">Resource_Key (FK)</p>
            <p className="text-[10px] text-emerald-100">Behavior_Key (FK)</p>
            <p className="text-[10px] font-bold mt-1 text-emerald-200">Measures: Exam_Score, GPA, Attendance %, Performance_Band</p>
          </div>

          {/* Surrounding Dimension Tables */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 border-b pb-1">DimStudent</div>
            <p className="text-[10px] text-slate-500">Student_Key (PK)</p>
            <p className="text-[10px] text-slate-500">Student_ID, Gender, Distance, Disabilities</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 border-b pb-1">DimFamilyBackground</div>
            <p className="text-[10px] text-slate-500">Family_Key (PK)</p>
            <p className="text-[10px] text-slate-500">Involvement, Education, Income</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 border-b pb-1">DimSchoolResources</div>
            <p className="text-[10px] text-slate-500">Resource_Key (PK)</p>
            <p className="text-[10px] text-slate-500">Resources, Tutoring, School_Type, Teacher_Quality</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 border-b pb-1">DimBehavior</div>
            <p className="text-[10px] text-slate-500">Behavior_Key (PK)</p>
            <p className="text-[10px] text-slate-500">Motivation, Peer_Influence, Internet, Sleep</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive SQL Query Workbench (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-600" />
              <span>SQL Analytical Query Inspector</span>
            </h3>

            <select
              onChange={(e) => {
                const idx = Number(e.target.value);
                setSelectedQueryIndex(idx);
                setCustomSql(prebuiltQueries[idx].sql);
              }}
              className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              {prebuiltQueries.map((q, idx) => (
                <option key={idx} value={idx}>{q.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <textarea
              rows={7}
              value={customSql}
              onChange={(e) => setCustomSql(e.target.value)}
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-900 text-emerald-400 focus:ring-2 focus:ring-emerald-500"
            />

            <button
              onClick={handleRunSql}
              disabled={executingSql}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span>{executingSql ? 'Executing Query...' : 'Execute SQL Query'}</span>
            </button>
          </div>

          {/* SQL Output Table Display */}
          {queryResult && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b">
                    {queryResult.columns.map((col, idx) => (
                      <th key={idx} className="p-2">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-medium">
                  {queryResult.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ETL Pipeline Execution Console (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 text-slate-100 shadow-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-emerald-400 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Python ETL Execution Terminal</span>
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
              etl_pipeline.py
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto font-mono text-[11px] pr-1">
            {etlLogs.map((log, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-emerald-400 font-bold">[STEP {idx + 1}] {log.step}</span>
                  <span className="text-[10px]">{log.timestamp}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
