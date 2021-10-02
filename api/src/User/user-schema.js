import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserGroup from "../UserGroup/usergroup-schema";
import Post from "../Post/post-schema";
import Comment from "../Comment/comment-schema";
import Token from "../Token/token-schema";
import Invitation from "../Invitation/invitation-schema";
import Job from "../Jobs/job.schema";
import { generateError } from "../errors/errors";
import { removeFiles } from "../utils/uplaodFiles";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firstRun: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    diploma: {
      type: String,
    },
    job: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    isPending: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    owned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    company: new mongoose.Schema({
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
      description: {
        type: String,
      },
      imageUrl: {
        type: String,
      },
    }),

    modules: [
      {
        start: {
          type: Date,
          //  required: true,
          default: Date.now(),
        },
        end: {
          type: Date,
          //  required: true,
          default: Date.now(),
        },
        module: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Module",
          required: true,
        },
        paid: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.findByCredentials = async function ({ email, password }) {
  const user = await this.findOne({ email });
  if (!user) generateError("Invalid User!", "UNAUTHORIZED");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) generateError("Invalid credentials!", "UNAUTHORIZED");
  return user;
};

userSchema.statics.register = async function (newUser) {
  const user = await this.findOne({ email: newUser.email });
  if (user) generateError("User already exists with this email!", "CONFLICT");

  return new this(newUser).save();
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      process.env.PASSWORDHASH || 8
    );
  }
  next();
});

userSchema.pre(
  "remove",
  { document: true, query: false },
  async function (next) {
    const { _id: userId, imageUrl, isAdmin } = this;
    await Comment.deleteMany({ user: userId });
    await Post.deleteMany({ user: userId });
    await UserGroup.deleteMany({ user: userId });
    await Token.deleteMany({ user: userId });

    await Invitation.deleteMany({
      $or: [{ user: userId }, { owned: userId }],
    });
    if (imageUrl) removeFiles([imageUrl]);
    if (isAdmin) {
      await this.deleteMany({ owned: userId });
      await Job.deleteMany({ owned: userId });
    }
    next();
  }
);

export default mongoose.model("User", userSchema);
