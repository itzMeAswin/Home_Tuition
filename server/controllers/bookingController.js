const Booking = require('../models/Booking');

// @desc Create a new Free Demo Class Booking
// @route POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { studentName, parentName, email, phone, grade, subject, preferredDate, preferredTime, mode, message, learningGoals } = req.body;

    if (!studentName || !email || !phone || !grade || !subject) {
      return res.status(400).json({ message: 'Name, email, phone, grade, and subject are required' });
    }

    const booking = await Booking.create({
      studentName,
      parentName: parentName || '',
      email,
      phone,
      grade,
      subject,
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: preferredTime || '5:00 PM - 6:00 PM',
      mode: mode || 'Online',
      message: message || '',
      learningGoals: learningGoals || 'Improve conceptual foundations & board exam preparation'
    });

    res.status(201).json({
      message: 'Free Demo Class booked successfully!',
      booking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Error scheduling demo class', error: error.message });
  }
};

// @desc Get all bookings (Admin/Tutor)
// @route GET /api/bookings
const getBookings = async (req, res) => {
  try {
    const { status, subject, grade } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }
    if (subject && subject !== 'All') {
      query.subject = subject;
    }
    if (grade && grade !== 'All') {
      query.grade = grade;
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

// @desc Update booking status or notes
// @route PUT /api/bookings/:id
const updateBooking = async (req, res) => {
  try {
    const { status, assignedTutor, meetingLink, adminNotes, preferredDate, preferredTime } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (status) booking.status = status;
    if (assignedTutor) booking.assignedTutor = assignedTutor;
    if (meetingLink !== undefined) booking.meetingLink = meetingLink;
    if (adminNotes !== undefined) booking.adminNotes = adminNotes;
    if (preferredDate) booking.preferredDate = preferredDate;
    if (preferredTime) booking.preferredTime = preferredTime;

    const updated = await booking.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking' });
  }
};

// @desc Delete booking
// @route DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking' });
  }
};

module.exports = { createBooking, getBookings, updateBooking, deleteBooking };
