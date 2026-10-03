import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, BookOpen, Sparkles, CheckCircle2, Plus, 
  HelpCircle, Lightbulb, Clock, Layers, ArrowRight, 
  FileText, Check, ChevronDown, ChevronUp, Save, Trash2, Printer 
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ASSESSMENT_QUESTIONS = [
  { id: 1, category: 'Active Pedagogy', text: 'I actively design lessons around Socratic questioning and inquiry rather than continuous 40-minute monologues.' },
  { id: 2, category: 'Formative Assessment', text: 'I incorporate daily exit tickets or 2-minute diagnostic polls to identify misconceptions before the class concludes.' },
  { id: 3, category: 'Differentiated Learning', text: 'I provide tiered challenge problems (Basic, Board Exam, Higher-Order) catering to varied learning paces.' },
  { id: 4, category: 'Digital Facilitation', text: 'I utilize interactive digital whiteboards, annotated ledger worksheets, and visual mind maps effectively.' },
  { id: 5, category: 'Student Psychological Safety', text: 'I create an environment where students feel comfortable admitting confusion without embarrassment.' },
  { id: 6, category: 'Lesson Architecture', text: 'Every lesson plan of mine has a specific, measurable learning outcome aligned with CBSE standards.' },
  { id: 7, category: 'Feedback & Remediation', text: 'I provide constructive qualitative feedback on student homework within 24 hours of submission.' },
];

