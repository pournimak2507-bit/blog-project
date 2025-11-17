import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import favRoutes from "./routes/favRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// dirname Fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
const allowedOrigins = (
  process.env.CORS_ORIGINS || "http://localhost:3000"
).split(",");
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/favourites", favRoutes);

app.get("/", (req, res) => res.send("Blog Space Backend Running!"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
