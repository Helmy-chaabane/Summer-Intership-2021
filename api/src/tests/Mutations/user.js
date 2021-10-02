import { gql } from "apollo-server-express";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        _id
      }
    }
  }
`;

const SIGN_UP = gql`
  mutation signup(
    $name: String!
    $email: String!
    $password: String!
    $phone: String
    $isAdmin: Boolean
  ) {
    signup(
      data: {
        name: $name
        email: $email
        password: $password
        phone: $phone
        isAdmin: $isAdmin
      }
    )
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($_id: String!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;
const UPDATE_USER = gql`
  mutation updateUser(
    $_id: String!
    $name: String
    $email: String
    $password: String
    $isAdmin: Boolean
    $firstRun: Boolean
    $isVerified: Boolean
    $phone: String
    $location: String
    $diploma: String
    $job: String
    $birthDate: String
  ) {
    updateUser(
      data: {
        _id: $_id
        name: $name
        email: $email
        password: $password
        isAdmin: $isAdmin
        firstRun: $firstRun
        isVerified: $isVerified
        phone: $phone
        location: $location
        diploma: $diploma
        job: $job
        birthDate: $birthDate
      }
    ) {
      _id
      name
    }
  }
`;

export { LOGIN, SIGN_UP, DELETE_USER, UPDATE_USER };
