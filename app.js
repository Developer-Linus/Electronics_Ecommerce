// Set up middleware and routes for the app

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth_routes.js';

dotenv.config();

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({urlencoded: true})); 

// Route definitions
app.use("/api/auth", authRoutes);

export default app;