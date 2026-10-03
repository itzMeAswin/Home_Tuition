const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  photo: { type: String, default: '' },
  qualification: { type: String, required: true },
  experienceYears: { type: Number, default: 5 },
  bio: { type: String, required: true },
  teachingPhilosophy: { type: String, default: '' },
  teachingStyle: { type: String, default: 'Concept-Oriented & Interactive' },
  subjects: [{ type: String, required: true }],
  grades: [{ type: String, required: true }],
  curriculums: [{ type: String, default: 'CBSE' }],
  languages: [{ type: String, default: 'English' }],
  timingOptions: [{ type: String }], // 'Morning (6:00 - 9:00 AM)', 'Evening (5:00 - 9:00 PM)'
  learningDifficultiesHandled: [{ type: String }], // 'Concept Building', 'Problem Solving', 'Exam Revision', 'Basic Foundations'
  rating: { type: Number, default: 4.9 },
  studentsTaught: { type: Number, default: 120 },
  isFounder: { type: Boolean, default: false },
  youtubeUrl: { type: String, default: '' },
  badge: { type: String, default: 'Top Rated Tutor' },
}, { timestamps: true });

module.exports = mongoose.model('Tutor', tutorSchema);
