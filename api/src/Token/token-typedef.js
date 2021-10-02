import { gql } from "apollo-server-express";

const tokenTypes = gql`
  type Token {
    user: String!
    token: String!
  }
`;

const tokenQueriesDefs = "tokens:[Token]!";
const tokenMutationsDefs = `
  verifyAccount(token:String!):String!
`;

export { tokenTypes, tokenQueriesDefs, tokenMutationsDefs };
