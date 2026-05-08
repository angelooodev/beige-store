const express = require('express');
const router = express.Router();
const { getProducts, createProduct, seedCoffeeProducts } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// The new seed route (run this once via Postman/browser to populate the DB)
router.post('/seed', seedCoffeeProducts);

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

module.exports = router;