import gql from "graphql-tag";
import { POST_FRAGMENT } from "../Fragments";

const POST_SUBSCRIPTION = gql`
  ${POST_FRAGMENT}
  subscription postChanged($groupId: String!) {
    postChanged(groupId: $groupId) {
      data {
        ...post
      }
      status
    }
  }
`;

export { POST_SUBSCRIPTION };
