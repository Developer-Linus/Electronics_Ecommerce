// Set up middleware and routes for the app

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth_routes.js'; // authentication routes
import productRoutes from './routes/product_routes.js'; // product routes
import categoryRoutes from './routes/category_routes.js'; // category routes
import productImageRoutes from './routes/product_images_routes.js'; // product images routes

import adminRoutes from './routes/admin_routes.js'; // Admin routes

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({urlencoded: true}));

//  Using uploads folder for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route definitions
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productImageRoutes);
app.use("/api", adminRoutes);

// Root route
app.get('/', (req, res)=>{
    res.send('Welcome to Advanced InfoTech.');
});

export default app;