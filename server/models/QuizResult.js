const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  quizTitle: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctCount: { type: Number, required: true },
  incorrectCount: { type: Number, required: true },
  percentage: { type: Number, required: true },
  pointsEarned: { type: Number, default: 0 },
  answers: [{
    questionIndex: Number,
    selectedOption: Number,
    correctOption: Number,
    isCorrect: Boolean,
    topic: String
  }],
  topicPerformance: [{
    topic: String,
    total: Number,
    correct: Number,
    status: String // 'Needs Review', 'Good', 'Mastered'
  }],
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('QuizResult', quizResultSchema);
