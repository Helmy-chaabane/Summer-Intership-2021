const userResolver = {
  modules(parent, args, ctx, info) {
    return parent.modules;
  },
  groups(parent, args, { UserGroup }, info) {
    return UserGroup.find({ user: parent._id, accepted: true });
  },
  posts(parent, args, { Post }, info) {
    return Post.find({ user: parent._id });
  },
  comments(parent, args, { Comment }, info) {
    return Comment.find({ user: parent._id });
  },
  owned(parent, args, { User }, info) {
    return User.findById(parent.owned);
  },
  company(parent, args, ctx, info) {
    return parent.company;
  },
};

export default userResolver;
