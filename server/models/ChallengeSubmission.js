const mongoose = require('mongoose');

const challengeSubmissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateString: { type: String, required: true },
  selectedOption: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
  pointsEarned: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

challengeSubmissionSchema.index({ student: 1, dateString: 1 }, { unique: true });

module.exports = mongoose.model('ChallengeSubmission', challengeSubmissionSchema);
