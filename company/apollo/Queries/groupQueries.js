import { COMMENT_FRAGMENT, GROUP_FRAGMENT, POST_FRAGMENT } from "../Fragments";
import { gql } from "@apollo/client";

const GROUP = gql`
  ${GROUP_FRAGMENT}
  ${POST_FRAGMENT}
  query group($_id: String!) {
    group(_id: $_id) {
      ...group
      posts {
        ...post
      }
    }
  }
`;

export { GROUP };
