import { gql } from "@apollo/client";

const GET_MODULES = gql`
  query getModules {
    modules {
      _id
      title
      status
    }
  }
`;

export { GET_MODULES };
