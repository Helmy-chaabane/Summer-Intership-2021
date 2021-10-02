import { gql } from "@apollo/client";
import { GROUP_FRAGMENT } from "../Fragments";

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

export { UPDATE_GROUP };
