import db from "./db.js";

export const createBlog = async ({
  title,
  content,
  image,
  authorId,
  category,
}) => {
  const [res] = await db.query(
    "INSERT INTO blogs (title, content, image, authorId, category, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
    [title, content, image, authorId, category]
  );
  return res.insertId;
};

export const getAllBlogs = async () => {
  const [rows] = await db.query(
    `SELECT b.*, u.firstName AS authorFirst, u.lastName AS authorLast,
     (SELECT COUNT(*) FROM favourites f WHERE f.blogId = b.id) AS favouriteCount
     FROM blogs b
     JOIN users u ON b.authorId = u.id
     ORDER BY created_at DESC`
  );
  return rows;
};

export const getBlogById = async (id) => {
  const [rows] = await db.query(
    `SELECT b.*, u.firstName AS authorFirst, u.lastName AS authorLast,
     (SELECT COUNT(*) FROM favourites f WHERE f.blogId = b.id) AS favouriteCount
     FROM blogs b
     JOIN users u ON b.authorId = u.id
     WHERE b.id = ?`,
    [id]
  );
  return rows[0] || null;
};

export const updateBlog = async (id, data) => {
  const { title, content, image, category } = data;
  return await db.query(
    "UPDATE blogs SET title=?, content=?, image=?, category=? WHERE id=?",
    [title, content, image, category, id]
  );
};

export const deleteBlog = async (id) => {
  return await db.query("DELETE FROM blogs WHERE id = ?", [id]);
};

export const getBlogsByCategory = async (cat) => {
  const [rows] = await db.query(
    `SELECT b.*, u.firstName AS authorFirst, u.lastName AS authorLast,
     (SELECT COUNT(*) FROM favourites f WHERE f.blogId = b.id) AS favouriteCount
     FROM blogs b
     JOIN users u ON b.authorId = u.id
     WHERE b.category=?
     ORDER BY created_at DESC`,
    [cat]
  );
  return rows;
};

export const searchBlogs = async (term) => {
  const q = `%${term}%`;
  const [rows] = await db.query(
    `SELECT b.*, u.firstName AS authorFirst, u.lastName AS authorLast,
     (SELECT COUNT(*) FROM favourites f WHERE f.blogId = b.id) AS favouriteCount
     FROM blogs b
     JOIN users u ON b.authorId = u.id
     WHERE b.title LIKE ? 
       OR b.category LIKE ? 
       OR CONCAT(u.firstName, ' ', u.lastName) LIKE ?
     ORDER BY created_at DESC`,
    [q, q, q]
  );
  return rows;
};
