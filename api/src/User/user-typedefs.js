import { gql } from "apollo-server-express";

const userTypes = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean
    firstRun: Boolean
    isVerified: Boolean!
    isPending: Boolean
    isBlocked: Boolean
    date: Date!
    createdAt: Date
    imageUrl: String
    phone: String
    location: String
    diploma: String
    job: String
    birthDate: String
    description: String
    owned: User
    company: Company
    modules: [UserModule!]!
    groups: [UserGroup!]!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Company {
    _id: ID
    name: String
    email: String
    phone: String
    address: String
    description: String
    imageUrl: String
  }

  type UserModule {
    _id: ID!
    start: Date!
    end: Date!
    paid: Boolean!
    module: Module!
  }

  type AuthResponse {
    user: User!
    token: String!
  }
`;

const userQueriesDefs = `
    users(data:UserSelectors): [User!]!
    user(_id: String!): User!
    me:User!
 `;

const userMutationsDefs = `
    login(data: LoginInput!): AuthResponse!
    signup(data: signupInput!): String!
    updateUser(data: UpdateUserInput!): User!
    updateUserCompany(data:UserCompanyInput!):User!
    deleteUser(_id: String!): User!
    forgetPassword(email:String!): String!
    resetPassword(data:ResetPasswordInput!):String!
    addModulesforUser(modules:[String!]!):[UserModule!]!
    deleteModulesForUser(_id:String):User!
 `;

const userInputs = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  input signupInput {
    name: String!
    email: String!
    password: String!
    phone: String
    isAdmin: Boolean
    firstRun: Boolean
    owned: String
  }
  input UpdateUserInput {
    _id: String!
    name: String
    email: String
    password: String
    firstRun: Boolean
    isAdmin: Boolean
    isVerified: Boolean
    isBlocked: Boolean
    isPending: Boolean
    image: Upload
    imageUrl: String
    phone: String
    location: String
    diploma: String
    job: String
    description: String
    birthDate: String
    owned: String
  }

  input ResetPasswordInput {
    token: String!
    password: String!
  }

  input UserSelectors {
    verified: Boolean
    isGroupAdmin: Boolean
    search: String
  }

  input UserCompanyInput {
    _id: String
    name: String
    email: String
    phone: String
    address: String
    description: String
    image: Upload
    imageUrl: String
  }
`;

export { userTypes, userQueriesDefs, userMutationsDefs, userInputs };
