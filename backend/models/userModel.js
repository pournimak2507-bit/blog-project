import db from "./db.js";

export const getUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};

export const createUser = async (data) => {
  const { firstName, lastName, email, password, role, category } = data;

  const [result] = await db.query(
    "INSERT INTO users (firstName, lastName, email, password, role, category) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, email, password, role, category]
  );

  const [rows] = await db.query(
    "SELECT id, firstName, lastName, email, role, category FROM users WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
};

export const getUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, firstName, lastName, email, role, category FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};
