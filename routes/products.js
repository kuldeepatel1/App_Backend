const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { addProduct, getProducts, getProduct, getMyProducts } = require('../controllers/productController');
const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post('/', protect, addProduct);        // Add product (seller)
router.get('/', getProducts);                                          // General browsing
router.get('/:id', getProduct);                                        // Single product
router.get('/user/my-products', protect, getMyProducts);                   // Seller dashboard

module.exports = router;
