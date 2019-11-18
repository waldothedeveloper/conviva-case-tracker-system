const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const http = require("http");

const configurations = {
  production: { port: 4000, hostname: "localhost" }
};

const config = configurations.production;

const apollo = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
apollo.applyMiddleware({ app });

let server;
server = http.createServer(app);

server.listen({ port: config.port }, () =>
  console.log(
    "🚀 Server ready at",
    `http://${config.hostname}:${config.port}${apollo.graphqlPath}`
  )
);
