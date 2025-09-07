import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// ➕ Create Payment
router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📄 Get All Payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("tenantId", "name email")
      .populate("apartmentId", "title rent");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📄 Get Payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("tenantId", "name email")
      .populate("apartmentId", "title rent");
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✏️ Update Payment
router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🗑 Delete Payment
router.delete("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
