import { gql } from "apollo-server-express";

const invitationTypes = gql`
  type Invitation {
    _id: ID!
    email: String!
    description: String!
    invitationDate: Date!
    acceptedDate: Date
    accepted: Boolean!
    isPending: Boolean
    user: User
  }
`;

const invitationQueriesDefs = `
   invitations(accepted:Boolean!,isPending:Boolean):[Invitation!]
`;

const invitationMutationsDefs = `
    createInvitation(data: invitationInput!): [Invitation!]!
    acceptInvitation(email:String!): Invitation!
    deleteInvitation(_id: String!): Invitation!
    updateInvitation(data:UpdateInvitationInput!):Invitation!
    deleteAllInvitation:String!
`;

const invitationInputs = gql`
  input invitationInput {
    emails: [String!]!
    description: String
  }

  input UpdateInvitationInput {
    _id: String!
    email: String
    description: String
    invitationDate: Date
    acceptedDate: Date
    accepted: Boolean
    isPending: Boolean
  }
`;

export {
  invitationTypes,
  invitationQueriesDefs,
  invitationMutationsDefs,
  invitationInputs,
};
