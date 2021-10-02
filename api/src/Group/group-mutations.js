import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";
import { removeFiles, saveImage } from "../utils/uplaodFiles";

const groupMutations = {
  async createGroup(parent, { data }, { req, User, Group }, info) {
    await auth(req, User);
    const group = await Group.findOne({ title: data.title });
    if (group) generateError("Group aleardy exists!", "CONFLICT");
    let imageUrl = "";
    if (data.image) {
      imageUrl = await saveImage(data.image, "groups");
      delete data.image;
    }

    return new Group({ ...data, imageUrl }).save();
  },

  async deleteGroup(parent, { _id }, { req, User, Group, UserGroup }, info) {
    await auth(req, User);
    const group = await Group.findById(_id);
    if (!group) generateError("No Group with the provided ID!", "NOT_FOUND");
    await group.remove();
    return group;
  },

  async updateGroup(parent, { data }, { req, User, Group }, info) {
    await auth(req, User);
    const { _id, image } = data;
    const group = await Group.findById(_id);
    if (!group) generateError("No Group with the provided ID!", "NOT_FOUND");
    if (image) {
      removeFiles([group.imageUrl]);
      data.imageUrl = await saveImage(data.image, "groups");
      delete data.image;
    }
    return Group.findOneAndUpdate({ _id }, data, { new: true });
  },
};

export default groupMutations;
