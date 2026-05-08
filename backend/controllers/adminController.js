const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

exports.getDashboardStats = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();

    res.json({
      products: productCount,
      users: userCount,
      orders: orderCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};