const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'parent', 'tutor', 'admin'], 
    default: 'student' 
  },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  displayName: { type: String, default: '' },
  grade: { type: String, default: 'Class 12' },
  curriculum: { type: String, default: 'CBSE' },
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastStreakDate: { type: String, default: '' },
  badges: [{
    id: { type: String },
    name: { type: String },
    icon: { type: String },
    unlockedAt: { type: Date, default: Date.now },
    description: { type: String }
  }],
  linkedChildEmail: { type: String, default: '' }, // for parents
  linkedParentEmail: { type: String, default: '' }, // for students
  bio: { type: String, default: '' },
  qualification: { type: String, default: '' },
  subjects: [{ type: String }],
  isVerified: { type: Boolean, default: true },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
