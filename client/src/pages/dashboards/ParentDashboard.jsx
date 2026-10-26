import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle2, TrendingUp, Calendar, Phone, 
  MessageCircle, Award, BookOpen, Clock, AlertCircle, ArrowRight 
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const ParentDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [discussionBooked, setDiscussionBooked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/dashboard/parent');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleScheduleDiscussion = () => {
    setDiscussionBooked(true);
    addToast('Discussion request sent to Mrs. Lakshmi S.!', 'success');
  };

  return (
    <div className="min-h-screen bg-bronze-50 pb-16 sm:pb-24 w-full overflow-x-hidden">
      {/* Banner - Solid Deep Black Background from your theme */}
      <section className="bg-bronze-950 text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1.5 min-w-0">
            <span className="px-3.5 py-1 rounded-full bg-brand-900 border border-brand-400/40 text-brand-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0">
              <Users className="w-3.5 h-3.5 text-brand-300" /> Parent Supervision Portal
            </span>
            <h1 className="text-xl sm:text-3xl font-heading font-extrabold text-white truncate">
              Parent Dashboard: {user?.name || 'Mrs. Kavitha Sharma'}
            </h1>
            <p className="text-bronze-300 text-xs leading-relaxed">
              Linked Ward: <strong className="text-white">{data?.child?.name || 'Aarav Sharma'}</strong> ({data?.child?.grade || 'Class 12'} • {data?.child?.curriculum || 'CBSE'})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-bronze-900 border border-bronze-800 text-center min-w-[95px] sm:min-w-[110px]">
              <span className="text-[10px] text-emerald-400 uppercase block font-semibold">Attendance</span>
              <span className="text-xl font-heading font-black text-white mt-0.5 block">{data?.overallAttendance || '95.5%'}</span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-bronze-900 border border-bronze-800 text-center min-w-[95px] sm:min-w-[110px]">
              <span className="text-[10px] text-sky-400 uppercase block font-semibold">Study Hours</span>
              <span className="text-xl font-heading font-black text-white mt-0.5 block">{data?.weeklyStudyHours || 12} hrs/wk</span>
            </div>

            <button
              type="button"
              onClick={handleScheduleDiscussion}
              className="px-5 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-500/20 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{discussionBooked ? 'Discussion Requested' : 'Schedule Tutor Call'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Container - Positioned cleanly below the black banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-8">
        {/* Academic Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {data?.academicPerformances?.map((perf, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-xl border border-bronze-200 flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-bold truncate">
                    {perf.subject}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" /> {perf.trend}
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-heading font-black text-bronze-950">{perf.score}</p>
                  <p className="text-xs text-bronze-500 mt-1">{perf.status}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-bronze-100 text-[11px] text-bronze-600 leading-relaxed">
                Weekly tests: 4 completed • Homework: 100% submission
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Attendance & Tutor Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Monthly Attendance Table */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-bronze-200 space-y-4">
            <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-600 shrink-0" /> Attendance Records
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-bronze-200">
              <table className="w-full min-w-[400px] text-left text-xs">
                <thead className="bg-bronze-50 text-bronze-950 font-bold border-b border-bronze-200">
                  <tr>
                    <th className="py-3 px-4">Month</th>
                    <th className="py-3 px-4">Classes Held</th>
                    <th className="py-3 px-4">Attended</th>
                    <th className="py-3 px-4">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bronze-100 font-medium">
                  {data?.attendanceRecord?.map((att, idx) => (
                    <tr key={idx} className="hover:bg-brand-50/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-bronze-950">{att.month}</td>
                      <td className="py-3 px-4 text-bronze-600">{att.classesHeld} Sessions</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">{att.attended} Sessions</td>
                      <td className="py-3 px-4 font-black text-brand-700">{att.percentage}</td>
                    </tr>
                  ))}
                  {(!data?.attendanceRecord || data.attendanceRecord.length === 0) && !loading && (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-bronze-500">
                        No attendance records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Educator Remarks & Recommendations */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-bronze-200 space-y-4">
            <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600 shrink-0" /> Tutor Observations & Recommendations
            </h3>

            <div className="space-y-3">
              {data?.tutorNotes?.map((note, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-bronze-50 border border-bronze-200 space-y-2">
                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="font-bold text-brand-900 truncate">{note.tutorName}</span>
                    <span className="text-bronze-500 shrink-0">{note.date} • {note.subject}</span>
                  </div>
                  <p className="text-xs text-bronze-700 leading-relaxed italic">
                    "{note.comment}"
                  </p>
                </div>
              ))}

              {(!data?.tutorNotes || data.tutorNotes.length === 0) && !loading && (
                <div className="p-4 text-center text-xs text-bronze-500 rounded-2xl bg-bronze-50 border border-bronze-200">
                  No tutor remarks available yet.
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 text-xs text-brand-950 space-y-1">
              <span className="font-bold block text-brand-900">Academic Recommendation:</span>
              <p className="text-brand-900 leading-relaxed">
                Aarav is performing in the top 5% of his batch in Accountancy. Continuing the daily 15-minute challenge on My Learning Space will solidify his Centum preparation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;