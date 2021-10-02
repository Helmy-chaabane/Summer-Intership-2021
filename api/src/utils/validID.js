import mongoose from "mongoose";

export const inValidMongooseId = (id) => {
  return id && mongoose.Types.ObjectId.isValid(id);
};
