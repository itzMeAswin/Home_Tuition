const Testimonial = require('../models/Testimonial');

// @desc Get all testimonials
// @route GET /api/testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ rating: -1, createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials' });
  }
};

// @desc Create testimonial (Admin)
// @route POST /api/testimonials
const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error adding testimonial' });
  }
};

module.exports = { getTestimonials, createTestimonial };
