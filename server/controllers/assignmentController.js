const Assignment = require('../models/Assignment');
const User = require('../models/User');

// @desc Get all assignments
// @route GET /api/assignments
const getAssignments = async (req, res) => {
  try {
    const { grade, subject } = req.query;
    let query = {};
    if (grade && grade !== 'All') query.grade = grade;
    if (subject && subject !== 'All') query.subject = subject;

    const assignments = await Assignment.find(query).sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving assignments', error: error.message });
  }
};

// @desc Get assignment by ID
// @route GET /api/assignments/:id
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignment', error: error.message });
  }
};

// @desc Create new assignment (Tutor / Admin)
// @route POST /api/assignments
const createAssignment = async (req, res) => {
  try {
    const { title, subject, grade, description, totalMarks, dueDate, tutorName, attachmentUrl } = req.body;

    if (!title || !subject || !grade || !description) {
      return res.status(400).json({ message: 'Title, subject, grade, and description are required' });
    }

    const assignment = await Assignment.create({
      title,
      subject,
      grade,
      description,
      totalMarks: Number(totalMarks) || 25,
      dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      tutorName: tutorName || (req.user ? req.user.name : 'Mrs. Lakshmi S.'),
      attachmentUrl: attachmentUrl || ''
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error: error.message });
  }
};

// @desc Submit homework response to assignment
// @route POST /api/assignments/:id/submit
const submitAssignment = async (req, res) => {
  try {
    const { submissionText, fileUrl, studentName } = req.body;
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const studentId = req.user ? req.user._id : null;
    const name = studentName || (req.user ? req.user.name : 'Student');

    assignment.submissions.push({
      student: studentId,
      studentName: name,
      submissionText: submissionText || 'Homework solution submitted online.',
      fileUrl: fileUrl || '',
      status: 'Submitted',
      submittedAt: new Date()
    });

    await assignment.save();

    // Reward points to student
    if (studentId) {
      const user = await User.findById(studentId);
      if (user) {
        user.points = (user.points || 0) + 15;
        await user.save();
      }
    }

    res.status(201).json({
      message: 'Assignment submitted successfully! +15 Learning Points earned.',
      assignment
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting assignment', error: error.message });
  }
};

module.exports = { getAssignments, getAssignmentById, createAssignment, submitAssignment };
