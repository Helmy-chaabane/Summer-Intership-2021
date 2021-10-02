import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";

const moduleQueries = {
  async modules(parent, args, { req, User, Module }, info) {
    // await auth(req,User);
    return await Module.find();
  },

  async module(parent, { _id }, { req, User, Module }, info) {
    // await auth(req,User);
    const mod = await Module.findById(_id);
    if (!mod) generateError("No Module with the provided ID!", "NOT_FOUND");
    return mod;
  },
};

export default moduleQueries;
