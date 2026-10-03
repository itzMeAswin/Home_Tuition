import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const ContactPage = ({ onOpenBookingModal }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: 'Class 12',
    subject: 'Commerce & Accountancy',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/inquiries', formData);
      setSubmitted(true);
      addToast('Thank you! Your message has been received.', 'success');
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}
    } catch (err) {
      addToast(err.response?.data?.message || 'Error submitting inquiry', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello%20Online%20Home%20Tution%20Center,%20I%20would%20like%20to%20inquire%20about%20your%20classes.', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-bronze-950 via-bronze-900 to-brand-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-brand-300" /> Student & Parent Help Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            CONTACT OUR INSTITUTION
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Have questions regarding admissions, personalized demo sessions, or tuition timings? Connect with our academic counselors today.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info & Address Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-200/80 space-y-6">
              <h3 className="font-heading font-bold text-xl text-bronze-950">
                Institutional Coordinates
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                {/* Location */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-bronze-950">Main Center Location</h4>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">
                      54, 2nd Street, Royarthope,<br />
                      Srirangam, Trichy - 620006,<br />
                      Tamilnadu, India.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <a
                  href="tel:+919345793979"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 hover:border-brand-400 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-bronze-950">Call Helpline</h4>
                    <p className="text-stone-600 mt-0.5 font-semibold">+91 98765 43210</p>
                    <span className="text-[11px] text-stone-400">Available 6:00 AM - 9:00 PM IST</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@tutioncenter.com"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 hover:border-brand-400 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-bronze-950">Direct Email</h4>
                    <p className="text-stone-600 mt-0.5">info@tutioncenter.com</p>
                  </div>
                </a>

                {/* WhatsApp Chat Button */}
                <button
                  onClick={openWhatsApp}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat with Academic Counselor on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-3xl p-2 shadow-lg border border-stone-200 overflow-hidden h-64">
              <iframe
                title="Academic Center Location"
                src="https://maps.google.com/maps?q=123,+Academic+Avenue,+Knowledge+Park,+Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full rounded-2xl border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right: Contact & Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-brand-200/80">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-bronze-950">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been stored in our system. Our academic mentor will contact you shortly to guide you.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', grade: 'Class 12', subject: 'Commerce', message: '' }); }}
                    className="px-6 py-2.5 rounded-xl border border-stone-300 text-xs font-bold hover:bg-stone-50"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={onOpenBookingModal}
                    className="px-6 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-bold hover:bg-brand-600 shadow-sm"
                  >
                    Book Free Trial Class
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-heading font-extrabold text-bronze-950">
                    Online Inquiry Form
                  </h3>
                  <p className="text-xs text-stone-500">
                    Fill in your details below and our counseling faculty will revert within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh S."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 93457 93979"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="parent@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Course / Level</label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
                    >
                      <option value="Class 12">CBSE Class 12</option>
                      <option value="Class 11">CBSE Class 11</option>
                      <option value="CA/CMA Foundation">CA / CMA Foundation</option>
                      <option value="UG/PG">UG / PG Commerce</option>
                      <option value="NET/SET">NET / SET</option>
                      <option value="Other">Other Standard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Subject of Interest</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Accountancy, Economics, or Integrated Commerce"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Message or Learning Needs *</label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please specify if you are looking for online or offline batches, timing preferences, or specific chapters needing revision."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-brand-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting...' : 'Send Inquiry to Academic Team'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
