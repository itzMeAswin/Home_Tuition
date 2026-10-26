const mongoose = require('mongoose');

const lessonPlanSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tutorName: { type: String, default: 'Educator' },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  topic: { type: String, required: true },
  durationMinutes: { type: Number, default: 60 },
  learningObjective: { type: String, required: true },
  teachingMethod: { 
    type: String, 
    default: 'Interactive Lecture & Discussion' 
  },
  activities: [{
    time: String,
    title: String,
    description: String
  }],
  materialsNeeded: [{ type: String }],
  assessmentMethod: { type: String, default: 'Exit Ticket Quiz' }, // e.g. 'Exit Ticket Quiz', 'Live Problem Solving', 'Peer Review'
  homeworkAssignment: { type: String, default: '' },
  reflectionNotes: { type: String, default: '' },
  isPublicTemplate: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('LessonPlan', lessonPlanSchema);
