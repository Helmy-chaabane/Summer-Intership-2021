import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../Fragments";

const LOGIN = gql`
  ${USER_FRAGMENT}
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        ...user
      }
    }
  }
`;

const SIGNUP = gql`
  mutation signup(
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
    $isAdmin: Boolean
    $owned: String
  ) {
    signup(
      data: {
        name: $name
        email: $email
        password: $password
        phone: $phone
        isAdmin: $isAdmin
        owned: $owned
      }
    )
  }
`;

const RESET_PASSWORD = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(data: { token: $token, password: $password })
  }
`;

const FORGET_PASSWORD = gql`
  mutation forgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;

const ACCOUNT_VALIDATION = gql`
  mutation verifyAccount($token: String!) {
    verifyAccount(token: $token)
  }
`;
/*
const ADD_MODULES_FOR_USER = gql`
  ${USERMODULE_FRAGMENT}
  mutation addModulesforUser($modules: [String!]!) {
    addModulesforUser(modules: $modules) {
      ...userModule
    }
  }
`;*/

const UPDATE_USER = gql`
  mutation updateUser(
    $_id: String!
    $name: String
    $email: String
    $password: String
    $isAdmin: Boolean
    $firstRun: Boolean
    $image: Upload
    $phone: String
    $location: String
    $diploma: String
    $job: String
    $description: String
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
        image: $image
        phone: $phone
        location: $location
        diploma: $diploma
        job: $job
        description: $description
        birthDate: $birthDate
      }
    ) {
      _id
      name
      email
      imageUrl
      phone
      location
      job
      diploma
      description
    }
  }
`;

export {
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
  FORGET_PASSWORD,
  ACCOUNT_VALIDATION,
  //ADD_MODULES_FOR_USER,
  UPDATE_USER,
};
