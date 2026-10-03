const mongoose = require('mongoose');

const trainingModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    enum: ['Active Learning', 'Modern Pedagogy', 'Formative Assessment', 'Digital Literacy', 'Student Psychology', 'Lesson Architecture'],
    required: true 
  },
  description: { type: String, required: true },
  level: { type: String, enum: ['Foundational', 'Intermediate', 'Master'], default: 'Foundational' },
  durationMinutes: { type: Number, default: 30 },
  instructor: { type: String, default: 'Academic Pedagogy Directorate' },
  icon: { type: String, default: 'GraduationCap' },
  keyTakeaways: [{ type: String }],
  steps: [{
    order: Number,
    stepTitle: String,
    content: String,
    practicalTip: String
  }],
  checkQuestions: [{
    questionText: String,
    options: [String],
    correctIndex: Number,
    explanation: String
  }],
  badgeEarned: { type: String, default: 'Pedagogical Excellence' }
}, { timestamps: true });

module.exports = mongoose.model('TrainingModule', trainingModuleSchema);
