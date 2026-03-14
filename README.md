# ⚙️ Amazon API - Backend Service for E-Commerce Platform

[![GitHub Repository](https://img.shields.io/badge/github-repo-blue)](https://github.com/eyob42/amazon-api)

This is the official backend API service for the Amazon Clone e-commerce platform. It provides robust RESTful endpoints for product management, user orders, and secure payment processing with Stripe, all backed by a MongoDB database.

## 🚀 Live API Base URL

The API is live and accessible at:
**👉 [https://amazon-api-ld36.onrender.com](https://amazon-api-ld36.onrender.com)**

You can verify it's running by visiting the root endpoint, which returns:
```json
{"message":"Amazon API Server","endpoints":{"products":"/api/products","orders":"/api/orders","payment":"/payment/create?total=100"}}
✨ Key Features
🛒 Product Catalog: Serves product data for the frontend.

📦 Order Management: Handles order creation, storage, and retrieval for authenticated users.

💳 Secure Payments: Integrates with the Stripe API to create and confirm payment intents.

🔗 CORS Enabled: Configured to accept requests from authorized frontend origins (local, Netlify, Vercel).

🗄️ MongoDB Integration: Uses Mongoose ODM for robust data modeling and validation.

🛠️ Technology Stack
Runtime: Node.js

Framework: Express.js

Database: MongoDB (with Mongoose ODM)

Payments: Stripe SDK

Security: CORS middleware

📁 Project Structure
text
amazon-api/
├── config/             # Database connection configuration
├── controllers/        # Business logic for routes
├── models/             # Mongoose data models (Product, Order, etc.)
├── routes/             # API route definitions
├── scripts/            # Utility scripts (e.g., data seeding)
├── .env                # Environment variables (not in repo)
├── .gitignore
├── package.json
└── server.js           # Main application entry point
🚦 Available API Endpoints
Here are the main endpoints provided by the API, as confirmed by the live server:

Method	Endpoint	Description	Example
GET	/	Root endpoint, returns API status and available endpoints.	/
GET	/api/products	Fetches a list of all products.	/api/products
GET	/api/products/:id	Fetches a single product by its ID.	/api/products/1
GET	/api/products/category/:category	Fetches products belonging to a specific category.	/api/products/category/electronics
POST	/api/orders	Creates a new order after a successful payment.	
GET	/api/orders/user/:email	Retrieves all orders for a specific user (by email).	/api/orders/user/user@example.com
GET	/api/orders	Retrieves all orders (for testing purposes).	/api/orders
POST	/payment/create?total=100	Creates a Stripe Payment Intent for a given total amount (in cents).	/payment/create?total=1000
⚙️ Getting Started for Local Development
Follow these steps to run the API server on your local machine.

Prerequisites
Node.js (v18 or later)

npm or yarn

A MongoDB database (local or cloud, e.g., MongoDB Atlas)

A Stripe account for API keys

Installation
Clone the repository

bash
git clone https://github.com/eyob42/amazon-api.git
cd amazon-api
Install dependencies

bash
npm install
Set up environment variables
Create a .env file in the root directory and add the following:

env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
STRIPE_KEY=your_stripe_secret_key
Run the development server

bash
npm run dev
The server will start at http://localhost:5000. You can test it by visiting http://localhost:5000/api/products.

🔗 Frontend Integration
This API is designed to work seamlessly with the frontend application:
https://github.com/eyob42/amazon-clone

The frontend should be configured to point to this API's base URL (e.g., http://localhost:5000 for local development, or https://amazon-api-ld36.onrender.com for production).

🌐 Deployment
This API is configured for deployment on Render.

Push your code to a GitHub repository.

Create a new Web Service on Render and connect the repository.

Set the following environment variables in your Render dashboard:

MONGODB_URI

STRIPE_KEY

Render will automatically install dependencies and start the server using the start script in package.json. The live API will be available at your Render service URL, for example: https://amazon-api-ld36.onrender.com.

📝 License
This project is open source and available under the MIT License.