import { gql } from "@apollo/client";

export const USERMODULE_FRAGMENT = gql`
  fragment userModule on UserModule {
    _id
    paid
    module {
      _id
      title
      status
    }
  }
`;

export const USERCOMPANY_FRAGMENT = gql`
  fragment company on Company {
    _id
    name
    email
    phone
    description
    imageUrl
    address
  }
`;

export const USER_FRAGMENT = gql`
  ${USERMODULE_FRAGMENT}
  ${USERCOMPANY_FRAGMENT}
  fragment user on User {
    _id
    name
    email
    isAdmin
    imageUrl
    firstRun
    company {
      ...company
    }
    modules {
      ...userModule
    }
    groups {
      _id
      group {
        _id
        title
        members
        imageUrl
        description
        owner {
          _id
          name
        }
      }
    }
  }
`;

export const USERGROUP_FRAGMENT = gql`
  fragment userGroup on UserGroup {
    _id
    role
    accepted
    date
    joinDate
    postNumbers
  }
`;

export const GROUP_FRAGMENT = gql`
  fragment group on Group {
    _id
    title
    description
    privacy
    members
    pending
    postNumbers
    imageUrl
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment comment on Comment {
    _id
    date
    lastUpdate
    text
    createdAt
    user {
      _id
      name
      imageUrl
    }
  }
`;

export const POST_FRAGMENT = gql`
  ${COMMENT_FRAGMENT}
  fragment post on Post {
    _id
    text
    date
    lastUpdate
    numberOfComments
    filesUrls
    createdAt
    user {
      _id
      name
      imageUrl
    }
    group {
      _id
      title
    }
    comments {
      ...comment
    }
  }
`;
