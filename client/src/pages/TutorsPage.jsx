import React, { useState, useEffect } from 'react';
import { Star, Award, BookOpen, Clock, Sparkles, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import UserAvatar from '../components/common/UserAvatar';

const TutorsPage = ({ onOpenBookingModal }) => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await api.get('/tutors');
        setTutors(res.data);
      } catch (err) {
        console.error('Error fetching tutors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-bronze-950 via-bronze-900 to-brand-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-brand-300" /> Faculty Directorate
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            OUR EXPERT EDUCATORS
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Mentors who combine deep subject scholarship with compassionate pedagogical methods to ensure every student excels.
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-200/80 hover:border-brand-400 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <UserAvatar
                    name={tutor.name}
                    role="tutor"
                    size="xl"
                    className="border-2 border-brand-300 shadow-md shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-xl text-bronze-950">
                        {tutor.name}
                      </h3>
                      {tutor.isFounder && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-900 text-[10px] font-bold">
                          Founder
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-brand-700">
                      {tutor.qualification}
                    </p>
                    <p className="text-xs text-stone-500">
                      {tutor.experienceYears}+ Yrs Experience • {tutor.studentsTaught}+ Students Taught
                    </p>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold pt-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{tutor.rating} / 5.0 Rating</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200">
                  "{tutor.bio}"
                </p>

                {/* Subjects & Style */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-bronze-900 block mb-1">Subjects & Disciplines:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tutor.subjects?.map((sub, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-medium">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="font-bold text-bronze-900 block mb-0.5">Teaching Style:</span>
                    <span className="text-stone-600">{tutor.teachingStyle}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                <button
                  onClick={onOpenBookingModal}
                  className="flex-1 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Demo Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorsPage;
