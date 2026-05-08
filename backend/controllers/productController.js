const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.json(products);
};

// Create a single product manually (No image upload, just URL)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl, stock } = req.body;
    const product = await Product.create({ name, price, description, imageUrl, stock });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

// SEED ROUTE: Premium Hardcoded Coffee Data
exports.seedCoffeeProducts = async (req, res) => {
  try {
    // Clear out the Swedish coffee
    await Product.deleteMany();

    const premiumCoffeeData = [
      {
        name: "Classic Espresso",
        description: "A concentrated shot of pure coffee, featuring a rich flavor and a thick, caramel-colored crema.",
        price: 150,
        imageUrl: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=800&auto=format&fit=crop",
        stock: 100
      },
      {
        name: "Caramel Macchiato",
        description: "Freshly steamed milk with vanilla-flavored syrup, marked with espresso and finished with a caramel drizzle.",
        price: 185,
        imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=800&auto=format&fit=crop",
        stock: 100
      },
      {
        name: "Café Mocha",
        description: "Our signature espresso meets chocolate sauce and steamed milk, finished off with sweetened whipped cream.",
        price: 195,
        imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop",
        stock: 100
      },
      {
        name: "Iced Americano",
        description: "Espresso shots topped with cold water produce a light layer of crema, then served over ice.",
        price: 160,
        imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop",
        stock: 100
      },
      {
        name: "Vanilla Latte",
        description: "Dark, rich espresso balanced with vanilla syrup and steamed milk, topped with a light layer of foam.",
        price: 180,
        imageUrl: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=800&auto=format&fit=crop",
        stock: 100
      },
      {
        name: "Matcha Green Tea",
        description: "Smooth and creamy matcha sweetened just right and served with steamed milk.",
        price: 210,
        imageUrl: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=800&auto=format&fit=crop",
        stock: 100
      }
    ];

    const createdProducts = await Product.insertMany(premiumCoffeeData);
    res.status(201).json({ message: 'Premium Coffee database seeded!', count: createdProducts.length });
  } catch (error) {
    res.status(500).json({ message: 'Failed to seed database', error: error.message });
  }
};

// DELETE a product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.imageUrl = imageUrl || product.imageUrl;
      product.stock = stock || product.stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

// Ensure deleteProduct is also exported here if it wasn't already
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};