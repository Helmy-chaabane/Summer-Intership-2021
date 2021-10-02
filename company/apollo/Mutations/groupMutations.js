import { gql } from "@apollo/client";
import { GROUP_FRAGMENT } from "../Fragments";

const CREATE_GROUP = gql`
  mutation createGroup(
    $title: String!
    $description: String
    $privacy: PRIVACY!
    $image: Upload
    $owner: String!
  ) {
    createGroup(
      data: {
        title: $title
        description: $description
        privacy: $privacy
        image: $image
        owner: $owner
      }
    ) {
      _id
    }
  }
`;

const UPDATE_GROUP = gql`
  ${GROUP_FRAGMENT}
  mutation updateGroup(
    $_id: String!
    $title: String
    $description: String
    $privacy: PRIVACY
    $image: Upload
  ) {
    updateGroup(
      data: {
        _id: $_id
        title: $title
        description: $description
        privacy: $privacy
        image: $image
      }
    ) {
      ...group
    }
  }
`;

const DELETE_GROUP = gql`
  mutation deleteGroup($_id: String!) {
    deleteGroup(_id: $_id) {
      _id
      title
    }
  }
`;

export { CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP };
