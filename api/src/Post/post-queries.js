import { generateError } from "../errors/errors";
import { auth } from "../auth/jwt";
import mongoose from "mongoose";

const postQueries = {
  async posts(parent, { data }, { req, User, Post, Group }, info) {
    const user = await auth(req, User);
    let id = mongoose.Types.ObjectId(user.owned);
    let aggregation = [];
    if (!user.isAdmin) {
      const groups = data.groupIDs.map((group) =>
        mongoose.Types.ObjectId(group)
      );

      aggregation = [...aggregation, { $match: { group: { $in: groups } } }];
    }
    aggregation = [
      ...aggregation,
      {
        $lookup: {
          from: "groups",
          localField: "group",
          foreignField: "_id",
          as: "groups",
        },
      },
      { $match: { "groups.owner": id } },
    ];

    const posts = await Post.aggregate(aggregation).sort({ date: -1 });

    return posts;
  },

  async userPosts(parent, { user: _id }, { req, User, Post }, info) {
    await auth(req, User);

    const user = await User.findById(_id);
    if (!user) generateError("No User with the provided ID!", "NOT_FOUND");
    return {
      user,
      posts: await Post.find({ user: _id }).sort({ date: -1 }).exec(),
    };
  },

  async groupPosts(parent, { group: _id }, { req, User, Group, Post }, info) {
    await auth(req, User);
    if (!(await Group.findById(_id)))
      generateError("No Group with the provided ID!", "NOT_FOUND");
    return Post.find({ group: _id }).sort({ date: -1 }).exec();
  },
};

export default postQueries;
