const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  district: { type: String, default: 'Trichy' },
  grade: { type: String, default: 'Class 12' },
  batch: { type: String, default: 'CBSE 2024' },
  subject: { type: String, default: 'Accountancy & Commerce' },
  image: { type: String, default: '' },
  score: { type: String, default: 'Centum 100/100' },
  quote: { type: String, required: true },
  detailedFeedback: { type: String, default: '' },
  parentQuote: { type: String, default: '' },
  rating: { type: Number, default: 5 },
  isVerified: { type: Boolean, default: true },
  featured: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
