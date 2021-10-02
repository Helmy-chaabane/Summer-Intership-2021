const postResolver = {
  async group(parent, args, { Group }, info) {
    return await Group.findById(parent.group);
  },
  async user(parent, args, { User }, info) {
    return await User.findById(parent.user);
  },
  async comments(parent, args, { Comment }, info) {
    return await Comment.find({ post: parent._id }).sort({ date: 1 }).exec();
  },
  numberOfComments(parent, args, { Comment }, info) {
    return Comment.find({ post: parent._id }).countDocuments();
  },
};

export default postResolver;
