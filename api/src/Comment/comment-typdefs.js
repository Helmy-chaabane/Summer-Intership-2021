import { gql } from "apollo-server-express";

const commentTypes = gql`
  type Comment {
    _id: ID!
    text: String!
    date: Date!
    lastUpdate: Date
    createdAt: Date
    post: Post!
    user: User!
  }

  type CommentSubPayload {
    status: String!
    data: Comment!
  }
`;

const commentQueriesDefs = `
    comments: [Comment!]!
    userComments(user: String!): [Comment]!
    postComments(post: String!): [Comment]!
`;

const commentMutationsDefs = `
    createComment(data: CommentInput!): Comment!
    updateComment(data: UpdateCommentInput!): Comment!
    deleteComment(_id: String!): Comment!
`;

const commentSubscriptionDefs = `
  commentChanged(postId:String!):CommentSubPayload!
`;

const commentInputs = gql`
  input CommentInput {
    text: String!
    post: String!
    user: String!
  }

  input UpdateCommentInput {
    _id: String!
    text: String
  }
`;

export {
  commentTypes,
  commentQueriesDefs,
  commentMutationsDefs,
  commentSubscriptionDefs,
  commentInputs,
};
