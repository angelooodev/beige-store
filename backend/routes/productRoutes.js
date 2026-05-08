const express = require('express');
const router = express.Router();
// Notice deleteProduct is imported right here:
const { getProducts, createProduct, seedCoffeeProducts, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// The seed route
router.post('/seed', seedCoffeeProducts);

// Get all products and create a product
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

// Delete a specific product by ID
router.route('/:id')
  .delete(protect, admin, deleteProduct);

module.exports = router;