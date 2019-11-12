import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./containers/theme";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
// import "./fonts/CeraPRO-Regular.otf";
// import "./fonts/CeraPRO-Medium.otf";
// import "./fonts/CeraPRO-Light.otf";
// import "./fonts/CeraPRO-Thin.otf";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id || null
  })
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
