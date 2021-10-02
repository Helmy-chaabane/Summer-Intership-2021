import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";

const userQueries = {
  async users(parent, { data }, { req, User }, info) {
    const user = await auth(req, User);
    if (data && !data.isGroupAdmin)
      return User.find({ isVerified: data.verified, owned: user.owned });
    return User.find({
      isVerified: data.verified,
      isAdmin: false,
      owned: user.owned,
      _id: { $ne: user._id },
      $or: [
        { name: { $regex: "^" + data.search } },
        { email: { $regex: "^" + data.search } },
      ],
    });
  },

  async user(parent, { _id }, { req, User }, info) {
    await auth(req, User);
    const user = await User.findById(_id);
    if (!user) generateError("No User with the provided ID!", "NOT_FOUND");
    return user;
  },

  async me(parent, args, { req, User }, info) {
    const me = await auth(req, User);
    return me;
  },
};

export default userQueries;
