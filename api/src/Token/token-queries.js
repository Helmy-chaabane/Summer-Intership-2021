const tokenQueries = {
  async tokens(parent, args, { Token }, info) {
    // await auth(req,User);
    return await Token.find();
  },
};

export default tokenQueries;
