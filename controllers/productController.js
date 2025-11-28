const Product = require('../models/Product');

exports.addProduct = async (req, res, next) => {
  try {
    const { name, price, description, image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      seller: req.user._id,
      image: image,        // ✅ SAVE BASE64 STRING
      status: "available"
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};


exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { status: 'available' };

    // If user logged in, hide their own products
    if (req.user) {
      filter.seller = { $ne: req.user._id };
    }

    const products = await Product.find(filter)
      .populate('seller', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name email');

    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.user._id })
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    next(err);
  }
};

