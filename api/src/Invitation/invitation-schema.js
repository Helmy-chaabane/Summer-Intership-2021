import mongoose from "mongoose";
const invitationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    acceptedDate: {
      type: Date,
    },
    invitationDate: {
      type: Date,
      default: Date.now(),
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    owned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPending: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invitation", invitationSchema);
