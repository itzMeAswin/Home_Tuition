const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes imports
const authRoutes = require('./routes/authRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const courseRoutes = require('./routes/courseRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const quizRoutes = require('./routes/quizRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const lessonPlanRoutes = require('./routes/lessonPlanRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const digitalGuideRoutes = require('./routes/digitalGuideRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const { seedData } = require('./seed');

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/lesson-plans', lessonPlanRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/digital-guides', digitalGuideRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Health check & info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    institution: 'Online Home Tution Center',
    poweredBy: 'Online Home Tution Center',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Seed endpoint for instant demo reset
app.post('/api/seed', async (req, res) => {
  try {
    await seedData();
    res.json({ message: 'Database successfully seeded with institutional demo records!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to seed database', error: err.message });
  }
});

// Central 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: `API route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Connect to DB and Start Server
const startServer = async () => {
  try {
    await connectDB();

    // Auto seed if empty
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[INIT] Database is empty. Auto-seeding initial data...');
      await seedData();
    }

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 Online Home Tution Center API Server Running`);
      console.log(`📍 Port: http://localhost:${PORT}`);
      console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
