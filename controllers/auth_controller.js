// Handles business logic for registration and login

import { createUser, findUserByEmail } from "../models/user_model.js";
import { hashPassword, comparePassword } from "../utils/hash.js"
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Check if user exists using email
        const existingUser = await findUserByEmail(email);
        if(existingUser){
            return res.status(400).json({ message: "Email already exists!"});
        }

        // If user doesn't exist, hash the password
        const hashed = await hashPassword(password);
        const userId = await createUser({first_name, last_name, email, password: hashed});

        res.status(201).json({ message: "User successfully registered.", userId}, { expiresIn: process.env.JWT_EXPIRES_IN, });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during registration."});
    }
}

export const login = async(req, res)=>{
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if(!user){
            return res.status(404).json({ message: "User not found." });
        }

        const valid = await comparePassword(password, user.password_hash);
        if(!valid){
            return res.status(401).json({ message: "Invalid email or password."});
        }

        const token = jwt.sign({id: user.id, email: user.email }, process.env.JWT_SECRET);

        res.json( { token })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message:"Server error during login."});
    }
}