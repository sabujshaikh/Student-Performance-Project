import React, { useState } from 'react';
import { PredictionInput, PredictionResult } from '../types';
import { Cpu, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, Sliders, ShieldCheck } from 'lucide-react';

interface PredictionEngineProps {
  onPredict: (input: PredictionInput) => Promise<PredictionResult>;
}

export const PredictionEngine: React.FC<PredictionEngineProps> = ({ onPredict }) => {
  const [formState, setFormState] = useState<PredictionInput>({
    attendance_mark: 85,
    lab_report_mark: 80,
    assignment_mark: 85,
    forum_mark: 75,
    class_performance_mark: 80,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleInputChange = (field: keyof PredictionInput, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const pred = await onPredict(formState);
      setResult(pred);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Engine Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-900 to-[#0d1b3e] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-indigo-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Random Forest Classifier Engine (89.4% Accuracy)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Interactive Student Academic Performance Predictor
          </h2>
          <p className="text-xs text-indigo-200 mt-1">
            Adjust behavioral, academic, and socio-economic variables to generate instant ML outcomes, risk bands, and personalized suggestions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters Form (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-700">
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Input Factors & Predictor Variables</span>
            </h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950"></span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Primary Quantitative Factors */}
            <div className="space-y-4">
              <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                1. Core Academic & Assessment Factors
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1 text-white">
                  <span>Attendance Mark: <strong className="text-indigo-600 dark:text-indigo-400">{formState.attendance_mark}</strong></span>
                  <span className="text-slate-400"></span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formState.attendance_mark}
                  onChange={(e) => handleInputChange('attendance_mark', Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1 text-white">
                  <span>Lab Report Mark: <strong className="text-indigo-600 dark:text-indigo-400">{formState.lab_report_mark}</strong></span>
                  <span className="text-slate-400"></span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formState.lab_report_mark}
                  onChange={(e) => handleInputChange('lab_report_mark', Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="fflex justify-between text-xs font-bold mb-1 text-white">
                  <span>Assignment Mark: <strong className="text-indigo-600 dark:text-indigo-400">{formState.assignment_mark}</strong></span>
                  <span className="text-slate-400"></span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formState.assignment_mark}
                  onChange={(e) => handleInputChange('assignment_mark', Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1 text-white">
                  <span>Forum Mark: <strong className="text-indigo-600 dark:text-indigo-400">{formState.forum_mark}</strong></span>
                  <span className="text-slate-400"></span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formState.forum_mark}
                  onChange={(e) => handleInputChange('forum_mark', Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1 text-white">
                  <span>Class Performance Mark: <strong className="text-indigo-600 dark:text-indigo-400">{formState.class_performance_mark}</strong></span>
                  <span className="text-slate-400"></span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formState.class_performance_mark}
                  onChange={(e) => handleInputChange('class_performance_mark', Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Executing Random Forest Scoring...</span>
              ) : (
                <>
                  <Cpu className="w-4 h-4 text-slate-950" />
                  <span>Generate Machine Learning Prediction</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Prediction Output & Results Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {result ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-700">
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>ML Prediction Output</span>
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300 font-black border border-amber-400/30">
                  {result.confidence_percentage}% Confidence
                </span>
              </div>

              {/* Main Score & Band Display */}
              <div className={`p-5 rounded-2xl border ${
                result.performance_band === 'High-Performing' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300' :
                result.performance_band === 'Average' ? 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-300' :
                'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-300'
              }`}>
                <div className="text-[10px] font-bold uppercase tracking-wider">Predicted Exam Score</div>
                <div className="text-4xl font-black mt-1">{result.predicted_score}%</div>

                <div className="mt-3 flex items-center justify-between text-xs font-bold pt-3 border-t border-current/20">
                  <span>Performance Band:</span>
                  <span className="text-sm font-black">{result.performance_band}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs font-bold">
                  <span>Risk Level:</span>
                  <span>{result.risk_level}</span>
                </div>
              </div>

              {/* Alternative Model Comparison */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="font-extrabold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-wider">
                  Cross-Algorithm Outcome Consistency
                </div>
                <div className="flex justify-between">
                  <span>Decision Tree:</span>
                  <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{result.alternative_models.decision_tree_band}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Logistic Regression:</span>
                  <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{result.alternative_models.logistic_regression_band}</strong>
                </div>
              </div>

              {/* Actionable Improvement Suggestions */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Personalized Academic Recommendations</span>
                </h4>
                <ul className="space-y-2 text-xs">
                  {result.suggestions.map((sug, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
                      • {sug}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                Ready to Predict Student Outcome
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Adjust the sliders on the left and click "Generate Machine Learning Prediction" to execute Random Forest scoring.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
