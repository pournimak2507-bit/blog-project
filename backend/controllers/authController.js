import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/db.js";

// AUTO REGISTER + LOGIN (DEV MODE)
export const loginUser = async (req, res) => {
  try {
    const {
      firstName = "User",
      lastName = "Auto",
      email,
      password,
      role = "user",
      category = "general",
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // Check if user exists
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // If NOT found → AUTO REGISTER
    if (existing.length === 0) {
      const hashed = await bcrypt.hash(password, 10);

      const [insert] = await db.query(
        "INSERT INTO users (firstName, lastName, email, password, role, category) VALUES (?, ?, ?, ?, ?, ?)",
        [firstName, lastName, email, hashed, role, category]
      );

      const [newUserData] = await db.query("SELECT * FROM users WHERE id = ?", [
        insert.insertId,
      ]);

      const newUser = newUserData[0];

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(201).json({
        message: "Auto Registered + Logged in",
        user: newUser,
        token,
      });
    }

    // If user exists → normal login
    const user = existing[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res.status(400).json({ message: "Invalid email/password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login Successful",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// (OPTIONAL) Register Route (You can keep it or remove it)
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, category } = req.body;

    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (firstName, lastName, email, password, role, category) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, email, hashed, role, category]
    );

    return res.status(201).json({ message: "Manual Registration Done" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
