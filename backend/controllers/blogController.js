import {
  createBlog as createBlogModel,
  getAllBlogs,
  getBlogById as getBlogByIdModel,
  updateBlog as updateBlogModel,
  deleteBlog as deleteBlogModel,
} from "../models/blogModel.js";

// Create blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const authorId = req.user.id;

    await createBlogModel({ title, content, image, authorId, category });
    res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    console.error("CREATE BLOG ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.status(200).json(blogs);
  } catch (err) {
    console.error("GET BLOG ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single blog
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

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? req.file.filename : null;

    await updateBlogModel(req.params.id, { title, content, image, category });
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (err) {
    console.error("UPDATE BLOG ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    await deleteBlogModel(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("DELETE BLOG ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};
