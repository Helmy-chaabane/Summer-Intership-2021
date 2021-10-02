import gql from "graphql-tag";
import { COMMENT_FRAGMENT } from "../Fragments";

const COMMENT_SUBSCRIPTION = gql`
  ${COMMENT_FRAGMENT}
  subscription commentChanged($postId: String!) {
    commentChanged(postId: $postId) {
      data {
        ...comment
      }
      status
    }
  }
`;

export { COMMENT_SUBSCRIPTION };
