import { withFilter } from "graphql-subscriptions";

const Subscription = {
  commentChanged: {
    subscribe: withFilter(
      (parent, args, { pubsub }, info) => {
        return pubsub.asyncIterator(["COMMENT_ADDED", "COMMENT_DELETED"]);
      },
      async (payload, variables) => {
        return payload.post == variables.postId;
      }
    ),
  },

  postChanged: {
    subscribe: withFilter(
      (parent, args, { pubsub }, info) => {
        return pubsub.asyncIterator(["POST_ADDED", "POST_DELETED"]);
      },
      async (payload, variables) => {
        return payload.group == variables.groupId;
      }
    ),
  },
};

export default Subscription;
