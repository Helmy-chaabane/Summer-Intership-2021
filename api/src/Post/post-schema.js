import mongoose from "mongoose";
import Comment from "../Comment/comment-schema";
import { removeFiles } from "../utils/uplaodFiles";
const postSchema = new mongoose.Schema(
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
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    lastUpdate: {
      type: Date,
    },
    filesUrls: [String],
  },
  { timestamps: true }
);

postSchema.pre(
  "remove",
  { document: true, query: false },
  async function (next) {
    const { _id: postId, filesUrls } = this;
    await Comment.deleteMany({ post: postId });
    removeFiles(filesUrls);
    next();
  }
);

postSchema.pre("deleteMany", async function (next) {
  const { _id: postId, filesUrls } = this;
  await Comment.deleteMany({ post: postId });
  if (filesUrls) removeFiles(filesUrls);
  next();
});

export default mongoose.model("Post", postSchema);
