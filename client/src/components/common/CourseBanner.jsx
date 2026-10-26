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
        bg: 'bg-brand-900 border-b-2 border-brand-500',
        badgeBg: 'bg-brand-950/60 border-brand-400/30 text-brand-200',
        modeBg: 'bg-brand-700/80 text-white',
        iconBox: 'bg-brand-800 border-brand-600 text-brand-300',
        watermarkColor: 'text-brand-700/30',
        icon: Calculator,
        code: 'ACT-101',
        pattern: 'T-Ledger • P&L Appropriation • Balance Sheet'
      };
    }
    if (s.includes('econ')) {
      return {
        bg: 'bg-brand-800 border-b-2 border-brand-400',
        badgeBg: 'bg-brand-950/60 border-brand-300/30 text-brand-200',
        modeBg: 'bg-brand-600/80 text-white',
        iconBox: 'bg-brand-700 border-brand-500 text-brand-200',
        watermarkColor: 'text-brand-600/30',
        icon: TrendingUp,
        code: 'ECO-202',
        pattern: 'GDP Deflator • Multiplier • Macro Aggregates'
      };
    }
    if (s.includes('business')) {
      return {
        bg: 'bg-bronze-900 border-b-2 border-brand-500',
        badgeBg: 'bg-bronze-950/70 border-bronze-700 text-brand-200',
        modeBg: 'bg-brand-600 text-white',
        iconBox: 'bg-bronze-800 border-bronze-700 text-brand-300',
        watermarkColor: 'text-bronze-700/30',
        icon: Briefcase,
        code: 'BST-303',
        pattern: 'Taylor & Fayol Principles • Financial Markets'
      };
    }
    if (s.includes('foundation') || s.includes('ca')) {
      return {
        bg: 'bg-emerald-950 border-b-2 border-emerald-500',
        badgeBg: 'bg-emerald-900/60 border-emerald-700 text-emerald-200',
        modeBg: 'bg-emerald-700 text-white',
        iconBox: 'bg-emerald-800 border-emerald-600 text-emerald-200',
        watermarkColor: 'text-emerald-800/30',
        icon: Scale,
        code: 'PRO-CA',
        pattern: 'Mercantile Law • Partnership • Consignment'
      };
    }
    if (s.includes('math')) {
      return {
        bg: 'bg-navy-900 border-b-2 border-brand-400',
        badgeBg: 'bg-navy-950/70 border-navy-700 text-brand-200',
        modeBg: 'bg-navy-700 text-white',
        iconBox: 'bg-navy-800 border-navy-600 text-brand-300',
        watermarkColor: 'text-navy-700/30',
        icon: Pi,
        code: 'MTH-404',
        pattern: 'Calculus • Probability • Matrices & Vectors'
      };
    }
    if (s.includes('sci') && !s.includes('social')) {
      return {
        bg: 'bg-teal-950 border-b-2 border-teal-500',
        badgeBg: 'bg-teal-900/60 border-teal-700 text-teal-200',
        modeBg: 'bg-teal-700 text-white',
        iconBox: 'bg-teal-800 border-teal-600 text-teal-200',
        watermarkColor: 'text-teal-800/30',
        icon: Atom,
        code: 'SCI-505',
        pattern: 'Mechanics • Optics • Thermodynamics'
      };
    }
    if (s.includes('computer')) {
      return {
        bg: 'bg-slate-900 border-b-2 border-brand-500',
        badgeBg: 'bg-slate-950/70 border-slate-700 text-brand-200',
        modeBg: 'bg-brand-600 text-white',
        iconBox: 'bg-slate-800 border-slate-700 text-brand-300',
        watermarkColor: 'text-slate-700/30',
        icon: Atom,
        code: 'CS-601',
        pattern: 'Python Scripting • MySQL Connectivity • Stacks'
      };
    }
    if (s.includes('tamil')) {
      return {
        bg: 'bg-amber-950 border-b-2 border-amber-600',
        badgeBg: 'bg-amber-900/60 border-amber-700 text-amber-200',
        modeBg: 'bg-amber-700 text-white',
        iconBox: 'bg-amber-800 border-amber-600 text-amber-200',
        watermarkColor: 'text-amber-800/30',
        icon: BookOpen,
        code: 'TAM-701',
        pattern: 'இலக்கணம் • திருக்குறள் • உரைநடை'
      };
    }
    if (s.includes('english')) {
      return {
        bg: 'bg-brand-950 border-b-2 border-brand-400',
        badgeBg: 'bg-brand-900/60 border-brand-700 text-brand-200',
        modeBg: 'bg-brand-600 text-white',
        iconBox: 'bg-brand-800 border-brand-700 text-brand-300',
        watermarkColor: 'text-brand-800/30',
        icon: BookOpen,
        code: 'ENG-801',
        pattern: 'Analytical Paragraphs • Formal Letters • Literature'
      };
    }
    if (s.includes('social')) {
      return {
        bg: 'bg-stone-900 border-b-2 border-brand-500',
        badgeBg: 'bg-stone-950/70 border-stone-700 text-brand-200',
        modeBg: 'bg-brand-700 text-white',
        iconBox: 'bg-stone-800 border-stone-700 text-brand-300',
        watermarkColor: 'text-stone-700/30',
        icon: BookOpen,
        code: 'SST-901',
        pattern: 'Nationalism • Map Pointing • Political Parties'
      };
    }
    return {
      bg: 'bg-bronze-950 border-b-2 border-brand-500',
      badgeBg: 'bg-bronze-900/70 border-bronze-700 text-brand-200',
      modeBg: 'bg-brand-600 text-white',
      iconBox: 'bg-bronze-800 border-bronze-700 text-brand-300',
      watermarkColor: 'text-bronze-700/30',
      icon: BookOpen,
      code: 'EDU-001',
      pattern: 'Concept Clarity • Analytical Socratic Methods'
    };
  };

  const config = getSubjectConfig(subject);
  const IconComponent = config.icon;

  return (
    <div
      className={`relative min-h-[160px] sm:h-44 md:h-48 w-full ${config.bg} p-4 sm:p-5 md:p-6 flex flex-col justify-between overflow-hidden text-white select-none ${className}`}
    >
      {/* Background Watermark Icon */}
      <div className={`absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 pointer-events-none select-none ${config.watermarkColor}`}>
        <IconComponent className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 stroke-[1]" />
      </div>

      {/* Top Header Tags */}
      <div className="flex items-center justify-between gap-2 relative z-10 w-full">
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase border shrink-0 ${config.badgeBg}`}
        >
          {config.code}
        </span>
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide shrink-0 ${config.modeBg}`}
        >
          {mode}
        </span>
      </div>

      {/* Bottom Subject & Syllabus Pattern */}
      <div className="relative z-10 space-y-1.5 pt-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`p-2 rounded-xl border shadow-sm shrink-0 flex items-center justify-center ${config.iconBox}`}
          >
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-sm sm:text-base font-heading font-extrabold tracking-wide text-white truncate">
            {subject}
          </span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-bronze-300 font-mono tracking-wider truncate">
          {config.pattern}
        </p>
      </div>
    </div>
  );
};

export default CourseBanner;