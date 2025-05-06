// Set up middleware and routes for the app

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth_routes.js'; // authentication routes
import productRoutes from './routes/product_routes.js'; // product routes
import categoryRoutes from './routes/category_routes.js'; // category routes

dotenv.config();

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({urlencoded: true})); 

// Route definitions
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

// Root route
app.get('/', (req, res)=>{
    res.send('Welcome to Advanced InfoTech.');
});

export default app;