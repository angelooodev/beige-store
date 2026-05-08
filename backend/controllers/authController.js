const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.registerUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  
  // Minimal validation: Just checking if they exist
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  // No complex password checks, just hash and save
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ 
    fname: fname || 'Guest', // Fallback if they skip the name
    lname: lname || 'User',
    email, 
    password: hashedPassword 
  });

  if (user) {
    res.status(201).json({ 
      _id: user.id, 
      fname: user.fname, 
      email: user.email, 
      isAdmin: user.isAdmin, 
      token: generateToken(user._id) 
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

exports.authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ 
      _id: user.id, 
      fname: user.fname, 
      email: user.email, 
      isAdmin: user.isAdmin, 
      token: generateToken(user._id) 
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};