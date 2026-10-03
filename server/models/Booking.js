const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingRef: { 
    type: String, 
    unique: true, 
    default: () => 'OHT-' + Math.floor(100000 + Math.random() * 900000) 
  },
  studentName: { type: String, required: true },
  parentName: { type: String, default: '' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  grade: { type: String, required: true },
  subject: { type: String, required: true },
  curriculum: { type: String, default: 'CBSE' },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  mode: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
  message: { type: String, default: '' },
  learningGoals: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  assignedTutor: { type: String, default: 'Mrs. Sandhya Subbaraman' },
  meetingLink: { type: String, default: '' },
  adminNotes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
