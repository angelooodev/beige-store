const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// User creates an order
router.post('/', protect, async (req, res) => {
  const { orderItems, shippingAddress, totalAmount } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    totalAmount
  });

  const createdOrder = await order.save();

  // Deduct stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock -= item.qty;
      await product.save();
    }
  }

  res.status(201).json(createdOrder);
});

// User gets their own orders
router.get('/myorders', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// Admin gets all orders
router.get('/', protect, admin, async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id fname email').sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;