const User = require('../models/User');
const Booking = require('../models/Booking');
const Inquiry = require('../models/Inquiry');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const LessonPlan = require('../models/LessonPlan');
const Assignment = require('../models/Assignment');

// @desc Student Dashboard Summary & Leaderboard
// @route GET /api/dashboard/student
const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user ? req.user._id : null;
    let student = null;
    let quizHistory = [];
    let recentAssignments = [];

    if (studentId) {
      student = await User.findById(studentId);
      quizHistory = await QuizResult.find({ student: studentId }).sort({ completedAt: -1 }).limit(5);
      recentAssignments = await Assignment.find({}).sort({ createdAt: -1 }).limit(3);
    }

    // Weekly Leaderboard (Positive Reinforcement, Display Names & Avatars)
    const topStudents = await User.find({ role: 'student' })
      .select('name displayName points streak avatar badges grade')
      .sort({ points: -1 })
      .limit(10);

    const formattedLeaderboard = topStudents.map((s, index) => ({
      rank: index + 1,
      name: s.displayName || s.name.split(' ')[0] + ' ' + (s.name.split(' ')[1] ? s.name.split(' ')[1][0] + '.' : ''),
      points: s.points,
      streak: s.streak,
      avatar: s.avatar,
      badgeCount: s.badges ? s.badges.length : 0,
      grade: s.grade,
      title: index === 0 ? 'Legendary Scholar' : index < 3 ? 'Master Thinker' : 'Curious Explorer'
    }));

    // Demo upcoming classes
    const upcomingClasses = [
      { id: 1, subject: 'Accountancy', topic: 'Partnership Fundamentals & Goodwill', date: 'Tomorrow, 5:30 PM', tutor: 'Mrs. Lakshmi S.', link: 'https://meet.google.com/demo-tution' },
      { id: 2, subject: 'Economics', topic: 'National Income Measurement & Real GDP', date: 'Friday, 6:00 PM', tutor: 'Mrs. Lakshmi S.', link: 'https://meet.google.com/demo-tution' },
      { id: 3, subject: 'Business Studies', topic: 'Financial Markets & Stock Exchange', date: 'Saturday, 4:00 PM', tutor: 'Mrs. Lakshmi S.', link: 'https://meet.google.com/demo-tution' }
    ];

    res.json({
      student: student ? {
        _id: student._id,
        name: student.name,
        email: student.email,
        grade: student.grade,
        points: student.points,
        streak: student.streak,
        badges: student.badges,
        avatar: student.avatar
      } : null,
      leaderboard: formattedLeaderboard,
      upcomingClasses,
      quizHistory,
      recentAssignments,
      dailyGoal: {
        targetMinutes: 45,
        completedMinutes: 30,
        progressPercent: 67
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student dashboard', error: error.message });
  }
};

// @desc Parent Dashboard
// @route GET /api/dashboard/parent
const getParentDashboard = async (req, res) => {
  try {
    // Child info (demo linked child or first student found)
    const child = await User.findOne({ role: 'student' }).sort({ createdAt: -1 });

    const attendanceRecord = [
      { month: 'September', classesHeld: 16, attended: 15, percentage: '93.7%' },
      { month: 'August', classesHeld: 18, attended: 18, percentage: '100%' },
      { month: 'July', classesHeld: 14, attended: 13, percentage: '92.8%' }
    ];

    const academicPerformances = [
      { subject: 'Accountancy', score: '94/100', status: 'Exceptional Concept Clarity', trend: '+6% this month' },
      { subject: 'Economics', score: '88/100', status: 'Strong Macro Fundamentals', trend: '+4% this month' },
      { subject: 'Business Studies', score: '91/100', status: 'Excellent Case Analysis', trend: '+8% this month' }
    ];

    const tutorNotes = [
      {
        tutorName: 'Mrs. Lakshmi S.',
        date: '28 Sep 2026',
        subject: 'Accountancy',
        comment: 'Consistently demonstrates deep interest in Partnership Accounts. Homework is submitted on time with great neatness.'
      },
      {
        tutorName: 'Mrs. Lakshmi S.',
        date: '20 Sep 2026',
        subject: 'Economics',
        comment: 'Great participation during live doubt resolution. Recommended 2 additional practice sums for National Income formula.'
      }
    ];

    res.json({
      child: child ? {
        name: child.name,
        grade: child.grade,
        curriculum: child.curriculum,
        points: child.points,
        streak: child.streak
      } : { name: 'Aarav Sharma', grade: 'Class 12', curriculum: 'CBSE', points: 340, streak: 5 },
      attendanceRecord,
      academicPerformances,
      tutorNotes,
      overallAttendance: '95.5%',
      weeklyStudyHours: 12
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving parent dashboard' });
  }
};

// @desc Tutor Dashboard
// @route GET /api/dashboard/tutor
const getTutorDashboard = async (req, res) => {
  try {
    const lessonPlansCount = await LessonPlan.countDocuments();
    const studentsCount = await User.countDocuments({ role: 'student' });
    const quizzesCount = await Quiz.countDocuments();

    const upcomingSessions = [
      { time: '4:30 PM - 5:30 PM', studentName: 'Aarav Sharma (Class 12)', subject: 'Accountancy', topic: 'Dissolution of Partnership Firm' },
      { time: '6:00 PM - 7:00 PM', studentName: 'Priya Narayanan (Class 11)', subject: 'Economics', topic: 'Theory of Consumer Behaviour' },
      { time: '7:30 PM - 8:30 PM', studentName: 'Batch 2026 (Class 12)', subject: 'Business Studies', topic: 'Marketing Management Case Studies' }
    ];

    res.json({
      stats: {
        activeStudents: studentsCount || 18,
        totalBatches: 5,
        lessonPlansCreated: lessonPlansCount || 12,
        quizzesConducted: quizzesCount || 8,
        teachingHoursThisMonth: 42
      },
      upcomingSessions,
      recentLessonPlans: await LessonPlan.find({}).sort({ createdAt: -1 }).limit(4)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tutor dashboard' });
  }
};

// @desc Admin Dashboard Comprehensive Stats
// @route GET /api/dashboard/admin
const getAdminDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalParents = await User.countDocuments({ role: 'parent' });
    const totalTutors = await User.countDocuments({ role: 'tutor' });
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' });
    const totalInquiries = await Inquiry.countDocuments();
    const totalCourses = await Course.countDocuments();

    const recentBookings = await Booking.find({}).sort({ createdAt: -1 }).limit(5);
    const recentInquiries = await Inquiry.find({}).sort({ createdAt: -1 }).limit(5);
    const recentUsers = await User.find({}).select('-password').sort({ createdAt: -1 }).limit(5);

    res.json({
      metrics: {
        totalStudents,
        totalParents,
        totalTutors,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalInquiries,
        totalCourses
      },
      recentBookings,
      recentInquiries,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving admin dashboard', error: error.message });
  }
};

module.exports = { getStudentDashboard, getParentDashboard, getTutorDashboard, getAdminDashboard };
