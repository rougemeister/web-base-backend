import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: {
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
    rent: { type: Number, required: true },
    currency: { type: String, default: "GHS" },
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [{ type: String }],
    amenities: [{ type: String }],
    status: {
      type: String,
      enum: ["available", "rented", "inactive"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Apartment", apartmentSchema);
