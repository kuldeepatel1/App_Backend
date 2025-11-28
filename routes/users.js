const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
