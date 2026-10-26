import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Search, CheckCircle2, 
  Sparkles, X, Filter
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
    <div className="min-h-screen bg-bronze-50 pb-16 sm:pb-24 w-full overflow-x-hidden">
      {/* Banner - Solid brand background using theme colors */}
      <section className="bg-bronze-950 text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-brand-900 border border-brand-400/40 text-brand-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-brand-300 shrink-0" /> Academic & Professional Programs
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white">
            COURSE & SUBJECT EXPLORER
          </h1>
          <p className="text-bronze-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Focused, syllabus-aligned coaching with strong conceptual clarity, verified educators, and proven board exam score boosters.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar - Positioned cleanly below the banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-bronze-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-bronze-400 shrink-0" />
              <input
                type="text"
                placeholder="Search subject, chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-bronze-200 bg-white text-bronze-800 placeholder:text-bronze-400 text-xs outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            {/* Grade Filter */}
            <div>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-bronze-200 bg-white text-bronze-800 text-xs font-semibold outline-none focus:border-brand-500 transition-colors cursor-pointer"
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
                className="w-full px-3 py-2.5 rounded-xl border border-bronze-200 bg-white text-bronze-800 text-xs font-semibold outline-none focus:border-brand-500 transition-colors cursor-pointer"
              >
                <option value="All">All Subjects</option>
                <option value="Accountancy">Accountancy</option>
                <option value="Economics">Economics</option>
                <option value="Business Studies">Business Studies</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Social Science">Social Science</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Undergraduate & Postgraduate">College Commerce</option>
                <option value="CA/CMA Foundation">CA / CMA Foundation</option>
                <option value="NET/SET">NET / SET</option>
              </select>
            </div>

            {/* Mode Filter */}
            <div>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-bronze-200 bg-white text-bronze-800 text-xs font-semibold outline-none focus:border-brand-500 transition-colors cursor-pointer"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-bronze-200 hover:border-brand-500 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Course Vector Banner */}
                <CourseBanner subject={course.subject} mode={course.mode} />

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-bronze-500 text-xs font-medium">
                    <span>{course.grades?.join(', ')}</span>
                    <span>•</span>
                    <span>{course.curriculum?.join(', ')}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-bronze-950 leading-snug group-hover:text-brand-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-bronze-600 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Highlights Snippet */}
                  <div className="pt-2 space-y-1.5">
                    {course.highlights?.slice(0, 2).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-1.5 text-xs text-bronze-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tutor Name */}
                  <div className="pt-3 border-t border-bronze-100 flex items-center justify-between text-xs text-bronze-500">
                    <span>Educator:</span>
                    <span className="font-bold text-bronze-900">{course.tutorName}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="w-full sm:flex-1 py-2.5 sm:py-3 rounded-xl border border-bronze-300 hover:border-brand-500 hover:text-brand-700 text-bronze-800 font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  Syllabus Details
                </button>

                <button
                  onClick={onOpenBookingModal}
                  className="w-full sm:flex-1 py-2.5 sm:py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Book Free Demo</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && !loading && (
          <div className="text-center py-12 sm:py-16 bg-white rounded-3xl border border-bronze-200 p-6 sm:p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-bronze-300 mx-auto" />
            <h4 className="text-base sm:text-lg font-bold text-bronze-950">No courses matching your criteria</h4>
            <p className="text-xs text-bronze-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-bronze-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-brand-200 flex flex-col max-h-[90vh] my-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-bronze-100 shrink-0 gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[11px] sm:text-xs font-bold text-brand-700 uppercase tracking-wider block">
                  {selectedCourse.subject} {selectedCourse.grades?.length ? `• ${selectedCourse.grades.join(', ')}` : ''}
                </span>
                <h3 className="text-base sm:text-xl font-heading font-extrabold text-bronze-950 mt-1 leading-snug">
                  {selectedCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-bronze-100 text-bronze-500 hover:text-bronze-800 cursor-pointer shrink-0 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 overflow-y-auto pr-1 flex-1 py-4">
              <p className="text-xs sm:text-sm text-bronze-700 leading-relaxed">
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
                      <div key={uIdx} className="p-3 sm:p-3.5 rounded-2xl bg-bronze-50 border border-bronze-200 text-xs">
                        <p className="font-bold text-bronze-950">{unit.unit}</p>
                        <p className="text-bronze-600 mt-1 leading-relaxed">{unit.topics?.join(' • ')}</p>
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
                <ul className="space-y-1.5 text-xs text-bronze-700">
                  {selectedCourse.highlights?.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Batch & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 sm:p-4 rounded-2xl bg-brand-50 border border-brand-200 text-xs">
                <div>
                  <span className="text-bronze-500 block">Duration:</span>
                  <span className="font-bold text-bronze-950">{selectedCourse.duration || 'Flexible'}</span>
                </div>
                <div>
                  <span className="text-bronze-500 block">Sessions / Week:</span>
                  <span className="font-bold text-bronze-950">{selectedCourse.sessionsPerWeek || 'Customizable'}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-bronze-100 shrink-0">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  onOpenBookingModal();
                }}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
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