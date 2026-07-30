import React, { useState } from 'react';
import { BenchmarkData } from '../types';
import { Sparkles, Award, BarChart2, ShieldCheck, Layers, GitCommit, CheckCircle2 } from 'lucide-react';

interface ModelBenchmarkProps {
  benchmarkData: BenchmarkData;
}

export const ModelBenchmark: React.FC<ModelBenchmarkProps> = ({ benchmarkData }) => {
  const [activeModelKey, setActiveModelKey] = useState<string>('RandomForest');
  const models = benchmarkData.models;
  const currentModel = models[activeModelKey];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-900 to-[#0d1b3e] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-indigo-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Educational Data Mining & Algorithm Evaluation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Machine Learning Classification Benchmarks
          </h2>
          <p className="text-xs text-indigo-200 mt-1">
            Comparative performance of Decision Tree, Random Forest, and Logistic Regression on 6,607 student records.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-right">
          <div className="text-[10px] font-bold uppercase text-amber-300 tracking-wider">Automated Best Model Selection</div>
          <div className="text-lg font-black text-white">{benchmarkData.best_model} ({benchmarkData.best_accuracy})</div>
        </div>
      </div>

      {/* Model Cards Comparison Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(models).map(key => {
          const m = models[key];
          const isSelected = activeModelKey === key;

          return (
            <div
              key={key}
              onClick={() => setActiveModelKey(key)}
              className={`p-5 rounded-2xl border transition cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/30'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 hover:border-slate-400'
              }`}
            >
              {m.is_best && (
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-sm">
                  BEST MODEL
                </span>
              )}

              <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{m.name}</h3>
              <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 my-2">
                {(m.accuracy * 100).toFixed(1)}%
              </div>

              <div className="grid grid-cols-3 gap-1 pt-3 border-t border-slate-200 dark:border-slate-700 text-center text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Precision</span>
                  <span className="font-bold">{m.precision.toFixed(3)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Recall</span>
                  <span className="font-bold">{m.recall.toFixed(3)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">F1-Score</span>
                  <span className="font-extrabold text-amber-500">{m.f1_score.toFixed(3)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 3x3 Confusion Matrix Panel (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">
                3x3 Confusion Matrix ({currentModel.name})
              </h3>
              <p className="text-xs text-slate-500">Actual vs Predicted Performance Bands</p>
            </div>
            <span className="text-xs font-bold text-violet-600 px-2.5 py-1 rounded-md bg-violet-500/10">
              Holdout Test Set (20%)
            </span>
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  <th colSpan={3} className="p-2 text-xs font-bold uppercase text-slate-500 bg-slate-100 dark:bg-slate-900 rounded-t-lg">
                    Predicted Class
                  </th>
                </tr>
                <tr className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold">
                  <th className="p-2 text-left text-slate-500">Actual Class</th>
                  <th className="p-2">At-Risk</th>
                  <th className="p-2">Average</th>
                  <th className="p-2">High-Perf</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-bold">
                {currentModel.confusion_matrix.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="p-2.5 text-left font-extrabold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50">
                      {currentModel.labels[rIdx]}
                    </td>
                    {row.map((val, cIdx) => {
                      const isDiagonal = rIdx === cIdx;
                      return (
                        <td
                          key={cIdx}
                          className={`p-3 font-extrabold text-sm ${
                            isDiagonal
                              ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-700 dark:text-rose-400'
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed pt-2">
            <strong className="text-emerald-600">Green diagonal boxes</strong> represent correct classifications. The Random Forest classifier misclassifies fewer At-Risk students (high false-positive control) compared to Logistic Regression.
          </p>
        </div>

        {/* Feature Importance Analysis Panel (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">
                Feature Importance Ranking (Gini Impurity)
              </h3>
              <p className="text-xs text-slate-500">Attribute contribution to Random Forest decisions</p>
            </div>
            <BarChart2 className="w-5 h-5 text-violet-600" />
          </div>

          <div className="space-y-3 pt-2">
            {benchmarkData.feature_importance.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">{item.feature}</span>
                  <span className="text-violet-600">{(item.importance * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full"
                    style={{ width: `${item.importance * 100 * 2.8}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
