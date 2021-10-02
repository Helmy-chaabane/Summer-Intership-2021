import { gql } from "@apollo/client";
import { POST_FRAGMENT } from "../Fragments";

const CREATE_POST = gql`
  ${POST_FRAGMENT}
  mutation createPost(
    $text: String!
    $user: String!
    $group: String!
    $files: [Upload]
  ) {
    createPost(
      data: { text: $text, user: $user, group: $group, files: $files }
    ) {
      ...post
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($_id: String!) {
    deletePost(_id: $_id) {
      _id
    }
  }
`;

export { CREATE_POST, DELETE_POST };
