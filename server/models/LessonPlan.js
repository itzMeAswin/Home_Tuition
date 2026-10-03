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
    enum: ['Interactive Lecture & Discussion', 'Inquiry-Based Learning', 'Case Study & Problem Solving', 'Flipped Classroom', 'Socratic Questioning', 'Scaffolded Guided Practice'],
    default: 'Interactive Lecture & Discussion' 
  },
  activities: [{
    time: String,
    title: String,
    description: String
  }],
  materialsNeeded: [{ type: String }],
  assessmentMethod: { type: String, required: true }, // e.g. 'Exit Ticket Quiz', 'Live Problem Solving', 'Peer Review'
  homeworkAssignment: { type: String, default: '' },
  reflectionNotes: { type: String, default: '' },
  isPublicTemplate: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('LessonPlan', lessonPlanSchema);
