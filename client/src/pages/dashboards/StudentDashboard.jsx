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
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Header */}
      <section className="bg-gradient-to-r from-bronze-950 via-bronze-900 to-brand-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <UserAvatar
              name={studentName}
              role="student"
              size="xl"
              className="border-2 border-brand-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  {studentName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-500/30 text-brand-300 text-xs font-bold">
                  {user?.grade || 'Class 12'}
                </span>
              </div>
              <p className="text-stone-300 text-xs mt-0.5">
                Curriculum: {user?.curriculum || 'CBSE'} • Online Home Tution Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="text-[10px] text-amber-300 uppercase block font-semibold flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" /> Active Streak
              </span>
              <span className="text-xl font-heading font-black text-white">{streak} Days</span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="text-[10px] text-brand-300 uppercase block font-semibold flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-brand-400" /> Learning Pts
              </span>
              <span className="text-xl font-heading font-black text-white">{points}</span>
            </div>

            <Link
              to="/learning-space"
              className="px-5 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Learning Space</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Col 1 & 2: Upcoming Classes & Active Assignments */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Classes */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-600" /> Upcoming Tuition Schedule
                </h3>
                <span className="text-xs text-stone-500">Live Virtual Classrooms</span>
              </div>

              <div className="space-y-3">
                {data?.upcomingClasses?.map((cls) => (
                  <div key={cls.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] font-bold">
                          {cls.subject}
                        </span>
                        <span className="text-xs text-stone-500">{cls.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-bronze-950">{cls.topic}</h4>
                      <p className="text-xs text-stone-500">Educator: {cls.tutor}</p>
                    </div>

                    <a
                      href={cls.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-bronze-900 hover:bg-bronze-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition self-start sm:self-center"
                    >
                      <span>Join Live Class</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Homework Assignments */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" /> Active Homework & Worksheets
                </h3>
                <span className="text-xs text-stone-500">Assigned by Faculty</span>
              </div>

              <div className="space-y-3">
                {data?.recentAssignments?.length > 0 ? (
                  data.recentAssignments.map((asg) => (
                    <div key={asg._id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-900">{asg.subject} ({asg.grade})</span>
                        <span className="text-xs text-stone-500">Due: {asg.dueDate}</span>
                      </div>
                      <h4 className="text-sm font-bold text-bronze-950">{asg.title}</h4>
                      <p className="text-xs text-stone-600">{asg.description}</p>
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-700">Total Marks: {asg.totalMarks}</span>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          ✓ Graded (24/25)
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-500 py-4 text-center">No pending assignments!</p>
                )}
              </div>
            </div>
          </div>

          {/* Col 3: Gamification & Badges Summary */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-brand-200 space-y-6">
              <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600" /> My Badges Gallery
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {user?.badges?.map((b) => (
                  <div key={b.id} className="p-3 rounded-2xl bg-brand-50/70 border border-brand-200 text-center space-y-1">
                    <span className="text-2xl block">🏆</span>
                    <h5 className="text-xs font-bold text-bronze-950">{b.name}</h5>
                    <p className="text-[10px] text-stone-500 line-clamp-1">{b.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-100">
                <Link
                  to="/learning-space"
                  className="w-full py-2.5 rounded-xl border border-stone-300 hover:border-brand-500 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <span>View All 6 Badges in Learning Space</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Practice Prompt */}
            <div className="bg-gradient-to-br from-amber-500 to-brand-600 rounded-3xl p-6 text-white space-y-3 shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
                Daily Learning Challenge
              </span>
              <h4 className="text-lg font-heading font-bold">Earn +30 Points Today!</h4>
              <p className="text-xs text-amber-100">
                Solve today's commerce puzzle to protect your 5-day streak.
              </p>
              <Link
                to="/learning-space"
                className="inline-block px-5 py-2.5 rounded-xl bg-white text-bronze-950 font-bold text-xs shadow-md transition"
              >
                Solve Challenge Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
