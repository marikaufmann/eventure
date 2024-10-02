import mongoose from "mongoose";
import { UserType } from "../shared/types";
import bcrypt from "bcryptjs";

const eventSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
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

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String },
    phone: { type: String },
    events: [eventSchema],
    savedEvents: [eventSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next();
});

export const UserModel = mongoose.model<UserType>("User", userSchema);
