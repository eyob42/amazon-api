const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String,  // Changed from ObjectId to String
    required: true
  },
  title: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  imageUrl: { type: String }
});

const orderSchema = new mongoose.Schema({
  userEmail: {  // Changed from userId to userEmail (simpler)
    type: String,
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentIntentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], // ✅ Added 'paid'
    default: 'paid'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);