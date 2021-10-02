import { gql } from "@apollo/client";
import { GROUP_FRAGMENT, USERGROUP_FRAGMENT } from "../Fragments";

const CREATE_USERGROUP = gql`
  ${GROUP_FRAGMENT}
  mutation createUserGroup(
    $user: String!
    $group: String!
    $accepted: Boolean
    $role: ROLES!
  ) {
    createUserGroup(
      data: { user: $user, group: $group, accepted: $accepted, role: $role }
    ) {
      _id
      accepted
      group {
        ...group
      }
    }
  }
`;

const DELETE_USERGROUP = gql`
  mutation deleteUserGroup($_id: String!) {
    deleteUserGroup(_id: $_id) {
      _id
    }
  }
`;

const UPDATE_USERGROUP = gql`
  ${USERGROUP_FRAGMENT}
  mutation updateUserGroup(
    $_id: String!
    $accepted: Boolean
    $role: ROLES
    $joinDate: Date
  ) {
    updateUserGroup(
      data: { _id: $_id, accepted: $accepted, role: $role, joinDate: $joinDate }
    ) {
      ...userGroup
    }
  }
`;
const INVITE_USERGROUP = gql`
  mutation inviteUserGroup($user: String!, $group: String!, $role: ROLES!) {
    inviteUserGroup(data: { user: $user, group: $group, role: $role }) {
      _id
      user {
        _id
        name
        imageUrl
        email
      }
    }
  }
`;
export {
  CREATE_USERGROUP,
  DELETE_USERGROUP,
  INVITE_USERGROUP,
  UPDATE_USERGROUP,
};
