const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  category: { type: String, default: 'Commerce & High School' },
  grades: [{ type: String, required: true }], // e.g. 'Class 11', 'Class 12', 'CA/CMA Foundation'
  curriculum: [{ type: String, default: 'CBSE' }], // 'CBSE', 'State Board', 'Foundation'
  mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], default: 'Online' },
  description: { type: String, required: true },
  highlights: [{ type: String }],
  learningOutcomes: [{ type: String }],
  syllabus: [{
    unit: { type: String },
    topics: [{ type: String }]
  }],
  duration: { type: String, default: 'Full Academic Year / Crash Course' },
  sessionsPerWeek: { type: String, default: '3 - 5 Sessions' },
  batchSize: { type: String, default: '1-on-1 Personalized & Small Groups (Max 5)' },
  tutorName: { type: String, default: 'Mrs. Sandhya Subbaraman' },
  image: { type: String, default: '' },
  isFeatured: { type: Boolean, default: true },
  enrollmentOpen: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
