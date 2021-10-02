import mongoose from "mongoose";

const userGroupSchema = new mongoose.Schema(
  {
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
    joinDate: {
      type: Date,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    role: {
      enum: ["ADMIN", "USER"],
      type: String,
      default: "USER",
    },
  },
  { timestamps: true }
);

/*userGroupSchema.pre(
  "remove",
  { document: true, query: false },
  async function (next) {
    const { user } = this;
    await Comment.deleteMany({ user });
    await Post.deleteMany({ user });

    next();
  }
);*/

export default mongoose.model("UserGroup", userGroupSchema);
