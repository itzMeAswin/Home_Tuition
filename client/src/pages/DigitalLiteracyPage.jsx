import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, Video, Mic, MicOff, Camera, Hand, MessageSquare, 
  Upload, FileText, CheckCircle2, ChevronRight, ChevronLeft, 
  ShieldCheck, HelpCircle, ArrowRight, Sparkles, BookOpen, RotateCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const DigitalLiteracyPage = () => {
  const { addToast } = useToast();
  const [guides, setGuides] = useState([]);
  const [activeGuideIdx, setActiveGuideIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [completedGuides, setCompletedGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Diagnostic Assessment State
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentResult, setAssessmentResult] = useState(null);

  const LITERACY_QUESTIONS = [
    { id: 1, topic: 'Joining Links', text: 'I know how to click an invite link (Google Meet / Zoom) and join 5 minutes before class.' },
    { id: 2, topic: 'Audio & Video Controls', text: 'I know how to mute/unmute my microphone and turn my webcam on or off independently.' },
    { id: 3, topic: 'In-Call Interaction', text: 'I know how to click the "Raise Hand" icon and type questions in the live chat box.' },
    { id: 4, topic: 'Homework PDF Scanning', text: 'I know how to photograph handwritten notebook pages, compile into a single PDF, and upload it.' },
    { id: 5, topic: 'Digital Safety', text: 'I understand why private class links and passwords must never be shared on social media.' },
  ];

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await api.get('/digital-guides');
        setGuides(res.data);
      } catch (err) {
        console.error('Error fetching digital guides:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const activeGuide = guides[activeGuideIdx] || null;

  const handleNextStep = () => {
    if (!activeGuide) return;
    if (currentStepIdx < activeGuide.steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    } else {
      // Completed guide
      if (!completedGuides.includes(activeGuide._id)) {
        setCompletedGuides([...completedGuides, activeGuide._id]);
        addToast(`Completed Tutorial: ${activeGuide.title}!`, 'success');
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleSelectGuide = (idx) => {
    setActiveGuideIdx(idx);
    setCurrentStepIdx(0);
  };

  const handleSubmitLiteracyAssessment = async () => {
    const formatted = LITERACY_QUESTIONS.map((q) => ({
      topic: q.topic,
      score: assessmentAnswers[q.id] || 3,
    }));

    try {
      const res = await api.post('/digital-guides/readiness-assessment', { answers: formatted });
      setAssessmentResult(res.data);
      addToast('Digital literacy evaluated successfully!', 'success');
    } catch (err) {
      addToast('Error evaluating assessment', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-bronze-950 via-blue-950 to-brand-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-blue-300" /> Research Implementation: Overcoming Digital Literacy Barriers
              </span>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
                DIGITAL LEARNING MADE SIMPLE
              </h1>
              <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
                Step-by-step interactive visual guides designed for students, parents, and beginners to master online classrooms, video conferencing, and assignment submission with confidence.
              </p>
            </div>

            {/* Assessment Shortcut */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAssessment(!showAssessment)}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{showAssessment ? 'View Tutorials' : 'Take Digital Readiness Diagnostic'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {!showAssessment ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Guides Navigation Drawer */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 space-y-3">
                <h3 className="font-heading font-bold text-base text-bronze-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" /> Interactive Tutorial Guides
                </h3>
                <p className="text-xs text-stone-500">
                  Select a guide to view beginner-friendly step-by-step visual instructions:
                </p>

                <div className="space-y-2 pt-1">
                  {guides.map((guide, idx) => {
                    const isActive = activeGuideIdx === idx;
                    const isCompleted = completedGuides.includes(guide._id);
                    return (
                      <button
                        key={guide._id}
                        onClick={() => handleSelectGuide(idx)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'bg-blue-50 border-blue-400 font-bold ring-2 ring-blue-300/30'
                            : 'bg-stone-50/60 border-stone-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs text-bronze-950 line-clamp-1">{guide.title}</p>
                          <span className="text-[10px] text-stone-500">
                            {guide.steps?.length} Steps • {guide.estimatedMinutes} Mins
                          </span>
                        </div>
                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Digital Hotline Helper Card */}
              <div className="bg-blue-50/80 rounded-3xl p-6 border border-blue-200 space-y-2 text-xs text-blue-950">
                <h4 className="font-bold flex items-center gap-1.5 text-blue-900">
                  <HelpCircle className="w-4 h-4 text-blue-600" /> Need 1-on-1 Device Setup Help?
                </h4>
                <p className="leading-relaxed text-blue-800">
                  Our academic coordinator will guide you over phone call to test your camera and microphone prior to your first class!
                </p>
                <a
                  href="tel:+919345793979"
                  className="inline-block mt-2 font-bold text-blue-700 underline"
                >
                  Call Help Desk: +91 93457 93979
                </a>
              </div>
            </div>

            {/* Right: Interactive Step-by-Step Viewer */}
            <div className="lg:col-span-8">
              {activeGuide && (
                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-200 space-y-6">
                  {/* Guide Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-stone-100">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                        {activeGuide.category}
                      </span>
                      <h3 className="text-2xl font-heading font-extrabold text-bronze-950 mt-1.5">
                        {activeGuide.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {activeGuide.summary}
                      </p>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-stone-100 text-stone-600 text-xs font-bold text-center self-start sm:self-auto">
                      Step {currentStepIdx + 1} of {activeGuide.steps?.length}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentStepIdx + 1) / (activeGuide.steps?.length || 1)) * 100}%`,
                      }}
                    ></div>
                  </div>

                  {/* Current Step Content Card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStepIdx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {activeGuide.steps && activeGuide.steps[currentStepIdx] && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-heading font-black text-base shrink-0">
                              {activeGuide.steps[currentStepIdx].stepNumber}
                            </div>
                            <h4 className="text-lg font-heading font-bold text-bronze-950">
                              {activeGuide.steps[currentStepIdx].title}
                            </h4>
                          </div>

                          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200 text-sm text-stone-800 leading-relaxed font-medium">
                            {activeGuide.steps[currentStepIdx].instruction}
                          </div>

                          {/* Visual Simulation / Control Buttons Preview */}
                          <div className="p-4 rounded-2xl bg-gradient-to-r from-stone-900 to-bronze-900 text-white flex flex-wrap items-center justify-around gap-4 text-xs">
                            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10">
                              <Mic className="w-4 h-4 text-emerald-400" />
                              <span>Mute / Unmute (Spacebar)</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10">
                              <Camera className="w-4 h-4 text-blue-400" />
                              <span>Camera Preview</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10">
                              <Hand className="w-4 h-4 text-amber-400" />
                              <span>Raise Hand (✋)</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10">
                              <MessageSquare className="w-4 h-4 text-purple-400" />
                              <span>In-Call Chat</span>
                            </div>
                          </div>

                          {/* Practical Tip */}
                          {activeGuide.steps[currentStepIdx].tip && (
                            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <strong>Helpful Tip:</strong> {activeGuide.steps[currentStepIdx].tip}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Stepper Controls */}
                  <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                    <button
                      disabled={currentStepIdx === 0}
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50 disabled:opacity-30 cursor-pointer flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Step</span>
                    </button>

                    <button
                      onClick={handleNextStep}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>
                        {currentStepIdx === (activeGuide.steps?.length || 1) - 1
                          ? 'Complete Guide & Mark Done'
                          : 'Next Step'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* DIGITAL LITERACY READINESS ASSESSMENT */
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-200 space-y-6">
              <div className="text-center space-y-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                  Self-Check Diagnostic
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-bronze-950">
                  Digital Literacy Readiness Diagnostic
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Find out how confident you are with digital learning tools and receive tailored tutorials for you or your child.
                </p>
              </div>

              {!assessmentResult ? (
                <div className="space-y-6">
                  {LITERACY_QUESTIONS.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-900 uppercase">{q.topic}</span>
                        <span className="text-stone-400">Question {idx + 1}/5</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-bronze-950">{q.text}</p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-stone-500">Need Help</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <button
                              key={val}
                              onClick={() => setAssessmentAnswers({ ...assessmentAnswers, [q.id]: val })}
                              className={`w-9 h-9 rounded-xl font-bold text-xs transition cursor-pointer ${
                                (assessmentAnswers[q.id] || 3) === val
                                  ? 'bg-blue-600 text-white shadow-md'
                                  : 'bg-white border border-stone-200 text-stone-700 hover:border-blue-400'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                        <span className="text-[10px] text-stone-500">Fully Confident</span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <button
                      onClick={handleSubmitLiteracyAssessment}
                      className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer transition"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Submit Digital Diagnostic</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Diagnostic Result */
                <div className="space-y-6">
                  <div className="text-center py-4 border-b border-stone-100 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-800 mx-auto flex items-center justify-center font-heading font-black text-2xl">
                      {assessmentResult.percentage}%
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-bronze-950">
                      Level: {assessmentResult.level}
                    </h4>
                    <p className="text-xs text-stone-600 max-w-md mx-auto">
                      {assessmentResult.feedback}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-bronze-900 uppercase tracking-wider">
                      Recommended Tutorial Walkthroughs
                    </h5>
                    <div className="space-y-2">
                      {assessmentResult.recommendedGuides?.map((guide) => (
                        <div key={guide._id} className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-blue-900">{guide.title}</span>
                            <span className="text-stone-500 block">{guide.category} • {guide.estimatedMinutes} Mins</span>
                          </div>
                          <button
                            onClick={() => {
                              const foundIdx = guides.findIndex((g) => g._id === guide._id);
                              if (foundIdx !== -1) setActiveGuideIdx(foundIdx);
                              setShowAssessment(false);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold"
                          >
                            Open Tutorial
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
                      Retake Assessment
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

export default DigitalLiteracyPage;
