import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    lastUpdate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
