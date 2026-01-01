const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  editProduct,
  addProduct
} = require("../controllers/xBeatProductController");

router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.put("/productEdit/:id", editProduct);
router.post("/productAdd", addProduct)

module.exports = router;
