import gql from "graphql-tag";

const INVITATIONS = gql`
  query invitations($accepted: Boolean!) {
    invitations(accepted: $accepted) {
      _id
      email
      invitationDate
    }
  }
`;

export { INVITATIONS };
