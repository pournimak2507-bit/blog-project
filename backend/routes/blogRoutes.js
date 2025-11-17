import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Auth protected routes
router.post("/", verifyToken, upload.single("image"), createBlog);
router.put("/:id", verifyToken, upload.single("image"), updateBlog);
router.delete("/:id", verifyToken, deleteBlog);

export default router;
