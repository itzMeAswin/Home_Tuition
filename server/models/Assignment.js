const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  tutorName: { type: String, default: 'Mrs. Lakshmi S.' },
  description: { type: String, required: true },
  totalMarks: { type: Number, default: 20 },
  dueDate: { type: String, required: true },
  attachmentUrl: { type: String, default: '' },
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    studentName: String,
    submittedAt: { type: Date, default: Date.now },
    submissionText: String,
    fileUrl: String,
    marksAwarded: Number,
    feedback: String,
    status: { type: String, enum: ['Submitted', 'Graded', 'Needs Revision'], default: 'Submitted' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
