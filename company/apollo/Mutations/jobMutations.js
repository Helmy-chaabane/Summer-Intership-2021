import gql from "graphql-tag";

const DELETE_JOB = gql`
  mutation deleteJob($_id: String!) {
    deleteJob(_id: $_id) {
      _id
    }
  }
`;

const CREATE_JOB = gql`
  mutation createJob($title: String!) {
    createJob(data: { title: $title }) {
      _id
      title
    }
  }
`;

export { CREATE_JOB, DELETE_JOB };
