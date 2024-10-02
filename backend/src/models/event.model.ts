import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    additionalInfo: { type: String, required: true },
    category: { type: String, required: true },
    venues: [{ type: String, required: true }],
    dates: { start: { type: Date, required: true }, end: { type: Date } },
    sales: {
      public: { start: { type: Date, required: true }, end: { type: Date } },
      presales: [{ start: { type: Date }, end: { type: Date } }],
    },
    priceRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, required: true },
    },
    promoters: [{ type: String }],
    seatmap: { type: String },
  },
  {
    timestamps: true,
  }
);
