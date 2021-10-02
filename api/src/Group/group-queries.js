import { auth } from "../auth/jwt";
import { generateError } from "../errors/errors";

const groupQueries = {
  async groups(parent, args, { req, User, Group }, info) {
    const user = await auth(req, User);
    return await Group.find({ owner: user.owned });
  },

  async group(parent, { _id }, { req, User, Group }, info) {
    await auth(req, User);
    const group = await Group.findById(_id);
    if (!group)
      return generateError("No Group with the provided ID!", "NOT_FOUND");
    return group;
  },
};

export default groupQueries;
