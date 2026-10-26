import React from 'react';
import { GraduationCap, Award, Users, Shield, User } from 'lucide-react';

const SOLID_COLORS = [
  'bg-blue-600 text-white',
  'bg-indigo-600 text-white',
  'bg-emerald-600 text-white',
  'bg-purple-600 text-white',
  'bg-rose-600 text-white',
  'bg-sky-600 text-white',
];

const UserAvatar = ({ name = 'Student', role = 'student', size = 'md', className = '' }) => {
  // Get initials
  const parts = name.trim().split(' ');
  const initials = parts.length > 1 
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();

  // Pick deterministic solid color from name string
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorClass = SOLID_COLORS[Math.abs(hash) % SOLID_COLORS.length];

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-bold',
    lg: 'w-14 h-14 text-base font-extrabold',
    xl: 'w-20 h-20 text-xl font-black',
    '2xl': 'w-24 h-24 text-2xl font-black',
  };

  return (
    <div
      className={`rounded-2xl ${colorClass} flex items-center justify-center font-heading shrink-0 shadow-sm border border-white/20 select-none ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <span>{initials}</span>
    </div>
  );
};

export default UserAvatar;
