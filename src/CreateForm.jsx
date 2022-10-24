import { useMutation } from "@apollo/client";
import React from "react";
import { CREATE_USER } from "./login/graphql-queries";

const CreateForm = ({ notifyError }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [trigger, setTrigger] = React.useState("");

  const [createUser, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setTrigger("User Created");
    },
  });

  React.useEffect(() => {
    setTimeout(() => {
      setTrigger("");
    }, 5000);
  }, [trigger]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createUser({ variables: { username, password } });

    setUsername("");
    setPassword("");
  };

  return (
    <div className="data-login">
      {trigger === "User Created" && <>
      <div style={{ color: "greenyellow", position: "fixed", top: 0, width: "100%" }}>
     User Created, you can log now
    </div>
      </>}
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

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export { CreateForm };
