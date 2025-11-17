import {
  createBlog as createBlogModel,
  getAllBlogs,
  getBlogById as getBlogByIdModel,
  updateBlog as updateBlogModel,
  deleteBlog as deleteBlogModel,
  getBlogsByCategory,
  searchBlogs,
} from "../models/blogModel.js";
import fs from "fs";
import path from "path";

const ALLOWED_CATEGORIES = ["Technology", "Travel", "Environment"];

export const createBlog = async (req, res) => {
  try {
    if (!req.user || !req.user.id)
      return res.status(401).json({ message: "User not authenticated" });

    const { title, content, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !content)
      return res.status(400).json({ message: "Title and content required" });
    if (category && !ALLOWED_CATEGORIES.includes(category))
      return res.status(400).json({ message: "Invalid category" });

    const id = await createBlogModel({
      title,
      content,
      image,
      authorId: req.user.id,
      category,
    });

    res.status(201).json({ message: "Blog created successfully", id });
  } catch (err) {
    console.error("CREATE BLOG ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { category, q } = req.query;
    if (q) {
      const results = await searchBlogs(q);
      return res.status(200).json(results);
    }
    if (category) {
      const results = await getBlogsByCategory(category);
      return res.status(200).json(results);
    }
    const blogs = await getAllBlogs();
    res.status(200).json(blogs);
  } catch (err) {
    console.error("GET BLOG ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await getBlogByIdModel(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    console.error("GET BLOG BY ID ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const existing = await getBlogByIdModel(blogId);
    if (!existing) return res.status(404).json({ message: "Blog not found" });

    if (!req.user || req.user.id !== existing.authorId)
      return res.status(403).json({ message: "Not authorized" });

    const { title, content, category } = req.body;
    const image = req.file ? req.file.filename : existing.image;

    if (category && !ALLOWED_CATEGORIES.includes(category))
      return res.status(400).json({ message: "Invalid category" });

    // delete old image if replaced
    if (req.file && existing.image) {
      const oldPath = path.join(process.cwd(), "uploads", existing.image);
      fs.unlink(oldPath, (err) => {
        if (err) console.warn("Could not delete old image:", err.message);
      });
    }

    await updateBlogModel(blogId, { title, content, image, category });
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (err) {
    console.error("UPDATE BLOG ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const existing = await getBlogByIdModel(blogId);
    if (!existing) return res.status(404).json({ message: "Blog not found" });

    if (!req.user || req.user.id !== existing.authorId)
      return res.status(403).json({ message: "Not authorized" });

    if (existing.image) {
      const imgPath = path.join(process.cwd(), "uploads", existing.image);
      fs.unlink(imgPath, (err) => {
        if (err) console.warn("Could not delete image:", err.message);
      });
    }

    await deleteBlogModel(blogId);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("DELETE BLOG ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};
