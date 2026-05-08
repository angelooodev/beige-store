// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
// Import the functions we built in the controller!
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/orders (User creates an order)
// @route   GET /api/orders (Admin gets all orders)
router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

// @route   PUT /api/orders/:id/status
// @desc    Admin updates order status
// @access  Private/Admin
router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

// We will add the /myorders route to the controller later when we build the user profile!
// For now, these are the exact routes needed to make your Admin Dashboard work.

module.exports = router;