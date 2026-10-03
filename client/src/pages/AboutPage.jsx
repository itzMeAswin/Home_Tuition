import React from 'react';
import { Award, CheckCircle2, Heart, Sparkles, BookOpen, Users, Trophy } from 'lucide-react';
import UserAvatar from '../components/common/UserAvatar';

const AboutPage = ({ onOpenBookingModal }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-bronze-950 via-bronze-900 to-brand-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" /> Institution Profile & Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            ABOUT OUR INSTITUTION
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Aksharas Academy • Online Home Tution Center is committed to transforming commerce and school education into an engaging, concept-driven pursuit of excellence.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-12">
        {/* Institutional Mission Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-brand-200/80 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Our Educational Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-bronze-950">
                Building Conceptual Foundations That Last a Lifetime
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Online Home Tution Center (powered by Aksharas Academy) was established in Trichy with a clear mandate: to dismantle the fear of complex numbers, accounting adjustments, and macro theory. We believe true learning occurs when students understand the 'why' behind each balance sheet entry, not merely memorizing steps for tests.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                  <p className="text-2xl font-black text-brand-700 font-heading">15+ Yrs</p>
                  <p className="text-xs font-bold text-stone-700 mt-1">Teaching Excellence</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                  <p className="text-2xl font-black text-brand-700 font-heading">100/100</p>
                  <p className="text-xs font-bold text-stone-700 mt-1">Centum Scorers</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-8 bg-gradient-to-br from-bronze-900 via-stone-900 to-brand-950 text-white shadow-xl border border-brand-500/30 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div>
                <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-500/30">
                  Pedagogical Framework
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white mt-4">
                  Student-Centered Personalized Teaching
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
                  Every learner is unique. We replace rote memorization with socratic discussions, practical problem-solving, and continuous cognitive reinforcement.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/10 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400"></div>
                  <span className="text-xs text-stone-200 font-semibold">1-on-1 Focus</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400"></div>
                  <span className="text-xs text-stone-200 font-semibold">Real-Time Feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400"></div>
                  <span className="text-xs text-stone-200 font-semibold">Weekly Milestones</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-400"></div>
                  <span className="text-xs text-stone-200 font-semibold">Digital Class Tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder's Profile Feature */}
        <div className="bg-gradient-to-br from-brand-50 to-white rounded-3xl p-8 sm:p-12 shadow-xl border border-brand-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <div className="relative inline-block">
                <UserAvatar
                  name="Sandhya Subbaraman"
                  role="tutor"
                  size="2xl"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl mx-auto border-4 border-white shadow-xl text-5xl"
                />
                <span className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-brand-500 text-white shadow-lg">
                  <Award className="w-6 h-6" />
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl text-bronze-950 mt-4">
                Mrs. Sandhya Subbaraman
              </h3>
              <p className="text-xs text-brand-800 font-bold">
                Founder & Lead Commerce Educator
              </p>
              <p className="text-xs text-stone-500 mt-1">
                M.Com, M.Phil, MBA, SET Qualified
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-brand-200/80 text-brand-900 text-xs font-bold uppercase tracking-wider">
                Meet Our Visionary
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-bronze-950">
                Founder’s Profile & Pedagogical Journey
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p>
                  Sandhya Subbaraman is an accomplished commerce educator and the visionary Founder of Aksharas Academy, Trichy, known for her ability to blend academic rigor with practical, simplified learning. With a strong foundation in Accountancy, Business Studies, Economics, and Management studies, she has consistently empowered students to achieve academic excellence.
                </p>
                <p>
                  With an impressive academic background including M.Com, M.Phil, MBA, and qualification in the State Eligibility Test (SET), she brings scholarly discipline and analytical depth to her teaching. Before establishing Aksharas Academy, she taught for more than 15 years at esteemed collegiate and high school institutions.
                </p>
                <p>
                  In addition to her institutional teaching role, she has been an active YouTube educator since 2022, extending her reach to a broader student community nationwide by simplifying complex commerce concepts and making quality education accessible beyond traditional classrooms.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-white border border-brand-200 text-bronze-800 font-semibold">
                  ✓ Concept Clarity
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-brand-200 text-bronze-800 font-semibold">
                  ✓ Analytical Thinking
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-brand-200 text-bronze-800 font-semibold">
                  ✓ Paper Presentation Skills
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-brand-200 text-bronze-800 font-semibold">
                  ✓ Socratic & Interactive Dialogue
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-bronze-950">Our Vision</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              To be the premier online educational platform where every student unlocks their inherent intellectual potential through joyful, interactive, and academically disciplined learning.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-bronze-950">Our Mission</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              To pair expert pedagogical instruction with modern digital learning tools, ensuring high board examination scores, professional career readiness, and lifelong intellectual curiosity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
