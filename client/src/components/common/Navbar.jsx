import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Phone, Sparkles, BookOpen, User, 
  GraduationCap, Award, Compass, Laptop, LogOut, LayoutDashboard,
  MapPin, Flame, BrainCircuit, Trophy, Users, MessageCircle, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from './UserAvatar';

const Navbar = ({ onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/', icon: GraduationCap },
    { label: 'Programs', path: '/courses', icon: BookOpen },
    { label: 'My Learning Space', path: '/learning-space', badge: 'Interactive', icon: Flame },
    { label: 'Tutor Matcher', path: '/tutor-matching', icon: BrainCircuit },
    { label: 'Teacher Hub', path: '/teacher-hub', icon: Award },
    { label: 'Digital Literacy', path: '/digital-literacy', icon: Laptop },
    { label: 'Achievements', path: '/achievements', icon: Trophy },
    { label: 'About', path: '/about', icon: Users },
    { label: 'Contact', path: '/contact', icon: MessageCircle },
  ];

  const getDashboardPath = () => {
    switch (role) {
      case 'student': return '/dashboard/student';
      case 'parent': return '/dashboard/parent';
      case 'tutor': return '/dashboard/tutor';
      case 'admin': return '/dashboard/admin';
      default: return '/learning-space';
    }
  };

  return (
    <>
      {/* Top Utility Announcement Ribbon */}
      <div className="bg-gradient-to-r from-bronze-950 via-bronze-900 to-brand-950 text-white text-[11px] sm:text-xs py-2 px-4 border-b border-brand-500/20 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="text-brand-300 font-bold uppercase tracking-wider hidden sm:inline">Admissions Open 2026-27:</span>
            <span className="text-stone-300 truncate font-medium">CBSE Class 11 & 12 • CA/CMA Foundation • 1-on-1 Personalized Mentoring</span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-stone-300">
            <div className="hidden md:flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span>Trichy Center & Online Pan-India</span>
            </div>
            <a
              href="tel:+919345793979"
              className="flex items-center gap-1.5 text-brand-300 hover:text-white font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>+91 93457 93979</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-brand-200/60'
            : 'bg-white py-3.5 border-b border-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Title */}
            <Link to="/" className="flex items-center gap-3.5 group shrink-0">
              <div className="relative p-1 rounded-2xl bg-white shadow-xs border border-brand-200/60 transition-transform group-hover:scale-105">
                <img
                  src="/logo.svg"
                  alt="Online Home Tution Center Logo"
                  className="h-11 sm:h-12 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-base sm:text-lg text-bronze-950 tracking-tight leading-tight flex items-center gap-1.5 group-hover:text-brand-800 transition">
                  Online Home Tution Center
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-brand-700 tracking-wider uppercase">
                  Aksharas Academy • Trichy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-2 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'text-brand-950 bg-brand-50 border border-brand-200/60 shadow-xs'
                        : 'text-stone-700 hover:text-brand-800 hover:bg-stone-50/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-gradient-to-r from-amber-500 to-brand-500 text-white shadow-xs animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border border-stone-200 hover:border-brand-400 bg-stone-50/80 hover:bg-white transition cursor-pointer shadow-xs"
                  >
                    <UserAvatar name={user.name} role={role} size="sm" />
                    <div className="text-left max-w-[110px]">
                      <p className="text-xs font-bold text-bronze-950 truncate leading-tight">
                        {user.name}
                      </p>
                      <p className="text-[10px] font-bold uppercase text-brand-700 tracking-wide">
                        {role}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-brand-100 p-2 z-50 animate-in fade-in duration-150">
                      <div className="px-3 py-2.5 border-b border-stone-100 mb-1 bg-brand-50/50 rounded-xl">
                        <p className="text-xs font-bold text-bronze-950 truncate">{user.name}</p>
                        <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to={getDashboardPath()}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-brand-50 hover:text-brand-800 rounded-xl transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand-600" />
                        <span>Go to Dashboard</span>
                      </Link>
                      <button
                        onClick={() => { logout(); setUserDropdownOpen(false); navigate('/'); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl text-left transition mt-1 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-bronze-800 hover:text-brand-800 hover:bg-brand-50 transition"
                >
                  Log In
                </Link>
              )}

              {/* Free Demo CTA */}
              <button
                onClick={onOpenBookingModal}
                className="px-4.5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-600 via-amber-600 to-brand-500 hover:from-brand-700 hover:to-amber-700 text-white text-xs font-extrabold shadow-md shadow-brand-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Book Free Demo</span>
              </button>
            </div>

            {/* Mobile Hamburger & Quick Demo Button */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={onOpenBookingModal}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-200" />
                <span>Free Demo</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2.5 rounded-2xl text-sm font-semibold flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-950 border border-brand-200'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-stone-400'}`} />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-brand-500 text-white font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex flex-col gap-2.5">
              {user ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    className="w-full py-2.5 px-4 text-center rounded-2xl bg-brand-50 text-brand-950 font-bold text-sm border border-brand-200 flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-600" />
                    <span>My Dashboard ({role})</span>
                  </Link>
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="w-full py-2 text-center text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-2xl cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    className="py-2.5 text-center rounded-2xl border border-stone-200 text-stone-800 font-bold text-sm hover:bg-stone-50"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="py-2.5 text-center rounded-2xl bg-bronze-900 text-white font-bold text-sm hover:bg-bronze-950"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <a
                href="tel:+919345793979"
                className="py-2 text-center text-xs font-semibold text-stone-600 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>Direct Faculty Helpline: +91 93457 93979</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
