const userModuleResolver = {
  async module(parent, args, { Module }, info) {
    return Module.findById(parent.module);
  },
};

export default userModuleResolver;
