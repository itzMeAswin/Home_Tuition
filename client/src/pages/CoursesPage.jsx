import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Search, Filter, Sparkles, CheckCircle2, 
  ArrowRight, Clock, Users, Video, Calendar, ShieldCheck 
} from 'lucide-react';
import api from '../services/api';
import CourseBanner from '../components/common/CourseBanner';

const CoursesPage = ({ onOpenBookingModal }) => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [loading, setLoading] = useState(true);

  // Detail Modal
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await api.get('/courses', {
          params: {
            search: searchQuery || undefined,
            grade: selectedGrade !== 'All' ? selectedGrade : undefined,
            subject: selectedSubject !== 'All' ? selectedSubject : undefined,
            mode: selectedMode !== 'All' ? selectedMode : undefined,
          },
        });
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchQuery, selectedGrade, selectedSubject, selectedMode]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-bronze-950 via-bronze-900 to-brand-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand-300" /> Academic & Professional Programs
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
            COURSE & SUBJECT EXPLORER
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Focused, syllabus-aligned coaching with strong conceptual clarity, verified educators, and proven board exam score boosters.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-brand-200/80 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search subject, chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-brand-500"
              />
            </div>

            {/* Grade Filter */}
            <div>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
              >
                <option value="All">All Grades & Levels</option>
                <option value="Class 12">Class 12</option>
                <option value="Class 11">Class 11</option>
                <option value="CA/CMA Foundation">CA / CMA Foundation</option>
                <option value="UG/PG">UG / PG</option>
                <option value="NET/SET">NET / SET</option>
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
              >
                <option value="All">All Subjects</option>
                <option value="Accountancy">Accountancy</option>
                <option value="Economics">Economics</option>
                <option value="Business Studies">Business Studies</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Undergraduate & Postgraduate">College Commerce</option>
              </select>
            </div>

            {/* Mode Filter */}
            <div>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
              >
                <option value="All">All Learning Modes</option>
                <option value="Online">Online Interactive</option>
                <option value="Offline">Offline Batch (Trichy)</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 hover:border-brand-400 hover:shadow-2xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Course Vector Banner */}
                <CourseBanner subject={course.subject} mode={course.mode} />

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-stone-500 text-xs">
                    <span>{course.grades?.join(', ')}</span>
                    <span>•</span>
                    <span>{course.curriculum?.join(', ')}</span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-bronze-950 leading-snug group-hover:text-brand-700 transition">
                    {course.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Highlights Snippet */}
                  <div className="pt-2 space-y-1">
                    {course.highlights?.slice(0, 2).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-1.5 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tutor Name */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>Educator:</span>
                    <span className="font-bold text-bronze-900">{course.tutorName}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 py-3 rounded-xl border border-stone-300 hover:border-brand-500 text-stone-800 font-bold text-xs transition cursor-pointer"
                >
                  Syllabus Details
                </button>

                <button
                  onClick={onOpenBookingModal}
                  className="flex-1 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/20 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Free Demo</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && !loading && (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
            <h4 className="text-lg font-bold text-bronze-950">No courses matching your criteria</h4>
            <p className="text-xs text-stone-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-brand-200 space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-brand-700 uppercase">
                  {selectedCourse.subject} • {selectedCourse.grades?.join(', ')}
                </span>
                <h3 className="text-xl font-heading font-extrabold text-bronze-950 mt-1">
                  {selectedCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <p className="text-xs text-stone-700 leading-relaxed">
                {selectedCourse.description}
              </p>

              {/* Syllabus Breakdown */}
              {selectedCourse.syllabus?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-bronze-900 tracking-wider">
                    Syllabus Modules Covered:
                  </h4>
                  <div className="space-y-2">
                    {selectedCourse.syllabus.map((unit, uIdx) => (
                      <div key={uIdx} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs">
                        <p className="font-bold text-bronze-950">{unit.unit}</p>
                        <p className="text-stone-500 mt-1">{unit.topics?.join(' • ')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-bronze-900 tracking-wider">
                  Program Highlights:
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {selectedCourse.highlights?.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Batch & Duration */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-brand-50/70 border border-brand-200 text-xs">
                <div>
                  <span className="text-stone-500 block">Duration:</span>
                  <span className="font-bold text-bronze-950">{selectedCourse.duration}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Sessions / Week:</span>
                  <span className="font-bold text-bronze-950">{selectedCourse.sessionsPerWeek}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  onOpenBookingModal();
                }}
                className="flex-1 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-brand-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Free Demo Class for this Program</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
