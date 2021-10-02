import gql from "graphql-tag";

const JOBS = gql`
  query jobs {
    jobs {
      _id
      title
    }
  }
`;

export { JOBS };
