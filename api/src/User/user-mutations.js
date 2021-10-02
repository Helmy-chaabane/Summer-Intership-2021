import { generateError } from "../errors/errors";
import { genrerateToken, auth } from "../auth/jwt";
import { welcomeEmail, resetPasswordMail } from "../utils/emails";
import { saveImage, removeFiles } from "../utils/uplaodFiles";
import { inValidMongooseId } from "../utils/validID";

const userMutations = {
  async login(parent, { data }, { User }, info) {
    const user = await User.findByCredentials(data);
    if (!user.isVerified)
      return generateError("Please verify your account first!", "FORBIDDEN");
    if (!user.isAdmin && user.isPending)
      return generateError(
        "Please wait until your account be accepted!",
        "FORBIDDEN"
      );
    if (user.isBlocked)
      return generateError("This account is Blocked!", "FORBIDDEN");
    const token = genrerateToken({ _id: user._id });
    return { user, token };
  },

  async signup(parent, { data }, { User, Token }, info) {
    if (!data.owned && !data.isAdmin) {
      generateError("Define an Owner", "CONFLICT");
    } else if (data.owned && !data.isAdmin) {
      if (!inValidMongooseId(data.owned))
        generateError("Provide a valid ID!", "BAD_USER_INPUT");
    }
    const user = await User.register(data);
    if (user.isAdmin) user.owned = user._id;
    else user.owned = data.owned;
    await user.save();
    const token = genrerateToken({ _id: user._id });
    await Token.create({ user: user._id, token });
    return welcomeEmail(user.isAdmin, user.email, user.name, token);
  },

  async deleteUser(parent, { _id }, { req, User }, info) {
    await auth(req, User);
    if (!inValidMongooseId(_id))
      generateError("Provide a valid ID!", "BAD_USER_INPUT");
    const user = await User.findById(_id);
    if (!user) generateError("No User with the provided ID!", "NOT_FOUND");
    await user.remove();
    return user;
  },

  async updateUser(parent, { data }, { req, User }, info) {
    await auth(req, User);
    const { _id, image } = data;
    if (!inValidMongooseId(_id))
      generateError("Provide a valid ID!", "BAD_USER_INPUT");
    let user = await User.findById(_id);
    if (!user) generateError("No User with the provided ID!", "NOT_FOUND");
    if (image) {
      removeFiles([user.imageUrl]);
      const imageUrl = await saveImage(image, "profiles");
      delete data.image;
      data.imageUrl = imageUrl;
    }
    Object.assign(user, data);
    return user.save();
  },

  async updateUserCompany(parent, { data }, { req, User }, info) {
    const user = await auth(req, User);
    const { image } = data;
    if (image) {
      if (user.company && user.company.imageUrl)
        removeFiles([user.company.imageUrl]);
      const imageUrl = await saveImage(image, "companies");
      delete data.image;
      data.imageUrl = imageUrl;
    }
    if (!user.company) user.company = data;
    else Object.assign(user.company, data);
    return user.save();
  },

  async forgetPassword(parent, { email }, { User }, info) {
    const user = await User.findOne({ email });
    if (!user) generateError("No User with the provided Email", "NOT_FOUND");
    const token = genrerateToken({ _id: user._id }, "30m");
    return resetPasswordMail(user.isAdmin, email, token);
  },

  async resetPassword(parent, { data }, { req, User, Token }, info) {
    const user = await auth(req, User, data.token);
    user.password = data.password;
    await user.save();
    return "password has been changed successfully";
  },

  async addModulesforUser(parent, { modules }, { req, User }, info) {
    const user = await auth(req, User);
    modules.forEach((module) => {
      if (
        !user.modules.some((m) => m.module.toString() === module.toString())
      ) {
        user.modules.push({
          module,
          paid: true,
          end: Date.now(),
          start: Date.now(),
        });
      }
    });
    await user.save();
    return user.modules;
  },
};

export default userMutations;
