import { gql } from "apollo-server-express";

const moduleTypes = gql`
  type Module {
    _id: ID!
    title: String!
    price: Float!
    status: STATUS!
  }

  enum STATUS {
    FREE
    PAID
    TRAIL
  }
`;

const moduleQueriesDefs = `
    modules: [Module!]!
    module(_id: String!): Module!

`;

const moduleMutationsDefs = `

    createModule(data: ModuleInput!): Module!
    updateModule(data: UpdateModuleInput!): Module!
    deleteModule(_id: String!): Module!

`;

const moduleInputs = gql`
  input ModuleInput {
    title: String!
    price: Float!
    status: STATUS!
  }
  input UpdateModuleInput {
    _id: String!
    title: String
    price: Float
    status: STATUS
  }
`;

export { moduleTypes, moduleQueriesDefs, moduleMutationsDefs, moduleInputs };
