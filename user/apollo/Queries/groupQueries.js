import { COMMENT_FRAGMENT, GROUP_FRAGMENT, POST_FRAGMENT } from "../Fragments";
import { gql } from "@apollo/client";

const GROUP = gql`
  ${GROUP_FRAGMENT}
  ${POST_FRAGMENT}
  query group($_id: String!, $user: String) {
    group(_id: $_id, user: $user) {
      ...group
      posts {
        ...post
      }
      users {
        _id
        accepted
        role
      }
    }
  }
`;

const GROUPS = gql`
  ${GROUP_FRAGMENT}
  query groups($user: String) {
    groups(user: $user) {
      ...group
      users {
        _id
        accepted
      }
    }
  }
`;

export { GROUPS, GROUP };
