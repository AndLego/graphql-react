import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./login/graphql-queries";

const LoginForm = ({ notifyError, setToken }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
  };

  React.useEffect(() => {
    if (result.data) {
      const { value: token } = result.data.login;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export { LoginForm };
