import { ApolloClient, split, gql, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const wsLink = process.browser
  ? new WebSocketLink({
      uri: "ws://localhost:4000/graphql",
      options: {
        reconnect: true,
      },
    })
  : null;

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: Cookies.get("token"),
    },
  };
});

const uploadLink = createUploadLink({ uri: "http://localhost:4000/graphql" });

const splitLink =
  process.browser &&
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(uploadLink)
  );

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          comments: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      Group: {
        fields: {
          posts: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      UserGroup: {
        fields: {
          user: {
            merge: true,
          },
          group: {
            merge: true,
          },
        },
      },
    },
  }),

  typeDefs: gql`
    enum STATUS {
      FREE
      PAID
      TRAIL
    }

    enum PRIVACY {
      PUBLIC
      PRIVACY
    }

    enum ROLES {
      ADMIN
      USER
    }
  `,
});

export default client;
