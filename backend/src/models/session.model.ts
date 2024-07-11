import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    valid: { type: Boolean, default: true },
    userAgent: { type: String},
  },
  {
    timestamps: true,
  }
);

export const SessionModel = mongoose.model("Session", sessionSchema);
