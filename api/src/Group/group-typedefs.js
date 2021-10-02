import { gql } from "apollo-server-express";

const groupTypes = gql`
  type Group {
    _id: ID!
    title: String!
    description: String!
    imageUrl: String!
    date: Date!
    createdAt: Date
    pending: Int!
    postNumbers: Int!
    members: Int!
    privacy: PRIVACY!
    owner: User
    users: [UserGroup!]!
    posts: [Post!]!
  }

  enum PRIVACY {
    PUBLIC
    PRIVATE
  }
`;

const groupQueriesDefs = `
   groups(user:String): [Group!]!
   group(_id: String!,user:String): Group!
  
`;

const groupMutationsDefs = `
   createGroup(data: GroupInput!): Group!
   updateGroup(data: UpdateGroupInput!): Group!
   deleteGroup(_id: String!): Group!

`;

const groupInputs = gql`
  input GroupInput {
    title: String!
    description: String
    privacy: PRIVACY!
    image: Upload
    owner: String!
  }

  input UpdateGroupInput {
    _id: String!
    title: String
    description: String
    privacy: PRIVACY
    image: Upload
    owner: String
  }
`;

export { groupTypes, groupQueriesDefs, groupMutationsDefs, groupInputs };
