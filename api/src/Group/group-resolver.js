const groupResolver = {
  users(parent, args, { UserGroup }, info) {
    return UserGroup.find({
      group: parent._id,
      user: info.variableValues.user,
    });
  },

  owner(parent, args, { User }, info) {
    return User.findById(parent.owner);
  },

  posts(parent, args, { Post }, info) {
    return Post.find({ group: parent._id }).sort({ date: -1 }).exec();
  },
  members(parent, args, { UserGroup }, info) {
    return UserGroup.find({
      group: parent._id,
      accepted: true,
    }).countDocuments();
  },
  pending(parent, args, { UserGroup }, info) {
    return UserGroup.find({
      group: parent._id,
      accepted: false,
    }).countDocuments();
  },
  postNumbers(parent, args, { Post }, info) {
    return Post.find({ group: parent._id }).countDocuments();
  },
};

export default groupResolver;
