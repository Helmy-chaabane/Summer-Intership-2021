import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../Fragments";

const USERS = gql`
  query users($verified: Boolean, $isGroupAdmin: Boolean, $search: String) {
    users(
      data: {
        verified: $verified
        isGroupAdmin: $isGroupAdmin
        search: $search
      }
    ) {
      _id
      name
      email
      imageUrl
    }
  }
`;

const ME = gql`
  ${USER_FRAGMENT}
  query me {
    me {
      ...user
    }
  }
`;

export { ME, USERS };
