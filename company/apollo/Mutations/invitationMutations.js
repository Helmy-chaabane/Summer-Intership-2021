import { gql } from "@apollo/client";

const CREATE_INVITATION = gql`
  mutation createInvitation($emails: [String!]!, $description: String) {
    createInvitation(data: { emails: $emails, description: $description }) {
      _id
      email
      invitationDate
      acceptedDate
      accepted
      isPending
    }
  }
`;

const DELETE_INVITATION = gql`
  mutation deleteInvitation($_id: String!) {
    deleteInvitation(_id: $_id) {
      _id
    }
  }
`;

const UPDATE_INVITATION = gql`
  mutation updateInvitation(
    $_id: String!
    $accepted: Boolean
    $isPending: Boolean
    $acceptedDate: Date
  ) {
    updateInvitation(
      data: {
        _id: $_id
        accepted: $accepted
        isPending: $isPending
        acceptedDate: $acceptedDate
      }
    ) {
      _id
      user {
        _id
      }
    }
  }
`;

export { CREATE_INVITATION, DELETE_INVITATION, UPDATE_INVITATION };
