const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  topic: { type: String, default: 'General' },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  timeLimitMinutes: { type: Number, default: 10 },
  pointsAwarded: { type: Number, default: 50 },
  description: { type: String, default: '' },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctIndex: { type: Number, required: true },
    explanation: { type: String, required: true },
    topic: { type: String, default: 'Core Concept' }
  }],
  totalQuestions: { type: Number, default: 5 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
