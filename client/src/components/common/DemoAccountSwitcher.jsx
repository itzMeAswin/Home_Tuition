import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, GraduationCap, Users, UserCheck, Key, ChevronDown, ChevronUp, LogOut } from 'lucide-react';

const DemoAccountSwitcher = () => {
  const { user, role, quickSwitchUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSwitch = async (targetRole, dashboardRoute) => {
    await quickSwitchUser(targetRole);
    setIsOpen(false);
    if (dashboardRoute) {
      navigate(dashboardRoute);
    }
  };

  const getRoleBadge = (r) => {
    switch (r) {
      case 'admin':
        return { label: 'Admin', color: 'bg-rose-100 text-rose-800 border-rose-300' };
      case 'tutor':
        return { label: 'Tutor', color: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'student':
        return { label: 'Student', color: 'bg-brand-100 text-brand-800 border-brand-300' };
      case 'parent':
        return { label: 'Parent', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      default:
        return { label: 'Guest Visitor', color: 'bg-stone-100 text-stone-700 border-stone-300' };
    }
  };

  const currentBadge = getRoleBadge(role);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-12 left-0 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-bronze-800 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-brand-600" /> 1-Click Role Switcher
              </span>
              <span className="text-[10px] text-stone-400">Client Demo Mode</span>
            </div>

            <p className="text-xs text-stone-500 mb-3">
              Switch roles instantly to preview any personalized dashboard:
            </p>

            <div className="space-y-1.5">
              <button
                onClick={() => handleSwitch('student', '/dashboard/student')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  role === 'student' ? 'bg-brand-50 border border-brand-300 text-brand-900' : 'hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-brand-600" />
                  <span>Student (Aarav - Class 12)</span>
                </div>
                {role === 'student' && <span className="text-[10px] text-brand-600 font-bold">Active</span>}
              </button>

              <button
                onClick={() => handleSwitch('parent', '/dashboard/parent')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  role === 'parent' ? 'bg-emerald-50 border border-emerald-300 text-emerald-900' : 'hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Parent (Mrs. Kavitha)</span>
                </div>
                {role === 'parent' && <span className="text-[10px] text-emerald-600 font-bold">Active</span>}
              </button>

              <button
                onClick={() => handleSwitch('tutor', '/dashboard/tutor')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  role === 'tutor' ? 'bg-purple-50 border border-purple-300 text-purple-900' : 'hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                  <span>Tutor (Mrs. Sandhya - Founder)</span>
                </div>
                {role === 'tutor' && <span className="text-[10px] text-purple-600 font-bold">Active</span>}
              </button>

              <button
                onClick={() => handleSwitch('admin', '/dashboard/admin')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  role === 'admin' ? 'bg-rose-50 border border-rose-300 text-rose-900' : 'hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-rose-600" />
                  <span>Admin (Directorate)</span>
                </div>
                {role === 'admin' && <span className="text-[10px] text-rose-600 font-bold">Active</span>}
              </button>

              {user && (
                <button
                  onClick={() => { logout(); setIsOpen(false); navigate('/'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition mt-2 pt-2 border-t border-stone-100"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Switch to Guest Visitor</span>
                </button>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-stone-200 hover:border-brand-400 text-stone-800 transition-all text-xs font-medium cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
          <span className="text-stone-500">Preview:</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${currentBadge.color}`}>
            {currentBadge.label}
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-stone-400" /> : <ChevronUp className="w-3.5 h-3.5 text-stone-400" />}
        </button>
      </div>
    </div>
  );
};

export default DemoAccountSwitcher;
