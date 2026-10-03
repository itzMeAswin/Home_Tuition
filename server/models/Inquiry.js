const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, default: 'General Inquiry' },
  grade: { type: String, default: '' },
  message: { type: String, required: true },
  source: { type: String, default: 'Website Contact Form' }, // Website, WhatsApp, Direct
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Resolved'], 
    default: 'New' 
  },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
