import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";

const userGroupMutations = {
  async createUserGroup(
    parent,
    { data },
    { req, User, Group, UserGroup },
    info
  ) {
    await auth(req, User);
    const user = await User.findById(data.user);
    if (!user) generateError("No User with the provided ID!", "NOT_FOUND");
    const group = await Group.findById(data.group);
    if (!group) generateError("No Group with the provided ID!", "NOT_FOUND");
    const userGroup = await UserGroup.findOne({
      user: data.user,
      group: data.group,
    });
    if (userGroup && !userGroup.accepted)
      generateError("User is not accepted yet!", "CONFLICT");
    if (userGroup && userGroup.accepted)
      generateError("User in this Group aleardy exists!", "CONFLICT");
    if (data.role === "ADMIN") {
      data.date = Date.now();
      data.joinDate = data.date;
    }
    return new UserGroup(data).save();
  },

  async deleteUserGroup(parent, { _id }, { req, User, UserGroup }, info) {
    await auth(req, User);
    const userGroup = await UserGroup.findByIdAndDelete(_id);
    if (!userGroup)
      generateError("No UserGroup with the provided ID!", "NOT_FOUND");
    return userGroup;
  },

  async updateUserGroup(parent, { data }, { req, User, UserGroup }, info) {
    await auth(req, User);
    const userGroup = await UserGroup.findOneAndUpdate(
      { _id: data._id },
      { ...data },
      { new: true }
    );
    if (!userGroup)
      generateError("No UserGroup with the provided ID!", "NOT_FOUND");

    return userGroup;
  },

  async inviteUserGroup(
    parent,
    { data },
    { req, User, Group, UserGroup },
    info
  ) {
    await auth(req, User);
    const user = await User.findById(data.user);
    if (!user) generateError("No User with the provided ID!", "NOT_FOUND");
    const group = await Group.findById(data.group);
    if (!group) generateError("No Group with the provided ID!", "NOT_FOUND");
    const userGroup = await UserGroup.findOne({
      user: data.user,
      group: data.group,
    });
    if (!userGroup && !data._id) {
      if (data.role === "ADMIN") {
        data.date = Date.now();
        data.joinDate = data.date;
      }
      return new UserGroup({ ...data, accepted: true }).save();
    }
    if (userGroup.role === data.role && userGroup.accepted)
      generateError("User with this role aleardy exists!", "CONFLICT");

    if (data.role === "USER" && userGroup.role === "ADMIN")
      generateError("This User is an admin on this group!", "CONFLICT");
    userGroup.role = data.role;
    if (!userGroup.accepted) {
      userGroup.accepted = true;
      userGroup.joinDate = Date.now();
    }
    return userGroup.save();
  },
};

export default userGroupMutations;
