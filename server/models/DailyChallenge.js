const mongoose = require('mongoose');

const dailyChallengeSchema = new mongoose.Schema({
  dateString: { type: String, required: true, unique: true }, // e.g. "2026-10-01"
  dayNumber: { type: Number, default: 1 },
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Mathematics', 'Science', 'Commerce & Economics', 'Logical Reasoning', 'English & Vocabulary', 'General Knowledge'],
    required: true 
  },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  hint: { type: String, default: '' },
  explanation: { type: String, required: true },
  points: { type: Number, default: 25 },
  participantsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('DailyChallenge', dailyChallengeSchema);
