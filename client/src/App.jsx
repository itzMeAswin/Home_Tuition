import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingActions from './components/common/FloatingActions';
import DemoBookingModal from './components/common/DemoBookingModal';
import DemoAccountSwitcher from './components/common/DemoAccountSwitcher';

// Pages
import HomePage from './pages/HomePage';
import LearningSpacePage from './pages/LearningSpacePage';
import TutorMatchingPage from './pages/TutorMatchingPage';
import TeacherHubPage from './pages/TeacherHubPage';
import DigitalLiteracyPage from './pages/DigitalLiteracyPage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import TutorsPage from './pages/TutorsPage';
import AchievementsPage from './pages/AchievementsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Dashboards
import StudentDashboard from './pages/dashboards/StudentDashboard';
import ParentDashboard from './pages/dashboards/ParentDashboard';
import TutorDashboard from './pages/dashboards/TutorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

const App = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* Top Navbar */}
      <Navbar onOpenBookingModal={handleOpenBooking} />

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/learning-space" element={<LearningSpacePage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/tutor-matching" element={<TutorMatchingPage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/teacher-hub" element={<TeacherHubPage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/digital-literacy" element={<DigitalLiteracyPage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/courses" element={<CoursesPage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/programs" element={<CoursesPage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/about" element={<AboutPage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/tutors" element={<TutorsPage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/achievements" element={<AchievementsPage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/contact" element={<ContactPage onOpenBookingModal={handleOpenBooking} />} />
          <Route path="/book-demo" element={<ContactPage onOpenBookingModal={handleOpenBooking} />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Role-Specific Dashboards */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/parent" element={<ParentDashboard />} />
          <Route path="/dashboard/tutor" element={<TutorDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Global Booking Modal */}
      <DemoBookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />

      {/* Floating Action Buttons (WhatsApp & Demo Pill) */}
      <FloatingActions onOpenBookingModal={handleOpenBooking} />

      {/* Evaluator 1-Click Role Switcher Drawer */}
      <DemoAccountSwitcher />
    </div>
  );
};

export default App;
