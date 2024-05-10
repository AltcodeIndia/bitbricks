import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json("User doesn't exist")}
      
    res.json({
      name: user.name,
      email: user.email,
    });
});
const uploadUserImage = asyncHandler(async (req, res) => {
    req.user.image = req.file.buffer;
    await req.user.save();
  
    res.status(201).json({ message: "Image added successfully" });
});
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const { name, email, image } = req.body;
  
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.image = image || user.image;
      await user.save();
  
      res.status(200).json({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json("User not found");
      return;
    }
});
export { getUserProfile, updateUserProfile, uploadUserImage };