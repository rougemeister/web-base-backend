import express from "express";
import Booking from "../models/Bookings.js";

const router = express.Router();

// ➕ Create Booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📄 Get All Bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tenantId", "name email")
      .populate("apartmentId", "title rent");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📄 Get Booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("tenantId", "name email")
      .populate("apartmentId", "title rent");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✏️ Update Booking
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🗑 Delete Booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
