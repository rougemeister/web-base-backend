import express from "express";
import Apartment from "../models/Apartment.js";

const router = express.Router();

// ➕ Create Apartment
router.post("/", async (req, res) => {
  try {
    const apartment = new Apartment(req.body);
    await apartment.save();
    res.status(201).json(apartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📄 Get All Apartments
router.get("/", async (req, res) => {
  try {
    const apartments = await Apartment.find().populate("landlordId", "name email");
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📄 Get Apartment by ID
router.get("/:id", async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id).populate("landlordId", "name email");
    if (!apartment) return res.status(404).json({ message: "Apartment not found" });
    res.json(apartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✏️ Update Apartment
router.put("/:id", async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!apartment) return res.status(404).json({ message: "Apartment not found" });
    res.json(apartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🗑 Delete Apartment
router.delete("/:id", async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!apartment) return res.status(404).json({ message: "Apartment not found" });
    res.json({ message: "Apartment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
