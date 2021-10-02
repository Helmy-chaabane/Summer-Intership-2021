import { gql } from "@apollo/client";
import { USERGROUP_FRAGMENT } from "../Fragments";

const GROUP_USERS = gql`
  ${USERGROUP_FRAGMENT}
  query groupUsers($group: String!, $accepted: Boolean!, $role: ROLES) {
    groupUsers(data: { group: $group, accepted: $accepted, role: $role }) {
      ...userGroup
      user {
        _id
        email
        name
        imageUrl
        isAdmin
      }
      group {
        _id
        title
      }
    }
  }
`;

export { GROUP_USERS };
