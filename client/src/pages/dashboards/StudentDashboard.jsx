import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, Trophy, Award, BookOpen, Clock, CheckCircle2, 
  Calendar, FileText, ArrowRight, Zap, ExternalLink 
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from '../../components/common/UserAvatar';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/dashboard/student');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const studentName = user?.name || data?.student?.name || 'Aarav Sharma';
  const points = user?.points || data?.student?.points || 480;
  const streak = user?.streak || data?.student?.streak || 5;

  return (
    <div className="min-h-screen bg-bronze-50 pb-16 sm:pb-24 w-full overflow-x-hidden">
      {/* Header - Solid Deep Black Background from your theme */}
      <section className="bg-bronze-950 text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <UserAvatar
              name={studentName}
              role="student"
              size="xl"
              className="border-2 border-brand-400 shadow-md shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-3xl font-heading font-extrabold text-white truncate">
                  {studentName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-900 border border-brand-400/40 text-brand-200 text-xs font-bold shrink-0">
                  {user?.grade || 'Class 12'}
                </span>
              </div>
              <p className="text-bronze-300 text-xs mt-1 leading-relaxed">
                Curriculum: {user?.curriculum || 'CBSE'} • Home Tuition
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-bronze-900 border border-bronze-800 text-center min-w-[95px] sm:min-w-[110px]">
              <span className="text-[10px] text-amber-400 uppercase block font-semibold flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" /> Active Streak
              </span>
              <span className="text-xl font-heading font-black text-white mt-0.5 block">{streak} Days</span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-bronze-900 border border-bronze-800 text-center min-w-[95px] sm:min-w-[110px]">
              <span className="text-[10px] text-sky-400 uppercase block font-semibold flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-sky-400" /> Learning Pts
              </span>
              <span className="text-xl font-heading font-black text-white mt-0.5 block">{points}</span>
            </div>

            <Link
              to="/learning-space"
              className="px-5 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-500/20 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Zap className="w-4 h-4 shrink-0" />
              <span>Learning Space</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid - Positioned cleanly below the black banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Col 1 & 2: Upcoming Classes & Active Assignments */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Upcoming Classes */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-bronze-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-bronze-100">
                <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-600 shrink-0" /> Upcoming Tuition Schedule
                </h3>
                <span className="text-xs text-bronze-500">Live Virtual Classrooms</span>
              </div>

              <div className="space-y-3">
                {data?.upcomingClasses?.map((cls) => (
                  <div key={cls.id} className="p-4 rounded-2xl bg-bronze-50 border border-bronze-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-[10px] font-bold">
                          {cls.subject}
                        </span>
                        <span className="text-xs text-bronze-500">{cls.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-bronze-950 truncate">{cls.topic}</h4>
                      <p className="text-xs text-bronze-500 truncate">Educator: {cls.tutor}</p>
                    </div>

                    <a
                      href={cls.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-bronze-900 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors self-start sm:self-center shrink-0 whitespace-nowrap"
                    >
                      <span>Join Live Class</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                ))}

                {(!data?.upcomingClasses || data.upcomingClasses.length === 0) && !loading && (
                  <div className="p-6 text-center text-xs text-bronze-500 rounded-2xl bg-bronze-50 border border-bronze-200">
                    No upcoming tuition sessions scheduled.
                  </div>
                )}
              </div>
            </div>

            {/* Active Homework Assignments */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-bronze-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-bronze-100">
                <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-600 shrink-0" /> Active Homework & Worksheets
                </h3>
                <span className="text-xs text-bronze-500">Assigned by Faculty</span>
              </div>

              <div className="space-y-3">
                {data?.recentAssignments?.length > 0 ? (
                  data.recentAssignments.map((asg) => (
                    <div key={asg._id} className="p-4 rounded-2xl bg-bronze-50 border border-bronze-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-brand-900 truncate">{asg.subject} ({asg.grade})</span>
                        <span className="text-xs text-bronze-500 shrink-0">Due: {asg.dueDate}</span>
                      </div>
                      <h4 className="text-sm font-bold text-bronze-950 leading-snug">{asg.title}</h4>
                      <p className="text-xs text-bronze-600 leading-relaxed">{asg.description}</p>
                      <div className="pt-2 flex items-center justify-between text-xs border-t border-bronze-100/80">
                        <span className="font-semibold text-emerald-700">Total Marks: {asg.totalMarks}</span>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                          ✓ Graded (24/25)
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-bronze-500 py-6 text-center bg-bronze-50 rounded-2xl border border-bronze-200">
                    No pending assignments!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Col 3: Gamification & Badges Summary */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-bronze-200 space-y-6">
              <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600 shrink-0" /> My Badges Gallery
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {user?.badges?.map((b) => (
                  <div key={b.id} className="p-3 rounded-2xl bg-brand-50 border border-brand-200 text-center space-y-1">
                    <span className="text-2xl block">🏆</span>
                    <h5 className="text-xs font-bold text-bronze-950 truncate">{b.name}</h5>
                    <p className="text-[10px] text-bronze-500 line-clamp-1">{b.description}</p>
                  </div>
                ))}

                {(!user?.badges || user.badges.length === 0) && (
                  <div className="col-span-2 p-4 text-center text-xs text-bronze-500 bg-bronze-50 rounded-2xl border border-bronze-200">
                    Complete learning challenges and quizzes to unlock badges!
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-bronze-100">
                <Link
                  to="/learning-space"
                  className="w-full py-2.5 rounded-xl border border-bronze-300 hover:border-brand-500 text-bronze-700 hover:text-brand-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View All Badges in Learning Space</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Quick Practice Prompt */}
            <div className="bg-brand-500 rounded-3xl p-6 text-white space-y-3 shadow-xl border border-brand-600">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-700 text-brand-100 px-2.5 py-0.5 rounded-full inline-block">
                Daily Learning Challenge
              </span>
              <h4 className="text-lg font-heading font-bold text-white leading-snug">Earn +30 Points Today!</h4>
              <p className="text-xs text-brand-100 leading-relaxed">
                Solve today's commerce puzzle to protect your 5-day streak.
              </p>
              <div className="pt-1">
                <Link
                  to="/learning-space"
                  className="inline-block px-5 py-2.5 rounded-xl bg-white text-brand-950 hover:bg-brand-50 font-bold text-xs shadow-md transition-colors"
                >
                  Solve Challenge Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;