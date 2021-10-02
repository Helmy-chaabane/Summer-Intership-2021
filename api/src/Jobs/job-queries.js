import { auth } from "../auth/jwt";

const jobQueries = {
  async jobs(parent, args, { req, User, Job }, info) {
    const user = await auth(req, User);

    return Job.find({ owned: user.isAdmin ? user._id : user.owned })
      .sort({ date: -1 })
      .exec();
  },
};

export default jobQueries;
