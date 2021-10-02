import gql from "graphql-tag";

export const JOBS = gql`
  query jobs {
    jobs {
      _id
      title
    }
  }
`;
