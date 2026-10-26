import React, { useState, useEffect } from 'react';
import { Trophy, Award, Star, CheckCircle2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import api from '../services/api';
import UserAvatar from '../components/common/UserAvatar';

const AchievementsPage = ({ onOpenBookingModal }) => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/testimonials');
        setTestimonials(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTestimonials();
  }, []);

  const boardResultsData = [
    { marks: 'Centum (100/100)', accountancy: '2 Students', businessStudies: '—', economics: '1 Student', badge: 'bg-amber-100 text-amber-900 font-black' },
    { marks: 'Above 90 Marks', accountancy: '18 Students', businessStudies: '15 Students', economics: '10 Students', badge: 'bg-emerald-100 text-emerald-900 font-bold' },
    { marks: '80 – 90 Marks', accountancy: '27 Students', businessStudies: '23 Students', economics: '21 Students', badge: 'bg-blue-100 text-blue-900 font-semibold' },
  ];

  return (
    <div className="min-h-screen bg-bronze-50 pb-16 sm:pb-24 w-full overflow-x-hidden">
      {/* Banner - Solid Deep Black Background from your theme */}
      <section className="bg-bronze-950 text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-brand-900 border border-brand-400/40 text-brand-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0">
            <Trophy className="w-3.5 h-3.5 text-brand-300 shrink-0" /> Proven Track Record • 2019–2025
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white">
            RESULTS & ACHIEVEMENTS
          </h1>
          <p className="text-bronze-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Tangible student excellence across CBSE Board Examinations and competitive commerce milestones under our mentorship.
          </p>
        </div>
      </section>

      {/* Main Content Container - Positioned cleanly below the black banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-8 sm:space-y-12">
        {/* Board Performance Table Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-bronze-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block">
                Official CBSE Examination Records
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-bronze-950 mt-1 leading-tight">
                Board Performance Breakdown (2019–2025)
              </h2>
              <p className="text-xs sm:text-sm text-bronze-500 mt-1 leading-relaxed">
                Her impact is clearly reflected in her students' performance in CBSE Board Examinations, producing remarkable high-tier scores.
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold self-start sm:self-center flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> Verified Center Records
            </span>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-bronze-200">
            <table className="w-full min-w-[550px] text-left text-xs sm:text-sm">
              <thead className="bg-bronze-50 text-bronze-950 uppercase tracking-wider font-heading font-bold border-b border-bronze-200">
                <tr>
                  <th className="py-4 px-6">Marks Category</th>
                  <th className="py-4 px-6 text-brand-800">Accountancy</th>
                  <th className="py-4 px-6 text-bronze-800">Business Studies</th>
                  <th className="py-4 px-6 text-brand-900">Economics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bronze-100 font-medium">
                {boardResultsData.map((row, i) => (
                  <tr key={i} className="hover:bg-brand-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-bronze-950">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs ${row.badge}`}>{row.marks}</span>
                    </td>
                    <td className="py-4 px-6 font-bold text-brand-700">{row.accountancy}</td>
                    <td className="py-4 px-6 text-bronze-700">{row.businessStudies}</td>
                    <td className="py-4 px-6 text-bronze-700">{row.economics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real Testimonial Cards Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-bronze-950">
              Student Accomplishments & Letters of Gratitude
            </h3>
            <p className="text-xs sm:text-sm text-bronze-500 max-w-xl mx-auto leading-relaxed">
              Real testimonials from past students and parents who transformed their academic confidence at our center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-3xl p-6 shadow-md border border-bronze-200 hover:border-brand-500 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      name={t.name}
                      role="student"
                      size="lg"
                      className="border-2 border-brand-200 shadow-xs shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading font-bold text-bronze-950 text-sm truncate">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-brand-700 font-semibold truncate">{t.batch}</p>
                      <p className="text-[10px] text-bronze-500 truncate">{t.district}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black shrink-0">
                      {t.score}
                    </span>
                    <span className="text-[11px] text-bronze-500 truncate">{t.subject}</span>
                  </div>

                  <p className="text-xs text-bronze-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>

                  {t.parentQuote && (
                    <div className="p-3 bg-bronze-50 rounded-xl border border-bronze-200 text-[11px] text-bronze-600 italic">
                      <strong className="text-bronze-800">Parent remark:</strong> "{t.parentQuote}"
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-bronze-100 flex items-center justify-between text-xs text-amber-500">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0" /> Verified Student
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner - Solid Theme Brand Color */}
        <div className="bg-brand-500 rounded-3xl p-6 sm:p-10 lg:p-12 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-white">
            Ready to Aim for Your Centum or 95%+ Target?
          </h3>
          <p className="text-brand-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Book a personalized trial session today. Experience how conceptual teaching makes high marks a natural outcome.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBookingModal}
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white text-brand-950 font-bold text-xs uppercase tracking-wider hover:bg-brand-50 shadow-md transition-colors cursor-pointer"
            >
              Book Your Free Demo Class Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;