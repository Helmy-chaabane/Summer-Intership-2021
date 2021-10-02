import { gql } from "apollo-server-express";

const postTypes = gql`
  type Post {
    _id: ID!
    text: String!
    date: Date!
    lastUpdate: Date
    filesUrls: [String]
    numberOfComments: Int!
    group: Group!
    user: User!
    comments: [Comment!]!
    createdAt: Date
  }

  type ProfilePayload {
    posts: [Post!]!
    user: User!
  }

  type PostSubPayload {
    status: String!
    data: Post!
  }
`;

const postQueriesDefs = `
    posts(data:PostSelectors): [Post!]!
    userPosts(user: String!): ProfilePayload!
    groupPosts(group: String!): [Post]!

`;

const postMutationsDefs = `
    createPost(data: PostInput!): Post!
    updatePost(data: UpdatePostInput!): Post!
    deletePost(_id: String!): Post!
`;

const postSubscriptionDefs = `
  postChanged(groupId:String!):PostSubPayload!
`;

const postInputs = gql`
  input PostInput {
    text: String!
    files: [Upload]
    group: String!
    user: String!
  }

  input UpdatePostInput {
    _id: String!
    text: String
    lastUpdate: Date
    group: String
    user: String
  }
  input PostSelectors {
    groupIDs: [String!]
  }
`;

export {
  postTypes,
  postQueriesDefs,
  postMutationsDefs,
  postSubscriptionDefs,
  postInputs,
};
