import gql from "graphql-tag";
import { POST_FRAGMENT } from "../Fragments";

const USER_POSTS = gql`
  ${POST_FRAGMENT}
  query userPosts($user: String!) {
    userPosts(user: $user) {
      user {
        _id
        name
        email
        imageUrl
        phone
        diploma
        job
        location
        description
      }
      posts {
        ...post
      }
    }
  }
`;

const FEEDS = gql`
  ${POST_FRAGMENT}
  query posts {
    posts {
      ...post
    }
  }
`;

export { USER_POSTS, FEEDS };
