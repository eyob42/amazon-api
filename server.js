const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

// Import models
const Product = require("./models/Product");

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://eyob-amazon-clone-2.netlify.app', // Your live site
    'https://amazon-api-ld36.onrender.com'
  ],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ============ ROUTES ============

// Product routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(`📦 Found ${products.length} products`);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ ORDER ROUTES - Add this line HERE (before payment routes)
app.use('/api/orders', require('./routes/orderRoutes'));

// Payment route
const stripe = require("stripe")(process.env.STRIPE_KEY);
app.post("/payment/create", async (req, res) => {
  try {
    const total = req.query.total;
    if (total > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } else {
      res.status(403).json({ message: "total must be greater than 0" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Amazon API Server",
    endpoints: {
      products: "/api/products",
      orders: "/api/orders",
      payment: "/payment/create?total=100"
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Amazon server running on port: ${PORT}, http://localhost:${PORT}`);
});