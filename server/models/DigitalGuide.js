const mongoose = require('mongoose');

const digitalGuideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    enum: ['Joining Online Classes', 'Video Conferencing Controls', 'Submitting Assignments', 'Accessing Notes & Drive', 'Online Safety & Etiquette', 'Device & Audio Troubleshooting'],
    required: true 
  },
  targetAudience: { type: String, default: 'Students & Parents' },
  difficulty: { type: String, enum: ['Absolute Beginner', 'Easy', 'Intermediate'], default: 'Absolute Beginner' },
  estimatedMinutes: { type: Number, default: 8 },
  summary: { type: String, required: true },
  steps: [{
    stepNumber: Number,
    title: String,
    instruction: String,
    tip: String,
    actionLabel: String,
    visualType: { type: String, default: 'diagram' } // 'callout', 'dialog', 'diagram'
  }],
  quickQuiz: {
    question: String,
    options: [String],
    correctIndex: Number,
    explanation: String
  }
}, { timestamps: true });

module.exports = mongoose.model('DigitalGuide', digitalGuideSchema);
