import { gql } from "@apollo/client";
import { USERGROUP_FRAGMENT } from "../Fragments";

const USER_GROUPS = gql`
  ${USERGROUP_FRAGMENT}
  query userGroups($user: String!) {
    userGroups(user: $user, exist: $exist) {
      ...userGroup
      group {
        _id
        title
        description
        imageUrl
        members
        privacy
      }
    }
  }
`;

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

export { USER_GROUPS, GROUP_USERS };
