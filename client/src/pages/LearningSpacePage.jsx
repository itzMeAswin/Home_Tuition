import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Trophy, Award, Zap, BookOpen, Clock, CheckCircle2, 
  XCircle, ChevronRight, RotateCcw, Sparkles, User, Star, 
  ArrowRight, Lightbulb, Shield, HelpCircle, Layers, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import UserAvatar from '../components/common/UserAvatar';

const BADGE_DEFINITIONS = [
  { id: 'first_step', name: 'First Step', icon: 'Footprints', description: 'Joined the Online Home Tution Center family!' },
  { id: 'quick_learner', name: 'Quick Learner', icon: 'Zap', description: 'Completed your first knowledge verification quiz!' },
  { id: 'consistent_star', name: 'Consistent Star', icon: 'Flame', description: 'Maintained a 3-day active learning streak!' },
  { id: 'quiz_champion', name: 'Quiz Champion', icon: 'Trophy', description: 'Scored 80%+ in an academic quiz evaluation!' },
  { id: 'weekly_achiever', name: 'Weekly Achiever', icon: 'Star', description: 'Solved daily challenges throughout the week!' },
  { id: 'learning_master', name: 'Learning Master', icon: 'Crown', description: 'Mastered all core concept assessments!' },
];

const LearningSpacePage = () => {
  const { user, role, claimBadge, setUser } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'daily', 'quiz', 'leaderboard'
  
  // Dashboard & Leaderboard state
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Daily Challenge state
  const [challenge, setChallenge] = useState(null);
  const [selectedChallengeOption, setSelectedChallengeOption] = useState(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengeResult, setChallengeResult] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // Quiz state
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userQuizAnswers, setUserQuizAnswers] = useState([]); // [{ index, selectedOption }]
  const [quizTimer, setQuizTimer] = useState(600); // 10 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [quizFilterSubject, setQuizFilterSubject] = useState('All');

  // Load Dashboard Data
  const loadDashboard = async () => {
    try {
      const res = await api.get('/dashboard/student');
      setDashboardData(res.data);
    } catch (err) {
      console.error('Error loading student dashboard:', err);
    }
  };

  // Load Daily Challenge
  const loadDailyChallenge = async () => {
    try {
      const res = await api.get('/challenges/today');
      setChallenge(res.data);
      if (res.data.hasCompleted) {
        setChallengeSubmitted(true);
        setChallengeResult(res.data.previousSubmission);
      }
    } catch (err) {
      console.error('Error loading daily challenge:', err);
    }
  };

  // Load Quizzes
  const loadQuizzes = async () => {
    try {
      const res = await api.get('/quizzes');
      setQuizzes(res.data);
    } catch (err) {
      console.error('Error loading quizzes:', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([loadDashboard(), loadDailyChallenge(), loadQuizzes()]);
      setLoading(false);
    };
    init();
  }, []);

  // Timer countdown for active quiz
  useEffect(() => {
    if (!activeQuiz || quizSubmitted) return;
    if (quizTimer <= 0) {
      handleSubmitQuiz();
      return;
    }
    const interval = setInterval(() => {
      setQuizTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeQuiz, quizTimer, quizSubmitted]);

  // Handle Challenge Submission
  const handleSubmitChallenge = async () => {
    if (selectedChallengeOption === null) {
      addToast('Please pick an answer option', 'info');
      return;
    }
    try {
      const res = await api.post('/challenges/submit', {
        challengeId: challenge._id,
        selectedOption: selectedChallengeOption,
      });

      setChallengeSubmitted(true);
      setChallengeResult(res.data);

      if (res.data.isCorrect) {
        addToast(`Bravo! +${res.data.pointsAwarded} points added!`, 'success');
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        } catch (e) {}
      } else {
        addToast('Good attempt! You earned participation points.', 'info');
      }

      await loadDashboard();
    } catch (error) {
      if (error.response?.data?.alreadyCompleted) {
        setChallengeSubmitted(true);
        setChallengeResult(error.response.data.submission);
        addToast('You already completed today\'s challenge!', 'info');
      } else {
        addToast(error.response?.data?.message || 'Login to record daily challenge', 'error');
      }
    }
  };

  // Start a Quiz
  const handleStartQuiz = async (quizId) => {
    try {
      const res = await api.get(`/quizzes/${quizId}`);
      setActiveQuiz(res.data);
      setCurrentQuestionIdx(0);
      setUserQuizAnswers([]);
      setQuizTimer((res.data.timeLimitMinutes || 10) * 60);
      setQuizSubmitted(false);
      setQuizResult(null);
    } catch (err) {
      addToast('Failed to load quiz details', 'error');
    }
  };

  // Record an answer for active question
  const handleSelectQuizAnswer = (optionIdx) => {
    const existing = userQuizAnswers.filter((a) => a.index !== currentQuestionIdx);
    setUserQuizAnswers([...existing, { index: currentQuestionIdx, selectedOption: optionIdx }]);
  };

  // Submit Quiz
  const handleSubmitQuiz = async () => {
    if (!activeQuiz) return;
    try {
      const res = await api.post(`/quizzes/${activeQuiz._id}/submit`, {
        userAnswers: userQuizAnswers,
        studentId: user?._id,
      });

      setQuizResult(res.data);
      setQuizSubmitted(true);
      addToast(`Quiz Complete! Scored ${res.data.score}/${res.data.totalQuestions}`, 'success');

      if (res.data.badgeAwarded) {
        addToast(`🎉 Unlocked Badge: ${res.data.badgeAwarded}!`, 'success');
      }

      try {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}

      await loadDashboard();
    } catch (err) {
      addToast('Error grading quiz answers', 'error');
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const studentPoints = user?.points || dashboardData?.student?.points || 480;
  const studentStreak = user?.streak || dashboardData?.student?.streak || 5;
  const unlockedBadges = user?.badges || dashboardData?.student?.badges || [];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Top Banner */}
      <section className="bg-gradient-to-r from-bronze-950 via-bronze-900 to-brand-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Interactive Student Zone
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
                MY LEARNING SPACE
              </h1>
              <p className="text-stone-300 text-sm max-w-xl">
                Welcome back{user ? `, ${user.name}` : ''}! Solve daily puzzles, test your knowledge with instant quizzes, build your streak, and unlock academic badges.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-bold">
                  <Flame className="w-4 h-4 fill-current animate-pulse" />
                  <span>Streak</span>
                </div>
                <p className="text-2xl font-heading font-black text-white">{studentStreak} Days</p>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="flex items-center justify-center gap-1.5 text-brand-400 text-xs font-bold">
                  <Trophy className="w-4 h-4" />
                  <span>Points</span>
                </div>
                <p className="text-2xl font-heading font-black text-white">{studentPoints}</p>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center hidden sm:block">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <Award className="w-4 h-4" />
                  <span>Badges</span>
                </div>
                <p className="text-2xl font-heading font-black text-white">{unlockedBadges.length} / 6</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => { setActiveTab('overview'); setActiveQuiz(null); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'overview' && !activeQuiz
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Overview & Badges</span>
            </button>

            <button
              onClick={() => { setActiveTab('daily'); setActiveQuiz(null); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'daily'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Daily Challenge</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-bold">Today</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Interactive Quizzes</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-bold">{quizzes.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('leaderboard'); setActiveQuiz(null); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'leaderboard'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Friendly Leaderboard</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Container Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* TAB 1: OVERVIEW & BADGES GALLERY */}
        {activeTab === 'overview' && !activeQuiz && (
          <div className="space-y-8">
            {/* Daily Goal & Streak Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily Learning Goal Card */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base text-bronze-950 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-600" /> Daily Learning Goal
                  </h3>
                  <span className="text-xs font-bold text-brand-700">30 / 45 Mins</span>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-500 to-amber-500 h-full w-2/3 rounded-full"></div>
                  </div>
                  <p className="text-xs text-stone-500">
                    Keep going! 15 more minutes of interactive practice will complete your daily goal and extend your streak!
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-100">
                  <span className="text-stone-600">Streak Shield:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> Protected for Today
                  </span>
                </div>
              </div>

              {/* Upcoming Live Classes Card */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 space-y-4 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base text-bronze-950 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-600" /> Upcoming Live Classes & Schedule
                  </h3>
                  <span className="text-xs text-stone-500">Aksharas Live Portal</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {dashboardData?.upcomingClasses?.map((cls) => (
                    <div key={cls.id} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-brand-800 uppercase tracking-wide">
                          {cls.subject}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      </div>
                      <p className="text-xs font-bold text-bronze-950 line-clamp-1">{cls.topic}</p>
                      <p className="text-[11px] text-stone-500">{cls.date}</p>
                      <a
                        href={cls.link}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center gap-1 mt-1 transition"
                      >
                        <span>Join Live Class</span>
                        <ArrowRight className="w-3 h-3 text-brand-600" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievement Badges Gallery */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-brand-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="font-heading font-bold text-xl text-bronze-950 flex items-center gap-2">
                    <Award className="w-5 h-5 text-brand-600" /> Achievement Badges & Milestones
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Earn permanent recognition for quiz scores, daily challenges, and consistent study habits.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
                  Progress: {unlockedBadges.length} of 6 Unlocked
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-500 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(unlockedBadges.length / 6) * 100}%` }}
                ></div>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {BADGE_DEFINITIONS.map((badge) => {
                  const isUnlocked = unlockedBadges.some((b) => b.id === badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        isUnlocked
                          ? 'bg-gradient-to-b from-brand-50/80 to-white border-brand-300 shadow-md ring-2 ring-brand-400/20'
                          : 'bg-stone-50/60 border-stone-200 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl shadow-sm ${
                          isUnlocked
                            ? 'bg-gradient-to-br from-brand-500 to-amber-600 text-white'
                            : 'bg-stone-200 text-stone-400'
                        }`}
                      >
                        {badge.id === 'first_step' && '👣'}
                        {badge.id === 'quick_learner' && '⚡'}
                        {badge.id === 'consistent_star' && '🔥'}
                        {badge.id === 'quiz_champion' && '🏆'}
                        {badge.id === 'weekly_achiever' && '⭐'}
                        {badge.id === 'learning_master' && '👑'}
                      </div>
                      <h4 className="text-xs font-bold text-bronze-950 mb-1">{badge.name}</h4>
                      <p className="text-[10px] text-stone-500 leading-tight">{badge.description}</p>
                      <div className="mt-2">
                        {isUnlocked ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                            <CheckCircle2 className="w-3 h-3" /> Unlocked
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400 font-medium">Locked</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => setActiveTab('daily')}
                className="bg-gradient-to-br from-amber-500 to-brand-600 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-transform"
              >
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase">
                    Daily Boost
                  </span>
                  <h3 className="text-xl font-heading font-extrabold">Solve Today's Learning Challenge</h3>
                  <p className="text-xs text-amber-100 max-w-sm">
                    Keep your 5-day streak alive and win up to 30 learning points!
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('quiz')}
                className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-transform"
              >
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase">
                    Knowledge Test
                  </span>
                  <h3 className="text-xl font-heading font-extrabold">Take an Interactive Quiz</h3>
                  <p className="text-xs text-purple-200 max-w-sm">
                    Timed quizzes with immediate explanations and topic analysis.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DAILY LEARNING CHALLENGE */}
        {activeTab === 'daily' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-200 space-y-6">
              {challenge ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-stone-100">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                        {challenge.category}
                      </span>
                      <h3 className="text-2xl font-heading font-extrabold text-bronze-950 mt-2">
                        {challenge.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Challenge for {challenge.dateString} • {challenge.participantsCount} students participated
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-3.5 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-center">
                        <span className="text-[10px] font-semibold block text-stone-500">Reward</span>
                        <span className="text-base font-black text-amber-700">+{challenge.points} Pts</span>
                      </div>
                    </div>
                  </div>

                  {/* Question Box */}
                  <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 text-bronze-950 font-medium text-base leading-relaxed">
                    {challenge.question}
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {challenge.options.map((option, idx) => {
                      const isSelected = selectedChallengeOption === idx;
                      const hasSubmitted = challengeSubmitted;
                      let optionStyle = 'border-stone-200 hover:border-brand-400 bg-white';

                      if (hasSubmitted) {
                        if (idx === challengeResult?.correctIndex) {
                          optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isSelected && !challengeResult?.isCorrect) {
                          optionStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                        } else {
                          optionStyle = 'opacity-60 border-stone-200 bg-stone-50';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-brand-50 border-brand-500 font-bold ring-2 ring-brand-400/20';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={challengeSubmitted}
                          onClick={() => setSelectedChallengeOption(idx)}
                          className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center font-bold text-xs text-stone-600">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-sm">{option}</span>
                          </div>
                          {hasSubmitted && idx === challengeResult?.correctIndex && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          )}
                          {hasSubmitted && isSelected && !challengeResult?.isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Hint Toggle */}
                  {challenge.hint && !challengeSubmitted && (
                    <div className="pt-1">
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>{showHint ? 'Hide Helpful Hint' : 'Need a hint? Click here'}</span>
                      </button>
                      {showHint && (
                        <p className="mt-2 p-3 bg-amber-50/80 rounded-xl text-xs text-amber-900 border border-amber-200 italic">
                          💡 Hint: {challenge.hint}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Result & Explanation */}
                  {challengeSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-2xl bg-brand-50/70 border border-brand-200 space-y-2"
                    >
                      <h4 className="text-sm font-bold text-bronze-950 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-600" /> Explanation & Solution:
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {challengeResult?.explanation || challenge.explanation}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  {!challengeSubmitted ? (
                    <div className="pt-4">
                      <button
                        onClick={handleSubmitChallenge}
                        disabled={selectedChallengeOption === null}
                        className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer ${
                          selectedChallengeOption === null
                            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-amber-500 to-brand-600 hover:from-amber-600 hover:to-brand-700 text-white shadow-amber-500/25'
                        }`}
                      >
                        <Zap className="w-4 h-4" />
                        <span>Submit Answer & Claim Points</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-900 font-bold">
                      ✓ Today's challenge recorded! Come back tomorrow for the next challenge.
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-stone-500">Loading daily challenge...</div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: INTERACTIVE QUIZZES MODULE */}
        {activeTab === 'quiz' && (
          <div className="space-y-8">
            {!activeQuiz ? (
              /* Quiz Selection Gallery */
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-bronze-950">
                      Subject-Wise Academic Quizzes
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Timed evaluations aligned with CBSE & Board Exam syllabi with immediate step-by-step solutions.
                    </p>
                  </div>

                  {/* Subject Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-stone-600">Subject:</span>
                    <select
                      value={quizFilterSubject}
                      onChange={(e) => setQuizFilterSubject(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold bg-white outline-none"
                    >
                      <option value="All">All Subjects</option>
                      <option value="Accountancy">Accountancy</option>
                      <option value="Economics">Economics</option>
                      <option value="Mathematics">Mathematics</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quizzes
                    .filter((q) => quizFilterSubject === 'All' || q.subject.includes(quizFilterSubject))
                    .map((quiz) => (
                      <div
                        key={quiz._id}
                        className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 hover:border-brand-400 hover:shadow-xl transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-bold">
                              {quiz.subject}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-semibold">
                              {quiz.grade}
                            </span>
                          </div>

                          <h4 className="font-heading font-bold text-lg text-bronze-950 leading-snug">
                            {quiz.title}
                          </h4>

                          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                            {quiz.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-stone-500 pt-2 border-t border-stone-100">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-stone-400" /> {quiz.timeLimitMinutes} Mins
                            </span>
                            <span className="flex items-center gap-1">
                              <Trophy className="w-3.5 h-3.5 text-amber-500" /> +{quiz.pointsAwarded} Pts
                            </span>
                            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                              {quiz.difficulty}
                            </span>
                          </div>
                        </div>

                        <div className="pt-6">
                          <button
                            onClick={() => handleStartQuiz(quiz._id)}
                            className="w-full py-3 rounded-xl bg-bronze-900 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                          >
                            <span>Start Timed Quiz</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : !quizSubmitted ? (
              /* Active Quiz Live Interface */
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-200 space-y-6">
                  {/* Quiz Live Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                    <div>
                      <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                        {activeQuiz.subject} • {activeQuiz.grade}
                      </span>
                      <h3 className="text-xl font-heading font-extrabold text-bronze-950 mt-0.5">
                        {activeQuiz.title}
                      </h3>
                    </div>

                    {/* Countdown Timer */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 font-mono font-bold text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{formatTimer(quizTimer)}</span>
                    </div>
                  </div>

                  {/* Question Stepper Indicator */}
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}</span>
                    <span>{Math.round(((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100)}% Progress</span>
                  </div>

                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-500 h-full rounded-full transition-all"
                      style={{ width: `${((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100}%` }}
                    ></div>
                  </div>

                  {/* Question Card */}
                  <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                      Topic: {activeQuiz.questions[currentQuestionIdx].topic}
                    </span>
                    <h4 className="text-base font-bold text-bronze-950 leading-relaxed">
                      {activeQuiz.questions[currentQuestionIdx].questionText}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {activeQuiz.questions[currentQuestionIdx].options.map((option, optIdx) => {
                      const recorded = userQuizAnswers.find((a) => a.index === currentQuestionIdx);
                      const isSelected = recorded?.selectedOption === optIdx;

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizAnswer(optIdx)}
                          className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-400/20 font-bold'
                              : 'border-stone-200 hover:border-brand-400 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center font-bold text-xs text-stone-700">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="text-sm">{option}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Stepper Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <button
                      disabled={currentQuestionIdx === 0}
                      onClick={() => setCurrentQuestionIdx((prev) => prev - 1)}
                      className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50 disabled:opacity-40 cursor-pointer"
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setActiveQuiz(null); }}
                        className="px-4 py-2.5 text-xs text-stone-500 hover:text-stone-800 font-semibold"
                      >
                        Exit Quiz
                      </button>

                      {currentQuestionIdx < activeQuiz.questions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                          className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition cursor-pointer"
                        >
                          Next Question
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmitQuiz}
                          className="px-7 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition cursor-pointer"
                        >
                          Submit & View Results
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Quiz Performance & Topic-Wise Evaluation Summary */
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-200 space-y-6">
                  {/* Header Score Display */}
                  <div className="text-center py-4 border-b border-stone-100 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 mx-auto flex items-center justify-center font-heading font-black text-2xl">
                      {quizResult.percentage}%
                    </div>
                    <h3 className="text-2xl font-heading font-extrabold text-bronze-950">
                      Performance Summary
                    </h3>
                    <p className="text-xs text-stone-500">
                      Evaluation for {quizResult.quizTitle} ({quizResult.subject})
                    </p>

                    <div className="flex justify-center items-center gap-6 pt-2">
                      <div className="text-center">
                        <span className="text-xs text-stone-500">Score</span>
                        <p className="text-lg font-bold text-bronze-950">
                          {quizResult.score} / {quizResult.totalQuestions}
                        </p>
                      </div>
                      <div className="w-px h-8 bg-stone-200"></div>
                      <div className="text-center">
                        <span className="text-xs text-stone-500">Correct</span>
                        <p className="text-lg font-bold text-emerald-600">{quizResult.correctCount}</p>
                      </div>
                      <div className="w-px h-8 bg-stone-200"></div>
                      <div className="text-center">
                        <span className="text-xs text-stone-500">Points Won</span>
                        <p className="text-lg font-bold text-amber-600">+{quizResult.pointsEarned}</p>
                      </div>
                    </div>
                  </div>

                  {/* Topic-Wise Performance Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-bronze-950 uppercase tracking-wider">
                      Topic-Wise Performance Breakdown
                    </h4>
                    <div className="space-y-2.5">
                      {quizResult.topicPerformance.map((topic, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-bronze-950">{topic.topic}</p>
                            <p className="text-[10px] text-stone-500">
                              {topic.correct} of {topic.total} questions answered correctly
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              topic.status === 'Mastered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : topic.status === 'Good'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {topic.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Topics to Improve */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                    <h5 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" /> Focus Revision Areas:
                    </h5>
                    <ul className="text-xs text-amber-800 list-disc list-inside space-y-1">
                      {quizResult.recommendedTopics.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Question Explanations Accordion */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-bold text-bronze-950 uppercase tracking-wider">
                      Question Explanations & Key Insights
                    </h4>
                    <div className="space-y-3">
                      {quizResult.detailedAnswers.map((ans, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-stone-700">Question {idx + 1}:</span>
                            {ans.isCorrect ? (
                              <span className="text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1)
                              </span>
                            ) : (
                              <span className="text-rose-600 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" /> Needs Review
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-bronze-900">{ans.questionText}</p>
                          <p className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                            <strong>Explanation:</strong> {ans.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Retry or Choose another */}
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <button
                      onClick={() => handleStartQuiz(activeQuiz._id)}
                      className="flex-1 py-3 rounded-xl border border-stone-300 hover:border-brand-500 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retry This Quiz</span>
                    </button>

                    <button
                      onClick={() => setActiveQuiz(null)}
                      className="flex-1 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <span>Explore More Quizzes</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FRIENDLY STUDENT LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-200 space-y-6">
              <div className="text-center space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Positive Reinforcement
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-bronze-950">
                  Weekly Learning Leaderboard
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Celebrating effort, curiosity, and consistency. Ranks are based on weekly challenge completions and quiz points.
                </p>
              </div>

              {/* Leaderboard Table / Cards */}
              <div className="space-y-3">
                {dashboardData?.leaderboard?.map((item) => {
                  const isTop3 = item.rank <= 3;
                  return (
                    <div
                      key={item.rank}
                      className={`p-4 rounded-2xl border flex items-center justify-between transition ${
                        item.rank === 1
                          ? 'bg-gradient-to-r from-amber-50 to-brand-50/80 border-amber-300 shadow-sm'
                          : item.rank === 2
                          ? 'bg-stone-50 border-stone-300'
                          : item.rank === 3
                          ? 'bg-[#FAF8F5] border-amber-200'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-heading font-black text-xs ${
                            item.rank === 1
                              ? 'bg-amber-500 text-white'
                              : item.rank === 2
                              ? 'bg-stone-400 text-white'
                              : item.rank === 3
                              ? 'bg-amber-700 text-white'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {item.rank}
                        </div>

                        <UserAvatar
                          name={item.name}
                          role="student"
                          size="md"
                        />

                        <div>
                          <p className="text-sm font-bold text-bronze-950 flex items-center gap-1.5">
                            <span>{item.name}</span>
                            {item.rank === 1 && <Trophy className="w-3.5 h-3.5 text-amber-500" />}
                          </p>
                          <p className="text-[11px] text-brand-700 font-semibold">{item.title}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <p className="text-xs font-bold text-stone-500 flex items-center gap-1 justify-end">
                            <Flame className="w-3 h-3 text-amber-500" /> {item.streak}d Streak
                          </p>
                          <p className="text-sm font-black text-bronze-950">{item.points} Pts</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-center text-xs text-stone-600">
                🔒 Student privacy is preserved. Avatars and display names are used to keep competition fun and encouraging.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningSpacePage;
