const mongoose = require('mongoose');

// 1. Define Schema
const Product_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  stock: {
    type: String,
    enum: ['available', 'outOfStock'],
    default: 'available',
    require: true
  },
},{ timestamps: true }
);

// 2. Create Model
const Product = mongoose.model('Product', Product_Schema);

// 3. Export
module.exports = Product;
