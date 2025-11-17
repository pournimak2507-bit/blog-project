import * as favModel from "../models/favModel.js";

export const addFav = async (req, res) => {
  try {
    const { blogId } = req.body;
    const userId = req.user.id;

    if (!blogId) return res.status(400).json({ message: "blogId required" });

    await favModel.addFavourite(userId, blogId);
    res.status(200).json({ message: "Added to favourites" });
  } catch (err) {
    console.error("ADD FAV ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFav = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user.id;

    await favModel.removeFavourite(userId, blogId);
    res.status(200).json({ message: "Removed from favourites" });
  } catch (err) {
    console.error("REMOVE FAV ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyFavourites = async (req, res) => {
  try {
    const userId = req.user.id;

    const blogs = await favModel.getUserFavourites(userId);
    res.status(200).json(blogs);
  } catch (err) {
    console.error("GET FAV ERROR →", err);
    res.status(500).json({ message: "Server error" });
  }
};
