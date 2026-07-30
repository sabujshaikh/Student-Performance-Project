import React from 'react';
import { User } from '../types';
import { GraduationCap, BarChart3, Users, Cpu, Database, Info, LogOut, Sun, Moon, Sparkles, Lock } from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onOpenInfo: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onLogout,
  onOpenInfo,
  darkMode,
  setDarkMode
}) => {
  const allTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, roles: ['student', 'teacher'] },
    { id: 'student', label: 'Student Portal', icon: GraduationCap, roles: ['student', 'teacher'] },
    { id: 'teacher', label: 'Teacher Portal', icon: Users, roles: ['teacher'] },
    { id: 'prediction', label: 'ML Predictor', icon: Cpu, roles: ['student', 'teacher'] },
  ];

  return (
    <header className="bg-[#0d1b3e] text-white border-b border-slate-800/80 sticky top-0 z-40 shadow-lg">
      {/* Top Banner Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src="https://www.clipartmax.com/png/small/272-2722209_world-university-of-bangladesh.png"
            alt="World University of Bangladesh Logo"
            className="w-11 h-11 object-contain rounded-xl bg-white p-1 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-sm sm:text-base tracking-tight uppercase text-white">
                World University of Bangladesh
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Dept of CSE
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium mt-0.5">
              Student Performance Analytics & ML Risk Predictor • Data Mining Lab
            </p>
          </div>
        </div>

        {/* Action Controls & Profile Pill */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-white/10 border border-white/15 text-amber-300 hover:bg-white/20 transition-all"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenInfo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 transition"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Project Proposal</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-700/80">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white">{currentUser.name}</div>
                <div className="text-[10px] text-amber-300 capitalize font-medium">{currentUser.role} ({currentUser.id})</div>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 font-bold text-xs transition"
                title="Logout Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>Unauthenticated</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      {currentUser && (
        <div className="border-t border-slate-800/80 bg-[#08122a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1.5 py-1.5 scrollbar-none">
            {allTabs.map(tab => {
              if (!tab.roles.includes(currentUser.role)) return null;
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/10'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
