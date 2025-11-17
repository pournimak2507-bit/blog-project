import db from "./db.js";

export const addFavourite = async (userId, blogId) => {
  await db.query(
    "INSERT INTO favourites (userId, blogId, created_at) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE created_at = NOW()",
    [userId, blogId]
  );
};

export const removeFavourite = async (userId, blogId) => {
  await db.query("DELETE FROM favourites WHERE userId=? AND blogId=?", [
    userId,
    blogId,
  ]);
};

export const getUserFavourites = async (userId) => {
  const [rows] = await db.query(
    `SELECT b.*, u.firstName AS authorFirst, u.lastName AS authorLast
     FROM blogs b
     JOIN favourites f ON b.id = f.blogId
     JOIN users u ON b.authorId = u.id
     WHERE f.userId = ?
     ORDER BY f.created_at DESC`,
    [userId]
  );
  return rows;
};
