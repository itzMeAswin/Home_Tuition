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
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-bronze-950 via-amber-950 to-brand-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-300" /> Proven Track Record • 2019–2025
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            RESULTS & ACHIEVEMENTS
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Tangible student excellence across CBSE Board Examinations and competitive commerce milestones under our mentorship.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-12">
        {/* Board Performance Table Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-brand-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Official CBSE Examination Records
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-bronze-950 mt-1">
                Board Performance Breakdown (2019–2025)
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Her impact is clearly reflected in her students' performance in CBSE Board Examinations, producing remarkable high-tier scores.
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold self-start sm:self-auto flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Center Records
            </span>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF8F5] text-bronze-950 uppercase tracking-wider font-heading font-bold border-b border-stone-200">
                <tr>
                  <th className="py-4 px-6">Marks Category</th>
                  <th className="py-4 px-6 text-brand-800">Accountancy</th>
                  <th className="py-4 px-6 text-bronze-800">Business Studies</th>
                  <th className="py-4 px-6 text-blue-900">Economics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {boardResultsData.map((row, i) => (
                  <tr key={i} className="hover:bg-brand-50/30 transition">
                    <td className="py-4 px-6 font-bold text-bronze-950 flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs ${row.badge}`}>{row.marks}</span>
                    </td>
                    <td className="py-4 px-6 font-bold text-brand-700">{row.accountancy}</td>
                    <td className="py-4 px-6 text-stone-700">{row.businessStudies}</td>
                    <td className="py-4 px-6 text-stone-700">{row.economics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real Testimonial Cards Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-bronze-950">
              Student Accomplishments & Letters of Gratitude
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
              Real testimonials from past students and parents who transformed their academic confidence at our center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 hover:border-brand-400 hover:shadow-xl transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      name={t.name}
                      role="student"
                      size="lg"
                      className="border-2 border-brand-300 shadow-sm"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-bronze-950 text-sm">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-brand-700 font-semibold">{t.batch}</p>
                      <p className="text-[10px] text-stone-500">{t.district}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                      {t.score}
                    </span>
                    <span className="text-[11px] text-stone-500">{t.subject}</span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{t.quote}"
                  </p>

                  {t.parentQuote && (
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 italic">
                      <strong>Parent remark:</strong> "{t.parentQuote}"
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-amber-500">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Student
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-brand-600 to-amber-600 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold">
            Ready to Aim for Your Centum or 95%+ Target?
          </h3>
          <p className="text-amber-100 text-xs sm:text-sm max-w-xl mx-auto">
            Book a personalized trial session today. Experience how conceptual teaching makes high marks a natural outcome.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBookingModal}
              className="px-8 py-3.5 rounded-2xl bg-white text-bronze-950 font-bold text-xs uppercase tracking-wider hover:bg-stone-100 shadow-md transition cursor-pointer"
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
