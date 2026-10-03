const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// @desc Register user
// @route POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, role, grade, phone, curriculum } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Default badges for new students
    const initialBadges = role === 'student' ? [
      { id: 'first_step', name: 'First Step', icon: 'Footprints', description: 'Joined the Online Home Tution Center family!' }
    ] : [];

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'student',
      grade: grade || 'Class 12',
      curriculum: curriculum || 'CBSE',
      phone: phone || '',
      badges: initialBadges,
      points: role === 'student' ? 50 : 0, // Welcome points
      streak: role === 'student' ? 1 : 0
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      grade: user.grade,
      points: user.points,
      streak: user.streak,
      badges: user.badges,
      avatar: user.avatar,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      grade: user.grade,
      curriculum: user.curriculum,
      phone: user.phone,
      points: user.points,
      streak: user.streak,
      badges: user.badges,
      avatar: user.avatar,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// @desc Get current user profile
// @route GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching user profile' });
  }
};

// @desc Update user profile
// @route PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    user.grade = req.body.grade || user.grade;
    user.curriculum = req.body.curriculum || user.curriculum;
    user.avatar = req.body.avatar || user.avatar;
    user.displayName = req.body.displayName || user.displayName;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.qualification = req.body.qualification !== undefined ? req.body.qualification : user.qualification;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      grade: updatedUser.grade,
      curriculum: updatedUser.curriculum,
      phone: updatedUser.phone,
      points: updatedUser.points,
      streak: updatedUser.streak,
      badges: updatedUser.badges,
      avatar: updatedUser.avatar,
      token: generateToken(updatedUser._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating profile', error: error.message });
  }
};

// @desc Claim an achievement badge (prevents duplicate reward claims)
// @route POST /api/auth/claim-badge
const claimBadge = async (req, res) => {
  try {
    const { badgeId, badgeName, icon, description, points } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already claimed
    const alreadyClaimed = user.badges.some(b => b.id === badgeId);
    if (alreadyClaimed) {
      return res.status(400).json({ message: 'Badge already claimed previously', alreadyClaimed: true });
    }

    user.badges.push({
      id: badgeId,
      name: badgeName,
      icon: icon || 'Award',
      description: description || 'Earned through educational excellence',
      unlockedAt: new Date()
    });

    if (points) {
      user.points += Number(points);
    }

    await user.save();

    res.json({
      message: `Congratulations! Unlocked '${badgeName}' badge!`,
      badges: user.badges,
      points: user.points
    });
  } catch (error) {
    res.status(500).json({ message: 'Error claiming badge', error: error.message });
  }
};

module.exports = { register, login, getMe, updateProfile, claimBadge };
