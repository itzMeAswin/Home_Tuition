const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'dev_secret_jwt_key_2026_tuition', {
    expiresIn: '30d',
  });
};

module.exports = { generateToken };
