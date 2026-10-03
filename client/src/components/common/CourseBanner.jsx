import React from 'react';
import { 
  Calculator, TrendingUp, Briefcase, Pi, 
  Atom, Scale, BookOpen, GraduationCap 
} from 'lucide-react';

const CourseBanner = ({ subject = 'Accountancy', mode = 'Online', className = '' }) => {
  const getSubjectConfig = (subj) => {
    const s = subj.toLowerCase();
    if (s.includes('account')) {
      return {
        bg: 'from-amber-600 via-brand-600 to-amber-700',
        icon: Calculator,
        code: 'ACT-101',
        pattern: 'T-Ledger • P&L Appropriation • Balance Sheet'
      };
    }
    if (s.includes('econ')) {
      return {
        bg: 'from-blue-600 via-indigo-600 to-slate-800',
        icon: TrendingUp,
        code: 'ECO-202',
        pattern: 'GDP Deflator • Multiplier • Macro Aggregates'
      };
    }
    if (s.includes('business')) {
      return {
        bg: 'from-purple-600 via-indigo-700 to-slate-900',
        icon: Briefcase,
        code: 'BST-303',
        pattern: 'Taylor & Fayol Principles • Financial Markets'
      };
    }
    if (s.includes('foundation') || s.includes('ca')) {
      return {
        bg: 'from-emerald-700 via-teal-800 to-slate-900',
        icon: Scale,
        code: 'PRO-CA',
        pattern: 'Mercantile Law • Partnership • Consignment'
      };
    }
    if (s.includes('math')) {
      return {
        bg: 'from-rose-600 via-pink-700 to-slate-900',
        icon: Pi,
        code: 'MTH-404',
        pattern: 'Calculus • Probability • Matrices & Vectors'
      };
    }
    if (s.includes('sci')) {
      return {
        bg: 'from-cyan-600 via-teal-700 to-slate-900',
        icon: Atom,
        code: 'SCI-505',
        pattern: 'Mechanics • Optics • Thermodynamics'
      };
    }
    return {
      bg: 'from-brand-600 via-amber-700 to-slate-900',
      icon: BookOpen,
      code: 'EDU-001',
      pattern: 'Concept Clarity • Analytical Socratic Methods'
    };
  };

  const config = getSubjectConfig(subject);
  const IconComponent = config.icon;

  return (
    <div className={`relative h-48 w-full bg-gradient-to-br ${config.bg} p-6 flex flex-col justify-between overflow-hidden text-white select-none ${className}`}>
      {/* Decorative Geometry */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
      <div className="absolute right-8 top-6 opacity-20 pointer-events-none">
        <IconComponent className="w-24 h-24 stroke-[1]" />
      </div>

      {/* Top Tag */}
      <div className="flex items-center justify-between relative z-10">
        <span className="px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase border border-white/15">
          {config.code}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold">
          {mode}
        </span>
      </div>

      {/* Center Icon & Pattern */}
      <div className="relative z-10 space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 shadow-sm">
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-heading font-extrabold tracking-wide drop-shadow-sm">
            {subject}
          </span>
        </div>
        <p className="text-[10px] text-white/75 font-mono tracking-wider truncate">
          {config.pattern}
        </p>
      </div>
    </div>
  );
};

export default CourseBanner;
