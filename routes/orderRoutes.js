const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Save a new order after successful payment
router.post('/', async (req, res) => {
  try {
    const { userEmail, items, totalAmount, paymentIntentId } = req.body;
    
    
    console.log('Received order data:', { userEmail, items, totalAmount, paymentIntentId });

    // Create order with simplified schema
    const order = new Order({
      userEmail,
      items: items.map(item => ({
        productId: item._id || item.id,  // Keep as string, not ObjectId
        title: item.title,
        price: item.price,
        quantity: item.quantity || item.amount || 1,
        imageUrl: item.imageUrl || item.image
      })),
      totalAmount: totalAmount,
      paymentIntentId,
      status: 'paid'  // ✅ Now 'paid' is valid!
    });
    
    await order.save();
    console.log('✅ Order saved successfully:', order._id);
    
    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get orders for a user
router.get('/user/:email', async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders (for testing)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;