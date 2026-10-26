import React from 'react';
import { Award, CheckCircle2, Heart, Sparkles, BookOpen, Users, Trophy } from 'lucide-react';
import UserAvatar from '../components/common/UserAvatar';

const AboutPage = ({ onOpenBookingModal }) => {
  return (
    <div className="min-h-screen bg-bronze-50 pb-16 sm:pb-24 w-full overflow-x-hidden">
      {/* Banner - Solid Deep Black Background from your theme */}
      <section className="bg-bronze-950 text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-brand-900 border border-brand-400/40 text-brand-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-brand-300 shrink-0" /> Institution Profile & Heritage
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white">
            ABOUT OUR INSTITUTION
          </h1>
          <p className="text-bronze-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Home Tuition is committed to transforming commerce and school education into an engaging, concept-driven pursuit of excellence.
          </p>
        </div>
      </section>

      {/* Main Container - Positioned cleanly below the black banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-8 sm:space-y-12">
        {/* Institutional Mission Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-bronze-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Column */}
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-3 sm:space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block">
                  Our Educational Philosophy
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-bronze-950 leading-tight">
                  Building Conceptual Foundations That Last a Lifetime
                </h2>
                <p className="text-xs sm:text-sm text-bronze-600 leading-relaxed">
                  Home Tuition was established in Chennai with a clear mandate: to dismantle the fear of complex numbers, accounting adjustments, and macro theory. We believe true learning occurs when students understand the 'why' behind each balance sheet entry, not merely memorizing steps for tests.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-bronze-50 border border-bronze-200">
                  <p className="text-2xl font-black text-brand-700 font-heading">15+ Yrs</p>
                  <p className="text-xs font-bold text-bronze-700 mt-1">Teaching Excellence</p>
                </div>
                <div className="p-4 rounded-2xl bg-bronze-50 border border-bronze-200">
                  <p className="text-2xl font-black text-brand-700 font-heading">100/100</p>
                  <p className="text-xs font-bold text-bronze-700 mt-1">Centum Scorers</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="rounded-3xl p-6 sm:p-8 bg-bronze-900 text-white shadow-xl border border-bronze-800 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3 sm:space-y-4">
                <span className="px-3 py-1 rounded-full bg-brand-900 text-brand-200 text-xs font-bold uppercase tracking-wider border border-brand-500/30 inline-block">
                  Pedagogical Framework
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  Student-Centered Personalized Teaching
                </h3>
                <p className="text-bronze-200 text-xs sm:text-sm leading-relaxed">
                  Every learner is unique. We replace rote memorization with socratic discussions, practical problem-solving, and continuous cognitive reinforcement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/10 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400 shrink-0"></div>
                  <span className="text-xs text-bronze-100 font-semibold truncate">1-on-1 Focus</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400 shrink-0"></div>
                  <span className="text-xs text-bronze-100 font-semibold truncate">Real-Time Feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400 shrink-0"></div>
                  <span className="text-xs text-bronze-100 font-semibold truncate">Weekly Milestones</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400 shrink-0"></div>
                  <span className="text-xs text-bronze-100 font-semibold truncate">Digital Class Tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder's Profile Feature */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-bronze-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-4 text-center flex flex-col items-center">
              <div className="relative inline-block">
                <UserAvatar
                  name="Mrs. Lakshmi S."
                  role="tutor"
                  size="2xl"
                  className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-3xl mx-auto border-4 border-white shadow-xl text-4xl sm:text-5xl"
                />
                <span className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-brand-500 text-white shadow-lg">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-bronze-950 mt-4">
                Mrs. Lakshmi S.
              </h3>
              <p className="text-xs text-brand-700 font-bold">
                Founder & Lead Commerce Educator
              </p>
              <p className="text-xs text-bronze-500 mt-1">
                M.Com, M.Phil, MBA, SET Qualified
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-bold uppercase tracking-wider inline-block">
                  Meet Our Visionary
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-bronze-950 mt-2">
                  Founder’s Profile & Pedagogical Journey
                </h2>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-bronze-700 leading-relaxed">
                <p>
                  Mrs. Lakshmi S. is an accomplished commerce educator and the lead tutor of Home Tuition, Chennai, known for her ability to blend academic rigor with practical, simplified learning. With a strong foundation in Accountancy, Business Studies, Economics, and Management studies, she has consistently empowered students to achieve academic excellence.
                </p>
                <p>
                  With an impressive academic background including M.Com, M.Phil, MBA, and qualification in the State Eligibility Test (SET), she brings scholarly discipline and analytical depth to her teaching. Before establishing Home Tuition, she taught for more than 15 years at esteemed collegiate and high school institutions.
                </p>
                <p>
                  In addition to her institutional teaching role, she has been an active YouTube educator since 2022, extending her reach to a broader student community nationwide by simplifying complex commerce concepts and making quality education accessible beyond traditional classrooms.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-bronze-50 border border-bronze-200 text-bronze-800 font-semibold">
                  ✓ Concept Clarity
                </span>
                <span className="px-3 py-1 rounded-full bg-bronze-50 border border-bronze-200 text-bronze-800 font-semibold">
                  ✓ Analytical Thinking
                </span>
                <span className="px-3 py-1 rounded-full bg-bronze-50 border border-bronze-200 text-bronze-800 font-semibold">
                  ✓ Paper Presentation Skills
                </span>
                <span className="px-3 py-1 rounded-full bg-bronze-50 border border-bronze-200 text-bronze-800 font-semibold">
                  ✓ Socratic & Interactive Dialogue
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-bronze-200 shadow-md space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-bronze-950">Our Vision</h3>
              <p className="text-xs sm:text-sm text-bronze-600 leading-relaxed">
                To be the premier online educational platform where every student unlocks their inherent intellectual potential through joyful, interactive, and academically disciplined learning.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-bronze-200 shadow-md space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-bronze-950">Our Mission</h3>
              <p className="text-xs sm:text-sm text-bronze-600 leading-relaxed">
                To pair expert pedagogical instruction with modern digital learning tools, ensuring high board examination scores, professional career readiness, and lifelong intellectual curiosity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;