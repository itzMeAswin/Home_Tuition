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
    addToast('Discussion request sent to Mrs. Sandhya Subbaraman!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-bronze-950 via-emerald-950 to-brand-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Parent Supervision Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Parent Dashboard: {user?.name || 'Mrs. Kavitha Sharma'}
            </h1>
            <p className="text-stone-300 text-xs">
              Linked Ward: <strong>{data?.child?.name || 'Aarav Sharma'}</strong> ({data?.child?.grade || 'Class 12'} • {data?.child?.curriculum || 'CBSE'})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="text-[10px] text-emerald-300 uppercase block font-semibold">Attendance</span>
              <span className="text-xl font-heading font-black text-white">{data?.overallAttendance || '95.5%'}</span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="text-[10px] text-brand-300 uppercase block font-semibold">Study Hours</span>
              <span className="text-xl font-heading font-black text-white">{data?.weeklyStudyHours || 12} hrs/wk</span>
            </div>

            <button
              onClick={handleScheduleDiscussion}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{discussionBooked ? 'Discussion Requested' : 'Schedule Tutor Call'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-8">
        {/* Academic Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data?.academicPerformances?.map((perf, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-bold">
                  {perf.subject}
                </span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> {perf.trend}
                </span>
              </div>
              <div>
                <p className="text-3xl font-heading font-black text-bronze-950">{perf.score}</p>
                <p className="text-xs text-stone-500 mt-1">{perf.status}</p>
              </div>
              <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-600">
                Weekly tests: 4 completed • Homework: 100% submission
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Attendance & Tutor Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Monthly Attendance Table */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-4">
            <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" /> Attendance Records
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] text-bronze-950 font-bold border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Month</th>
                    <th className="py-3 px-4">Classes Held</th>
                    <th className="py-3 px-4">Attended</th>
                    <th className="py-3 px-4">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {data?.attendanceRecord?.map((att, idx) => (
                    <tr key={idx} className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-bold text-bronze-950">{att.month}</td>
                      <td className="py-3 px-4 text-stone-600">{att.classesHeld} Sessions</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">{att.attended} Sessions</td>
                      <td className="py-3 px-4 font-black text-brand-700">{att.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Educator Remarks & Recommendations */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-4">
            <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600" /> Tutor Observations & Recommendations
            </h3>

            <div className="space-y-3">
              {data?.tutorNotes?.map((note, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-800">{note.tutorName}</span>
                    <span className="text-stone-400">{note.date} • {note.subject}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{note.comment}"
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 text-xs text-brand-900 space-y-1">
              <span className="font-bold block">Academic Recommendation:</span>
              <p>
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
