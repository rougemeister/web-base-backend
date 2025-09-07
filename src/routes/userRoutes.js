import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register new user (tenant by default)
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/users/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get("/me", protect, (req, res) => {
  res.json({
    message: "User profile fetched successfully",
    user: req.user,
  });
});

/**
 * @route   GET /api/users
 * @desc    Get all users (admin only)
 * @access  Private/Admin
 */
router.get("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/users/apartments
 * @desc    Create apartment (landlord/admin only)
 * @access  Private/Landlord/Admin
 */
router.post(
  "/apartments",
  protect,
  authorizeRoles("landlord", "admin"),
  (req, res) => {
    res.json({
      message: "Apartment created successfully ✅",
      createdBy: req.user.name,
    });
  }
);

export default router;
