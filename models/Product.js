const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    index: true // Add index for faster queries
  },
  imageUrl: {
    type: String,
    required: true
  },
  stockQuantity: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Add this for full-text search
  indexes: [
    {
      key: { title: 'text', description: 'text' },
      name: 'product_text_search'
    }
  ]
});

module.exports = mongoose.model('Product', productSchema);