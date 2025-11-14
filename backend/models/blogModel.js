import db from "./db.js";

// Create a new blog
export const createBlog = async (blog) => {
  const { title, content, image, authorId, category } = blog;

  return await db.query(
    "INSERT INTO blogs (title, content, image, authorId, category, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
    [title, content, image, authorId, category]
  );
};

// Get all blogs
export const getAllBlogs = async () => {
  const [rows] = await db.query("SELECT * FROM blogs ORDER BY created_at DESC");
  return rows;
};

// Get blog by ID
export const getBlogById = async (id) => {
  const [rows] = await db.query("SELECT * FROM blogs WHERE id = ?", [id]);
  return rows[0];
};

// Update blog
export const updateBlog = async (id, blog) => {
  const { title, content, image, category } = blog;

  return await db.query(
    "UPDATE blogs SET title=?, content=?, image=?, category=? WHERE id=?",
    [title, content, image, category, id]
  );
};

// Delete blog
export const deleteBlog = async (id) => {
  return await db.query("DELETE FROM blogs WHERE id = ?", [id]);
};
