import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  getUserByEmail,
  createUser,
  getUserById,
} from "../models/userModel.js";

// Strong password validator
const strongPassword = (pw) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pw);

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const existing = await getUserByEmail(email);
    if (!existing) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, existing.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const user = await getUserById(existing.id);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ user, token });
  } catch (err) {
    console.error("LOGIN ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, category } = req.body;

    // Required fields
    if (!firstName || !email || !password) {
      return res
        .status(400)
        .json({ message: "First name, email & password are required" });
    }

    // Strong password check
    if (!strongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be 8+ chars with uppercase, lowercase, number & symbol",
      });
    }

    // Check if user already exists
    const exists = await getUserByEmail(email);
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await createUser({
      firstName,
      lastName,
      email,
      password: hashed,
      role: role || "user",
      category: role === "blogger" ? category : null,
    });

    return res.status(201).json({ message: "Registration successful", user });
  } catch (err) {
    console.error("REGISTER ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};
