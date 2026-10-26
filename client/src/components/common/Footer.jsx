import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bronze-950 text-stone-300 pt-12 sm:pt-16 pb-8 sm:pb-12 border-t-4 border-brand-500 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Responsive 1 col (mobile) -> 2 cols (tablet) -> 4 cols (desktop) matching 4 content blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Identity (Spans 2 columns on large screens) */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-2xl bg-white shadow-sm border border-brand-500/30 overflow-hidden shrink-0">
                <img
                  src="/logo.png"
                  alt="Home Tuition"
                  className="h-10 sm:h-12 w-auto object-contain rounded-xl"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-white text-base sm:text-lg tracking-tight truncate">
                  Home Tuition
                </h4>
                <p className="text-[11px] sm:text-xs text-brand-400 font-semibold tracking-wide uppercase truncate">
                  Personalized Mentoring • Chennai
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Empowering students across India with personalized online learning, conceptual clarity in commerce, and exam-oriented mentorship founded by Mrs. Lakshmi S. (SET Qualified).
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-brand-500/20 text-brand-300 text-[11px] sm:text-xs flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-400 shrink-0" /> CBSE 2019–2025 Proven Results
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-brand-500/20 text-brand-300 text-[11px] sm:text-xs flex items-center gap-1.5 shrink-0">
                <Award className="w-3.5 h-3.5 text-brand-400 shrink-0" /> 100/100 Centum Mentorship
              </span>
            </div>
          </div>

          {/* Col 2: Learning & Features */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-white text-xs sm:text-sm uppercase tracking-wider text-brand-400">
              Interactive Hubs
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/learning-space" className="hover:text-brand-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500 shrink-0" />
                  <span className="truncate">My Learning Space</span>
                </Link>
              </li>
              <li>
                <Link to="/tutor-matching" className="hover:text-brand-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500 shrink-0" />
                  <span className="truncate">Smart Tutor Matcher</span>
                </Link>
              </li>
              <li>
                <Link to="/teacher-hub" className="hover:text-brand-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500 shrink-0" />
                  <span className="truncate">Teacher Development Hub</span>
                </Link>
              </li>
              <li>
                <Link to="/digital-literacy" className="hover:text-brand-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500 shrink-0" />
                  <span className="truncate">Digital Learning Simple</span>
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-brand-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-500 shrink-0" />
                  <span className="truncate">Board Exam Results</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Coaching */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-white text-xs sm:text-sm uppercase tracking-wider text-brand-400">
              Coaching Programs
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition-colors block">
                  CBSE Class 11 & 12 Accountancy
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition-colors block">
                  CBSE Class 11 & 12 Economics
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition-colors block">
                  Business Studies Case Masterclass
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition-colors block">
                  CA / CMA Foundation Fast-Track
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition-colors block">
                  NET / SET Commerce Preparation
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-brand-300 transition-colors block">
                  UG / PG College Mentorship
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Contact */}
          <div className="space-y-3">
            <h5 className="font-heading font-bold text-white text-xs sm:text-sm uppercase tracking-wider text-brand-400">
              Institutional Contact
            </h5>
            <div className="space-y-3 text-xs leading-relaxed text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span className="break-words">
                  123, Academic Avenue,<br />
                  Knowledge Park, Chennai - 600001,<br />
                  Tamilnadu, India.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-brand-300 transition-colors font-medium break-all">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:info@tutioncenter.com" className="hover:text-brand-300 transition-colors break-all">
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

        {/* Bottom Bar: Responsive flex wrap, text alignment, and spacing */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3 text-center sm:text-left">
          <p className="order-2 sm:order-1 text-stone-400">
            © {new Date().getFullYear()} Home Tuition. All rights reserved.
          </p>
          <div className="order-1 sm:order-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-stone-400">
            <Link to="/about" className="hover:text-stone-200 transition-colors">About Founder</Link>
            <span className="text-stone-600">•</span>
            <Link to="/achievements" className="hover:text-stone-200 transition-colors">Verified Testimonials</Link>
            <span className="text-stone-600">•</span>
            <Link to="/contact" className="hover:text-stone-200 transition-colors">Inquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;