import gql from "graphql-tag";

const INVITATIONS = gql`
  query invitations($accepted: Boolean!, $isPending: Boolean) {
    invitations(accepted: $accepted, isPending: $isPending) {
      _id
      email
      invitationDate
      acceptedDate
      user {
        _id
        name
        imageUrl
        isBlocked
      }
    }
  }
`;

export { INVITATIONS };
