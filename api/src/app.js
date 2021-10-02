import apolloServer, { subscriptionServer } from "./apolloSever";
import cors from "cors";
import express from "express";
import http from "http";

// DB
import "./db";

// MiddleWares+server
const app = express();
app.use("/public", express.static("public"));
app.use(cors());
apolloServerStart();
apolloServer.applyMiddleware({ app });

//main server
const httpServer = http.createServer(app);

// subscription server
subscriptionServer(httpServer);

//server listening
const port = process.env.PORT || 4000;

httpServer.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${apolloServer.subscriptionsPath}`
  );
});

async function apolloServerStart() {
  await apolloServer.start();
}
