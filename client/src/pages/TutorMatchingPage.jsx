import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Sparkles, CheckCircle2, Star, Clock, 
  BookOpen, Globe, ArrowRight, RotateCcw, User, Phone, 
  Calendar, Award, MessageCircle, ShieldCheck, ChevronRight 
} from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import UserAvatar from '../components/common/UserAvatar';

const QUESTIONS = [
  {
    key: 'grade',
    title: '1. Which Class or Educational Level?',
    subtitle: 'Select the current academic grade for customized syllabus matching',
    options: [
      'Class 12 (Board Prep)',
      'Class 11 (Foundations)',
      'Class 10',
      'Class 9',
      'CA/CMA Foundation',
      'UG/PG Commerce',
      'NET/SET Commerce'
    ]
  },
  {
    key: 'subject',
    title: '2. Which Primary Subject do you need mentorship in?',
    subtitle: 'We match you with verified educators who specialize in your subject',
    options: [
      'Accountancy',
      'Economics',
      'Business Studies',
      'Commerce (All Subjects)',
      'Mathematics',
      'Science',
      'CA/CMA Foundation'
    ]
  },
  {
    key: 'curriculum',
    title: '3. Which Curriculum or Board?',
    subtitle: 'Ensures the tutor is aligned with textbook patterns and question schemes',
    options: [
      'CBSE',
      'State Board',
      'ICSE / ISC',
      'Professional Foundation (ICAI/ICMAI)'
    ]
  },
  {
    key: 'language',
    title: '4. What is your Preferred Teaching Language?',
    subtitle: 'Choose the medium of instruction for optimal comfort and clarity',
    options: [
      'English Medium',
      'Tamil Medium',
      'Bilingual (English + Tamil Blend)'
    ]
  },
  {
    key: 'difficulty',
    title: '5. What is the primary Learning Need or Difficulty?',
    subtitle: 'Helps us recommend educators with the most suitable teaching methodology',
    options: [
      'Concept Building (Starting from basics)',
      'Board Exam Revision & Past Papers',
      'Problem Solving Speed & Numerical Accuracy',
      'Scoring 95%+ / Centum Excellence'
    ]
  },
  {
    key: 'timing',
    title: '6. What is your Preferred Class Timing?',
    subtitle: 'We check educator availability schedules matching your routine',
    options: [
      'Morning (6:00 - 9:00 AM)',
      'Evening (5:00 - 9:00 PM)',
      'Weekends (Saturday & Sunday)'
    ]
  }
];

const TutorMatchingPage = ({ onOpenBookingModal }) => {
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    grade: '',
    subject: '',
    curriculum: '',
    language: '',
    difficulty: '',
    timing: ''
  });
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(null);

  const handleSelectOption = (key, option) => {
    const updated = { ...answers, [key]: option };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step answered, run match
      runMatching(updated);
    }
  };

  const runMatching = async (formAnswers) => {
    setLoading(true);
    try {
      const res = await api.post('/tutors/match', formAnswers);
      setMatches(res.data);
      addToast(`Found ${res.data.totalMatches} matched tutors!`, 'success');
    } catch (err) {
      addToast('Error matching tutors. Please retry.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnswers({
      grade: '',
      subject: '',
      curriculum: '',
      language: '',
      difficulty: '',
      timing: ''
    });
    setCurrentStep(0);
    setMatches(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-bronze-950 via-bronze-900 to-brand-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-amber-400" /> AI-Assisted Pedagogy Matching
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
            SMART TUTOR MATCHING
          </h1>
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Answer 6 fast questions to discover educators tailored to your grade, syllabus, language, and specific learning hurdles.
          </p>
        </div>
      </section>

      {/* Main Questionnaire or Results */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {!matches ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-brand-200 space-y-8">
            {/* Step Progress Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                <span>Step {currentStep + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Completed</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-bronze-950">
                    {QUESTIONS[currentStep].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    {QUESTIONS[currentStep].subtitle}
                  </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {QUESTIONS[currentStep].options.map((option, idx) => {
                    const isSelected = answers[QUESTIONS[currentStep].key] === option;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(QUESTIONS[currentStep].key, option)}
                        className={`p-4 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                          isSelected
                            ? 'bg-brand-50 border-brand-500 font-bold ring-2 ring-brand-400/20'
                            : 'border-stone-200 hover:border-brand-400 hover:bg-[#FAF8F5] bg-white'
                        }`}
                      >
                        <span className="text-sm font-medium text-bronze-950">{option}</span>
                        <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stepper Navigation Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-stone-100">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50 disabled:opacity-30 cursor-pointer"
              >
                Back
              </button>

              <button
                onClick={handleReset}
                className="text-xs font-semibold text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                Reset Answers
              </button>
            </div>
          </div>
        ) : (
          /* Matched Tutors Display */
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  ✓ Matched Profile
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-bronze-950 mt-1">
                  Recommended Educators for You
                </h3>
                <p className="text-xs text-stone-500">
                  Targeting {answers.subject} ({answers.grade} • {answers.curriculum})
                </p>
              </div>

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl border border-stone-300 hover:border-brand-500 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Adjust Criteria</span>
              </button>
            </div>

            {/* Tutor Cards List */}
            <div className="space-y-6">
              {matches.topMatches.map(({ tutor, matchPercentage, matchReasons }, idx) => (
                <div
                  key={tutor._id || idx}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-brand-200 hover:border-brand-400 transition-all space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <UserAvatar
                        name={tutor.name}
                        role="tutor"
                        size="xl"
                        className="border-2 border-brand-300 shadow-md shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl font-heading font-bold text-bronze-950">
                            {tutor.name}
                          </h4>
                          {tutor.isFounder && (
                            <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-900 text-[10px] font-bold">
                              Founder
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-brand-700">
                          {tutor.qualification}
                        </p>
                        <p className="text-xs text-stone-500">
                          {tutor.experienceYears}+ Years Teaching Experience • {tutor.studentsTaught}+ Students Guided
                        </p>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold pt-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{tutor.rating} / 5.0 Rating</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="text-left sm:text-right p-3 rounded-2xl bg-brand-50/80 border border-brand-200 shrink-0">
                      <span className="text-[10px] font-bold uppercase text-stone-500 block">Match Score</span>
                      <span className="text-2xl font-heading font-black text-brand-700">
                        {matchPercentage}%
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold block">Highly Recommended</span>
                    </div>
                  </div>

                  {/* Bio & Teaching Philosophy */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200">
                    "{tutor.bio}"
                  </p>

                  {/* Why this tutor matches */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-bronze-800">
                      Why this tutor is your best match:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {matchReasons.map((reason, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Subjects & Timing Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 pt-2 border-t border-stone-100">
                    <div>
                      <span className="font-bold text-bronze-900 block mb-1">Subjects Handled:</span>
                      <span>{tutor.subjects.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-bold text-bronze-900 block mb-1">Teaching Style:</span>
                      <span>{tutor.teachingStyle}</span>
                    </div>
                  </div>

                  {/* Booking CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={onOpenBookingModal}
                      className="w-full sm:w-auto flex-1 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Book Free Demo with {tutor.name.split(' ')[1] || tutor.name}</span>
                    </button>

                    <a
                      href="tel:+919345793979"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-stone-300 hover:border-brand-500 text-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <Phone className="w-4 h-4 text-brand-600" />
                      <span>Direct Counselor Call</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorMatchingPage;
