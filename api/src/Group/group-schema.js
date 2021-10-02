import mongoose from "mongoose";
import Post from "../Post/post-schema";
import UserGroup from "../UserGroup/usergroup-schema";
import { removeFiles } from "../utils/uplaodFiles";

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    privacy: {
      enum: ["PUBLIC", "PRIVATE"],
      type: String,
      default: "PUBLIC",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

groupSchema.pre(
  "remove",
  { document: true, query: false },
  async function (next) {
    const { _id: groupId, imageUrl } = this;
    await Post.deleteMany({ group: groupId });
    await UserGroup.deleteMany({ group: groupId });
    removeFiles([imageUrl]);
    next();
  }
);

export default mongoose.model("Group", groupSchema);
