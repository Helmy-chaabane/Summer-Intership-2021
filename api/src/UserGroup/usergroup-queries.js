import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";

const userGroupQueries = {
  async userGroups(parent, { user: _id }, { req, User, UserGroup }, info) {
    await auth(req, User);
    const user = await User.findById(_id);
    if (!user) generateError("No User with the provided ID!", "NOT_FOUND");
    return await UserGroup.find({ user: _id, accepted: true });
  },

  async groupUsers(parent, { data }, { req, User, Group, UserGroup }, info) {
    await auth(req, User);
    const group = await Group.findById(data.group);
    if (!group) generateError("No Group with the provided ID!", "NOT_FOUND");
    return UserGroup.find({ ...data });
  },

  async getAllUsersGroups(parent, args, { req, User, UserGroup }, info) {
    await auth(req, User);
    return await UserGroup.find();
  },
};

export default userGroupQueries;
