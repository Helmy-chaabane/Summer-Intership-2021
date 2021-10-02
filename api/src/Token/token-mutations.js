import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";

const tokenMutations = {
  async verifyAccount(
    parent,
    { token },
    { req, User, Token, Module, Invitation },
    info
  ) {
    const user = await auth(req, User, token);
    const tokenCollection = await Token.findOne({ token });
    if (!tokenCollection && !user.isVerified) {
      await User.findByIdAndRemove(user._id);
      return generateError(
        `Your token does not exist or already expired, please (re)signup`,
        "NOT_FOUND"
      );
    }

    if (!tokenCollection && user.isVerified) return "User already verified !";
    await Token.findByIdAndRemove(tokenCollection._id);

    user.isVerified = true;
    user.date = Date.now();

    const freeModules = await Module.find({ status: "FREE" });
    freeModules.forEach((module) => {
      user.modules.push({
        module,
        paid: true,
        end: Date.now(),
        start: Date.now(),
      });
    });

    if (user.isAdmin) {
      user.isPending = false;
    } else {
      const invitation = await Invitation.findOne({ email: user.email });
      if (invitation) {
        invitation.accepted = true;
        invitation.user = user._id;
        invitation.acceptedDate = Date.now();
        await invitation.save();
      } else {
        user.isPending = true;
        await new Invitation({
          user: user._id,
          email: user.email,
          isPending: true,
        }).save();
      }
    }
    await user.save();
    return !user.isPending
      ? "Thank you for verifying you account, You can access your account now!"
      : "Thank you for verifying you account, Please wait until your account be accepted!";
  },
};

export default tokenMutations;
