const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
// const fs = require("fs");
// const https = require("https");
const http = require("http");

const configurations = {
  // Note: You may need sudo to run on port 443
  production: { port: 4000, hostname: "localhost" }
};

// const environment = process.env.NODE_ENV || "production";
const config = configurations.production;

const apollo = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
apollo.applyMiddleware({ app });

let server;

// Assumes certificates are in a .ssl folder off of the package root. Make sure
// these files are secured.
server = http.createServer(app);

server.listen({ port: config.port }, () =>
  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      apollo.graphqlPath
    }`
  )
);
