// Handles business logic for registration and login

import {
  createUser,
  findUserByEmail,
  activateUserByToken,
} from "../models/user_model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { sendActivationEmail } from "../utils/sendMail.js";

import jwt from "jsonwebtoken";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if user exists using email
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // If user doesn't exist, hash the password
    const hashed = await hashPassword(password);
    const activation_token = crypto.randomBytes(32).toString("hex");

    const userId = await createUser({
      first_name,
      last_name,
      email,
      password: hashed,
      activation_token,
    });

    await sendActivationEmail(email, activation_token);

    res.status(201).json({
      message:
        "User successfully registered. Please check your email to activate your account.",
      userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// Controller for activating user

export const activateAccountController = async (req, res) => {
  const { token } = req.params;

  const success = await activateUserByToken(token);
  if (!success) {
    return res
      .status(400)
      .json({ message: "Invalid or expired activation token." });
  }

  res
    .status(200)
    .json({ message: "Account activated successfully. You can now login." });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.is_active) {
      return res
        .status(403)
        .json({ message: "Please activate your account first." });
    }

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, user_role: user.user_role },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login." });
  }
};
