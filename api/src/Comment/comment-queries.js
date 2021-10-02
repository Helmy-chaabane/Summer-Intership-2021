import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";

const commentQueries = {
  async comments(parent, args, { req, User, Comment }, info) {
    await auth(req, User);
    return await Comment.find();
  },

  async userComments(parent, { user: _id }, { req, User, Comment }, info) {
    await auth(req, User);
    if (!(await User.findById(_id)))
      generateError("No User with the provided ID!", "NOT_FOUND");

    return await Comment.find({ user: _id });
  },

  async postComments(
    parent,
    { post: _id },
    { req, User, Post, Comment },
    info
  ) {
    await auth(req, User);
    if (!(await Post.findById(_id)))
      generateError("No Group with the provided ID!", "NOT_FOUND");

    return await Comment.find({ post: _id });
  },
};

export default commentQueries;
