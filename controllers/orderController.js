const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ buyer: req.user._id }).populate('products');
    if (!cart || cart.products.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    let totalPrice = 0;
    cart.products.forEach(prod => totalPrice += prod.price);

    const order = await Order.create({
      buyer: req.user._id,
      products: cart.products.map(p => p._id),
      totalPrice
    });

    // Mark products sold
    for (const prod of cart.products) {
      prod.status = 'sold';
      await prod.save();
    }

    // Empty cart
    cart.products = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user._id }).populate('products');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};