import { auth } from "../auth/jwt";
import { generateError } from "../errors/errors";

const jobMutations = {
  async createJob(parent, { data }, { req, User, Job }, info) {
    const user = await auth(req, User);
    const job = await Job.findOne({ title: data.title });
    if (job) generateError("Job already exist", "CONFLICT");
    return new Job({ title: data.title, owned: user._id }).save();
  },

  async deleteJob(parent, { _id }, { req, User, Job }, info) {
    await auth(req, User);
    const job = await Job.findByIdAndDelete(_id);
    if (!job) return generateError("No Job with the provided ID!", "NOT_FOUND");
    return job;
  },
};

export default jobMutations;
