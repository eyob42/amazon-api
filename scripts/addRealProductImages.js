const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Order = require('../models/Order');

// REAL product images from Fake Store API
const productImages = {
  "1": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "2": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  "3": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  "4": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  "5": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  "6": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  "7": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  "8": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
  "9": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  "10": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  "11": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
  "12": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
  "13": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  "14": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  "15": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
  "16": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  "17": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  "18": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
};

async function addRealImagesToOrders() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const orders = await Order.find({});
    console.log(`📦 Found ${orders.length} orders`);

    let updatedCount = 0;

    for (const order of orders) {
      let orderUpdated = false;
      
      for (const item of order.items) {
        const realImage = productImages[item.productId];
        
        if (realImage) {
          // Set the REAL image URL
          item.imageUrl = realImage;
          orderUpdated = true;
          console.log(`✅ Added REAL image to product ID: ${item.productId}`);
          console.log(`   Image: ${realImage}`);
        }
      }
      
      if (orderUpdated) {
        await order.save();
        updatedCount++;
        console.log(`📝 Updated order: ${order._id}`);
      }
    }

    console.log(`\n🎉 SUCCESS! Updated ${updatedCount} orders with REAL product images!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addRealImagesToOrders();