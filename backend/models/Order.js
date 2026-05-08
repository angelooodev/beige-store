const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    qty: Number,
    price: Number
  }],
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, default: 'GCash' },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'shipping', 'delivered', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);