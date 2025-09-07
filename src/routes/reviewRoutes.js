import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// ➕ Create Review
router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📄 Get All Reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("tenantId", "name email")
      .populate("apartmentId", "title rent");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📄 Get Review by ID
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("tenantId", "name email")
      .populate("apartmentId", "title rent");
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✏️ Update Review
router.put("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🗑 Delete Review
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
