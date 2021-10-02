import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { PubSub } from "graphql-subscriptions";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";

//Models
import User from "./User/user-schema";
import Token from "./Token/token-schema";
import Module from "./Module/module-schema";
import Group from "./Group/group-schema";
import UserGroup from "./UserGroup/usergroup-schema";
import Post from "./Post/post-schema";
import Comment from "./Comment/comment-schema";
import Invitation from "./Invitation/invitation-schema";
import Job from "./Jobs/job.schema";

// Graphql server
export const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const pubsub = new PubSub();
pubsub.ee.setMaxListeners(50);

export const contextModels = {
  User,
  Token,
  Module,
  Group,
  UserGroup,
  Post,
  Comment,
  Invitation,
  Job,
  pubsub,
};

const serverConfig = {
  schema,
  context(req) {
    return {
      req,
      ...contextModels,
    };
  },

  formatError: (err) => {
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }
    return err;
  },
};
const server = new ApolloServer(serverConfig);
export default server;

export const subscriptionServer = (httpServer) =>
  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect(connectionParams, webSocket, context) {
        return { ...contextModels };
      },
    },
    { server: httpServer, path: server.graphqlPath }
  );
