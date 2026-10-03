import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, GraduationCap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    grade: 'Class 12',
    curriculum: 'CBSE',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(formData);
      addToast(`Account created! Welcome, ${user.name}!`, 'success');
      if (user.role === 'student') navigate('/dashboard/student');
      else if (user.role === 'parent') navigate('/dashboard/parent');
      else if (user.role === 'tutor') navigate('/dashboard/tutor');
      else navigate('/dashboard/admin');
    } catch (err) {
      addToast(err.response?.data?.message || 'Error creating account', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl border border-brand-200 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <img src="/logo.svg" alt="Logo" className="h-14 w-auto mx-auto object-contain" />
          </Link>
          <h2 className="text-2xl font-heading font-extrabold text-bronze-950">
            Create Your Learning Account
          </h2>
          <p className="text-xs text-stone-500">
            Join Online Home Tution Center & earn instant welcome points
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Account Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="tutor">Tutor / Educator</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 93457 93979"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Class / Standard</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
              >
                <option value="Class 12">Class 12</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 10">Class 10</option>
                <option value="CA/CMA Foundation">CA / CMA Foundation</option>
                <option value="UG/PG">UG / PG</option>
                <option value="NET/SET">NET / SET</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Curriculum</label>
              <select
                name="curriculum"
                value={formData.curriculum}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
              >
                <option value="CBSE">CBSE</option>
                <option value="State Board">State Board</option>
                <option value="ICSE/ISC">ICSE / ISC</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Password *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-500/20 transition cursor-pointer"
            >
              {loading ? 'Creating Profile...' : 'Sign Up & Get 50 Welcome Points'}
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-stone-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-700 hover:text-brand-800 underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
