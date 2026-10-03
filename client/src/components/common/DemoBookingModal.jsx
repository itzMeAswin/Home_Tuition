import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, BookOpen, GraduationCap, CheckCircle2, Sparkles, Send, Phone, Mail, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const DemoBookingModal = ({ isOpen, onClose, preselectedSubject = '', preselectedTutor = '' }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    grade: 'Class 12',
    subject: preselectedSubject || 'Accountancy',
    curriculum: 'CBSE',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: '5:00 PM - 6:00 PM',
    mode: 'Online',
    message: '',
    learningGoals: '',
  });

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/bookings', {
        ...formData,
        assignedTutor: preselectedTutor || 'Mrs. Lakshmi S.',
      });

      setConfirmedBooking(res.data.booking);
      addToast('Demo class booked successfully!', 'success');

      // Trigger Confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C29B1A', '#D4AF37', '#10B981', '#3B82F6'],
        });
      } catch (err) {}
    } catch (error) {
      console.error(error);
      addToast(error.response?.data?.message || 'Failed to book demo class. Please check fields.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-200 overflow-hidden my-8"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-bronze-900 via-bronze-800 to-brand-800 text-white p-6 sm:p-8 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-brand-500/30 border border-brand-400/40 text-brand-200 text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" /> 100% Free Trial Class
            </span>
            <span className="text-white/60 text-xs">No Credit Card Required</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold">Book a Free Live Demo Class</h3>
          <p className="text-stone-300 text-sm mt-1">
            Experience our interactive teaching methodology, personalized concept breakdown, and expert guidance.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {confirmedBooking ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-heading font-bold text-bronze-950 mb-2">
                Demo Class Scheduled!
              </h4>
              <p className="text-bronze-600 max-w-md mx-auto text-sm mb-6">
                Thank you, <strong className="text-bronze-900">{confirmedBooking.studentName}</strong>. Your free trial session has been confirmed.
              </p>

              <div className="bg-[#FAF8F5] border border-brand-200 rounded-2xl p-5 max-w-md mx-auto text-left mb-6 space-y-2.5 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-brand-200/60">
                  <span className="text-bronze-600">Booking Reference:</span>
                  <span className="font-mono font-bold text-brand-700">{confirmedBooking.bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze-600">Subject:</span>
                  <span className="font-semibold text-bronze-900">{confirmedBooking.subject} ({confirmedBooking.grade})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze-600">Preferred Date:</span>
                  <span className="font-semibold text-bronze-900">{confirmedBooking.preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze-600">Time Slot:</span>
                  <span className="font-semibold text-bronze-900">{confirmedBooking.preferredTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze-600">Mode:</span>
                  <span className="font-semibold text-emerald-700">{confirmedBooking.mode}</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 mb-6">
                Our academic coordinator will reach out to you on <strong>{confirmedBooking.phone}</strong> with the live class link.
              </p>

              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all shadow-md shadow-brand-500/20"
              >
                Done, Return to Website
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-bronze-800 uppercase tracking-wider mb-1.5">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      name="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-bronze-800 uppercase tracking-wider mb-1.5">
                    Parent / Guardian Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="e.g. Mrs. Kavitha"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-bronze-800 uppercase tracking-wider mb-1.5">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 93457 93979"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-bronze-800 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-bronze-800 uppercase tracking-wider mb-1.5">
                    Grade / Level *
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 text-sm outline-none bg-white"
                  >
                    <option value="Class 12">Class 12 (Board Prep)</option>
                    <option value="Class 11">Class 11 (Foundations)</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                    <option value="CA/CMA Foundation">CA / CMA Foundation</option>
                    <option value="UG/PG">UG / PG Commerce</option>
                    <option value="NET/SET">NET / SET Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-bronze-800 uppercase tracking-wider mb-1.5">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 text-sm outline-none bg-white"
                  >
                    <option value="Accountancy">Accountancy</option>
                    <option value="Economics">Economics</option>
                    <option value="Business Studies">Business Studies</option>
                    <option value="Commerce (All Subjects)">Commerce (All Subjects)</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science Foundations</option>
                    <option value="CA/CMA Foundation">CA/CMA Foundation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-bronze-800 uppercase tracking-wider mb-1.5">
                    Curriculum
                  </label>
                  <select
                    name="curriculum"
                    value={formData.curriculum}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 text-sm outline-none bg-white"
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="State Board">State Board</option>
                    <option value="ICSE/ISC">ICSE / ISC</option>
                    <option value="Foundation">Professional / University</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-bronze-800 uppercase tracking-wider mb-1.5">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-bronze-800 uppercase tracking-wider mb-1.5">
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 text-sm outline-none bg-white"
                    >
                      <option value="6:00 AM - 7:00 AM">Morning (6:00 AM - 7:00 AM)</option>
                      <option value="5:00 PM - 6:00 PM">Evening (5:00 PM - 6:00 PM)</option>
                      <option value="6:30 PM - 7:30 PM">Evening (6:30 PM - 7:30 PM)</option>
                      <option value="8:00 PM - 9:00 PM">Night (8:00 PM - 9:00 PM)</option>
                      <option value="Weekend Slot">Weekend Slot (Flexible)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-bronze-800 uppercase tracking-wider mb-1.5">
                  Learning Goal or Challenging Topics
                </label>
                <textarea
                  name="learningGoals"
                  rows={2}
                  value={formData.learningGoals}
                  onChange={handleChange}
                  placeholder="e.g. Need help with Partnership adjustments, Cash Flow statements, and board exam presentation."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-brand-500 text-sm outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-semibold text-base shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <span>Scheduling Demo Class...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Confirm Free Demo Class Booking
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-stone-400 mt-2">
                  No payment details required. Verified educator assigned upon booking.
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DemoBookingModal;
