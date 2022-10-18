import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloClient, ApolloProvider, HttpLink, gql, InMemoryCache } from "@apollo/client";

//con que se va a conectar, en desarrollo variables de entorno
//en produccion sera a alguna db
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/",
  }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
