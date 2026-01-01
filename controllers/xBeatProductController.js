const XBeat = require("../models/XBeatProduct");

const getProducts = async (req, res) => {
  try {
    const filters = {};
    const { brand, category, tag, search, minPrice, maxPrice } = req.query;

    // basic filters
    if (brand) filters.brand = brand;
    if (category) filters.category = category;
    if (tag) filters.tag = tag;

    // search by title/info
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { info: { $regex: search, $options: "i" } }
      ];
    }

    // price range
    if (minPrice || maxPrice) {
      filters.finalPrice = {};
      if (minPrice) filters.finalPrice.$gte = Number(minPrice);
      if (maxPrice) filters.finalPrice.$lte = Number(maxPrice);
    }

    const products = await XBeat.find(filters).sort({ id:1, createdAt: -1, });

    return res.status(200).json({
      success: true,
      message:"Products get.",
      data: products
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // if using Mongo _id
    const product = await XBeat.findById(id);

    // if using custom numeric id (like in your JSON)
    // const product = await XBeat.findOne({ id: Number(id) });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message:"Product get By Id.",
      data: product
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const body = req.body;

    // basic validation
    if (!body.title || !body.brand || !body.category || !body.finalPrice) {
      return res.status(400).json({
        success: false,
        message: "id, title, brand, category and finalPrice are required"
      });
    }

    const product = await XBeat.create(body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await XBeat.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updated
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message
    });
  }
};

module.exports = { getProducts, getProductById, editProduct, addProduct };