import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const getAuth = () => {
  const token = localStorage.getItem("phonenumbers-user-token");
  return token ? `bearer ${token}` : null;
};

//con que se va a conectar, en desarrollo variables de entorno
//en produccion sera a alguna db
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      authorization: getAuth(),
    },
    uri: "https://graphql-server0001.herokuapp.com/",
  }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
