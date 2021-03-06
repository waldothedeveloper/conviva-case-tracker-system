import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./containers/theme";
import "./index.css";

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  }
};

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      // 1. This one used for production
      uri: "https://casetracker.mccigroup.com/server"
      // 1. This one used for development
      // uri: "http://localhost:4000/graphql"
    })
  ]),
  cache: cache,
  defaultOptions: defaultOptions
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
