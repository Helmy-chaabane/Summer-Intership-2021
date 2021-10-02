import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";
import { saveFile } from "../utils/uplaodFiles";
import { inValidMongooseId } from "../utils/validID";

const postMutations = {
  async createPost(
    parent,
    { data },
    { req, User, Group, UserGroup, Post, pubsub },
    info
  ) {
    await auth(req, User);
    if (!(await Group.findById(data.group)))
      generateError("No Group with the provided ID!", "NOT_FOUND");
    if (!(await User.findById(data.user)))
      generateError("No User with the provided ID!", "NOT_FOUND");
    if (!(await UserGroup.findOne({ user: data.user, group: data.group })))
      generateError(
        "This User can not post, the User does not exist in this Group",
        "FORBIDDEN"
      );
    if (data.files) {
      let imagesUrls = [];
      for (let index = 0; index < data.files.length; index++) {
        imagesUrls.push(await saveFile(data.files[index]));
      }
      delete data.files;
      data.filesUrls = imagesUrls;
    }

    const post = new Post(data).save();
    pubsub.publish("POST_ADDED", {
      postChanged: { data: post, status: "ADD" },
      group: data.group,
    });

    return post;
  },

  async updatePost(parent, { data }, { req, User, Post }, info) {
    await auth(req, User);
    const { _id } = data;
    const post = await Post.findByIdAndUpdate({ _id }, data);
    if (!post) generateError("No Post with the provided ID!", "NOT_FOUND");
    return await Post.findById(_id);
  },

  async deletePost(
    parent,
    { _id },
    { req, User, UserGroup, Post, pubsub },
    info
  ) {
    const user = await auth(req, User);
    if (!inValidMongooseId(_id))
      generateError("Provide a valid ID!", "BAD_USER_INPUT");
    const post = await Post.findById(_id);
    if (!post) generateError("No Post with the provided ID!", "NOT_FOUND");
    const ug = await UserGroup.findOne({ user: user._id, group: post.group });
    if (!ug)
      generateError(
        "This User can not delete this post, User does not exist in this Group",
        "FORBIDDEN"
      );

    if (ug.role !== "ADMIN" && post.user.toString() !== user._id.toString())
      generateError(
        "This User can not delete this post, Not an admin or dont own this post",
        "FORBIDDEN"
      );

    await post.remove();
    pubsub.publish("POST_DELETED", {
      postChanged: { data: post, status: "DELETE" },
      group: post.group,
    });
    return post;
  },
};

export default postMutations;
