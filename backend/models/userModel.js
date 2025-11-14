import db from "./db.js";
// Get user by email
export const getUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

// Create new user
export const createUser = async (user) => {
  const { firstName, lastName, email, password, role, category } = user;
  await db.query(
    "INSERT INTO users (firstName, lastName, email, password, role, category) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, email, password, role, category]
  );
};
// Get user by ID
export const getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};
