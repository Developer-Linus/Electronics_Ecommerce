import { createUser, findUserByEmail } from "../models/user_model.js";
import { hashPassword } from "../utils/hash.js";

export const createAdminController = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const hashed = await hashPassword(password);
    const userId = await createUser({
      first_name,
      last_name,
      email,
      password: hashed,
      user_role: "Admin", // force Admin
    });

    res.status(201).json({ message: "Admin created successfully", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating admin." });
  }
};
