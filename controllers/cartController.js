const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product || product.status !== 'available')
      return res.status(400).json({ message: 'Product not available' });

    let cart = await Cart.findOne({ buyer: req.user._id });

    if (!cart) {
      cart = await Cart.create({ buyer: req.user._id, products: [productId] });
    } else {
      if (cart.products.includes(productId))
        return res.status(400).json({ message: 'Product already in cart' });

      cart.products.push(productId);
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ buyer: req.user._id }).populate('products');
    res.json(cart || { products: [] });
  } catch (err) {
    next(err);
  }
};

