const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 100 }, // Defaulting to 100 so you don't have to worry about inventory limits during demo
  imageUrl: { type: String } // Directly storing the URL from the Coffee API
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);