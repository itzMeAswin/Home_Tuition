import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, CheckCircle2, Star, Users, BookOpen, 
  Clock, Award, BrainCircuit, ChevronRight, ChevronLeft, Trophy, Flame, 
  HelpCircle, ChevronDown, ChevronUp, Video, ShieldCheck, Zap
} from 'lucide-react';
import api from '../services/api';
import UserAvatar from '../components/common/UserAvatar';
import CourseBanner from '../components/common/CourseBanner';

const HomePage = ({ onOpenBookingModal }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, tRes] = await Promise.all([
          api.get('/courses'),
          api.get('/testimonials'),
        ]);
        setCourses(cRes.data.slice(0, 3));
        setTestimonials(tRes.data);
      } catch (err) {
        console.error('Home data load error:', err);
      }
    };
    fetchData();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const faqs = [
    {
      q: 'How does the Free Demo Class work?',
      a: 'Once you submit a request, our academic coordinator connects with you to understand the student’s learning goals and challenges. We schedule a 45-minute live 1-on-1 trial session with our faculty so the student experiences our interactive Socratic teaching style firsthand.'
    },
    {
      q: 'What curriculums and grade levels do you specialize in?',
      a: 'We specialize in CBSE Classes 11 & 12 (Accountancy, Economics, Business Studies), CA / CMA Foundation, NET / SET Commerce & Management, Undergraduate / Postgraduate Commerce (B.Com, M.Com, MBA), as well as Classes 9 & 10 Mathematics and Science fundamentals.'
    },
    {
      q: 'What makes "My Learning Space" unique compared to typical tuition websites?',
      a: 'It is our signature student engagement zone where learners solve daily challenges, take timed topic-wise diagnostic quizzes with instant answer explanations, maintain daily learning streaks, unlock achievement badges, and climb the positive weekly leaderboard.'
    },
    {
      q: 'How do you address students with learning difficulties or exam anxiety?',
      a: 'Our Smart Tutor Matcher identifies the student’s exact learning barrier—whether concept building, calculation speed, or exam stress. Lessons are tailored to build foundations from scratch using visual analogies and step-by-step problem dissection.'
    },
    {
      q: 'Can parents monitor attendance and academic progress?',
      a: 'Yes. Parents receive regular attendance updates, test scores, homework evaluation feedback, and direct faculty consultations through our dedicated Parent Portal.'
    }
  ];

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="space-y-0 text-bronze-900">
      {/* ========================================================= */}
      {/* 1. HERO SECTION — PROMOTE INSTITUTION                     */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-white to-[#F9F4E8] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-brand-200/50">
        {/* Decorative Blurred Gradients */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-brand-300/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-center lg:text-left space-y-6"
            >
              {/* Institution Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/90 border border-brand-300/60 text-brand-950 text-xs sm:text-sm font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-ping"></span>
                <span>Online Home Tution Center • Excellence in Education</span>
                <span className="text-brand-700 font-extrabold hidden sm:inline">| Chennai</span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-bronze-950 tracking-tight leading-[1.12]">
                Unlock Your Potential.<br />
                <span className="gold-text-gradient">Learn Beyond Limits.</span>
              </h1>

              {/* Exact Requested Subheadline */}
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Personalized online learning, expert guidance, and interactive education designed to help every student succeed.
              </p>

              {/* Primary & Secondary CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/tutor-matching"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <BrainCircuit className="w-5 h-5 text-amber-200" />
                  <span>Find Your Perfect Tutor</span>
                </Link>

                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-stone-50 text-bronze-950 font-bold text-sm sm:text-base border border-stone-200 hover:border-brand-400 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-brand-600" />
                  <span>Explore Learning Programs</span>
                </Link>
              </div>

              {/* Trust Guarantees */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-stone-600">
                <button
                  onClick={onOpenBookingModal}
                  className="font-bold text-brand-800 hover:text-brand-900 underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-brand-600" /> Book a Free Demo Class
                </button>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1-on-1 Personalized Attention
                </span>
                <span className="text-stone-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100/100 Proven Centum Mentorship
                </span>
              </div>
            </motion.div>

            {/* Right Column: Founder & Institution Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-400/20 to-amber-300/30 rounded-3xl blur-2xl transform rotate-2"></div>

                {/* Primary Feature Card */}
                <div className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-brand-200/90 space-y-5">
                  {/* Founder Profile Header */}
                  <div className="flex items-center gap-4 pb-4 border-b border-stone-100">
                    <div className="relative">
                      <UserAvatar
                        name="Mrs. Lakshmi S."
                        role="tutor"
                        size="lg"
                        className="shadow-md border-2 border-brand-400"
                      />
                      <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-brand-500 text-white shadow-xs">
                        <Award className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-bronze-950 text-base leading-tight">
                        Mrs. Lakshmi S.
                      </h4>
                      <p className="text-xs text-brand-800 font-bold">
                        Founder & Senior Lead Educator
                      </p>
                      <p className="text-[11px] text-stone-500">
                        M.Com, M.Phil, MBA, SET Qualified • 15+ Yrs Exp
                      </p>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-200/60">
                      <div className="flex items-center gap-1.5 text-brand-800 text-xs font-bold mb-1">
                        <Trophy className="w-4 h-4 text-brand-600" />
                        <span>Centum Track Record</span>
                      </div>
                      <p className="text-xl font-heading font-black text-bronze-950">100 / 100</p>
                      <p className="text-[11px] text-stone-500">CBSE Accountancy Boards</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                      <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold mb-1">
                        <Flame className="w-4 h-4 text-amber-600" />
                        <span>Interactive Space</span>
                      </div>
                      <p className="text-xl font-heading font-black text-bronze-950">Active Quizzes</p>
                      <p className="text-[11px] text-stone-500">Daily Gamified Practice</p>
                    </div>
                  </div>

                  {/* Key Feature Callouts */}
                  <div className="space-y-2.5 text-xs text-stone-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Conceptual clarity over rote memorization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Complete TS Grewal & NCERT step-by-step problem breakdown</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Live interactive video classes with shared digital notes</span>
                    </div>
                  </div>

                  {/* Book Demo Trigger Button */}
                  <button
                    onClick={onOpenBookingModal}
                    className="w-full py-3.5 rounded-2xl bg-bronze-900 hover:bg-bronze-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 text-brand-400" />
                    <span>Book a Free Demo Class</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. INSTITUTIONAL HIGHLIGHTS (STATISTICS BAR)              */}
      {/* ========================================================= */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-brand-200/60 shadow-xs hover:border-brand-400 transition-all">
              <p className="text-3xl sm:text-4xl font-heading font-black text-brand-700">500+</p>
              <p className="text-xs sm:text-sm font-bold text-bronze-950 mt-1">Students Guided</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Across CBSE & Professional Exams</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-brand-200/60 shadow-xs hover:border-brand-400 transition-all">
              <p className="text-3xl sm:text-4xl font-heading font-black text-brand-700">25+</p>
              <p className="text-xs sm:text-sm font-bold text-bronze-950 mt-1">Expert Tutors</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Pedagogically Trained Faculty</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-brand-200/60 shadow-xs hover:border-brand-400 transition-all">
              <p className="text-3xl sm:text-4xl font-heading font-black text-brand-700">15+</p>
              <p className="text-xs sm:text-sm font-bold text-bronze-950 mt-1">Subjects Available</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Commerce, Science & Foundations</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-brand-200/60 shadow-xs hover:border-brand-400 transition-all">
              <p className="text-3xl sm:text-4xl font-heading font-black text-brand-700">12,000+</p>
              <p className="text-xs sm:text-sm font-bold text-bronze-950 mt-1">Learning Hours</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Live Interactive Mentorship</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. WHY CHOOSE US? (6 CORE PILLARS)                        */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-bold uppercase tracking-wider">
              Educational Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-bronze-950">
              Why Choose Online Home Tution Center?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              A student-centered ecosystem blending rigorous pedagogy, technological ease, and personalized attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-7 rounded-3xl bg-white border border-stone-200/80 hover:border-brand-400 transition-all hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-500/15 text-brand-700 flex items-center justify-center mb-5 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-bronze-950 mb-2">Personalized Attention</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Small batches or 1-on-1 private tutorials ensure your child never hesitates to ask doubts. Every concept is unraveled patiently until fully understood.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-3xl bg-white border border-stone-200/80 hover:border-brand-400 transition-all hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-700 flex items-center justify-center mb-5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-bronze-950 mb-2">Experienced Tutors</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Led by Founder Mrs. Lakshmi S. (SET Qualified, 15+ years experience). All tutors are screened for deep scholarship and pedagogical skill.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-3xl bg-white border border-stone-200/80 hover:border-brand-400 transition-all hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-700 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-bronze-950 mb-2">Flexible Online Learning</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Attend from the comfort of home with morning or evening schedules. High definition audio-video classes with shared whiteboards and live annotation.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-7 rounded-3xl bg-white border border-stone-200/80 hover:border-brand-400 transition-all hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-700 flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-bronze-950 mb-2">Student-Centered Teaching</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  We replace rote memorization with Socratic questioning and real-life business scenarios so commerce and mathematics become logically intuitive.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="p-7 rounded-3xl bg-white border border-stone-200/80 hover:border-brand-400 transition-all hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-bronze-950 mb-2">Interactive Learning Activities</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Gamified quizzes, daily challenge puzzles, diagnostic feedback, and digital flashcards keep students excited to learn and practice every day.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="p-7 rounded-3xl bg-white border border-stone-200/80 hover:border-brand-400 transition-all hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-700 flex items-center justify-center mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-bronze-950 mb-2">Continuous Progress Monitoring</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Parents receive regular attendance reports, test performance trends, and direct educator feedback through the dedicated Parent Portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SIGNATURE FEATURE: "MY LEARNING SPACE"                 */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-bronze-950 via-bronze-900 to-brand-950 rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-brand-500/30">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/40 text-brand-300 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> Signature Feature
                </div>

                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
                  MY LEARNING SPACE
                </h2>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  Education shouldn’t feel like a chore. Our interactive Student Learning Zone turns study sessions into an exciting adventure with <strong>daily challenges</strong>, <strong>interactive timed quizzes</strong>, <strong>streak rewards</strong>, and <strong>achievement badges</strong> stored securely on MongoDB.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Trophy className="w-5 h-5 text-brand-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-white">Earn Badges</p>
                    <p className="text-[10px] text-stone-400">Unlock 6 tiers of rewards</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-white">Daily Streaks</p>
                    <p className="text-[10px] text-stone-400">Build daily learning habits</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center col-span-2 sm:col-span-1">
                    <Zap className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-white">Topic Quizzes</p>
                    <p className="text-[10px] text-stone-400">Instant explanations</p>
                  </div>
                </div>

                <div className="pt-3">
                  <Link
                    to="/learning-space"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-brand-500/30 transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Enter Student Learning Zone</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Interactive Widget Mockup */}
              <div className="lg:col-span-5">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <UserAvatar name="Aarav Sharma" role="student" size="sm" />
                      <div>
                        <p className="text-xs font-bold text-white">Aarav Sharma</p>
                        <p className="text-[10px] text-brand-300">Class 12 • Commerce Star</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                      <Flame className="w-3.5 h-3.5 text-amber-400" /> 5-Day Streak
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-stone-300">
                      <span>Daily Learning Goal</span>
                      <span className="font-bold text-brand-300">67% Completed</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-brand-400 to-amber-400 h-full w-2/3 rounded-full"></div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-brand-200">Today's Daily Challenge</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">+30 pts</span>
                    </div>
                    <p className="text-xs text-stone-200 font-medium">
                      "Calculate the divisible profit when interest on capital is deducted..."
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-300 pt-1">
                    <span>Rank on Weekly Leaderboard:</span>
                    <span className="font-bold text-white">#1 • Legendary Scholar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FEATURED PROGRAMS & SUBJECT EXPLORER                   */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-bold uppercase tracking-wider inline-block">
                Academic Curriculum
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-bronze-950">
                Featured Learning Programs
              </h2>
              <p className="text-stone-600 text-sm max-w-xl">
                Structured, board-aligned courses crafted for concept mastery and maximum board examination scores.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs font-bold text-bronze-950 shadow-xs hover:border-brand-400 transition"
            >
              <span>View All Programs</span>
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-3xl overflow-hidden shadow-md border border-stone-200 hover:border-brand-400 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Subject Vector Banner */}
                  <CourseBanner subject={course.subject} mode={course.mode} />

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold">
                      <span>{course.grades?.join(', ')}</span>
                      <span>•</span>
                      <span>{course.curriculum?.join(', ')}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-bronze-950 group-hover:text-brand-800 transition line-clamp-1">
                      {course.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Highlights Preview */}
                    {course.highlights?.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-stone-100">
                        {course.highlights.slice(0, 2).map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-1.5 text-[11px] text-stone-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-stone-50 mt-2">
                  <button
                    onClick={onOpenBookingModal}
                    className="w-full py-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    <span>Book Demo</span>
                  </button>
                  <Link
                    to="/courses"
                    className="w-full py-2.5 rounded-xl bg-bronze-900 hover:bg-bronze-950 text-white font-bold text-xs transition text-center"
                  >
                    Syllabus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SMART TUTOR MATCHING TEASER                            */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-50 via-[#FAF8F5] to-amber-50 rounded-3xl p-8 sm:p-12 border border-brand-200/80 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3.5 py-1 rounded-full bg-brand-200/80 text-brand-950 text-xs font-bold uppercase tracking-wider inline-block">
                Intelligent Matching Engine
              </span>
              <h2 className="text-3xl font-heading font-extrabold text-bronze-950">
                Can’t Decide Which Tutor Fits Your Child Best?
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Take our 1-minute 6-question questionnaire. Tell us your class, subject, curriculum, preferred language, and learning difficulty, and our smart engine will match you with the ideal educator.
              </p>
            </div>
            <Link
              to="/tutor-matching"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-bold text-sm shadow-xl shadow-brand-500/20 shrink-0 flex items-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <BrainCircuit className="w-5 h-5" />
              <span>Launch Smart Tutor Matcher</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. RESEARCH BARRIERS SOLVED: TEACHER HUB & DIGITAL LITERACY*/}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              Educational Research Breakthroughs
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-bronze-950">
              Transforming Research Barriers into Strengths
            </h2>
            <p className="text-stone-600 text-sm">
              We directly address the two largest barriers in contemporary EdTech: insufficient pedagogical training and low digital literacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Barrier 1 Solution: Teacher Development Hub */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-md border border-brand-200 hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold">
                    Barrier 1: Insufficient Pedagogical Training
                  </span>
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-bronze-950">
                  Teacher Development Hub
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Equips tutors with modern student-centered pedagogy, active learning techniques, and formative assessment design. Includes an interactive lesson planner and teaching readiness diagnostic.
                </p>
                <ul className="space-y-2 text-xs text-stone-600 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Interactive Lesson Planner with MongoDB persistence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Teaching Readiness Assessment & Strengths Analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Modern Pedagogy & Socratic Dialogue Modules</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  to="/teacher-hub"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs shadow-md transition"
                >
                  <span>Explore Teacher Development Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Barrier 2 Solution: Digital Learning Made Simple */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-md border border-brand-200 hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                    Barrier 2: Low Digital Literacy
                  </span>
                  <Video className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-bronze-950">
                  Digital Learning Made Simple
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  A beginner-friendly support center providing step-by-step interactive visual guides for joining classes, using microphone and camera controls, scanning and uploading PDF homework, and online safety.
                </p>
                <ul className="space-y-2 text-xs text-stone-600 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Step-by-step visual tutorials for online class software</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Homework photo-to-PDF scanning and upload guides</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Interactive Digital Literacy Readiness diagnostic quiz</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  to="/digital-literacy"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md transition"
                >
                  <span>Access Digital Literacy Guides</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. STUDENT SUCCESS STORIES (TESTIMONIAL CAROUSEL)         */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-bold uppercase tracking-wider">
              Real Student Achievements
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-bronze-950">
              Student Success Stories
            </h2>
            <p className="text-stone-600 text-sm">
              Authentic feedback and board examination accomplishments from students guided by our faculty.
            </p>
          </div>

          {testimonials.length > 0 && (
            <div className="max-w-4xl mx-auto relative">
              <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 shadow-xl border border-brand-200/90 relative">
                {/* Arrow navigation buttons */}
                <button
                  onClick={handlePrevTestimonial}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-brand-700 shadow-md transition cursor-pointer hidden sm:block"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextNextTestimonial => handleNextTestimonial()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-brand-700 shadow-md transition cursor-pointer hidden sm:block"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 px-4 sm:px-8">
                  <div className="shrink-0 text-center">
                    <UserAvatar
                      name={testimonials[activeTestimonialIdx].name}
                      role="student"
                      size="2xl"
                      className="mx-auto border-4 border-white shadow-md text-3xl"
                    />
                    <div className="mt-3 px-3 py-1 rounded-full bg-brand-200/80 text-brand-950 text-xs font-extrabold">
                      {testimonials[activeTestimonialIdx].score || '90%+ Score'}
                    </div>
                  </div>

                  <div className="space-y-4 text-center md:text-left flex-1">
                    <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <blockquote className="text-bronze-950 text-base sm:text-lg italic leading-relaxed">
                      "{testimonials[activeTestimonialIdx].quote}"
                    </blockquote>

                    <div>
                      <h4 className="font-heading font-bold text-bronze-950 text-base">
                        {testimonials[activeTestimonialIdx].name}
                      </h4>
                      <p className="text-xs text-brand-800 font-bold">
                        {testimonials[activeTestimonialIdx].batch} • {testimonials[activeTestimonialIdx].district}
                      </p>
                      <p className="text-xs text-stone-500">
                        Subject: {testimonials[activeTestimonialIdx].subject}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Carousel Dots */}
                <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-stone-200/60">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonialIdx(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activeTestimonialIdx === idx ? 'w-8 bg-brand-600' : 'w-2.5 bg-stone-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results Table Teaser */}
          <div className="text-center mt-10">
            <Link
              to="/achievements"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:text-brand-900 underline underline-offset-4"
            >
              <span>View Verified CBSE Board Examination Performance Records (2019–2025)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. FREQUENTLY ASKED QUESTIONS (FAQ)                       */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="px-3 py-1 rounded-full bg-stone-200/80 text-stone-800 text-xs font-bold uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-bronze-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200/90 bg-white overflow-hidden transition shadow-xs"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-bronze-950 text-sm sm:text-base hover:bg-stone-50 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-stone-600 text-sm leading-relaxed border-t border-stone-100 bg-[#FAF8F5]/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. HIGH-CONVERSION PROMOTIONAL CTA BANNER                */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-bronze-950 via-bronze-900 to-brand-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-500/25 border border-brand-400/40 text-brand-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" /> Start Your Journey Today
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight">
            Give Your Child the Learning Experience<br />
            <span className="text-brand-400">They Deserve.</span>
          </h2>

          <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Experience our supportive educators, tailored curriculum pacing, and engaging learning modules. Zero commitments required.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBookingModal}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-amber-500 to-brand-600 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Book a Free Demo Class</span>
            </button>

            <Link
              to="/courses"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base border border-white/20 flex items-center justify-center gap-2 transition"
            >
              <span>Browse All Programs</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
