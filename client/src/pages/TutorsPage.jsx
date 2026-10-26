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
    <div className="min-h-screen bg-bronze-50 pb-16 sm:pb-24 w-full overflow-x-hidden">
      {/* Banner - Solid Deep Black Background from your theme */}
      <section className="bg-bronze-950 text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-brand-900 border border-brand-400/40 text-brand-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0">
            <Award className="w-3.5 h-3.5 text-brand-300 shrink-0" /> Faculty Directorate
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white">
            OUR EXPERT EDUCATORS
          </h1>
          <p className="text-bronze-200 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Mentors who combine deep subject scholarship with compassionate pedagogical methods to ensure every student excels.
          </p>
        </div>
      </section>

      {/* Grid - Positioned cleanly below the black banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-bronze-200 hover:border-brand-500 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <UserAvatar
                    name={tutor.name}
                    role="tutor"
                    size="xl"
                    className="border-2 border-brand-200 shadow-sm shrink-0"
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-bronze-950 truncate">
                        {tutor.name}
                      </h3>
                      {tutor.isFounder && (
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-[10px] font-bold shrink-0">
                          Founder
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-brand-700">
                      {tutor.qualification}
                    </p>
                    <p className="text-xs text-bronze-500">
                      {tutor.experienceYears}+ Yrs Experience • {tutor.studentsTaught}+ Students Taught
                    </p>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold pt-1">
                      <Star className="w-3.5 h-3.5 fill-current shrink-0" />
                      <span>{tutor.rating} / 5.0 Rating</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-bronze-700 leading-relaxed bg-bronze-50 p-4 rounded-2xl border border-bronze-200">
                  "{tutor.bio}"
                </p>

                {/* Subjects & Style */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-bronze-900 block mb-1.5">Subjects & Disciplines:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tutor.subjects?.map((sub, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-bronze-100 text-bronze-700 font-medium">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="font-bold text-bronze-900 block mb-0.5">Teaching Style:</span>
                    <span className="text-bronze-600 leading-relaxed block">{tutor.teachingStyle}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-bronze-100">
                <button
                  type="button"
                  onClick={onOpenBookingModal}
                  className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Book Demo Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {tutors.length === 0 && !loading && (
          <div className="text-center py-12 sm:py-16 bg-white rounded-3xl border border-bronze-200 p-6 sm:p-8 space-y-3">
            <Award className="w-12 h-12 text-bronze-300 mx-auto" />
            <h4 className="text-base sm:text-lg font-bold text-bronze-950">No educators available at this moment</h4>
            <p className="text-xs text-bronze-500">Please check back shortly or connect with our help desk.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorsPage;