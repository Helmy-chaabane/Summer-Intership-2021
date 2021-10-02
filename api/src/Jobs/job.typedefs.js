import { gql } from "apollo-server-express";

const jobTypes = gql`
  type Job {
    _id: ID!
    title: String!
    date: Date!
  }
`;

const jobQueriesDefs = `
   jobs:[Job!]!
`;

const jobMutationsDefs = `
    createJob(data:jobInput!): Job!
    deleteJob(_id: String!): Job!
`;

const jobInputs = gql`
  input jobInput {
    title: String!
  }
`;

export { jobTypes, jobQueriesDefs, jobMutationsDefs, jobInputs };
