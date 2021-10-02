const userGroupResolver = {
  user(parent, args, { User }, info) {
    return User.findById(parent.user);
  },

  group(parent, args, { Group }, info) {
    return Group.findById(parent.group);
  },
  postNumbers(parent, args, { Post }, info) {
    return Post.find({
      group: parent.group,
      user: parent.user,
    }).countDocuments();
  },
};

export default userGroupResolver;
