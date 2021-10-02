import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";

const commentMutations = {
  async createComment(
    parent,
    { data },
    { req, User, UserGroup, Post, Comment, pubsub },
    info
  ) {
    await auth(req, User);
    const post = await Post.findById(data.post);
    if (!post) generateError("No Post with the provided ID!", "NOT_FOUND");
    if (!(await User.findById(data.user)))
      generateError("No User with the provided ID!", "NOT_FOUND");
    if (!(await UserGroup.findOne({ user: data.user, group: post.group })))
      generateError(
        "This User can not comment, the User does not exist in this Group",
        "FORBIDDEN"
      );
    const comment = new Comment(data).save();
    pubsub.publish("COMMENT_ADDED", {
      commentChanged: { data: comment, status: "ADD" },
      post: data.post,
    });
    return comment;
  },

  async updateComment(parent, { data }, { req, User, Comment }, info) {
    await auth(req, User);
    const { _id } = data;
    data.lastUpdate = Date.now();
    const comment = await Comment.findByIdAndUpdate({ _id }, data);
    if (!comment)
      generateError("No Comment with the provided ID!", "NOT_FOUND");
    return await Comment.findById(_id);
  },

  async deleteComment(parent, { _id }, { req, User, Comment, pubsub }, info) {
    await auth(req, User);
    const comment = await Comment.findByIdAndDelete(_id);
    if (!comment)
      generateError("No Comment with the provided ID!", "NOT_FOUND");
    pubsub.publish("COMMENT_DELETED", {
      commentChanged: { data: comment, status: "DELETE" },
      post: comment.post,
    });
    return comment;
  },
};

export default commentMutations;
