import React, { useState } from 'react';
import { User } from '../types';
import { API_BASE_URL } from '../config';
import { Lock, GraduationCap, Users, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [username, setUsername] = useState('4070');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
      const data = await res.json();

      if (res.ok && data.user) {
        onLoginSuccess(data.user);
      } else {
        setError(data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setError('Network connection error. Ensure Flask backend API is online.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoStudent1 = () => {
    setRole('student');
    setUsername('4070');
    setPassword('password');
    setError(null);
  };

  const setDemoStudent2 = () => {
    setRole('student');
    setUsername('4069');
    setPassword('password');
    setError(null);
  };

  const setDemoTeacher = () => {
    setRole('teacher');
    setUsername('teacher');
    setPassword('password');
    setError(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Top University Branding Card */}
        <div className="text-center space-y-2">
          <img
            src="https://www.clipartmax.com/png/small/272-2722209_world-university-of-bangladesh.png"
            alt="World University of Bangladesh Logo"
            className="inline-block w-20 h-20 object-contain rounded-2xl bg-white p-2 shadow-xl mb-1 border border-slate-200 dark:border-slate-700"
          />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            World University of Bangladesh
          </h2>
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Department of Computer Science & Engineering
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Student Performance Analytics & ML Risk Prediction System
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700/80 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>System Authentication</span>
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/30">
              Protected Gateway
            </span>
          </div>

          {/* Role Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => {
                setRole('student');
                setUsername('4070');
                setError(null);
              }}
              className={`py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
                role === 'student'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('teacher');
                setUsername('teacher');
                setError(null);
              }}
              className={`py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
                role === 'teacher'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Teacher / Faculty</span>
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1.5">
                {role === 'student' ? 'Student ID / Roll (e.g. 4070, 4069)' : 'Teacher Username (e.g. teacher)'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder={role === 'student' ? '4070' : 'teacher'}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating with MySQL...</span>
              ) : (
                <>
                  <span>Authenticate & Access System</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/80">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Quick Fill Demo Credentials</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <button
                type="button"
                onClick={setDemoStudent1}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left transition"
              >
                <div className="font-extrabold text-slate-800 dark:text-slate-200">Sabuj Shaikh</div>
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold">4070 / password</div>
              </button>

              <button
                type="button"
                onClick={setDemoStudent2}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left transition"
              >
                <div className="font-extrabold text-slate-800 dark:text-slate-200">Md Nazim Uddin</div>
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold">4069 / password</div>
              </button>

              <button
                type="button"
                onClick={setDemoTeacher}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left transition"
              >
                <div className="font-extrabold text-slate-800 dark:text-slate-200">Faculty / Teacher</div>
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold">teacher / password</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
