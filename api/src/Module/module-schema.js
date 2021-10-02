import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      enum: ["FREE", "TRAIL", "PAID"],
      type: String,
      default: "PAID",
    },
    message: {
      text: String,
      file: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Module", moduleSchema);
