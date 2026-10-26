import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, Video, Mic, MicOff, Camera, Hand, MessageSquare, 
  Upload, FileText, CheckCircle2, ChevronRight, ChevronLeft, 
  ShieldCheck, HelpCircle, ArrowRight, Sparkles, BookOpen, RotateCcw, X 
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
    <div className="min-h-screen bg-bronze-50 pb-16 sm:pb-24 w-full overflow-x-hidden">
      {/* Banner - Solid Deep Black Background from your theme */}
      <section className="bg-bronze-950 text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-brand-900 border border-brand-400/40 text-brand-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0">
                <Laptop className="w-3.5 h-3.5 text-brand-300 shrink-0" /> Research Implementation: Overcoming Digital Literacy Barriers
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white">
                DIGITAL LEARNING MADE SIMPLE
              </h1>
              <p className="text-bronze-200 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
                Step-by-step interactive visual guides designed for students, parents, and beginners to master online classrooms, video conferencing, and assignment submission with confidence.
              </p>
            </div>

            {/* Assessment Shortcut */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowAssessment(!showAssessment)}
                className="px-5 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{showAssessment ? 'View Tutorials' : 'Take Digital Readiness Diagnostic'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Positioned cleanly below the black banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        {!showAssessment ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left: Guides Navigation Drawer */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-bronze-200 space-y-3">
                <h3 className="font-heading font-bold text-base text-bronze-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-600 shrink-0" /> Interactive Tutorial Guides
                </h3>
                <p className="text-xs text-bronze-500">
                  Select a guide to view beginner-friendly step-by-step visual instructions:
                </p>

                <div className="space-y-2 pt-1">
                  {guides.map((guide, idx) => {
                    const isActive = activeGuideIdx === idx;
                    const isCompleted = completedGuides.includes(guide._id);
                    return (
                      <button
                        key={guide._id}
                        type="button"
                        onClick={() => handleSelectGuide(idx)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                          isActive
                            ? 'bg-brand-50 border-brand-500 font-bold ring-2 ring-brand-400/20'
                            : 'bg-white border-bronze-200 hover:border-brand-400'
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <p className="text-xs text-bronze-950 truncate">{guide.title}</p>
                          <span className="text-[10px] text-bronze-500 block truncate">
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
              <div className="bg-brand-50 rounded-3xl p-6 border border-brand-200 space-y-2 text-xs text-brand-950">
                <h4 className="font-bold flex items-center gap-1.5 text-brand-900">
                  <HelpCircle className="w-4 h-4 text-brand-600 shrink-0" /> Need 1-on-1 Device Setup Help?
                </h4>
                <p className="leading-relaxed text-brand-800">
                  Our academic coordinator will guide you over phone call to test your camera and microphone prior to your first class!
                </p>
                <a
                  href="tel:+919345793979"
                  className="inline-block mt-2 font-bold text-brand-700 hover:text-brand-800 underline transition-colors"
                >
                  Call Help Desk: +91 93457 93979
                </a>
              </div>
            </div>

            {/* Right: Interactive Step-by-Step Viewer */}
            <div className="lg:col-span-8">
              {activeGuide && (
                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-bronze-200 space-y-6">
                  {/* Guide Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-bronze-100">
                    <div className="min-w-0 flex-1">
                      <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-bold uppercase tracking-wider inline-block">
                        {activeGuide.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-bronze-950 mt-1.5 leading-snug">
                        {activeGuide.title}
                      </h3>
                      <p className="text-xs text-bronze-500 mt-0.5 leading-relaxed">
                        {activeGuide.summary}
                      </p>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-bronze-100 text-bronze-700 text-xs font-bold text-center self-start sm:self-auto shrink-0">
                      Step {currentStepIdx + 1} of {activeGuide.steps?.length}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-bronze-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-500 h-full rounded-full transition-all duration-300"
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
                            <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center font-heading font-black text-base shrink-0">
                              {activeGuide.steps[currentStepIdx].stepNumber}
                            </div>
                            <h4 className="text-base sm:text-lg font-heading font-bold text-bronze-950">
                              {activeGuide.steps[currentStepIdx].title}
                            </h4>
                          </div>

                          <div className="bg-bronze-50 p-5 sm:p-6 rounded-2xl border border-bronze-200 text-xs sm:text-sm text-bronze-800 leading-relaxed font-medium">
                            {activeGuide.steps[currentStepIdx].instruction}
                          </div>

                          {/* Visual Simulation / Control Buttons Preview */}
                          <div className="p-4 rounded-2xl bg-bronze-950 text-white flex flex-wrap items-center justify-around gap-3 text-xs border border-bronze-800">
                            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10">
                              <Mic className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span className="truncate">Mute / Unmute (Spacebar)</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10">
                              <Camera className="w-4 h-4 text-brand-300 shrink-0" />
                              <span className="truncate">Camera Preview</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10">
                              <Hand className="w-4 h-4 text-amber-400 shrink-0" />
                              <span className="truncate">Raise Hand (✋)</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10">
                              <MessageSquare className="w-4 h-4 text-brand-200 shrink-0" />
                              <span className="truncate">In-Call Chat</span>
                            </div>
                          </div>

                          {/* Practical Tip */}
                          {activeGuide.steps[currentStepIdx].tip && (
                            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong>Helpful Tip:</strong> {activeGuide.steps[currentStepIdx].tip}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Stepper Controls */}
                  <div className="flex items-center justify-between pt-6 border-t border-bronze-100 gap-2">
                    <button
                      type="button"
                      disabled={currentStepIdx === 0}
                      onClick={handlePrevStep}
                      className="px-4 sm:px-5 py-2.5 rounded-xl border border-bronze-200 text-bronze-700 text-xs font-bold hover:bg-bronze-50 disabled:opacity-30 cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 shrink-0" />
                      <span>Previous Step</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-5 sm:px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>
                        {currentStepIdx === (activeGuide.steps?.length || 1) - 1
                          ? 'Complete Guide & Mark Done'
                          : 'Next Step'}
                      </span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* DIGITAL LITERACY READINESS ASSESSMENT */
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-bronze-200 space-y-6">
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-bold uppercase tracking-wider inline-block">
                  Self-Check Diagnostic
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-bronze-950">
                  Digital Literacy Readiness Diagnostic
                </h3>
                <p className="text-xs text-bronze-500 max-w-md mx-auto leading-relaxed">
                  Find out how confident you are with digital learning tools and receive tailored tutorials for you or your child.
                </p>
              </div>

              {!assessmentResult ? (
                <div className="space-y-6">
                  {LITERACY_QUESTIONS.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-bronze-50 border border-bronze-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-brand-950 uppercase">{q.topic}</span>
                        <span className="text-bronze-500">Question {idx + 1}/5</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-bronze-950 leading-relaxed">{q.text}</p>

                      <div className="flex items-center justify-between pt-1 gap-2">
                        <span className="text-[10px] text-bronze-500 font-medium shrink-0">Need Help</span>
                        <div className="flex gap-1.5 sm:gap-2">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setAssessmentAnswers({ ...assessmentAnswers, [q.id]: val })}
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                                (assessmentAnswers[q.id] || 3) === val
                                  ? 'bg-brand-500 text-white shadow-sm'
                                  : 'bg-white border border-bronze-200 text-bronze-700 hover:border-brand-400'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                        <span className="text-[10px] text-bronze-500 font-medium shrink-0">Fully Confident</span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleSubmitLiteracyAssessment}
                      className="w-full py-3.5 sm:py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Submit Digital Diagnostic</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Diagnostic Result */
                <div className="space-y-6">
                  <div className="text-center py-4 border-b border-bronze-100 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-brand-50 border border-brand-200 text-brand-600 mx-auto flex items-center justify-center font-heading font-black text-2xl">
                      {assessmentResult.percentage}%
                    </div>
                    <h4 className="text-xl sm:text-2xl font-heading font-bold text-bronze-950">
                      Level: {assessmentResult.level}
                    </h4>
                    <p className="text-xs text-bronze-600 max-w-md mx-auto leading-relaxed">
                      {assessmentResult.feedback}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-bronze-900 uppercase tracking-wider">
                      Recommended Tutorial Walkthroughs
                    </h5>
                    <div className="space-y-2">
                      {assessmentResult.recommendedGuides?.map((guide) => (
                        <div key={guide._id} className="p-3 bg-bronze-50 rounded-xl border border-bronze-200 flex items-center justify-between text-xs gap-3">
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-brand-950 block truncate">{guide.title}</span>
                            <span className="text-bronze-500 block truncate">{guide.category} • {guide.estimatedMinutes} Mins</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const foundIdx = guides.findIndex((g) => g._id === guide._id);
                              if (foundIdx !== -1) setActiveGuideIdx(foundIdx);
                              setShowAssessment(false);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-bold transition-colors cursor-pointer shrink-0"
                          >
                            Open Tutorial
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <button
                      type="button"
                      onClick={() => setAssessmentResult(null)}
                      className="px-6 py-2.5 rounded-xl border border-bronze-300 text-bronze-700 text-xs font-bold hover:bg-bronze-50 transition-colors cursor-pointer"
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