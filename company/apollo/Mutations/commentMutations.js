import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT } from "../Fragments";

const CREATE_COMMENT = gql`
  ${COMMENT_FRAGMENT}
  mutation createComment($text: String!, $user: String!, $post: String!) {
    createComment(data: { user: $user, post: $post, text: $text }) {
      ...comment
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($_id: String!) {
    deleteComment(_id: $_id) {
      _id
    }
  }
`;

export { CREATE_COMMENT, DELETE_COMMENT };
