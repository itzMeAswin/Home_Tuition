import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Phone, Sparkles, BookOpen, 
  GraduationCap, Award, Laptop, LogOut, LayoutDashboard,
  MapPin, Flame, BrainCircuit, Trophy, Users, MessageCircle, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from './UserAvatar';

const Navbar = ({ onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary desktop navbar links
  const primaryLinks = [
    { label: 'Home', path: '/', icon: GraduationCap },
    { label: 'Programs', path: '/courses', icon: BookOpen },
    { label: 'Achievements', path: '/achievements', icon: Trophy },
    { label: 'Contact', path: '/contact', icon: MessageCircle },
  ];

  // Additional exploratory links housed inside the drawer menu
  const drawerSecondaryLinks = [
    { label: 'My Learning Space', path: '/learning-space', badge: 'Interactive', icon: Flame },
    { label: 'Tutor Matcher', path: '/tutor-matching', icon: BrainCircuit },
    { label: 'Teacher Hub', path: '/teacher-hub', icon: Award },
    { label: 'Digital Literacy', path: '/digital-literacy', icon: Laptop },
    { label: 'About', path: '/about', icon: Users },
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
      {/* Top Utility Announcement Ribbon - Solid Deep Black Background from your theme */}
      <div className="bg-bronze-950 text-white text-[11px] sm:text-xs py-2 px-4 border-b border-brand-500/30 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="text-brand-300 font-bold uppercase tracking-wider hidden sm:inline shrink-0">
              Admissions Open 2026-27:
            </span>
            <span className="text-bronze-200 truncate font-medium">
              CBSE Class 11 & 12 • CA/CMA Foundation • 1-on-1 Personalized Mentoring
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-bronze-200">
            <div className="hidden lg:flex items-center gap-1.5 text-bronze-300">
              <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span>Academic Center & Online Pan-India</span>
            </div>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 text-brand-300 hover:text-white font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-white shadow-md py-2.5 border-b border-brand-200/60'
            : 'bg-white py-3.5 border-b border-bronze-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            {/* Brand Logo & Title */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0 min-w-0">
              <div className="relative p-1 rounded-2xl bg-white shadow-xs border border-brand-200/80 transition-transform group-hover:scale-105 shrink-0 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Home Tuition Logo"
                  className="h-10 sm:h-12 md:h-13 w-auto object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-heading font-extrabold text-base sm:text-lg md:text-xl text-bronze-950 tracking-tight leading-tight truncate group-hover:text-brand-600 transition-colors">
                  Home Tuition
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-brand-600 tracking-wider uppercase truncate">
                  Personalized Mentoring • Chennai
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links: Only Home, Programs, Achievements, Contact */}
            <nav className="hidden md:flex items-center gap-1.5 shrink-0">
              {primaryLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'text-brand-950 bg-brand-50 border border-brand-200/60 shadow-xs'
                        : 'text-bronze-700 hover:text-brand-700 hover:bg-bronze-50'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-bronze-400'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action & Controls Section */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Desktop User Dropdown */}
              {user ? (
                <div className="relative hidden sm:block" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border border-brand-200/70 hover:border-brand-400 bg-brand-50/40 hover:bg-white transition-all cursor-pointer shadow-xs group"
                  >
                    <div className="relative shrink-0">
                      <UserAvatar name={user.name} role={role} size="sm" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="text-left max-w-[120px]">
                      <p className="text-xs font-bold text-bronze-950 truncate leading-tight group-hover:text-brand-700 transition-colors">
                        {user.name}
                      </p>
                      <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded-md bg-brand-100 text-[9px] font-extrabold uppercase text-brand-800 tracking-wider">
                        {role}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-bronze-400 group-hover:text-bronze-600 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-64 bg-white rounded-2xl shadow-xl border border-brand-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2.5 border border-brand-100/70 mb-1.5 bg-brand-50/50 rounded-xl">
                        <div className="flex items-center gap-2.5">
                          <UserAvatar name={user.name} role={role} size="md" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-bronze-950 truncate">{user.name}</p>
                            <p className="text-[11px] text-bronze-500 truncate">{user.email}</p>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-brand-100 flex items-center justify-between text-[10px] font-bold">
                          <span className="text-bronze-400 uppercase tracking-wider">Role</span>
                          <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 uppercase tracking-wider">
                            {role}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={getDashboardPath()}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-bronze-700 hover:bg-brand-50 hover:text-brand-800 rounded-xl transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand-600" />
                        <span>Go to Dashboard</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => { logout(); setUserDropdownOpen(false); navigate('/'); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl text-left transition-colors mt-1 cursor-pointer"
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
                  className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-bold text-bronze-800 hover:text-brand-700 hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-colors"
                >
                  Log In
                </Link>
              )}

              {/* Shaped Booking CTA Button - Using Site Theme Solid Color */}
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="px-3 sm:px-4.5 py-2 sm:py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-extrabold shadow-md shadow-brand-500/20 flex items-center gap-1.5 sm:gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-100 shrink-0" />
                <span className="hidden xs:inline">Book Free Demo</span>
                <span className="xs:hidden">Demo</span>
              </button>

              {/* Hamburger Button (Open Drawer for remaining links & mobile nav) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-2xl border border-bronze-200 text-bronze-700 hover:bg-bronze-50 hover:border-brand-300 transition-colors cursor-pointer shadow-xs shrink-0 flex items-center justify-center"
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-5 sm:h-5" /> : <Menu className="w-5 h-5 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Menu: Positioned cleanly below the bar */}
        {mobileMenuOpen && (
          <div className="bg-white border-b border-bronze-200 px-4 sm:px-6 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* User Profile Card inside Drawer */}
              {user && (
                <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <UserAvatar name={user.name} role={role} size="md" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-bronze-950 truncate leading-tight">{user.name}</p>
                      <p className="text-[11px] text-bronze-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-[10px] font-extrabold text-brand-800 uppercase tracking-wider shrink-0">
                    {role}
                  </span>
                </div>
              )}

              {/* Mobile Primary Section (Shows Home, Programs, Achievements, Contact on small viewports) */}
              <div className="md:hidden pb-3 border-b border-bronze-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-bronze-400 px-2 block mb-2">
                  Navigation
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {primaryLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                          isActive
                            ? 'bg-brand-50 text-brand-950 border border-brand-200'
                            : 'text-bronze-700 hover:bg-bronze-50 border border-transparent'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-600' : 'text-bronze-400'}`} />
                        <span className="truncate">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* All Secondary/Specialty Features Section */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-bronze-400 px-2 block mb-2">
                  Explore Learning & Hubs
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {drawerSecondaryLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-brand-50 text-brand-950 border border-brand-200'
                            : 'text-bronze-700 hover:bg-bronze-50 border border-bronze-100 hover:border-brand-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-600' : 'text-bronze-400'}`} />
                          <span className="truncate">{link.label}</span>
                        </div>
                        {link.badge && (
                          <span className="px-2 py-0.5 text-[9px] rounded-full bg-brand-500 text-white font-bold shrink-0 ml-2">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom Controls */}
              <div className="pt-4 border-t border-bronze-100 flex flex-col gap-2.5">
                {user ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Link
                      to={getDashboardPath()}
                      className="w-full py-2.5 px-4 text-center rounded-2xl bg-brand-50 text-brand-950 font-bold text-xs sm:text-sm border border-brand-200 flex items-center justify-center gap-2 hover:bg-brand-100/50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>My Dashboard ({role})</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => { logout(); navigate('/'); }}
                      className="w-full py-2.5 text-center text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-2xl cursor-pointer transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      className="py-2.5 text-center rounded-2xl border border-bronze-200 text-bronze-800 font-bold text-xs sm:text-sm hover:bg-bronze-50 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="py-2.5 text-center rounded-2xl bg-bronze-900 text-white font-bold text-xs sm:text-sm hover:bg-bronze-950 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                <a
                  href="tel:+919876543210"
                  className="py-2 text-center text-xs font-semibold text-bronze-600 flex items-center justify-center gap-1.5 hover:text-brand-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span>Direct Faculty Helpline: +91 98765 43210</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;