const express = require('express');

const router = express.Router();
const {
  register,
  login,
  profile,
  refreshToken,
  updateProfile,
  otp,
} = require('../controller/users');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router
  .post('/register', register)
  .post('/login', login)
  .post('/verif', otp)
  .post('/refresh-token', refreshToken)
  .get('/profile', protect, profile)
  .get('/:id', profile)
  .put('/edit-profile', protect, upload.single('photo'), updateProfile);

module.exports = router;