const TeacherHubPage = () => {
  const { user, role } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('modules'); // 'modules', 'planner', 'assessment', 'resources'
  const [modules, setModules] = useState([]);
  const [lessonPlans, setLessonPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active module modal/viewer
  const [selectedModule, setSelectedModule] = useState(null);

  // Lesson Planner Form
  const [plannerForm, setPlannerForm] = useState({
    title: '',
    subject: 'Accountancy',
    grade: 'Class 12',
    topic: '',
    durationMinutes: 60,
    learningObjective: '',
    teachingMethod: 'Interactive Lecture & Discussion',
    activities: [
      { time: '0 - 10 mins', title: 'Concept Introduction & Real-World Hook', description: '' },
      { time: '10 - 35 mins', title: 'Guided Problem Solving & Ledger Practice', description: '' },
      { time: '35 - 50 mins', title: 'Independent Student Application', description: '' },
      { time: '50 - 60 mins', title: 'Exit Ticket & Doubt Resolution', description: '' }
    ],
    assessmentMethod: 'Exit Ticket Quiz',
    materialsNeeded: 'TS Grewal Book, Digital Whiteboard',
    notes: '',
  });
  const [savingPlan, setSavingPlan] = useState(false);

  // Readiness Assessment State
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [submittingAssessment, setSubmittingAssessment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [mRes, lpRes] = await Promise.all([
          api.get('/training/modules'),
          api.get('/lesson-plans'),
        ]);
        setModules(mRes.data);
        setLessonPlans(lpRes.data);
      } catch (err) {
        console.error('Error loading training hub:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Save Lesson Plan
  const handleSaveLessonPlan = async (e) => {
    e.preventDefault();
    if (!plannerForm.title || !plannerForm.learningObjective) {
      addToast('Please provide a lesson title and learning objective', 'error');
      return;
    }

    setSavingPlan(true);
    try {
      const res = await api.post('/lesson-plans', {
        ...plannerForm,
        materialsNeeded: plannerForm.materialsNeeded.split(',').map((s) => s.trim()),
      });
      setLessonPlans([res.data, ...lessonPlans]);
      addToast('Lesson plan saved to MongoDB!', 'success');
      // Reset form
      setPlannerForm({
        title: '',
        subject: 'Accountancy',
        grade: 'Class 12',
        topic: '',
        durationMinutes: 60,
        learningObjective: '',
        teachingMethod: 'Interactive Lecture & Discussion',
        activities: [
          { time: '0 - 10 mins', title: 'Concept Hook', description: '' },
          { time: '10 - 35 mins', title: 'Guided Practice', description: '' },
          { time: '35 - 50 mins', title: 'Independent Application', description: '' },
          { time: '50 - 60 mins', title: 'Exit Ticket', description: '' }
        ],
        assessmentMethod: 'Exit Ticket Quiz',
        materialsNeeded: 'TS Grewal Book, Digital Whiteboard',
        notes: '',
      });
    } catch (err) {
      addToast('Error saving lesson plan', 'error');
    } finally {
      setSavingPlan(false);
    }
  };

  // Submit Readiness Assessment
  const handleSubmitAssessment = async () => {
    const formatted = ASSESSMENT_QUESTIONS.map((q) => ({
      category: q.category,
      score: assessmentAnswers[q.id] || 3,
    }));

    setSubmittingAssessment(true);
    try {
      const res = await api.post('/training/readiness-assessment', { answers: formatted });
      setAssessmentResult(res.data);
      addToast('Assessment evaluated successfully!', 'success');
    } catch (err) {
      addToast('Error evaluating assessment', 'error');
    } finally {
      setSubmittingAssessment(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-bronze-950 via-purple-950 to-brand-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-300" /> Research Implementation: Overcoming Pedagogical Barriers
              </span>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
                TEACHER DEVELOPMENT HUB
              </h1>
              <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
                Empowering tutors with advanced student-centered pedagogical training, Socratic instruction design, structured lesson planning, and teaching readiness diagnostics.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="text-[10px] text-purple-300 uppercase block font-semibold">Saved Plans</span>
                <span className="text-2xl font-heading font-bold text-white">{lessonPlans.length}</span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="text-[10px] text-purple-300 uppercase block font-semibold">Active Modules</span>
                <span className="text-2xl font-heading font-bold text-white">{modules.length}</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'modules'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Training Modules</span>
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'planner'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Interactive Lesson Planner</span>
            </button>

            <button
              onClick={() => setActiveTab('assessment')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'assessment'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Teaching Readiness Assessment</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* TAB 1: TRAINING MODULES */}
        {activeTab === 'modules' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((mod) => (
                <div
                  key={mod._id}
                  className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 hover:border-purple-400 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold">
                        {mod.category}
                      </span>
                      <span className="text-xs text-stone-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {mod.durationMinutes} Mins
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-bronze-950 leading-snug">
                      {mod.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {mod.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wide">
                        Core Takeaways:
                      </span>
                      <ul className="text-xs text-stone-600 space-y-1">
                        {mod.keyTakeaways?.slice(0, 2).map((takeaway, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setSelectedModule(mod)}
                      className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <span>Study Training Module</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Module Detail Modal */}
            {selectedModule && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-purple-200 space-y-6 my-8"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                    <div>
                      <span className="text-xs font-bold text-purple-700 uppercase">
                        {selectedModule.category} • {selectedModule.level}
                      </span>
                      <h3 className="text-xl font-heading font-extrabold text-bronze-950 mt-1">
                        {selectedModule.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedModule(null)}
                      className="p-2 rounded-full hover:bg-stone-100 text-stone-500"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {selectedModule.steps?.map((step, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                        <h4 className="text-sm font-bold text-purple-950">
                          Step {step.order}: {step.stepTitle}
                        </h4>
                        <p className="text-xs text-stone-700 leading-relaxed">{step.content}</p>
                        {step.practicalTip && (
                          <div className="p-3 bg-purple-50 rounded-xl text-xs text-purple-900 border border-purple-200">
                            <strong>💡 Practical Application:</strong> {step.practicalTip}
                          </div>
                        )}
                      </div>
                    ))}

                    {selectedModule.checkQuestions?.length > 0 && (
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                        <span className="text-xs font-bold text-amber-900 uppercase">
                          Pedagogical Reflection Check
                        </span>
                        <p className="text-xs font-semibold text-bronze-950">
                          {selectedModule.checkQuestions[0].questionText}
                        </p>
                        <p className="text-xs text-stone-600 bg-white p-2.5 rounded-xl border border-stone-200">
                          <strong>Solution:</strong> {selectedModule.checkQuestions[0].explanation}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedModule(null)}
                      className="px-6 py-2.5 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 transition"
                    >
                      Done Reading
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INTERACTIVE LESSON PLANNER */}
        {activeTab === 'planner' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Plan Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-6">
              <div>
                <h3 className="text-xl font-heading font-extrabold text-bronze-950">
                  Interactive Lesson Plan Designer
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Draft structured, student-centered lesson architectures and save them to MongoDB.
                </p>
              </div>

              <form onSubmit={handleSaveLessonPlan} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Subject</label>
                    <select
                      value={plannerForm.subject}
                      onChange={(e) => setPlannerForm({ ...plannerForm, subject: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
                    >
                      <option value="Accountancy">Accountancy</option>
                      <option value="Economics">Economics</option>
                      <option value="Business Studies">Business Studies</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="CA/CMA Foundation">CA/CMA Foundation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Class / Grade</label>
                    <select
                      value={plannerForm.grade}
                      onChange={(e) => setPlannerForm({ ...plannerForm, grade: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
                    >
                      <option value="Class 12">Class 12</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Foundation">CA/CMA Foundation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Duration</label>
                    <select
                      value={plannerForm.durationMinutes}
                      onChange={(e) => setPlannerForm({ ...plannerForm, durationMinutes: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
                    >
                      <option value={45}>45 Minutes</option>
                      <option value={60}>60 Minutes</option>
                      <option value={90}>90 Minutes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Lesson Title *</label>
                  <input
                    type="text"
                    required
                    value={plannerForm.title}
                    onChange={(e) => setPlannerForm({ ...plannerForm, title: e.target.value })}
                    placeholder="e.g. Partnership Dissolution: Realisation Account Adjustments"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Learning Objective *</label>
                  <textarea
                    rows={2}
                    required
                    value={plannerForm.learningObjective}
                    onChange={(e) => setPlannerForm({ ...plannerForm, learningObjective: e.target.value })}
                    placeholder="Students will be able to distinguish between dissolution of partnership vs dissolution of firm and draft the Realisation Account with 100% accuracy."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-purple-600 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Teaching Method</label>
                    <select
                      value={plannerForm.teachingMethod}
                      onChange={(e) => setPlannerForm({ ...plannerForm, teachingMethod: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
                    >
                      <option value="Interactive Lecture & Discussion">Interactive Lecture & Discussion</option>
                      <option value="Scaffolded Guided Practice">Scaffolded Guided Practice</option>
                      <option value="Inquiry-Based Learning">Inquiry-Based Learning</option>
                      <option value="Case Study & Problem Solving">Case Study & Problem Solving</option>
                      <option value="Socratic Questioning">Socratic Questioning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Assessment Method</label>
                    <input
                      type="text"
                      value={plannerForm.assessmentMethod}
                      onChange={(e) => setPlannerForm({ ...plannerForm, assessmentMethod: e.target.value })}
                      placeholder="e.g. 3-Question Exit Ticket Poll & Working Ledger Check"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                {/* Activities Breakdown */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-stone-700">Class Activities Timeline</label>
                  {plannerForm.activities.map((act, idx) => (
                    <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold text-purple-900">
                        <span>{act.time}</span>
                        <span>{act.title}</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Brief description of activity..."
                        value={act.description}
                        onChange={(e) => {
                          const updated = [...plannerForm.activities];
                          updated[idx].description = e.target.value;
                          setPlannerForm({ ...plannerForm, activities: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs bg-white outline-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={savingPlan}
                    className="w-full py-3.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingPlan ? 'Saving to Database...' : 'Save Lesson Plan to MongoDB'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Saved Plans List */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-lg font-heading font-bold text-bronze-950 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" /> Saved Institutional Lesson Plans
              </h3>

              <div className="space-y-3">
                {lessonPlans.map((plan) => (
                  <div key={plan._id} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-bold">
                        {plan.subject} • {plan.grade}
                      </span>
                      <span className="text-[10px] text-stone-400">{plan.durationMinutes} Mins</span>
                    </div>

                    <h4 className="text-sm font-bold text-bronze-950 leading-snug">
                      {plan.title}
                    </h4>

                    <p className="text-xs text-stone-600 line-clamp-2">
                      <strong>Obj:</strong> {plan.learningObjective}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-100">
                      <span>Method: {plan.teachingMethod}</span>
                      <span className="text-purple-700 font-semibold">{plan.tutorName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TEACHING READINESS ASSESSMENT */}
        {activeTab === 'assessment' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-6">
              <div className="text-center space-y-2">
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
                  Self-Diagnostic Questionnaire
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-bronze-950">
                  Teaching Readiness Assessment
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Evaluate your preparation across modern pedagogical dimensions, formative assessment, and student-centered delivery.
                </p>
              </div>

              {!assessmentResult ? (
                <div className="space-y-6">
                  {ASSESSMENT_QUESTIONS.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-purple-900 uppercase">{q.category}</span>
                        <span className="text-stone-400">Statement {idx + 1}/7</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-bronze-950">{q.text}</p>

                      {/* Scale 1 to 5 */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-stone-500">Developing</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <button
                              key={val}
                              onClick={() => setAssessmentAnswers({ ...assessmentAnswers, [q.id]: val })}
                              className={`w-9 h-9 rounded-xl font-bold text-xs transition cursor-pointer ${
                                (assessmentAnswers[q.id] || 3) === val
                                  ? 'bg-purple-700 text-white shadow-md'
                                  : 'bg-white border border-stone-200 text-stone-700 hover:border-purple-400'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                        <span className="text-[10px] text-stone-500">Expert</span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <button
                      onClick={handleSubmitAssessment}
                      disabled={submittingAssessment}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-bold text-sm shadow-xl shadow-purple-700/20 flex items-center justify-center gap-2 cursor-pointer transition"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{submittingAssessment ? 'Calculating...' : 'Submit & Generate Diagnostic Report'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Diagnostic Report Results */
                <div className="space-y-6">
                  <div className="text-center py-4 border-b border-stone-100 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-800 mx-auto flex items-center justify-center font-heading font-black text-2xl">
                      {assessmentResult.percentage}%
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-bronze-950">
                      Readiness Level: {assessmentResult.readinessLevel}
                    </h4>
                    <p className="text-xs text-stone-500">
                      Score: {assessmentResult.totalScore} / {assessmentResult.maxScore} Points
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                      <h5 className="text-xs font-bold text-emerald-900 uppercase">Teaching Strengths</h5>
                      <ul className="text-xs text-emerald-800 space-y-1">
                        {assessmentResult.strengths?.map((s, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                      <h5 className="text-xs font-bold text-amber-900 uppercase">Areas for Growth</h5>
                      <ul className="text-xs text-amber-800 space-y-1">
                        {assessmentResult.improvementAreas?.map((imp, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <h5 className="text-xs font-bold text-bronze-900 uppercase tracking-wider">
                      Recommended Pedagogical Modules
                    </h5>
                    <div className="space-y-2">
                      {assessmentResult.recommendedModules?.map((mod) => (
                        <div key={mod._id} className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-purple-900">{mod.title}</span>
                            <span className="text-stone-500 block">{mod.category} • {mod.durationMinutes} Mins</span>
                          </div>
                          <button
                            onClick={() => { setSelectedModule(mod); setActiveTab('modules'); }}
                            className="px-3 py-1.5 rounded-lg bg-purple-700 text-white font-bold"
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <button
                      onClick={() => setAssessmentResult(null)}
                      className="px-6 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50"
                    >
                      Retake Readiness Diagnostic
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherHubPage;
