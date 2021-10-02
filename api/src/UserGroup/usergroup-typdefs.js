import { gql } from "apollo-server-express";

const userGroupTypes = gql`
  type UserGroup {
    _id: ID!
    date: Date!
    joinDate: Date
    createdAt: Date
    accepted: Boolean!
    postNumbers: Int!
    role: ROLES
    group: Group!
    user: User!
  }

  enum ROLES {
    ADMIN
    USER
  }
`;

const userGroupQueriesDefs = `
    getAllUsersGroups: [UserGroup!]!
    userGroups(user: String!): [UserGroup!]!
    groupUsers(data:GroupUsersSelectors!): [UserGroup!]!
`;
const userGroupMutationsDefs = `
     createUserGroup(data: UserGroupInput!): UserGroup!
     updateUserGroup(data:UpdateUserGroupInput!) :UserGroup!
     deleteUserGroup(_id: String!): UserGroup!
     inviteUserGroup(data:InviteUserGroup!): UserGroup!

`;
const userGroupInputs = gql`
  input UserGroupInput {
    user: String!
    group: String!
    joinDate: Date
    role: ROLES
    accepted: Boolean
  }
  input UpdateUserGroupInput {
    _id: String!
    joinDate: Date
    role: ROLES
    accepted: Boolean
  }

  input InviteUserGroup {
    user: String!
    group: String!
    role: ROLES!
  }

  input GroupUsersSelectors {
    group: String!
    accepted: Boolean!
    role: ROLES
  }
`;

export {
  userGroupTypes,
  userGroupQueriesDefs,
  userGroupMutationsDefs,
  userGroupInputs,
};
