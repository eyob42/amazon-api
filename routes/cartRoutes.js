const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /api/cart/:userId - Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    
    if (!cart) {
      // Create empty cart if doesn't exist
      cart = new Cart({ userId: req.params.userId, items: [] });
      await cart.save();
    }
    
    res.json({
      success: true,
      cart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch cart' 
    });
  }
});

// POST /api/cart/:userId/add - Add item to cart
router.post('/:userId/add', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ userId: req.params.userId });
    
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
    }
    
    // Check if item already in cart
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId: productId,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity
      });
    }
    
    await cart.save();
    
    res.json({
      success: true,
      cart
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to add to cart' 
    });
  }
});

// PUT /api/cart/:userId/update - Update item quantity
router.put('/:userId/update', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const cart = await Cart.findOne({ userId: req.params.userId });
    
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        error: 'Cart not found' 
      });
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Item not in cart' 
      });
    }
    
    if (quantity <= 0) {
      // Remove item
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }
    
    await cart.save();
    
    res.json({
      success: true,
      cart
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update cart' 
    });
  }
});

// DELETE /api/cart/:userId/clear - Clear cart
router.delete('/:userId/clear', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    
    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to clear cart' 
    });
  }
});

module.exports = router;