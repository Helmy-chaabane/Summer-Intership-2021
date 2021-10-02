import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";

const moduleMutations = {
  async createModule(parent, { data }, { req, User, Module }, info) {
    // await auth(req,User);
    const mod = await Module.findOne({ title: data.title });
    if (mod) generateError("Module aleardy exists!", "CONFLICT");

    return new Module(data).save();
  },

  async deleteModule(parent, { _id }, { req, User, Module }, info) {
    // await auth(req,User);
    const mod = await Module.findByIdAndDelete(_id);
    if (!mod) generateError("No Module with the provided ID!", "NOT_FOUND");
    return mod;
  },

  async updateModule(parent, { data }, { req, User, Module }, info) {
    // await auth(req,User);
    const { _id } = data;
    let mod = await Module.findByIdAndUpdate({ _id }, data);
    if (!mod) generateError("No Module with the provided ID!", "NOT_FOUND");
    return await Module.findById(_id);
  },
};

export default moduleMutations;
