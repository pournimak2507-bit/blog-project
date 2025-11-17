import express from "express";
import {
  addFav,
  removeFav,
  getMyFavourites,
} from "../controllers/favController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addFav);
router.delete("/:blogId", verifyToken, removeFav);
router.get("/me", verifyToken, getMyFavourites);

export default router;
