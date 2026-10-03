const Inquiry = require('../models/Inquiry');

// @desc Submit inquiry
// @route POST /api/inquiries
const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, grade, message, source } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'Name, email, phone, and message are required' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      subject: subject || 'General Inquiry',
      grade: grade || '',
      message,
      source: source || 'Website Contact Form'
    });

    res.status(201).json({
      message: 'Inquiry received. Our academic counselor will contact you within 24 hours!',
      inquiry
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting inquiry', error: error.message });
  }
};

// @desc Get all inquiries (Admin)
// @route GET /api/inquiries
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries' });
  }
};

// @desc Update inquiry status
// @route PUT /api/inquiries/:id
const updateInquiry = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    if (status) inquiry.status = status;
    if (notes !== undefined) inquiry.notes = notes;

    const updated = await inquiry.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating inquiry' });
  }
};

module.exports = { createInquiry, getInquiries, updateInquiry };
