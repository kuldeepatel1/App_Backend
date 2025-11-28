const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { addToCart, getCart } = require('../controllers/cartController');

router.post('/add', protect, addToCart);
router.get('/', protect, getCart);

module.exports = router;
