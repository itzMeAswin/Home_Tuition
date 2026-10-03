import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, Heart, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bronze-950 text-stone-300 pt-16 pb-12 border-t-4 border-brand-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-2xl bg-white shadow-sm border border-brand-500/30">
                <img
                  src="/logo.svg"
                  alt="Online Home Tution Center"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div>
                <h4 className="font-heading font-bold text-white text-lg tracking-tight">
                  Online Home Tution Center
                </h4>
                <p className="text-xs text-brand-400 font-semibold tracking-wide uppercase">
                  Personalized Mentoring • Chennai
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Empowering students across India with personalized online learning, conceptual clarity in commerce, and exam-oriented mentorship founded by Mrs. Lakshmi S. (SET Qualified).
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-brand-500/20 text-brand-300 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-400" /> CBSE 2019–2025 Proven Results
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-brand-500/20 text-brand-300 text-xs flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand-400" /> 100/100 Centum Mentorship
              </span>
            </div>
          </div>

          {/* Col 2: Learning & Features */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-white text-sm uppercase tracking-wider text-brand-400">
              Interactive Hubs
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/learning-space" className="hover:text-brand-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500" /> My Learning Space
                </Link>
              </li>
              <li>
                <Link to="/tutor-matching" className="hover:text-brand-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500" /> Smart Tutor Matcher
                </Link>
              </li>
              <li>
                <Link to="/teacher-hub" className="hover:text-brand-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500" /> Teacher Development Hub
                </Link>
              </li>
              <li>
                <Link to="/digital-literacy" className="hover:text-brand-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500" /> Digital Learning Simple
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-brand-300 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500" /> Board Exam Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Coaching */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-white text-sm uppercase tracking-wider text-brand-400">
              Coaching Programs
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition">
                  CBSE Class 11 & 12 Accountancy
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition">
                  CBSE Class 11 & 12 Economics
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition">
                  Business Studies Case Masterclass
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition">
                  CA / CMA Foundation Fast-Track
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition">
                  NET / SET Commerce Preparation
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition">
                  UG / PG College Mentorship
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Contact */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-white text-sm uppercase tracking-wider text-brand-400">
              Institutional Contact
            </h5>
            <div className="space-y-3 text-xs leading-relaxed text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>
                  123, Academic Avenue,<br />
                  Knowledge Park, Chennai - 600001,<br />
                  Tamilnadu, India.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-brand-300 transition font-medium">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:info@tutioncenter.com" className="hover:text-brand-300 transition">
                  info@tutioncenter.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-stone-400">
                <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Mon – Sun: 6:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Online Home Tution Center. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-stone-300 transition">About Founder</Link>
            <span>•</span>
            <Link to="/achievements" className="hover:text-stone-300 transition">Verified Testimonials</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-stone-300 transition">Inquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
