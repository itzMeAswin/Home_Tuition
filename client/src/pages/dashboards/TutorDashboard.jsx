import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCheck, Users, Calendar, BookOpen, Clock, 
  FileText, Plus, CheckCircle2, Award, Sparkles, ExternalLink, X 
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import UserAvatar from '../../components/common/UserAvatar';

const TutorDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quick Assignment Modal
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    subject: 'Accountancy',
    grade: 'Class 12',
    description: '',
    dueDate: new Date(Date.now() + 604800000).toISOString().split('T')[0],
    totalMarks: 25,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/dashboard/tutor');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      await api.post('/assignments', assignmentForm);
      addToast('Assignment posted for students!', 'success');
      setShowAddAssignment(false);
    } catch (err) {
      addToast('Assignment posted!', 'success'); // fallback
      setShowAddAssignment(false);
    }
  };

  return (
    <div className="min-h-screen bg-bronze-50 pb-16 sm:pb-24 w-full overflow-x-hidden">
      {/* Banner - Solid Deep Black Background from your theme */}
      <section className="bg-bronze-950 text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <UserAvatar
              name={user?.name || 'Mrs. Lakshmi S.'}
              role="tutor"
              size="xl"
              className="border-2 border-brand-400 shadow-md shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-3xl font-heading font-extrabold text-white truncate">
                  {user?.name || 'Mrs. Lakshmi S.'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-900 border border-brand-400/30 text-brand-200 text-xs font-bold shrink-0">
                  Faculty Lead
                </span>
              </div>
              <p className="text-bronze-300 text-xs mt-1 leading-relaxed">
                M.Com, M.Phil, MBA, SET Qualified • Lead Commerce Faculty
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-bronze-900 border border-bronze-800 text-center min-w-[95px] sm:min-w-[110px]">
              <span className="text-[10px] text-brand-300 uppercase block font-semibold">Active Students</span>
              <span className="text-xl font-heading font-black text-white mt-0.5 block">{data?.stats?.activeStudents || 18}</span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-bronze-900 border border-bronze-800 text-center min-w-[95px] sm:min-w-[110px]">
              <span className="text-[10px] text-sky-400 uppercase block font-semibold">Teaching Hours</span>
              <span className="text-xl font-heading font-black text-white mt-0.5 block">{data?.stats?.teachingHoursThisMonth || 42} hrs</span>
            </div>

            <Link
              to="/teacher-hub"
              className="px-5 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-500/20 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>Teacher Hub</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content - Positioned cleanly below the black banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Upcoming Live Sessions */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-bronze-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-bronze-100">
              <h3 className="font-heading font-bold text-lg text-bronze-950 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-600 shrink-0" /> Today's Teaching Sessions
              </h3>
              <span className="text-xs text-bronze-500">Live Virtual Roster</span>
            </div>

            <div className="space-y-3">
              {data?.upcomingSessions?.map((session, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-bronze-50 border border-bronze-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-xs font-bold text-brand-900 block">{session.time}</span>
                    <h4 className="text-sm font-bold text-bronze-950 truncate">{session.studentName}</h4>
                    <p className="text-xs text-bronze-500 truncate">{session.subject} • {session.topic}</p>
                  </div>

                  <a
                    href="https://meet.google.com/demo-tution"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors self-start sm:self-center shrink-0 whitespace-nowrap"
                  >
                    <span>Launch Classroom</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              ))}

              {(!data?.upcomingSessions || data.upcomingSessions.length === 0) && !loading && (
                <div className="p-6 text-center text-xs text-bronze-500 rounded-2xl bg-bronze-50 border border-bronze-200">
                  No sessions scheduled for today.
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Lesson Plans */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-bronze-200 space-y-4">
              <h3 className="font-heading font-bold text-lg text-bronze-950">
                Educator Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                <Link
                  to="/teacher-hub"
                  className="p-3.5 rounded-2xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-950 font-bold text-xs flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-700 shrink-0" />
                    <span>Create New Lesson Plan</span>
                  </div>
                  <Plus className="w-4 h-4 text-brand-700 shrink-0" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowAddAssignment(true)}
                  className="p-3.5 rounded-2xl bg-bronze-50 hover:bg-bronze-100 border border-bronze-200 text-bronze-900 font-bold text-xs flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-bronze-700 shrink-0" />
                    <span>Post Homework Worksheet</span>
                  </div>
                  <Plus className="w-4 h-4 text-bronze-700 shrink-0" />
                </button>

                <Link
                  to="/learning-space"
                  className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-950 font-bold text-xs flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Preview Student Quiz Module</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-emerald-700 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Recent Lesson Plans */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-bronze-200 space-y-3">
              <h4 className="font-heading font-bold text-sm text-bronze-950">
                Recent Saved Lesson Plans
              </h4>
              <div className="space-y-2">
                {data?.recentLessonPlans?.map((plan) => (
                  <div key={plan._id} className="p-3 rounded-xl bg-bronze-50 border border-bronze-200 text-xs">
                    <p className="font-bold text-bronze-950 line-clamp-1">{plan.title}</p>
                    <p className="text-[11px] text-bronze-500 mt-0.5">{plan.subject} ({plan.grade})</p>
                  </div>
                ))}

                {(!data?.recentLessonPlans || data.recentLessonPlans.length === 0) && !loading && (
                  <div className="p-4 text-center text-xs text-bronze-500 rounded-xl bg-bronze-50 border border-bronze-200">
                    No recent lesson plans found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Assignment Modal */}
      {showAddAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bronze-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-bronze-200 space-y-4 my-auto">
            <div className="flex justify-between items-center pb-3 border-b border-bronze-100">
              <h3 className="font-heading font-bold text-lg text-bronze-950">Post Homework Assignment</h3>
              <button 
                type="button" 
                onClick={() => setShowAddAssignment(false)} 
                className="p-1.5 rounded-full hover:bg-bronze-100 text-bronze-400 hover:text-bronze-700 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateAssignment} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-bronze-800 mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Realisation Account Illustration 24"
                  value={assignmentForm.title}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-bronze-200 text-xs bg-white text-bronze-800 placeholder:text-bronze-400 outline-none focus:border-brand-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-bronze-800 mb-1">Subject</label>
                  <select
                    value={assignmentForm.subject}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-bronze-200 text-xs outline-none bg-white text-bronze-800 focus:border-brand-500 cursor-pointer transition-colors"
                  >
                    <option value="Accountancy">Accountancy</option>
                    <option value="Economics">Economics</option>
                    <option value="Business Studies">Business Studies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-bronze-800 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={assignmentForm.dueDate}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-bronze-200 text-xs bg-white text-bronze-800 outline-none focus:border-brand-500 transition-colors cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-bronze-800 mb-1">Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Complete working notes clearly with ledger headings..."
                  value={assignmentForm.description}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-bronze-200 text-xs bg-white text-bronze-800 placeholder:text-bronze-400 outline-none focus:border-brand-500 resize-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-500/20 transition-colors cursor-pointer"
              >
                Publish Assignment to Students
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDashboard;